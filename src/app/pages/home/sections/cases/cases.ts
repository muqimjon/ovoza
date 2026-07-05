import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { TiltDirective } from '../../../../shared/directives/tilt.directive';
import { Icon } from '../../../../shared/ui/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading';

type CaseItem = {
  icon: string;
  tag: string;
  company: string;
  location: string;
  challenge: string;
  solution: string[];
  metric: string;
  result: string;
};

const CONTENT: Record<Locale, {
  eyebrow: string; title: string; accent: string; subtitle: string;
  challengeLabel: string; solutionLabel: string;
  cases: CaseItem[];
}> = {
  uz: {
    eyebrow: 'Loyihalar',
    title: 'Haqiqiy biznes,',
    accent: 'haqiqiy natija',
    subtitle: "Bizning tizimlarimiz O'zbekistondagi haqiqiy korxonalarda har kuni ishlaydi — mana natijalari.",
    challengeLabel: 'Muammo',
    solutionLabel: 'Yechim',
    cases: [
      {
        icon: 'building',
        tag: 'Ombor + Barkod',
        company: 'Bekson Shoes',
        location: "Farg'ona, Uchko'prik",
        challenge: "Poyabzal zavodi ombor, savdo, to'lov va mijoz hisob-kitoblarini qo'lda, daftarda yuritardi — vaqt ketardi, xatolar bo'lardi.",
        solution: ['Barkod', 'Kirim', 'Sotuv', 'Ombor'],
        metric: 'Bir necha barobar tez',
        result: "Barkod bilan tayyor mahsulot kirimi va sotuvi ancha tezlashdi — hisob-kitob to'liq shaffof va bir necha barobar tez bo'ldi.",
      },
      {
        icon: 'building',
        tag: 'Savdo + Ombor',
        company: 'AL-MANSUR',
        location: "Farg'ona, Buvayda",
        challenge: "Kabel zavodida xomashyo, tayyor mahsulot va savdo hisobi tartibsiz edi — yo'qotishlar va chalkashliklar kelib chiqardi.",
        solution: ['Xomashyo', 'Savdo', 'Tayyor mahsulot', 'Xaridlar'],
        metric: "Qog'ozbozlik 5× kamaydi",
        result: "Qog'ozbozlik 5 barobar qisqardi, xato va kamomadlar butunlay yo'qoldi.",
      },
      {
        icon: 'landmark',
        tag: 'KPI + Call-markaz',
        company: 'HAMROH',
        location: "Markaziy call-markaz · 46 filialli tarmoq",
        challenge: "Mikromoliya tashkiloti call-markaz va xodimlar samaradorligini o'lchay olmasdi — kim qancha ishlayotgani noma'lum edi.",
        solution: ['KPI', 'Call-markaz', 'Dashboard'],
        metric: 'Samaradorlik 3× oshdi',
        result: "Operatorlar mahsuldorligi 3 barobar oshdi, har bir xodim natijasi shaffof o'lchanadigan bo'ldi.",
      },
    ],
  },
  ru: {
    eyebrow: 'Проекты',
    title: 'Реальный бизнес,',
    accent: 'реальный результат',
    subtitle: 'Наши системы каждый день работают на реальных предприятиях Узбекистана — вот результаты.',
    challengeLabel: 'Задача',
    solutionLabel: 'Решение',
    cases: [
      {
        icon: 'building',
        tag: 'Склад + Штрихкод',
        company: 'Bekson Shoes',
        location: 'Фергана, Учкуприк',
        challenge: 'Обувная фабрика вела склад, продажи, платежи и расчёты с клиентами вручную, в тетрадях — уходило время и появлялись ошибки.',
        solution: ['Штрихкод', 'Приёмка', 'Продажи', 'Склад'],
        metric: 'В несколько раз быстрее',
        result: 'Со штрихкодом приёмка готовой продукции и продажи заметно ускорились — учёт стал полностью прозрачным и в разы быстрее.',
      },
      {
        icon: 'building',
        tag: 'Продажи + Склад',
        company: 'AL-MANSUR',
        location: 'Фергана, Бувайда',
        challenge: 'На кабельном заводе учёт сырья, готовой продукции и продаж был запутанным — возникали потери и недостачи.',
        solution: ['Сырьё', 'Продажи', 'Готовая продукция', 'Закупки'],
        metric: 'Бумажной работы в 5× меньше',
        result: 'Бумажной работы стало в 5 раз меньше, ошибки и недостачи полностью исчезли.',
      },
      {
        icon: 'landmark',
        tag: 'KPI + Колл-центр',
        company: 'HAMROH',
        location: 'Центральный колл-центр · сеть из 46 филиалов',
        challenge: 'Микрофинансовая организация не могла измерить эффективность колл-центра и сотрудников — было неясно, кто сколько работает.',
        solution: ['KPI', 'Колл-центр', 'Dashboard'],
        metric: 'Эффективность выросла в 3×',
        result: 'Продуктивность операторов выросла в 3 раза, результат каждого сотрудника измеряется прозрачно.',
      },
    ],
  },
  en: {
    eyebrow: 'Case studies',
    title: 'Real business,',
    accent: 'real results',
    subtitle: 'Our systems run every day at real companies across Uzbekistan — here are the results.',
    challengeLabel: 'Challenge',
    solutionLabel: 'Solution',
    cases: [
      {
        icon: 'building',
        tag: 'Inventory + Barcode',
        company: 'Bekson Shoes',
        location: 'Fergana, Uchkuprik',
        challenge: 'The footwear factory ran inventory, sales, payments and customer ledgers by hand in paper books — slow and error-prone.',
        solution: ['Barcode', 'Receiving', 'Sales', 'Inventory'],
        metric: 'Several times faster',
        result: 'With barcodes, receiving finished goods and sales became much faster — accounting is fully transparent and several times faster.',
      },
      {
        icon: 'building',
        tag: 'Sales + Inventory',
        company: 'AL-MANSUR',
        location: 'Fergana, Buvayda',
        challenge: 'The cable factory had messy raw-material, finished-goods and sales accounting that led to losses and confusion.',
        solution: ['Raw materials', 'Sales', 'Finished goods', 'Purchases'],
        metric: 'Paperwork cut 5×',
        result: 'Paperwork was cut by 5×, and errors and shrinkage were eliminated completely.',
      },
      {
        icon: 'landmark',
        tag: 'KPI + Call center',
        company: 'HAMROH',
        location: 'Central call center · 46-branch network',
        challenge: 'The microfinance organization could not measure call-center and staff performance — no one knew who did how much.',
        solution: ['KPI', 'Call center', 'Dashboard'],
        metric: 'Productivity up 3×',
        result: 'Operator productivity rose 3×, and every employee’s performance is now measured transparently.',
      },
    ],
  },
};

@Component({
  selector: 'app-cases',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, Icon, RevealDirective, TiltDirective],
  template: `
    <section id="cases" class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <app-section-heading
          eyebrow="{{ c().eyebrow }}"
          icon="building"
          title="{{ c().title }}"
          accent="{{ c().accent }}"
          subtitle="{{ c().subtitle }}"
        />

        <div class="mt-14 grid gap-6 lg:grid-cols-3">
          @for (item of c().cases; track item.company) {
            <article appReveal [appReveal]="$index * 120" appTilt
              class="glass rainbow-edge flex flex-col rounded-2xl p-6">
              <div class="flex items-center justify-between gap-3">
                <div class="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <app-icon [name]="item.icon" [size]="22" />
                </div>
                <span class="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
                  {{ item.tag }}
                </span>
              </div>

              <h3 class="mt-5 font-display text-xl font-black tracking-tight text-slate-900 dark:text-white">
                {{ item.company }}
              </h3>
              <p class="mt-1.5 inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <app-icon name="mapPin" [size]="15" />{{ item.location }}
              </p>

              <div class="mt-5">
                <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{{ c().challengeLabel }}</p>
                <p class="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ item.challenge }}</p>
              </div>

              <div class="mt-5">
                <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{{ c().solutionLabel }}</p>
                <div class="mt-2 flex flex-wrap gap-2">
                  @for (pill of item.solution; track pill) {
                    <span class="inline-flex items-center rounded-full bg-slate-900/[0.04] px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-white/5 dark:text-slate-200">
                      {{ pill }}
                    </span>
                  }
                </div>
              </div>

              <div class="mt-6 flex items-start gap-3 border-t border-slate-200 pt-5 dark:border-white/10">
                <div class="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <app-icon name="trendingUp" [size]="18" />
                </div>
                <div>
                  <p class="font-display text-base font-black text-slate-900 dark:text-white">{{ item.metric }}</p>
                  <p class="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{{ item.result }}</p>
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class Cases {
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
}
