import { TestBed } from '@angular/core/testing';
import { KendoThemeLoaderService } from './kendo-theme-loader.service';

describe('KendoThemeLoaderService', () => {
  let service: KendoThemeLoaderService;

  beforeEach(() => {
    document.getElementById('kendo-host-theme')?.remove();
    TestBed.configureTestingModule({});
    service = TestBed.inject(KendoThemeLoaderService);
  });

  it('loads the light bootstrap theme', () => {
    service.applyTheme('light');

    const link = document.getElementById('kendo-host-theme') as HTMLLinkElement | null;
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe('kendo-themes/bootstrap-main.css');
  });

  it('loads the dark bootstrap theme', () => {
    service.applyTheme('dark');

    const link = document.getElementById('kendo-host-theme') as HTMLLinkElement | null;
    expect(link?.getAttribute('href')).toBe('kendo-themes/bootstrap-main-dark.css');
  });

  it('reuses the same stylesheet link when reapplying the same theme', () => {
    service.applyTheme('dark');
    const firstLink = document.getElementById('kendo-host-theme');

    service.applyTheme('dark');
    const secondLink = document.getElementById('kendo-host-theme');

    expect(firstLink).toBe(secondLink);
    expect(document.querySelectorAll('#kendo-host-theme').length).toBe(1);
  });
});
