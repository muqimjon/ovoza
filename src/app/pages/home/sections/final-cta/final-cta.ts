import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { SITE } from '../../../../core/site';
import { Icon } from '../../../../shared/ui/icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

const CONTENT: Record<
  Locale,
  { titleLead: string; titleAccent: string; subtitle: string; primary: string; secondary: string }
> = {
  uz: {
    titleLead: 'Biznesingizni keyingi',
    titleAccent: 'bosqichga olib chiqamiz',
    subtitle:
      'Bir marta to‘laysiz — dastur abadiy sizniki. Vaqtni tejang, xatolarni kamaytiring, har bir mijoz va har bir so‘mni nazoratda saqlang.',
    primary: 'Bepul audit oling',
    secondary: 'Telegramda yozish',
  },
  ru: {
    titleLead: 'Выведем ваш бизнес на',
    titleAccent: 'новый уровень',
    subtitle:
      'Платите один раз — программа навсегда ваша. Экономьте время, сокращайте ошибки и держите под контролем каждого клиента и каждый сум.',
    primary: 'Получить бесплатный аудит',
    secondary: 'Написать в Telegram',
  },
  en: {
    titleLead: 'Let’s take your business to the',
    titleAccent: 'next level',
    subtitle:
      'Pay once — the software is yours forever. Save time, cut mistakes, and keep every client and every dollar under control.',
    primary: 'Get a free audit',
    secondary: 'Message on Telegram',
  },
};

@Component({
  selector: 'app-final-cta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, RevealDirective],
  template: `
    <section id="final-cta" class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-5xl">
        <div
          appReveal
          class="glass-strong rainbow-edge relative overflow-hidden rounded-3xl px-8 py-12 text-center md:py-16"
        >
          <div class="pointer-events-none absolute inset-0 bg-brand-gradient opacity-10"></div>
          <div
            class="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/30 blur-3xl"
          ></div>

          <div class="relative">
            <h2 class="mx-auto max-w-3xl text-balance text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              {{ c().titleLead }} <span class="text-gradient">{{ c().titleAccent }}</span>
            </h2>

            <p class="mx-auto mt-5 max-w-2xl text-base text-slate-600 dark:text-slate-400 md:text-lg">
              {{ c().subtitle }}
            </p>

            <div class="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                [routerLink]="i18n.localizedPath()"
                fragment="contact"
                class="sheen inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.04]"
              >
                {{ c().primary }}
                <app-icon name="arrowRight" [size]="20" />
              </a>

              <a
                [href]="site.telegram"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-2 rounded-full border border-slate-300/70 bg-white/40 px-7 py-3.5 font-semibold text-slate-800 backdrop-blur transition-colors hover:bg-white/70 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              >
                <app-icon name="send" [size]="20" />
                {{ c().secondary }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class FinalCta {
  protected readonly i18n = inject(I18nService);
  protected readonly site = SITE;
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
}
