import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';
import { Icon } from '../../../../shared/ui/icon';
import { Roll } from '../../../../shared/ui/roll';

const CONTENT: Record<Locale, {
  badge: string; title: string; accent: string; subtitle: string;
  ctaPrimary: string; ctaSecondary: string; oneTime: string;
  stats: { n: number; suffix: string; label: string }[];
  panel: { app: string; live: string; revenue: string; orders: string; clients: string; weekly: string; target: string };
}> = {
  uz: {
    badge: "Biznes avtomatlashtirish • Farg'ona",
    title: 'Biznes jarayonlaringizni',
    accent: 'avtomatlashtiramiz',
    subtitle:
      "Excel, Telegram va daftardagi tarqoq ishlarni — biznesingizga 100% moslashtirilgan yagona CRM, ombor va analitika tizimiga aylantiramiz.",
    ctaPrimary: 'Bepul audit oling',
    ctaSecondary: "Loyihalarni ko'rish",
    oneTime: "Bir martalik to'lov — oylik obuna yo'q",
    stats: [
      { n: 14, suffix: '+', label: 'yillik tajriba' },
      { n: 46, suffix: '', label: "filialli mijoz tarmogʻi" },
      { n: 100, suffix: '%', label: 'sizga moslashtirilgan' },
    ],
    panel: { app: 'Ovoza CRM', live: 'Jonli', revenue: 'Tushum', orders: 'Buyurtma', clients: 'Mijoz', weekly: 'Haftalik savdo', target: 'KPI bajarildi' },
  },
  ru: {
    badge: 'Автоматизация бизнеса • Фергана',
    title: 'Автоматизируем ваши',
    accent: 'бизнес-процессы',
    subtitle:
      'Превращаем хаос из Excel, Telegram и тетрадей в единую CRM, складскую и аналитическую систему, построенную на 100% под ваш бизнес.',
    ctaPrimary: 'Получить бесплатный аудит',
    ctaSecondary: 'Наши проекты',
    oneTime: 'Разовая оплата — без ежемесячной подписки',
    stats: [
      { n: 14, suffix: '+', label: 'лет опыта' },
      { n: 46, suffix: '', label: 'филиалов в сети клиента' },
      { n: 100, suffix: '%', label: 'под ваш бизнес' },
    ],
    panel: { app: 'Ovoza CRM', live: 'Онлайн', revenue: 'Выручка', orders: 'Заказы', clients: 'Клиенты', weekly: 'Продажи за неделю', target: 'KPI выполнен' },
  },
  en: {
    badge: 'Business automation • Fergana',
    title: 'We automate your',
    accent: 'business processes',
    subtitle:
      'We turn the chaos of Excel, Telegram and paper books into a single CRM, inventory and analytics system built 100% around your business.',
    ctaPrimary: 'Get a free audit',
    ctaSecondary: 'View our work',
    oneTime: 'One-time payment — no monthly subscription',
    stats: [
      { n: 14, suffix: '+', label: 'years of experience' },
      { n: 46, suffix: '', label: 'branches in a client network' },
      { n: 100, suffix: '%', label: 'tailored to you' },
    ],
    panel: { app: 'Ovoza CRM', live: 'Live', revenue: 'Revenue', orders: 'Orders', clients: 'Clients', weekly: 'Weekly sales', target: 'KPI reached' },
  },
};

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CountUpDirective, Icon, Roll],
  template: `
    <section class="relative overflow-hidden px-6 pb-16 pt-28 sm:pt-32 md:pt-40">
      <div class="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-cyan-400/15 blur-[110px] dark:bg-cyan-500/15"></div>
      <div class="pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full bg-indigo-400/15 blur-[120px] dark:bg-indigo-500/15"></div>

      <div class="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div class="text-center lg:text-left">
          <span class="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
            <app-icon name="sparkles" [size]="13" />{{ c().badge }}
          </span>

          <h1 class="mt-6 font-display text-[clamp(1.6rem,7vw,3.75rem)] font-black leading-[1.1] tracking-tight text-slate-900 [overflow-wrap:break-word] dark:text-white">
            {{ c().title }} <span class="text-gradient">{{ c().accent }}</span>
          </h1>

          <p class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg lg:mx-0">
            {{ c().subtitle }}
          </p>

          <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a [routerLink]="i18n.localizedPath()" fragment="contact"
               class="sheen inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.04]">
              {{ c().ctaPrimary }}<app-icon name="arrowRight" [size]="18" />
            </a>
            <a [routerLink]="i18n.localizedPath()" fragment="cases"
               class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-7 py-3.5 font-semibold text-slate-700 transition-colors hover:border-cyan-400 hover:text-cyan-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:text-white">
              {{ c().ctaSecondary }}
            </a>
          </div>

          <p class="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <app-icon name="check" [size]="16" />{{ c().oneTime }}
          </p>

          <dl class="mt-10 grid grid-cols-3 gap-4 border-t border-slate-200 pt-6 dark:border-white/10">
            @for (s of c().stats; track s.label) {
              <div>
                <dt class="font-display text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">
                  <span [appCountUp]="s.n" [suffix]="s.suffix">{{ s.n }}{{ s.suffix }}</span>
                </dt>
                <dd class="mt-1 text-xs leading-snug text-slate-500 dark:text-slate-400">{{ s.label }}</dd>
              </div>
            }
          </dl>
        </div>

        <div class="relative lg:pl-6">
          <div class="glass-strong rainbow-edge animate-[float_7s_ease-in-out_infinite] rounded-3xl p-4 shadow-2xl sm:p-5">
            <div class="flex items-center justify-between border-b border-slate-200/70 pb-3 dark:border-white/10">
              <div class="flex items-center gap-2">
                <span class="h-3 w-3 rounded-full bg-red-400"></span>
                <span class="h-3 w-3 rounded-full bg-amber-400"></span>
                <span class="h-3 w-3 rounded-full bg-emerald-400"></span>
                <span class="ml-2 font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">{{ c().panel.app }}</span>
              </div>
              <span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>{{ c().panel.live }}
              </span>
            </div>

            <div class="mt-4 grid grid-cols-3 gap-3">
              <div class="rounded-2xl bg-cyan-500/10 p-3">
                <p class="text-[10px] font-semibold uppercase text-cyan-700 dark:text-cyan-300">{{ c().panel.revenue }}</p>
                <p class="mt-1 font-display text-lg font-black text-slate-900 dark:text-white">24M</p>
                <p class="text-[10px] font-bold text-emerald-500">▲ 18%</p>
              </div>
              <div class="rounded-2xl bg-indigo-500/10 p-3">
                <p class="text-[10px] font-semibold uppercase text-indigo-600 dark:text-indigo-300">{{ c().panel.orders }}</p>
                <p class="mt-1 font-display text-lg font-black text-slate-900 dark:text-white"><app-roll [text]="ordersText()" /></p>
                <p class="text-[10px] font-bold text-emerald-500">▲ 9%</p>
              </div>
              <div class="rounded-2xl bg-emerald-500/10 p-3">
                <p class="text-[10px] font-semibold uppercase text-emerald-600 dark:text-emerald-300">{{ c().panel.clients }}</p>
                <p class="mt-1 font-display text-lg font-black text-slate-900 dark:text-white"><app-roll [text]="clientsText()" /></p>
                <p class="text-[10px] font-bold text-emerald-500">▲ 24%</p>
              </div>
            </div>

            <div class="mt-4 rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
              <div class="flex items-center justify-between">
                <p class="text-xs font-semibold text-slate-600 dark:text-slate-300">{{ c().panel.weekly }}</p>
                <app-icon name="trendingUp" [size]="16" />
              </div>
              <div class="mt-3 flex h-24 items-end gap-2">
                @for (b of bars; track $index) {
                  <div class="hero-bar flex-1 rounded-t-md bg-gradient-to-t from-cyan-500 to-indigo-400 opacity-90"
                       [style.height.%]="b"></div>
                }
              </div>
            </div>

            <div class="mt-4 flex items-center gap-3 rounded-2xl bg-slate-900/[0.03] p-3 dark:bg-white/5">
              <svg width="44" height="44" viewBox="0 0 44 44" class="-rotate-90">
                <circle cx="22" cy="22" r="18" fill="none" stroke="currentColor" stroke-width="5" class="text-slate-200 dark:text-white/10" />
                <circle cx="22" cy="22" r="18" fill="none" stroke="url(#ring)" stroke-width="5" stroke-linecap="round" stroke-dasharray="113" [attr.stroke-dashoffset]="ringOffset()" />
                <defs><linearGradient id="ring" x1="0" y1="0" x2="44" y2="44"><stop stop-color="#06b6d4" /><stop offset="1" stop-color="#4f46e5" /></linearGradient></defs>
              </svg>
              <div>
                <p class="font-display text-lg font-black text-slate-900 dark:text-white">{{ kpi() }}%</p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">{{ c().panel.target }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-bar { transform-origin: bottom; animation: grow 1.1s cubic-bezier(0.16, 1, 0.3, 1) both, wave 7s ease-in-out infinite; }
    .hero-bar:nth-child(1) { animation-duration: 1.1s, 6.5s; animation-delay: 0s, -1s; }
    .hero-bar:nth-child(2) { animation-duration: 1.1s, 7.6s; animation-delay: 0s, -3.2s; }
    .hero-bar:nth-child(3) { animation-duration: 1.1s, 6.9s; animation-delay: 0s, -5s; }
    .hero-bar:nth-child(4) { animation-duration: 1.1s, 8.3s; animation-delay: 0s, -2s; }
    .hero-bar:nth-child(5) { animation-duration: 1.1s, 7.2s; animation-delay: 0s, -4.4s; }
    .hero-bar:nth-child(6) { animation-duration: 1.1s, 6.6s; animation-delay: 0s, -6s; }
    .hero-bar:nth-child(7) { animation-duration: 1.1s, 7.9s; animation-delay: 0s, -2.7s; }
    @keyframes grow { from { height: 0; } }
    @keyframes wave { 0%, 100% { transform: scaleY(0.9); } 50% { transform: scaleY(1.06); } }
    @media (prefers-reduced-motion: reduce) { .hero-bar { animation: none; transform: none; } }
  `],
})
export class Hero {
  private readonly destroyRef = inject(DestroyRef);
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);

  protected readonly orders = signal(312);
  protected readonly clients = signal(1280);
  protected readonly kpi = signal(80);
  protected readonly bars = [45, 62, 50, 78, 68, 92, 84];

  protected readonly ordersText = computed(() => this.orders().toString());
  protected readonly clientsText = computed(() =>
    this.clients().toLocaleString('en-US').replace(/,/g, ' '),
  );
  protected readonly ringOffset = computed(() => 113 * (1 - this.kpi() / 100));

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const id = setInterval(() => this.tick(), 4200);
      this.destroyRef.onDestroy(() => clearInterval(id));
    });
  }

  private tick(): void {
    this.orders.update((v) => v + 1 + Math.floor(Math.random() * 2));
    this.clients.update((v) => v + 1 + Math.floor(Math.random() * 2));
  }
}
