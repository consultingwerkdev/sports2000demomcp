using Consultingwerk.SmartMcpAuthentication;
using System.Globalization;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;

public static class Sports2000McpUiAuthPayloads
{
    public const string UiAuthMetaKey = "consultingwerk/uiAuth";

    public static JsonObject CreateResultMeta(ISmartMcpAccessTokenProvider? tokenProvider)
    {
        var meta = new JsonObject();
        var payload = CreatePayload(tokenProvider);
        meta[UiAuthMetaKey] = payload;

        return meta;
    }

    public static JsonObject CreatePayload(ISmartMcpAccessTokenProvider? tokenProvider)
    {
        var accessToken = tokenProvider?.GetAccessToken();
        if (string.IsNullOrWhiteSpace(accessToken))
        {
            throw new InvalidOperationException(
                "The MCP UI app requires an authenticated bearer token from the MCP host.");
        }

        var expiresAtUtc = ReadExpiresAtUtc(accessToken);

        return new JsonObject
        {
            ["accessToken"] = accessToken,
            ["tokenType"] = "Bearer",
            ["expiresAtUtc"] = expiresAtUtc.ToString("O", CultureInfo.InvariantCulture)
        };
    }

    private static DateTimeOffset ReadExpiresAtUtc(string accessToken)
    {
        var tokenParts = accessToken.Split('.');
        if (tokenParts.Length < 2)
        {
            throw new InvalidOperationException(
                "The authenticated bearer token could not be decoded because it is not a valid JWT.");
        }

        try
        {
            var payloadBytes = DecodeBase64Url(tokenParts[1]);
            using var jsonDocument = JsonDocument.Parse(payloadBytes);

            if (!jsonDocument.RootElement.TryGetProperty("exp", out var expElement))
            {
                throw new InvalidOperationException(
                    "The authenticated bearer token did not include an 'exp' claim.");
            }

            var expSeconds = expElement.ValueKind switch
            {
                JsonValueKind.Number when expElement.TryGetInt64(out var int64Value) => int64Value,
                JsonValueKind.String when long.TryParse(expElement.GetString(), NumberStyles.Integer, CultureInfo.InvariantCulture, out var stringValue) => stringValue,
                _ => throw new InvalidOperationException(
                    "The authenticated bearer token included an invalid 'exp' claim.")
            };

            return DateTimeOffset.FromUnixTimeSeconds(expSeconds);
        }
        catch (InvalidOperationException)
        {
            throw;
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException(
                "The authenticated bearer token could not be decoded to determine its expiration time.",
                ex);
        }
    }

    private static byte[] DecodeBase64Url(string base64Url)
    {
        var paddedValue = base64Url
            .Replace('-', '+')
            .Replace('_', '/');

        var remainder = paddedValue.Length % 4;
        if (remainder > 0)
        {
            paddedValue = paddedValue.PadRight(paddedValue.Length + (4 - remainder), '=');
        }

        return Convert.FromBase64String(paddedValue);
    }
}
