import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { Icon } from '../../../../shared/ui/icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

type Client = { name: string; industry: string; icon: string };

const CONTENT: Record<Locale, { eyebrow: string; stat: string; clients: Client[] }> = {
  uz: {
    eyebrow: 'Bizga ishonch bildirgan korxonalar',
    stat: '46 filialli tarmoq bizga ishonadi',
    clients: [
      { name: 'Bekson Shoes', industry: 'Oyoq kiyim ishlab chiqarish zavodi', icon: 'building' },
      { name: 'AL-MANSUR', industry: 'Kabel ishlab chiqarish zavodi', icon: 'building' },
      { name: 'HAMROH', industry: 'Mikromoliya — 46 filial', icon: 'landmark' },
    ],
  },
  ru: {
    eyebrow: 'Нам доверяют',
    stat: 'Нам доверяет сеть из 46 филиалов',
    clients: [
      { name: 'Bekson Shoes', industry: 'Завод по производству обуви', icon: 'building' },
      { name: 'AL-MANSUR', industry: 'Кабельный завод', icon: 'building' },
      { name: 'HAMROH', industry: 'Микрофинансы — 46 филиалов', icon: 'landmark' },
    ],
  },
  en: {
    eyebrow: 'Trusted by',
    stat: 'Trusted by a 46-branch network',
    clients: [
      { name: 'Bekson Shoes', industry: 'Footwear manufacturing factory', icon: 'building' },
      { name: 'AL-MANSUR', industry: 'Cable manufacturing factory', icon: 'building' },
      { name: 'HAMROH', industry: 'Microfinance — 46 branches', icon: 'landmark' },
    ],
  },
};

@Component({
  selector: 'app-trust-strip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RevealDirective],
  template: `
    <section id="clients" class="px-6 py-12">
      <div class="mx-auto max-w-6xl">
        <div class="mb-7 flex flex-col items-center gap-4 text-center">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {{ c().eyebrow }}
          </p>
          <span
            class="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-1.5 text-sm font-semibold text-cyan-700 dark:text-cyan-300"
          >
            <app-icon name="trendingUp" [size]="16" />
            {{ c().stat }}
          </span>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (client of c().clients; track client.name) {
            <div
              [appReveal]="120"
              class="glass rounded-xl flex items-center gap-4 p-4"
            >
              <div
                class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
              >
                <app-icon [name]="client.icon" [size]="22" />
              </div>
              <div class="min-w-0">
                <p class="truncate font-semibold text-slate-900 dark:text-white">{{ client.name }}</p>
                <p class="truncate text-sm text-slate-600 dark:text-slate-400">{{ client.industry }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class TrustStrip {
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
}
