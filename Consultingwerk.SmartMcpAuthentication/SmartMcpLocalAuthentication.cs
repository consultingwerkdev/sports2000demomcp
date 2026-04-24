using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;
using System.Diagnostics;
using System.Globalization;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Consultingwerk.SmartMcpAuthentication;

/// <summary>
/// Local stdio MCP authentication session used by desktop clients.
/// </summary>
public interface IStdioMcpAuthSession
{
    SmartMcpAuthStatus GetStatus();

    Task<SmartMcpAuthStatus> LoginAsync(CancellationToken cancellationToken = default);

    Task<SmartMcpAuthStatus> LogoutAsync(CancellationToken cancellationToken = default);

    Task<string> GetValidAccessTokenAsync(CancellationToken cancellationToken = default);
}

/// <summary>
/// Sanitized local MCP authentication status. This type never contains token values.
/// </summary>
public sealed record SmartMcpAuthStatus(
    bool IsSignedIn,
    string? UserName,
    string? Subject,
    DateTimeOffset? ExpiresAtUtc,
    string Issuer,
    string ClientId,
    string[] Scopes,
    string? Audience,
    string CacheDirectory,
    bool HasRefreshToken,
    string Message)
{
    public string ToDisplayString()
    {
        var signedInText = IsSignedIn ? "signed in" : "signed out";
        var userText = string.IsNullOrWhiteSpace(UserName) ? string.Empty : $"{Environment.NewLine}User: {UserName}";
        var subjectText = string.IsNullOrWhiteSpace(Subject) ? string.Empty : $"{Environment.NewLine}Subject: {Subject}";
        var expiryText = ExpiresAtUtc is null ? string.Empty : $"{Environment.NewLine}Expires UTC: {ExpiresAtUtc:O}";
        var audienceText = string.IsNullOrWhiteSpace(Audience) ? string.Empty : $"{Environment.NewLine}Audience: {Audience}";

        return string.Join(
            Environment.NewLine,
            [
                $"Smart MCP auth is {signedInText}.",
                $"Message: {Message}",
                $"Issuer: {Issuer}",
                $"Client ID: {ClientId}",
                $"Scopes: {string.Join(' ', Scopes)}",
                $"Refresh token cached: {(HasRefreshToken ? "yes" : "no")}",
                $"Cache directory: {CacheDirectory}{userText}{subjectText}{expiryText}{audienceText}"
            ]);
    }
}

/// <summary>
/// Registers local stdio MCP authentication services.
/// </summary>
public static class SmartMcpLocalAuthenticationExtensions
{
    public static IServiceCollection AddSmartMcpLocalAuthentication(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var options = new SmartMcpOAuth2Options();
        configuration.GetSection(SmartMcpOAuth2Options.SectionName).Bind(options);
        options.Scopes = SmartMcpOAuth2Options.NormalizeScopes(options.Scopes);

        services.AddSingleton(options);
        services.AddHttpClient();
        services.AddSingleton<IStdioMcpAuthSession, StdioMcpAuthSession>();
        services.AddSingleton<ISmartMcpAccessTokenProvider, LocalMcpAccessTokenProvider>();

        return services;
    }
}

/// <summary>
/// Access token provider for local stdio MCP tools.
/// </summary>
public sealed class LocalMcpAccessTokenProvider(
    IStdioMcpAuthSession session,
    SmartMcpOAuth2Options options) : ISmartMcpAccessTokenProvider
{
    public string GetAccessToken() => session.GetValidAccessTokenAsync().GetAwaiter().GetResult();

    public string ResolveToken(string? pcJwtToken)
    {
        if (!options.Enabled)
        {
            return string.Empty;
        }

        if (options.TokenAcquisition == TokenAcquisitionMode.JwtPassThrough && !string.IsNullOrWhiteSpace(pcJwtToken))
        {
            return pcJwtToken;
        }

        return GetAccessToken();
    }
}

/// <summary>
/// Shared local MCP authentication tools for desktop clients.
/// </summary>
public sealed class SmartMcpAuthTools(IStdioMcpAuthSession session)
{
    [McpServerTool]
    [Description("Reports the local MCP authentication status without opening a browser or returning tokens.")]
    public string smart_auth_status()
    {
        return session.GetStatus().ToDisplayString();
    }

    [McpServerTool]
    [Description("Starts the local browser-based OAuth login flow and caches the resulting MCP session tokens.")]
    public async Task<string> smart_auth_login()
    {
        var status = await session.LoginAsync();
        return status.ToDisplayString();
    }

    [McpServerTool]
    [Description("Clears only the local MCP authentication session cache. This does not log out of browser or Keycloak SSO.")]
    public async Task<string> smart_auth_logout()
    {
        var status = await session.LogoutAsync();
        return status.ToDisplayString();
    }
}

internal sealed class StdioMcpAuthSession(
    SmartMcpOAuth2Options options,
    IHttpClientFactory httpClientFactory,
    ILogger<StdioMcpAuthSession>? logger = null) : IStdioMcpAuthSession
{
    private const string CacheFileName = "tokens.json";
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        WriteIndented = true,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };

    private readonly SemaphoreSlim _sessionLock = new(1, 1);
    private readonly string _cacheDirectory = ResolveCacheDirectory(options);

    public SmartMcpAuthStatus GetStatus()
    {
        var cache = ReadCache();
        return CreateStatus(cache, cache is null ? "No local MCP auth session is cached." : "Local MCP auth session cache found.");
    }

    public async Task<SmartMcpAuthStatus> LoginAsync(CancellationToken cancellationToken = default)
    {
        await _sessionLock.WaitAsync(cancellationToken).ConfigureAwait(false);
        try
        {
            EnsureConfigured();

            var tokenCache = await RunBrowserLoginAsync(cancellationToken).ConfigureAwait(false);
            WriteCache(tokenCache);

            return CreateStatus(tokenCache, "Login completed and the local MCP auth session was cached.");
        }
        finally
        {
            _sessionLock.Release();
        }
    }

    public Task<SmartMcpAuthStatus> LogoutAsync(CancellationToken cancellationToken = default)
    {
        ClearCacheDirectory();
        return Task.FromResult(CreateStatus(null, "Local MCP auth session cache cleared."));
    }

    public async Task<string> GetValidAccessTokenAsync(CancellationToken cancellationToken = default)
    {
        if (!options.Enabled)
        {
            return string.Empty;
        }

        await _sessionLock.WaitAsync(cancellationToken).ConfigureAwait(false);
        try
        {
            EnsureConfigured();

            var cache = ReadCache();
            if (HasUsableAccessToken(cache))
            {
                return cache!.AccessToken;
            }

            if (!string.IsNullOrWhiteSpace(cache?.RefreshToken))
            {
                var refreshed = await TryRefreshAsync(cache, cancellationToken).ConfigureAwait(false);
                if (HasUsableAccessToken(refreshed))
                {
                    WriteCache(refreshed!);
                    return refreshed!.AccessToken;
                }
            }

            if (!options.AutoLoginOnProtectedCall)
            {
                return string.Empty;
            }

            var loggedIn = await RunBrowserLoginAsync(cancellationToken).ConfigureAwait(false);
            WriteCache(loggedIn);
            return loggedIn.AccessToken;
        }
        finally
        {
            _sessionLock.Release();
        }
    }

    private async Task<TokenCache> RunBrowserLoginAsync(CancellationToken cancellationToken)
    {
        var verifier = CreatePkceVerifier();
        var challenge = CreatePkceChallenge(verifier);
        var state = CreateState();

        using var listener = StartLoopbackListener(out var callbackUri);
        var authorizationUri = BuildAuthorizationUri(callbackUri, challenge, state);

        logger?.LogInformation("Starting local MCP OAuth login with redirect URI {RedirectUri}", callbackUri);
        Process.Start(new ProcessStartInfo(authorizationUri) { UseShellExecute = true });

        using var timeout = new CancellationTokenSource(TimeSpan.FromSeconds(Math.Max(1, options.LocalLoginTimeoutSeconds)));
        using var linked = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken, timeout.Token);

        var code = await WaitForAuthorizationCodeAsync(listener, state, linked.Token).ConfigureAwait(false);
        return await ExchangeCodeAsync(code, callbackUri, verifier, cancellationToken).ConfigureAwait(false);
    }

    private TcpListener StartLoopbackListener(out string callbackUri)
    {
        var address = ResolveRedirectAddress(options.RedirectHost);
        var listener = new TcpListener(address, Math.Max(0, options.RedirectPort));
        listener.Start();

        var port = ((IPEndPoint)listener.LocalEndpoint).Port;
        callbackUri = $"http://{options.RedirectHost}:{port}/callback/";
        return listener;
    }

    private async Task<string> WaitForAuthorizationCodeAsync(
        TcpListener listener,
        string expectedState,
        CancellationToken cancellationToken)
    {
        using var client = await listener.AcceptTcpClientAsync(cancellationToken).ConfigureAwait(false);
        await using var stream = client.GetStream();

        using var reader = new StreamReader(stream, Encoding.ASCII, leaveOpen: true);
        var requestLine = await reader.ReadLineAsync(cancellationToken).ConfigureAwait(false);
        while (!string.IsNullOrEmpty(await reader.ReadLineAsync(cancellationToken).ConfigureAwait(false)))
        {
        }

        var (code, state, error) = ParseCallbackRequest(requestLine);
        if (!string.IsNullOrWhiteSpace(error))
        {
            await WriteHttpResponseAsync(stream, 400, "Login failed", $"OAuth returned an error: {WebUtility.HtmlEncode(error)}", cancellationToken).ConfigureAwait(false);
            throw new InvalidOperationException($"OAuth login failed: {error}");
        }

        if (!string.Equals(state, expectedState, StringComparison.Ordinal))
        {
            await WriteHttpResponseAsync(stream, 400, "Login failed", "Invalid OAuth state. Please try again.", cancellationToken).ConfigureAwait(false);
            throw new InvalidOperationException("OAuth callback state did not match the login request.");
        }

        if (string.IsNullOrWhiteSpace(code))
        {
            await WriteHttpResponseAsync(stream, 400, "Login failed", "No authorization code was returned. Please try again.", cancellationToken).ConfigureAwait(false);
            throw new InvalidOperationException("OAuth callback did not include an authorization code.");
        }

        await WriteHttpResponseAsync(stream, 200, "Login complete", "You can return to your desktop agent.", cancellationToken).ConfigureAwait(false);
        return code;
    }

    private async Task<TokenCache> ExchangeCodeAsync(
        string code,
        string redirectUri,
        string verifier,
        CancellationToken cancellationToken)
    {
        var values = CreateBaseTokenRequest();
        values["grant_type"] = "authorization_code";
        values["code"] = code;
        values["redirect_uri"] = redirectUri;
        values["code_verifier"] = verifier;

        return await SendTokenRequestAsync(values, null, cancellationToken).ConfigureAwait(false);
    }

    private async Task<TokenCache?> TryRefreshAsync(TokenCache cache, CancellationToken cancellationToken)
    {
        try
        {
            var values = CreateBaseTokenRequest();
            values["grant_type"] = "refresh_token";
            values["refresh_token"] = cache.RefreshToken!;

            var refreshed = await SendTokenRequestAsync(values, cache.RefreshToken, cancellationToken).ConfigureAwait(false);
            return refreshed;
        }
        catch (Exception ex)
        {
            logger?.LogWarning(ex, "Refreshing the local MCP auth session failed. The cached session will be cleared.");
            ClearCacheDirectory();
            return null;
        }
    }

    private async Task<TokenCache> SendTokenRequestAsync(
        Dictionary<string, string> values,
        string? fallbackRefreshToken,
        CancellationToken cancellationToken)
    {
        using var request = new HttpRequestMessage(HttpMethod.Post, options.TokenEndpoint)
        {
            Content = new FormUrlEncodedContent(values)
        };

        using var response = await httpClientFactory.CreateClient().SendAsync(request, cancellationToken).ConfigureAwait(false);
        var payload = await response.Content.ReadAsStringAsync(cancellationToken).ConfigureAwait(false);

        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"OAuth token endpoint returned {(int)response.StatusCode} {response.ReasonPhrase}.");
        }

        using var document = JsonDocument.Parse(payload);
        var root = document.RootElement;

        var accessToken = root.GetProperty("access_token").GetString();
        if (string.IsNullOrWhiteSpace(accessToken))
        {
            throw new InvalidOperationException("OAuth token endpoint did not return an access token.");
        }

        var expiresAtUtc = DateTimeOffset.UtcNow.AddSeconds(GetInt(root, "expires_in") ?? 300);
        var refreshToken = TryGetString(root, "refresh_token") ?? fallbackRefreshToken;
        var scope = TryGetString(root, "scope") ?? string.Join(' ', options.Scopes);
        var tokenType = TryGetString(root, "token_type") ?? "Bearer";

        return new TokenCache(accessToken, refreshToken, expiresAtUtc, scope, tokenType, DateTimeOffset.UtcNow);
    }

    private Dictionary<string, string> CreateBaseTokenRequest()
    {
        var values = new Dictionary<string, string>
        {
            ["client_id"] = options.ClientId
        };

        if (!string.IsNullOrWhiteSpace(options.ClientSecret))
        {
            values["client_secret"] = options.ClientSecret!;
        }

        return values;
    }

    private string BuildAuthorizationUri(string redirectUri, string challenge, string state)
    {
        var parameters = new Dictionary<string, string?>
        {
            ["client_id"] = options.ClientId,
            ["response_type"] = "code",
            ["redirect_uri"] = redirectUri,
            ["scope"] = string.Join(' ', options.Scopes),
            ["code_challenge"] = challenge,
            ["code_challenge_method"] = "S256",
            ["state"] = state
        };

        var query = string.Join("&", parameters.Select(parameter =>
            $"{Uri.EscapeDataString(parameter.Key)}={Uri.EscapeDataString(parameter.Value ?? string.Empty)}"));

        return $"{options.AuthorizationEndpoint}?{query}";
    }

    private SmartMcpAuthStatus CreateStatus(TokenCache? cache, string message)
    {
        var claims = DecodeClaims(cache?.AccessToken);
        var expiresAtUtc = cache?.ExpiresAtUtc ?? GetJwtExpiry(claims);
        var isSignedIn = !string.IsNullOrWhiteSpace(cache?.AccessToken)
            && expiresAtUtc is not null
            && expiresAtUtc.Value > DateTimeOffset.UtcNow;

        return new SmartMcpAuthStatus(
            isSignedIn,
            FirstClaim(claims, "preferred_username", "name", "email"),
            FirstClaim(claims, "sub"),
            expiresAtUtc,
            options.Issuer,
            options.ClientId,
            GetScopes(cache, claims),
            FirstClaim(claims, "aud", "azp"),
            _cacheDirectory,
            !string.IsNullOrWhiteSpace(cache?.RefreshToken),
            message);
    }

    private bool HasUsableAccessToken(TokenCache? cache)
    {
        if (string.IsNullOrWhiteSpace(cache?.AccessToken))
        {
            return false;
        }

        return cache.ExpiresAtUtc > DateTimeOffset.UtcNow.AddSeconds(Math.Max(0, options.TokenRefreshSkewSeconds));
    }

    private TokenCache? ReadCache()
    {
        var cacheFile = GetCacheFilePath();
        if (!File.Exists(cacheFile))
        {
            return null;
        }

        try
        {
            var json = File.ReadAllText(cacheFile);
            return JsonSerializer.Deserialize<TokenCache>(json, JsonOptions);
        }
        catch (Exception ex)
        {
            logger?.LogWarning(ex, "Unable to read local MCP auth cache at {CacheFile}", cacheFile);
            return null;
        }
    }

    private void WriteCache(TokenCache cache)
    {
        Directory.CreateDirectory(_cacheDirectory);
        File.WriteAllText(GetCacheFilePath(), JsonSerializer.Serialize(cache, JsonOptions));
    }

    private void ClearCacheDirectory()
    {
        if (!Directory.Exists(_cacheDirectory))
        {
            return;
        }

        foreach (var file in Directory.EnumerateFiles(_cacheDirectory, "*", SearchOption.AllDirectories))
        {
            File.Delete(file);
        }

        foreach (var directory in Directory.EnumerateDirectories(_cacheDirectory, "*", SearchOption.AllDirectories).OrderByDescending(path => path.Length))
        {
            Directory.Delete(directory, false);
        }
    }

    private string GetCacheFilePath() => Path.Combine(_cacheDirectory, CacheFileName);

    private void EnsureConfigured()
    {
        if (string.IsNullOrWhiteSpace(options.AuthorizationEndpoint))
        {
            throw new InvalidOperationException("SmartMcpOAuth2:AuthorizationEndpoint is required for local MCP authentication.");
        }

        if (string.IsNullOrWhiteSpace(options.TokenEndpoint))
        {
            throw new InvalidOperationException("SmartMcpOAuth2:TokenEndpoint is required for local MCP authentication.");
        }

        if (string.IsNullOrWhiteSpace(options.ClientId))
        {
            throw new InvalidOperationException("SmartMcpOAuth2:ClientId is required for local MCP authentication.");
        }
    }

    private static IPAddress ResolveRedirectAddress(string host)
    {
        if (IPAddress.TryParse(host, out var address))
        {
            return address;
        }

        return Dns.GetHostAddresses(host).FirstOrDefault(address => address.AddressFamily == AddressFamily.InterNetwork)
            ?? IPAddress.Loopback;
    }

    private static async Task WriteHttpResponseAsync(
        Stream stream,
        int statusCode,
        string title,
        string body,
        CancellationToken cancellationToken)
    {
        var statusText = statusCode == 200 ? "OK" : "Bad Request";
        var html = $"<!doctype html><html><head><meta charset=\"utf-8\"><title>{title}</title></head><body><h1>{title}</h1><p>{body}</p></body></html>";
        var bytes = Encoding.UTF8.GetBytes(html);
        var headers = Encoding.ASCII.GetBytes(
            $"HTTP/1.1 {statusCode} {statusText}\r\nContent-Type: text/html; charset=utf-8\r\nContent-Length: {bytes.Length.ToString(CultureInfo.InvariantCulture)}\r\nConnection: close\r\n\r\n");

        await stream.WriteAsync(headers, cancellationToken).ConfigureAwait(false);
        await stream.WriteAsync(bytes, cancellationToken).ConfigureAwait(false);
    }

    private static (string? Code, string? State, string? Error) ParseCallbackRequest(string? requestLine)
    {
        if (string.IsNullOrWhiteSpace(requestLine))
        {
            return (null, null, "Missing callback request.");
        }

        var parts = requestLine.Split(' ');
        if (parts.Length < 2 || !Uri.TryCreate($"http://localhost{parts[1]}", UriKind.Absolute, out var uri))
        {
            return (null, null, "Invalid callback request.");
        }

        var query = ParseQuery(uri.Query);
        return (
            query.GetValueOrDefault("code"),
            query.GetValueOrDefault("state"),
            query.GetValueOrDefault("error"));
    }

    private static Dictionary<string, string> ParseQuery(string query)
    {
        return query.TrimStart('?')
            .Split('&', StringSplitOptions.RemoveEmptyEntries)
            .Select(part => part.Split('=', 2))
            .ToDictionary(
                part => Uri.UnescapeDataString(part[0].Replace("+", " ", StringComparison.Ordinal)),
                part => Uri.UnescapeDataString((part.Length > 1 ? part[1] : string.Empty).Replace("+", " ", StringComparison.Ordinal)),
                StringComparer.Ordinal);
    }

    private static Dictionary<string, JsonElement> DecodeClaims(string? accessToken)
    {
        if (string.IsNullOrWhiteSpace(accessToken))
        {
            return [];
        }

        var segments = accessToken.Split('.');
        if (segments.Length < 2)
        {
            return [];
        }

        try
        {
            var payload = Encoding.UTF8.GetString(Base64UrlDecode(segments[1]));
            using var document = JsonDocument.Parse(payload);
            return document.RootElement.EnumerateObject().ToDictionary(property => property.Name, property => property.Value.Clone(), StringComparer.Ordinal);
        }
        catch
        {
            return [];
        }
    }

    private static string? FirstClaim(Dictionary<string, JsonElement> claims, params string[] names)
    {
        foreach (var name in names)
        {
            if (!claims.TryGetValue(name, out var claim))
            {
                continue;
            }

            if (claim.ValueKind == JsonValueKind.String)
            {
                return claim.GetString();
            }

            if (claim.ValueKind == JsonValueKind.Array)
            {
                var values = claim.EnumerateArray()
                    .Where(element => element.ValueKind == JsonValueKind.String)
                    .Select(element => element.GetString())
                    .Where(value => !string.IsNullOrWhiteSpace(value));

                return string.Join(' ', values);
            }
        }

        return null;
    }

    private static DateTimeOffset? GetJwtExpiry(Dictionary<string, JsonElement> claims)
    {
        if (claims.TryGetValue("exp", out var exp) && exp.TryGetInt64(out var expSeconds))
        {
            return DateTimeOffset.FromUnixTimeSeconds(expSeconds);
        }

        return null;
    }

    private string[] GetScopes(TokenCache? cache, Dictionary<string, JsonElement> claims)
    {
        var scope = cache?.Scope ?? FirstClaim(claims, "scope", "scp");
        return string.IsNullOrWhiteSpace(scope)
            ? options.Scopes
            : scope.Split(' ', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
    }

    private static string CreatePkceVerifier() => Base64UrlEncode(RandomNumberGenerator.GetBytes(32));

    private static string CreatePkceChallenge(string verifier)
    {
        var bytes = SHA256.HashData(Encoding.ASCII.GetBytes(verifier));
        return Base64UrlEncode(bytes);
    }

    private static string CreateState() => Base64UrlEncode(RandomNumberGenerator.GetBytes(32));

    private static string Base64UrlEncode(byte[] bytes)
    {
        return Convert.ToBase64String(bytes)
            .TrimEnd('=')
            .Replace('+', '-')
            .Replace('/', '_');
    }

    private static byte[] Base64UrlDecode(string value)
    {
        var padded = value.Replace('-', '+').Replace('_', '/');
        padded = padded.PadRight(padded.Length + ((4 - padded.Length % 4) % 4), '=');
        return Convert.FromBase64String(padded);
    }

    private static string? TryGetString(JsonElement root, string propertyName)
    {
        return root.TryGetProperty(propertyName, out var property) && property.ValueKind == JsonValueKind.String
            ? property.GetString()
            : null;
    }

    private static int? GetInt(JsonElement root, string propertyName)
    {
        return root.TryGetProperty(propertyName, out var property) && property.TryGetInt32(out var value)
            ? value
            : null;
    }

    private static string ResolveCacheDirectory(SmartMcpOAuth2Options options)
    {
        if (!string.IsNullOrWhiteSpace(options.CacheDirectory))
        {
            return Environment.ExpandEnvironmentVariables(options.CacheDirectory);
        }

        var localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
        if (string.IsNullOrWhiteSpace(localAppData))
        {
            localAppData = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
                ".consultingwerk");
        }

        var suffix = SanitizePathSegment($"{options.Issuer}_{options.ClientId}");
        return Path.Combine(localAppData, "Consultingwerk", "SmartMcpAuthentication", suffix);
    }

    private static string SanitizePathSegment(string value)
    {
        var invalid = Path.GetInvalidFileNameChars();
        var builder = new StringBuilder();

        foreach (var character in string.IsNullOrWhiteSpace(value) ? "default" : value)
        {
            builder.Append(invalid.Contains(character) ? '_' : character);
        }

        return builder.ToString();
    }

    private sealed record TokenCache(
        string AccessToken,
        string? RefreshToken,
        DateTimeOffset ExpiresAtUtc,
        string Scope,
        string TokenType,
        DateTimeOffset CreatedAtUtc);
}
