import { ChangeDetectionStrategy, Component, inject, DOCUMENT } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AnalyticsService } from './core/analytics/analytics.service';
import { I18nService } from './core/i18n/i18n.service';
import { LOCALE_HTML_LANG } from './core/i18n/locale';
import { Header } from './shared/layout/header';
import { Footer } from './shared/layout/footer';
import { FloatingContact } from './shared/layout/floating-contact';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Header, Footer, FloatingContact],
  template: `
    <app-header />
    <router-outlet />
    <app-footer />
    <app-floating-contact />
  `,
})
export class App {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly doc = inject(DOCUMENT);
  private readonly analytics = inject(AnalyticsService);
  protected readonly i18n = inject(I18nService);

  constructor() {
    this.analytics.init();
    this.syncLocale();
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.syncLocale());
  }

  private syncLocale(): void {
    let route = this.route;
    while (route.firstChild) route = route.firstChild;
    this.i18n.setLocale(route.snapshot.data['lang']);
    this.doc.documentElement.lang = LOCALE_HTML_LANG[this.i18n.locale()];
  }
}
