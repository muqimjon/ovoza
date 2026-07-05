import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { TiltDirective } from '../../../../shared/directives/tilt.directive';
import { Icon } from '../../../../shared/ui/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading';

interface Service {
  icon: string;
  name: string;
  title: string;
  desc: string;
  features: string[];
}

const CONTENT: Record<Locale, { eyebrow: string; title: string; accent: string; subtitle: string; cta: string; services: Service[] }> = {
  uz: {
    eyebrow: 'Xizmatlar',
    title: 'Bitta tizim —',
    accent: 'butun biznesingiz',
    subtitle: "Har bir modul alohida sotilmaydi: ularning hammasi sizning biznesingiz uchun yagona tizimga birlashtiriladi.",
    cta: 'Shu modulni muhokama qilish',
    services: [
      { icon: 'users', name: 'CRM', title: 'Mijozlar bilan ishlash (CRM)', desc: 'Har bir qo‘ng‘iroq va ariza tizimga tushadi, hech bir mijoz unutilmaydi.', features: ['Arizalar avtomatik yig‘iladi', 'Eslatmalar va vazifalar', 'Sotuv bosqichlari (voronka)', 'To‘liq mijoz tarixi'] },
      { icon: 'box', name: 'Ombor', title: 'Ombor va qoldiqlar', desc: 'Kirim-chiqim, qoldiqlar va inventarizatsiya real vaqtda — kamomadsiz.', features: ['Real vaqtdagi qoldiqlar', 'Barkod bilan ishlash', 'Inventarizatsiya', 'Kam qolgan tovar ogohlantirishi'] },
      { icon: 'gauge', name: 'KPI', title: 'Call-markaz va xodimlar KPI', desc: 'Har bir operator nima qilayotgani va samaradorligi shaffof ko‘rinadi.', features: ['Qo‘ng‘iroqlar va konversiya', 'Operator reytingi', 'Kunlik/oylik KPI', 'Jonli dashboard'] },
      { icon: 'bot', name: 'Telegram bot', title: 'Telegram bot integratsiyasi', desc: 'Buyurtma qabul qilish, bildirishnomalar va mijoz bilan aloqa — avtomatik.', features: ['Buyurtma/ariza qabul qilish', 'Avtomatik bildirishnomalar', 'Ichki xodim botlari', 'Tizim bilan to‘g‘ridan-to‘g‘ri bog‘liq'] },
      { icon: 'phone', name: 'Telefoniya', title: 'Telefoniya analitikasi', desc: 'Amaldagi IP-telefoniyangizni tizimga ulaymiz: har bir qo‘ng‘iroq mijoz kartasiga bogʻlanadi va tahlilga aylanadi.', features: ['Qo‘ng‘iroqlar tarixi va statistikasi', 'Mijoz kartasiga bogʻlanish', 'Operator KPI va konversiya', 'Yo‘qolgan qo‘ng‘iroqlar nazorati'] },
      { icon: 'fileChart', name: 'Hisobotlar', title: 'Hisobotlar va dashboard', desc: 'Tushum, xarajat va foyda bir necha soniyada — Excelsiz.', features: ['Real vaqtdagi foyda', 'Maxsus hisobotlar', 'Eksport (Excel/PDF)', 'Filiallar kesimida tahlil'] },
    ],
  },
  ru: {
    eyebrow: 'Услуги',
    title: 'Одна система —',
    accent: 'весь ваш бизнес',
    subtitle: 'Модули не продаются по отдельности: все они объединяются в единую систему под ваш бизнес.',
    cta: 'Обсудить этот модуль',
    services: [
      { icon: 'users', name: 'CRM', title: 'Работа с клиентами (CRM)', desc: 'Каждый звонок и заявка попадают в систему, ни один клиент не теряется.', features: ['Заявки собираются автоматически', 'Напоминания и задачи', 'Этапы продаж (воронка)', 'Полная история клиента'] },
      { icon: 'box', name: 'Склад', title: 'Склад и остатки', desc: 'Приход-расход, остатки и инвентаризация в реальном времени — без недостач.', features: ['Остатки в реальном времени', 'Работа со штрихкодом', 'Инвентаризация', 'Оповещение о нехватке товара'] },
      { icon: 'gauge', name: 'KPI', title: 'KPI колл-центра и сотрудников', desc: 'Видно, что делает каждый оператор и какова его эффективность.', features: ['Звонки и конверсия', 'Рейтинг операторов', 'KPI за день/месяц', 'Живой дашборд'] },
      { icon: 'bot', name: 'Telegram-бот', title: 'Интеграция Telegram-ботов', desc: 'Приём заказов, уведомления и связь с клиентом — автоматически.', features: ['Приём заказов/заявок', 'Автоуведомления', 'Внутренние боты для сотрудников', 'Прямая связь с системой'] },
      { icon: 'phone', name: 'Телефония', title: 'Аналитика телефонии', desc: 'Подключаем вашу действующую IP-телефонию к системе: каждый звонок привязывается к карточке клиента и превращается в аналитику.', features: ['История и статистика звонков', 'Привязка к карточке клиента', 'KPI операторов и конверсия', 'Контроль пропущенных'] },
      { icon: 'fileChart', name: 'Отчёты', title: 'Отчёты и дашборд', desc: 'Выручка, расходы и прибыль за секунды — без Excel.', features: ['Прибыль в реальном времени', 'Кастомные отчёты', 'Экспорт (Excel/PDF)', 'Аналитика по филиалам'] },
    ],
  },
  en: {
    eyebrow: 'Services',
    title: 'One system —',
    accent: 'your whole business',
    subtitle: 'Modules are not sold separately: they all combine into a single system built around your business.',
    cta: 'Discuss this module',
    services: [
      { icon: 'users', name: 'CRM', title: 'Customer management (CRM)', desc: 'Every call and request enters the system — no client is forgotten.', features: ['Requests captured automatically', 'Reminders and tasks', 'Sales stages (pipeline)', 'Full client history'] },
      { icon: 'box', name: 'Inventory', title: 'Inventory & stock', desc: 'Stock in/out, balances and stocktaking in real time — no shortages.', features: ['Real-time stock', 'Barcode support', 'Stocktaking', 'Low-stock alerts'] },
      { icon: 'gauge', name: 'KPI', title: 'Call-center & staff KPI', desc: 'See what every operator does and how effective they are.', features: ['Calls and conversion', 'Operator ranking', 'Daily/monthly KPI', 'Live dashboard'] },
      { icon: 'bot', name: 'Telegram bot', title: 'Telegram bot integration', desc: 'Order intake, notifications and client contact — automated.', features: ['Order/request intake', 'Automatic notifications', 'Internal staff bots', 'Directly tied to the system'] },
      { icon: 'phone', name: 'Telephony', title: 'Telephony analytics', desc: 'We connect your existing IP telephony to the system: every call links to the client card and turns into analytics.', features: ['Call history & statistics', 'Linked to client card', 'Operator KPI & conversion', 'Missed-call control'] },
      { icon: 'fileChart', name: 'Reports', title: 'Reports & dashboard', desc: 'Revenue, expenses and profit in seconds — without Excel.', features: ['Real-time profit', 'Custom reports', 'Export (Excel/PDF)', 'Per-branch analytics'] },
    ],
  },
};

@Component({
  selector: 'app-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, SectionHeading, RevealDirective, TiltDirective],
  template: `
    <section id="services" class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <app-section-heading [eyebrow]="c().eyebrow" icon="layers" [title]="c().title" [accent]="c().accent" [subtitle]="c().subtitle" />

        <div class="mt-12" appReveal>
          <div class="flex flex-wrap justify-center gap-2">
            @for (s of c().services; track s.name; let i = $index) {
              <button
                type="button"
                (click)="active.set(i)"
                [attr.aria-pressed]="active() === i"
                class="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                [class]="active() === i
                  ? 'bg-brand-gradient text-white shadow-[var(--shadow-glow)]'
                  : 'glass text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'"
              >
                <app-icon [name]="s.icon" [size]="16" />{{ s.name }}
              </button>
            }
          </div>

          <div appTilt class="glass-strong rainbow-edge mt-8 grid gap-8 rounded-3xl p-8 md:grid-cols-2 md:p-10">
            <div>
              <div class="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <app-icon [name]="current().icon" [size]="28" />
              </div>
              <h3 class="mt-5 font-display text-2xl font-black text-slate-900 dark:text-white">{{ current().title }}</h3>
              <p class="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">{{ current().desc }}</p>
              <a [routerLink]="i18n.localizedPath()" fragment="contact"
                 class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:gap-2.5 dark:text-cyan-400">
                {{ c().cta }}<app-icon name="arrowRight" [size]="16" />
              </a>
            </div>
            <ul class="grid content-center gap-3">
              @for (f of current().features; track f) {
                <li class="flex items-center gap-3 rounded-xl bg-slate-900/[0.03] px-4 py-3 text-sm font-medium text-slate-700 dark:bg-white/5 dark:text-slate-200">
                  <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"><app-icon name="check" [size]="14" /></span>
                  {{ f }}
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Services {
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
  protected readonly active = signal(0);
  protected readonly current = computed(() => this.c().services[this.active()]);
}
