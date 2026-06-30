import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { SITE } from '../../core/site';
import { Logo } from '../ui/logo';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Logo],
  template: `
    <footer class="relative mt-24 border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-[#06080d]">
      <div class="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <a [routerLink]="i18n.localizedPath()"><app-logo /></a>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">{{ t().footer.tagline }}</p>
          <div class="mt-5 flex gap-2.5">
            @for (s of socials; track s.href) {
              <a [href]="s.href" target="_blank" rel="noopener" [attr.aria-label]="s.label"
                 class="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-cyan-400 hover:text-cyan-600 dark:border-white/10 dark:text-slate-400 dark:hover:text-cyan-400">
                <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
                  @switch (s.key) {
                    @case ('telegram') { <path fill="currentColor" d="M21.9 4.3 18.6 19.8c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6.1 13.6 1.3 12c-1-.3-1-1 .2-1.5l19-7.3c.9-.3 1.6.2 1.4 1.1z" /> }
                    @case ('instagram') { <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" /> }
                    @case ('linkedin') { <path fill="currentColor" d="M6.5 8.5v9H3.5v-9h3zM5 3.5A1.8 1.8 0 1 1 5 7a1.8 1.8 0 0 1 0-3.5zM20.5 12.7v4.8h-3v-4.3c0-1.1-.4-1.8-1.4-1.8-.8 0-1.2.5-1.4 1-.1.2-.1.5-.1.8v4.3h-3s.04-7.6 0-8.4h3v1.2c.4-.6 1.1-1.4 2.6-1.4 1.9 0 3.3 1.2 3.3 3.8z" /> }
                    @case ('youtube') { <path fill="currentColor" d="M22 8.2a2.6 2.6 0 0 0-1.8-1.8C18.6 6 12 6 12 6s-6.6 0-8.2.4A2.6 2.6 0 0 0 2 8.2 27 27 0 0 0 1.7 12 27 27 0 0 0 2 15.8a2.6 2.6 0 0 0 1.8 1.8C5.4 18 12 18 12 18s6.6 0 8.2-.4a2.6 2.6 0 0 0 1.8-1.8c.3-1.3.3-3.8.3-3.8s0-2.5-.3-3.8zM10 14.6V9.4l4.3 2.6-4.3 2.6z" /> }
                  }
                </svg>
              </a>
            }
          </div>
        </div>

        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">{{ t().footer.servicesTitle }}</h3>
          <ul class="mt-4 space-y-2.5 text-sm">
            @for (item of serviceLinks(); track item.fragment) {
              <li><a [routerLink]="i18n.localizedPath()" [fragment]="item.fragment" class="text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400">{{ item.label }}</a></li>
            }
          </ul>
        </div>

        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">{{ t().footer.companyTitle }}</h3>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li><a [routerLink]="i18n.localizedPath()" fragment="cases" class="text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400">{{ t().nav.cases }}</a></li>
            <li><a [routerLink]="i18n.localizedPath()" fragment="advantages" class="text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400">{{ t().nav.advantages }}</a></li>
            <li><a [routerLink]="i18n.localizedPath('blog')" class="text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400">{{ t().nav.blog }}</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400">{{ t().footer.contactTitle }}</h3>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li><a [href]="'tel:' + site.phone" class="font-mono text-slate-700 hover:text-cyan-600 dark:text-slate-200 dark:hover:text-cyan-400">{{ site.phoneDisplay }}</a></li>
            <li><a [href]="site.telegram" target="_blank" rel="noopener" class="text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400">{{ site.handle }}</a></li>
            <li><a [href]="'mailto:' + site.email" class="text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400">{{ site.email }}</a></li>
            <li class="text-slate-500 dark:text-slate-400">{{ t().footer.address }}</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-slate-200 py-5 text-center text-xs text-slate-400 dark:border-white/10">
        © {{ year }} {{ site.legalName }}. {{ t().footer.rights }}
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly i18n = inject(I18nService);
  protected readonly site = SITE;
  protected readonly t = this.i18n.t;
  protected readonly year = 2026;

  protected readonly serviceLinks = computed(() => {
    const n = this.t().nav;
    return [
      { label: n.services, fragment: 'services' },
      { label: n.process, fragment: 'process' },
      { label: n.contact, fragment: 'contact' },
    ];
  });

  protected readonly socials = [
    { label: 'Telegram', href: SITE.social.telegram, key: 'telegram' },
    { label: 'Instagram', href: SITE.social.instagram, key: 'instagram' },
    { label: 'LinkedIn', href: SITE.social.linkedin, key: 'linkedin' },
    { label: 'YouTube', href: SITE.social.youtube, key: 'youtube' },
  ];
}
