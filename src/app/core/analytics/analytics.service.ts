import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

type Gtag = (...args: unknown[]) => void;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  init(): void {
    if (!this.isBrowser) return;
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      gtag?.('event', 'page_view', {
        page_path: (e as NavigationEnd).urlAfterRedirects,
        page_location: location.href,
        page_title: document.title,
      });
    });
  }
}
