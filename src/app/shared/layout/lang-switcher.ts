import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { I18nService } from '../../core/i18n/i18n.service';
import { LOCALES } from '../../core/i18n/locale';

@Component({
  selector: 'app-lang-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="flex items-center gap-0.5 rounded-full border border-slate-200 bg-white/60 p-0.5 dark:border-white/10 dark:bg-white/5">
      @for (item of links(); track item.locale) {
        <a
          [routerLink]="item.path"
          [attr.aria-current]="item.locale === i18n.locale() ? 'true' : null"
          class="rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide transition-colors"
          [class]="
            item.locale === i18n.locale()
              ? 'bg-brand-gradient text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          "
          >{{ item.locale }}</a
        >
      }
    </div>
  `,
})
export class LangSwitcher {
  protected readonly i18n = inject(I18nService);
  private readonly router = inject(Router);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly links = computed(() =>
    LOCALES.map((locale) => ({ locale, path: this.i18n.switchPath(this.url(), locale) })),
  );
}
