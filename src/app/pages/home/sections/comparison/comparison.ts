import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { Icon } from '../../../../shared/ui/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading';

interface Row {
  feature: string;
  ready: string;
  ovoza: string;
}

const CONTENT: Record<Locale, { eyebrow: string; title: string; accent: string; subtitle: string; readyHead: string; ovozaHead: string; rows: Row[] }> = {
  uz: {
    eyebrow: 'Taqqoslash',
    title: 'Tayyor obuna yoki',
    accent: 'siz uchun tizim?',
    subtitle: "Billz, MoySklad yoki Hippo kabi tayyor tizimlar bilan Ovoza yechimlari o‘rtasidagi farqni ko‘ring.",
    readyHead: 'Tayyor SaaS (Billz, MoySklad…)',
    ovozaHead: 'Ovoza (siz uchun maxsus)',
    rows: [
      { feature: 'Biznesga moslashuvchanlik', ready: 'Siz ularning andozasiga moslashasiz, muhim funksiyalar cheklangan.', ovoza: 'Tizim 100% sizning jarayonlaringizga quriladi. Cheklov yo‘q.' },
      { feature: 'Integratsiyalar', ready: 'Faqat ruxsat berilgan integratsiyalar. Ichki bot yoki telefoniya — qiyin.', ovoza: 'Istalgan Telegram bot, IP-telefoniya yoki buxgalteriya bilan bog‘lanadi.' },
      { feature: 'To‘lov modeli', ready: 'Xodim va filial soniga qarab cheksiz oylik obuna.', ovoza: 'Bir martalik to‘lov. Majburiy oylik litsenziya yo‘q.' },
      { feature: 'Yangi funksiya qo‘shish', ready: 'Juda qiyin — minglab mijoz so‘ramaguncha qo‘shilmaydi.', ovoza: 'Tez va oson — yangi hisobot yoki modulni istalgan vaqtda qo‘shamiz.' },
      { feature: 'Texnik yordam', ready: 'Navbat va andozaviy chat-botlar orqali javob.', ovoza: 'Sizni shaxsan biladigan dasturchi bilan to‘g‘ridan-to‘g‘ri aloqa.' },
    ],
  },
  ru: {
    eyebrow: 'Сравнение',
    title: 'Готовая подписка или',
    accent: 'система под вас?',
    subtitle: 'Сравните готовые платформы (Billz, МойСклад, Hippo) и индивидуальные решения Ovoza.',
    readyHead: 'Готовые SaaS (Billz, МойСклад…)',
    ovozaHead: 'Ovoza (индивидуально под вас)',
    rows: [
      { feature: 'Гибкость под бизнес', ready: 'Вы подстраиваетесь под их шаблон, важные функции ограничены.', ovoza: 'Система строится на 100% под ваши процессы. Без ограничений.' },
      { feature: 'Интеграции', ready: 'Только разрешённые интеграции. Внутренние боты или телефония — сложно.', ovoza: 'Подключается к любым Telegram-ботам, IP-телефонии и бухгалтерии.' },
      { feature: 'Модель оплаты', ready: 'Бесконечная подписка, растущая с числом сотрудников и филиалов.', ovoza: 'Разовая оплата. Никаких обязательных ежемесячных лицензий.' },
      { feature: 'Добавление функций', ready: 'Очень сложно — не добавят, пока не попросят тысячи клиентов.', ovoza: 'Быстро и просто — новый отчёт или модуль добавим в любой момент.' },
      { feature: 'Техподдержка', ready: 'Ответы через очередь и шаблонных чат-ботов.', ovoza: 'Прямая связь с разработчиком, который лично знает ваш проект.' },
    ],
  },
  en: {
    eyebrow: 'Comparison',
    title: 'Ready subscription or',
    accent: 'a system for you?',
    subtitle: 'See the difference between ready-made platforms (Billz, MoySklad, Hippo) and Ovoza’s custom solutions.',
    readyHead: 'Ready SaaS (Billz, MoySklad…)',
    ovozaHead: 'Ovoza (custom for you)',
    rows: [
      { feature: 'Fit to your business', ready: 'You adapt to their template; key features are limited.', ovoza: 'Built 100% around your processes. No limits.' },
      { feature: 'Integrations', ready: 'Only permitted integrations. Internal bots or telephony are hard.', ovoza: 'Connects to any Telegram bot, IP telephony or accounting.' },
      { feature: 'Pricing model', ready: 'Endless monthly subscription that grows with staff and branches.', ovoza: 'One-time payment. No mandatory monthly licenses.' },
      { feature: 'Adding features', ready: 'Very hard — added only when thousands of clients ask.', ovoza: 'Fast and easy — we add a new report or module any time.' },
      { feature: 'Support', ready: 'Answers via queues and templated chatbots.', ovoza: 'Direct line to the developer who personally knows your project.' },
    ],
  },
};

@Component({
  selector: 'app-comparison',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, SectionHeading, RevealDirective],
  template: `
    <section id="comparison" class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <app-section-heading [eyebrow]="c().eyebrow" icon="layers" [title]="c().title" [accent]="c().accent" [subtitle]="c().subtitle" />

        <div class="glass-strong rainbow-edge mt-12 overflow-hidden rounded-3xl" appReveal>
          <div class="hidden grid-cols-12 gap-4 border-b border-slate-200/70 bg-slate-900/[0.03] px-6 py-4 text-sm font-bold dark:border-white/10 dark:bg-white/5 md:grid">
            <div class="col-span-4 text-slate-500 dark:text-slate-400">{{ c().eyebrow }}</div>
            <div class="col-span-4 flex items-center gap-2 text-slate-500 dark:text-slate-400"><span class="h-2.5 w-2.5 rounded-full bg-red-400"></span>{{ c().readyHead }}</div>
            <div class="col-span-4 flex items-center gap-2 text-cyan-600 dark:text-cyan-400"><span class="h-2.5 w-2.5 rounded-full bg-cyan-400"></span>{{ c().ovozaHead }}</div>
          </div>

          @for (row of c().rows; track row.feature) {
            <div class="grid gap-4 border-b border-slate-200/60 px-6 py-5 transition-colors last:border-0 hover:bg-cyan-500/[0.04] dark:border-white/5 md:grid-cols-12">
              <h3 class="font-display font-bold text-slate-900 dark:text-white md:col-span-4">{{ row.feature }}</h3>
              <div class="flex items-start gap-2.5 rounded-xl bg-red-500/5 p-3 text-sm text-slate-600 dark:text-slate-400 md:col-span-4 md:bg-transparent md:p-0">
                <span class="mt-0.5 text-red-500"><app-icon name="x" [size]="17" /></span>{{ row.ready }}
              </div>
              <div class="flex items-start gap-2.5 rounded-xl bg-cyan-500/5 p-3 text-sm font-medium text-slate-800 dark:text-slate-200 md:col-span-4 md:bg-transparent md:p-0">
                <span class="mt-0.5 text-cyan-600 dark:text-cyan-400"><app-icon name="check" [size]="17" /></span>{{ row.ovoza }}
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Comparison {
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
}
