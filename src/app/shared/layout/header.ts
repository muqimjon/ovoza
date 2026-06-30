import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { ThemeService } from '../../core/theme/theme.service';
import { SITE } from '../../core/site';
import { Logo } from '../ui/logo';
import { LangSwitcher } from './lang-switcher';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Logo, LangSwitcher],
  template: `
    <header class="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <nav class="glass rainbow-edge mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-3 py-2.5 md:px-5">
        <a [routerLink]="i18n.localizedPath()" aria-label="Ovoza" class="transition-transform hover:scale-[1.03]">
          <app-logo />
        </a>

        <div class="hidden items-center gap-1 lg:flex">
          @for (item of nav(); track item.fragment) {
            <a
              [routerLink]="i18n.localizedPath()"
              [fragment]="item.fragment"
              class="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
              >{{ item.label }}</a
            >
          }
          <a
            [routerLink]="i18n.localizedPath('blog')"
            class="rounded-full px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
            >{{ t().nav.blog }}</a
          >
        </div>

        <div class="flex items-center gap-2">
          <a
            [href]="'tel:' + site.phone"
            class="hidden font-mono text-sm font-semibold text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400 xl:inline"
            >{{ site.phoneDisplay }}</a
          >
          <div class="hidden md:block"><app-lang-switcher /></div>
          <button
            type="button"
            (click)="theme.toggle()"
            [attr.aria-label]="t().common.theme"
            class="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white/60 text-slate-600 transition-colors hover:text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-cyan-400"
          >
            @if (theme.theme() === 'dark') {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4l1.4-1.4" /></svg>
            } @else {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
            }
          </button>
          <a
            [routerLink]="i18n.localizedPath()"
            fragment="contact"
            class="hidden rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.04] sm:inline-block"
            >{{ t().nav.cta }}</a
          >
          <button
            type="button"
            (click)="menuOpen.set(!menuOpen())"
            [attr.aria-label]="t().common.menu"
            [attr.aria-expanded]="menuOpen()"
            class="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white/60 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 lg:hidden"
          >
            @if (menuOpen()) {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            } @else {
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            }
          </button>
        </div>
      </nav>

      @if (menuOpen()) {
        <div class="glass-strong rainbow-edge mx-auto mt-2 max-w-6xl rounded-2xl p-4 lg:hidden">
          <div class="flex flex-col gap-1">
            @for (item of nav(); track item.fragment) {
              <a
                [routerLink]="i18n.localizedPath()"
                [fragment]="item.fragment"
                (click)="menuOpen.set(false)"
                class="rounded-xl px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/5"
                >{{ item.label }}</a
              >
            }
            <a
              [routerLink]="i18n.localizedPath('blog')"
              (click)="menuOpen.set(false)"
              class="rounded-xl px-4 py-2.5 font-medium text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/5"
              >{{ t().nav.blog }}</a
            >
          </div>
          <div class="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 dark:border-white/10">
            <app-lang-switcher />
            <a [href]="'tel:' + site.phone" class="font-mono text-sm font-semibold text-cyan-600 dark:text-cyan-400">{{ site.phoneDisplay }}</a>
          </div>
        </div>
      }
    </header>
  `,
})
export class Header {
  protected readonly i18n = inject(I18nService);
  protected readonly theme = inject(ThemeService);
  protected readonly site = SITE;
  protected readonly menuOpen = signal(false);
  protected readonly t = this.i18n.t;

  protected readonly nav = computed(() => {
    const n = this.t().nav;
    return [
      { label: n.services, fragment: 'services' },
      { label: n.advantages, fragment: 'advantages' },
      { label: n.cases, fragment: 'cases' },
      { label: n.process, fragment: 'process' },
    ];
  });
}
