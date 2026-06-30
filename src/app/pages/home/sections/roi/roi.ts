import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { Icon } from '../../../../shared/ui/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading';

const CONTENT: Record<Locale, {
  eyebrow: string; title: string; accent: string; subtitle: string;
  employees: string; hours: string; lost: string; avg: string;
  hoursSaved: string; perMonth: string; recovered: string; sum: string; note: string; cta: string;
}> = {
  uz: {
    eyebrow: 'ROI kalkulyatori', title: 'Avtomatlashtirish sizga', accent: 'qancha tejaydi?',
    subtitle: "Bir necha sozlamani o'zgartiring va taxminiy oylik foydani ko'ring.",
    employees: 'Qo‘lda hisob bilan band xodimlar', hours: 'Haftasiga qo‘lda ishga ketadigan soat (har biriga)',
    lost: 'Oyiga yo‘qotilgan mijoz / buyurtma', avg: 'O‘rtacha buyurtma qiymati (so‘m)',
    hoursSaved: 'Oyiga tejaladigan soat', perMonth: 'soat / oy', recovered: 'Oyiga qaytariladigan daromad', sum: 'so‘m / oy',
    note: 'Bu taxminiy hisob — aniq raqamni bepul auditda beramiz.', cta: 'Bepul audit oling',
  },
  ru: {
    eyebrow: 'ROI калькулятор', title: 'Сколько сэкономит вам', accent: 'автоматизация?',
    subtitle: 'Поменяйте несколько настроек и увидите примерную выгоду в месяц.',
    employees: 'Сотрудники, занятые ручным учётом', hours: 'Часов в неделю на ручную работу (на каждого)',
    lost: 'Потерянных клиентов / заказов в месяц', avg: 'Средняя стоимость заказа (сум)',
    hoursSaved: 'Экономия времени в месяц', perMonth: 'часов / мес', recovered: 'Возвращённый доход в месяц', sum: 'сум / мес',
    note: 'Это примерный расчёт — точные цифры дадим на бесплатном аудите.', cta: 'Получить бесплатный аудит',
  },
  en: {
    eyebrow: 'ROI calculator', title: 'How much will automation', accent: 'save you?',
    subtitle: 'Change a few settings and see your estimated monthly benefit.',
    employees: 'Staff doing manual data work', hours: 'Hours/week of manual work (per person)',
    lost: 'Lost clients / orders per month', avg: 'Average order value (UZS)',
    hoursSaved: 'Time saved per month', perMonth: 'hours / mo', recovered: 'Revenue recovered per month', sum: 'UZS / mo',
    note: 'This is an estimate — we give exact figures in the free audit.', cta: 'Get a free audit',
  },
};

@Component({
  selector: 'app-roi',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, SectionHeading],
  template: `
    <section id="roi" class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-5xl">
        <app-section-heading [eyebrow]="c().eyebrow" icon="gauge" [title]="c().title" [accent]="c().accent" [subtitle]="c().subtitle" />

        <div class="glass-strong rainbow-edge mt-12 grid gap-8 rounded-3xl p-7 md:grid-cols-2 md:p-10">
          <div class="grid content-center gap-6">
            @for (f of fields(); track f.key) {
              <label class="block">
                <span class="flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {{ f.label }}<span class="font-display font-black text-cyan-600 dark:text-cyan-400">{{ f.display }}</span>
                </span>
                <input type="range" [min]="f.min" [max]="f.max" [step]="f.step" [value]="f.value"
                       (input)="f.set(+asValue($event))" class="mt-2 w-full accent-cyan-500" />
              </label>
            }
          </div>

          <div class="grid content-center gap-4">
            <div class="rounded-2xl bg-cyan-500/10 p-5">
              <div class="flex items-center gap-2 text-cyan-700 dark:text-cyan-300"><app-icon name="clock" [size]="18" /><span class="text-sm font-semibold">{{ c().hoursSaved }}</span></div>
              <p class="mt-2 font-display text-4xl font-black text-slate-900 dark:text-white">{{ format(hoursSaved()) }}</p>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400">{{ c().perMonth }}</p>
            </div>
            <div class="rounded-2xl bg-emerald-500/10 p-5">
              <div class="flex items-center gap-2 text-emerald-700 dark:text-emerald-300"><app-icon name="trendingUp" [size]="18" /><span class="text-sm font-semibold">{{ c().recovered }}</span></div>
              <p class="mt-2 font-display text-4xl font-black text-slate-900 dark:text-white">{{ format(recovered()) }}</p>
              <p class="text-xs font-medium text-slate-500 dark:text-slate-400">{{ c().sum }}</p>
            </div>
            <p class="text-xs text-slate-400">{{ c().note }}</p>
            <a [routerLink]="i18n.localizedPath()" fragment="contact"
               class="sheen inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.04]">
              {{ c().cta }}<app-icon name="arrowRight" [size]="18" />
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Roi {
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);

  private readonly employees = signal(5);
  private readonly hoursWeek = signal(8);
  private readonly lostOrders = signal(15);
  private readonly avgValue = signal(300000);

  protected readonly hoursSaved = computed(() => Math.round(this.employees() * this.hoursWeek() * 4.3 * 0.7));
  protected readonly recovered = computed(() => Math.round(this.lostOrders() * 0.5 * this.avgValue()));

  protected readonly fields = computed(() => {
    const t = this.c();
    return [
      { key: 'emp', label: t.employees, min: 1, max: 50, step: 1, value: this.employees(), display: `${this.employees()}`, set: (v: number) => this.employees.set(v) },
      { key: 'hrs', label: t.hours, min: 1, max: 30, step: 1, value: this.hoursWeek(), display: `${this.hoursWeek()}`, set: (v: number) => this.hoursWeek.set(v) },
      { key: 'lost', label: t.lost, min: 0, max: 200, step: 5, value: this.lostOrders(), display: `${this.lostOrders()}`, set: (v: number) => this.lostOrders.set(v) },
      { key: 'avg', label: t.avg, min: 50000, max: 3000000, step: 50000, value: this.avgValue(), display: this.format(this.avgValue()), set: (v: number) => this.avgValue.set(v) },
    ];
  });

  protected format(n: number): string {
    return n.toLocaleString('en-US').replace(/,/g, ' ');
  }

  protected asValue(e: Event): string {
    return (e.target as HTMLInputElement).value;
  }
}
