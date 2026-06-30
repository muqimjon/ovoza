import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { SITE } from '../../../../core/site';
import { SectionHeading } from '../../../../shared/ui/section-heading';
import { Icon } from '../../../../shared/ui/icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

const CONTENT: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    accent: string;
    subtitle: string;
    follow: string;
    instagram: string;
    telegram: string;
    linkedin: string;
    youtube: string;
  }
> = {
  uz: {
    eyebrow: 'Ijtimoiy tarmoqlar',
    title: 'Bizni',
    accent: 'kuzatib boring',
    subtitle: 'Barcha platformalarda bitta nom orqali topasiz: ' + SITE.handle,
    follow: 'Kuzatish',
    instagram: 'Instagram',
    telegram: 'Telegram',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
  },
  ru: {
    eyebrow: 'Соцсети',
    title: 'Следите',
    accent: 'за нами',
    subtitle: 'Везде под одним именем: ' + SITE.handle,
    follow: 'Подписаться',
    instagram: 'Instagram',
    telegram: 'Telegram',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
  },
  en: {
    eyebrow: 'Social',
    title: 'Follow',
    accent: 'us',
    subtitle: 'Find us everywhere under one handle: ' + SITE.handle,
    follow: 'Follow',
    instagram: 'Instagram',
    telegram: 'Telegram',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
  },
};

@Component({
  selector: 'app-social',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, Icon, RevealDirective],
  template: `
    <section id="social" class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <app-section-heading
          eyebrow="{{ c().eyebrow }}"
          icon="send"
          title="{{ c().title }}"
          accent="{{ c().accent }}"
          subtitle="{{ c().subtitle }}"
        />

        <div class="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          <a
            [href]="site.social.instagram"
            target="_blank"
            rel="noopener"
            [attr.aria-label]="c().follow + ' — ' + c().instagram"
            class="glass rainbow-edge sheen group flex flex-col items-center rounded-2xl p-6 text-center transition-transform hover:scale-[1.03]"
            appReveal
          >
            <div class="grid h-14 w-14 place-items-center rounded-2xl bg-pink-500/10 text-pink-500">
              <app-icon name="sparkles" [size]="24" />
            </div>
            <div class="mt-4 font-semibold text-slate-900 dark:text-white">{{ c().instagram }}</div>
            <div class="mt-1 text-sm text-slate-500">{{ site.handle }}</div>
          </a>

          <a
            [href]="site.social.telegram"
            target="_blank"
            rel="noopener"
            [attr.aria-label]="c().follow + ' — ' + c().telegram"
            class="glass rainbow-edge sheen group flex flex-col items-center rounded-2xl p-6 text-center transition-transform hover:scale-[1.03]"
            [appReveal]="120"
          >
            <div class="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-500">
              <app-icon name="send" [size]="24" />
            </div>
            <div class="mt-4 font-semibold text-slate-900 dark:text-white">{{ c().telegram }}</div>
            <div class="mt-1 text-sm text-slate-500">{{ site.handle }}</div>
          </a>

          <a
            [href]="site.social.linkedin"
            target="_blank"
            rel="noopener"
            [attr.aria-label]="c().follow + ' — ' + c().linkedin"
            class="glass rainbow-edge sheen group flex flex-col items-center rounded-2xl p-6 text-center transition-transform hover:scale-[1.03]"
            [appReveal]="240"
          >
            <div class="grid h-14 w-14 place-items-center rounded-2xl bg-blue-600/10 text-blue-600">
              <app-icon name="building" [size]="24" />
            </div>
            <div class="mt-4 font-semibold text-slate-900 dark:text-white">{{ c().linkedin }}</div>
            <div class="mt-1 text-sm text-slate-500">{{ site.handle }}</div>
          </a>

          <a
            [href]="site.social.youtube"
            target="_blank"
            rel="noopener"
            [attr.aria-label]="c().follow + ' — ' + c().youtube"
            class="glass rainbow-edge sheen group flex flex-col items-center rounded-2xl p-6 text-center transition-transform hover:scale-[1.03]"
            [appReveal]="360"
          >
            <div class="grid h-14 w-14 place-items-center rounded-2xl bg-red-500/10 text-red-500">
              <app-icon name="rocket" [size]="24" />
            </div>
            <div class="mt-4 font-semibold text-slate-900 dark:text-white">{{ c().youtube }}</div>
            <div class="mt-1 text-sm text-slate-500">{{ site.handle }}</div>
          </a>
        </div>
      </div>
    </section>
  `,
})
export class Social {
  protected readonly i18n = inject(I18nService);
  protected readonly site = SITE;
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
}
