import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { Icon } from '../../../../shared/ui/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

type Step = { num: string; icon: string; title: string; text: string };

const CONTENT: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    accent: string;
    subtitle: string;
    steps: Step[];
    includesTitle: string;
    includesNote: string;
    includes: string[];
    cta: string;
  }
> = {
  uz: {
    eyebrow: 'Hamkorlik modeli',
    title: 'Shaffof va',
    accent: 'halol narx',
    subtitle:
      "Narx tayyor shablonda emas — avval jarayoningizni bepul o'rganamiz, keyin aniq taklif beramiz. Bir martalik to'lov, oylik abonent to'lovsiz.",
    steps: [
      {
        num: '01',
        icon: 'search',
        title: 'Bepul audit',
        text: "Biznesingiz va ish jarayonlaringizni hech qanday to'lovsiz o'rganamiz — qayerda vaqt va pul yo'qolayotganini ko'rsatamiz.",
      },
      {
        num: '02',
        icon: 'clipboard',
        title: 'Aniq taklif',
        text: "Qat'iy belgilangan narx, ish hajmi va muddat bilan shaffof taklif. Yashirin xarajat yoki kutilmagan hisob yo'q.",
      },
      {
        num: '03',
        icon: 'wallet',
        title: "Bir martalik to'lov",
        text: "Bir marta to'laysiz — tizim ham, dastur kodi ham butunlay sizniki. Har oy hech kimga to'lab turmaysiz.",
      },
    ],
    includesTitle: 'Narxga nimalar kiradi',
    includesNote: "Hamma narsa bitta kelishilgan narx ichida — keyin qo'shimcha so'ramaymiz.",
    includes: [
      'Tahlil va dizayn — ehtiyojingizga moslab loyiha rejasi',
      'Ishlab chiqish — sizning biznesingiz uchun maxsus tizim',
      "Joriy etish va ma'lumotlarni ko'chirish — eski bazadan to'liq o'tkazish",
      "Xodimlarni o'qitish — jamoangiz ishlay olishi uchun amaliy treninglar",
      "Kafolat va qo'llab-quvvatlash — ishga tushgandan keyin ham yoningizdamiz",
    ],
    cta: 'Loyihangiz narxini biling',
  },
  ru: {
    eyebrow: 'Модель работы',
    title: 'Прозрачно и',
    accent: 'честно',
    subtitle:
      'Цена не из готового шаблона — сначала бесплатно изучаем ваши процессы, затем даём точное предложение. Оплата один раз, без ежемесячной абонентской платы.',
    steps: [
      {
        num: '01',
        icon: 'search',
        title: 'Бесплатный аудит',
        text: 'Бесплатно изучаем ваш бизнес и рабочие процессы — показываем, где теряются время и деньги.',
      },
      {
        num: '02',
        icon: 'clipboard',
        title: 'Точное предложение',
        text: 'Прозрачное предложение с фиксированной ценой, объёмом работ и сроком. Без скрытых платежей и неожиданных счетов.',
      },
      {
        num: '03',
        icon: 'wallet',
        title: 'Разовая оплата',
        text: 'Платите один раз — и система, и исходный код полностью ваши. Никаких ежемесячных платежей.',
      },
    ],
    includesTitle: 'Что входит в стоимость',
    includesNote: 'Всё — в одной согласованной цене, без доплат потом.',
    includes: [
      'Анализ и дизайн — план проекта под ваши задачи',
      'Разработка — система специально под ваш бизнес',
      'Внедрение и перенос данных — полный переход со старой базы',
      'Обучение сотрудников — практические тренинги для вашей команды',
      'Гарантия и поддержка — мы рядом и после запуска',
    ],
    cta: 'Узнать стоимость проекта',
  },
  en: {
    eyebrow: 'Engagement model',
    title: 'Transparent and',
    accent: 'fair pricing',
    subtitle:
      'The price is never from a template — we study your processes for free first, then give a precise quote. Pay once, no monthly fees.',
    steps: [
      {
        num: '01',
        icon: 'search',
        title: 'Free audit',
        text: 'We study your business and workflows at no cost — and show you exactly where time and money are being lost.',
      },
      {
        num: '02',
        icon: 'clipboard',
        title: 'Clear quote',
        text: 'A transparent proposal with a fixed price, defined scope and timeline. No hidden costs, no surprise invoices.',
      },
      {
        num: '03',
        icon: 'wallet',
        title: 'One-time payment',
        text: 'Pay once — both the system and its source code are fully yours. Nothing to pay every month.',
      },
    ],
    includesTitle: "What's included in the price",
    includesNote: 'Everything sits inside one agreed price — no extra charges later.',
    includes: [
      'Analysis and design — a project plan tailored to your needs',
      'Development — a system built specifically for your business',
      'Rollout and data migration — a full move from your old system',
      'Staff training — hands-on sessions so your team is confident',
      "Warranty and support — we stay with you after go-live",
    ],
    cta: 'Get your project quote',
  },
};

@Component({
  selector: 'app-pricing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, SectionHeading, RevealDirective],
  template: `
    <section id="pricing" class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <app-section-heading
          [eyebrow]="c().eyebrow"
          icon="wallet"
          [title]="c().title"
          [accent]="c().accent"
          [subtitle]="c().subtitle"
        />

        <div class="mt-14 grid gap-6 md:grid-cols-3">
          @for (step of c().steps; track step.num) {
            <div
              appReveal
              [appReveal]="$index * 120"
              class="glass rainbow-edge relative flex flex-col rounded-2xl p-6"
            >
              <span
                class="pointer-events-none absolute right-5 top-4 text-5xl font-bold leading-none text-slate-900/5 dark:text-white/5"
                aria-hidden="true"
                >{{ step.num }}</span
              >
              <div
                class="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
              >
                <app-icon [name]="step.icon" [size]="22" />
              </div>
              <h3 class="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                {{ step.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {{ step.text }}
              </p>
            </div>
          }
        </div>

        <div
          appReveal
          class="glass-strong rainbow-edge mt-8 rounded-3xl p-8 md:p-10"
        >
          <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 class="text-xl font-semibold text-slate-900 dark:text-white md:text-2xl">
                {{ c().includesTitle }}
              </h3>
              <p class="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400">
                {{ c().includesNote }}
              </p>
            </div>
            <span
              class="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-1.5 text-sm font-semibold text-cyan-700 dark:text-cyan-300"
            >
              <app-icon name="sparkles" [size]="16" />
              {{ c().eyebrow }}
            </span>
          </div>

          <ul class="mt-7 grid gap-4 sm:grid-cols-2">
            @for (item of c().includes; track item) {
              <li class="flex items-start gap-3">
                <span
                  class="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-gradient text-white"
                >
                  <app-icon name="check" [size]="16" />
                </span>
                <span class="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {{ item }}
                </span>
              </li>
            }
          </ul>

          <div class="mt-9 flex justify-center md:justify-start">
            <a
              [routerLink]="i18n.localizedPath()"
              fragment="contact"
              class="sheen inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.04]"
            >
              {{ c().cta }}
              <app-icon name="arrowRight" [size]="20" />
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Pricing {
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
}
