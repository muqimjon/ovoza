import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';
import { StaggerDirective } from '../../../../shared/directives/stagger.directive';
import { Icon } from '../../../../shared/ui/icon';

interface Stat {
  icon: string;
  n: number;
  suffix: string;
  label: string;
}

const CONTENT: Record<Locale, Stat[]> = {
  uz: [
    { icon: 'calendar', n: 14, suffix: '+', label: 'yillik amaliy tajriba' },
    { icon: 'building', n: 46, suffix: '', label: "filialli mijoz tarmogʻi ishonchi" },
    { icon: 'trendingUp', n: 3, suffix: '×', label: 'xodimlar unumdorligi' },
    { icon: 'fileChart', n: 5, suffix: '×', label: 'kamroq hujjatbozlik' },
  ],
  ru: [
    { icon: 'calendar', n: 14, suffix: '+', label: 'лет практического опыта' },
    { icon: 'building', n: 46, suffix: '', label: 'филиалов в сети клиента' },
    { icon: 'trendingUp', n: 3, suffix: '×', label: 'рост продуктивности' },
    { icon: 'fileChart', n: 5, suffix: '×', label: 'меньше бумажной работы' },
  ],
  en: [
    { icon: 'calendar', n: 14, suffix: '+', label: 'years of hands-on experience' },
    { icon: 'building', n: 46, suffix: '', label: 'branches in a client network' },
    { icon: 'trendingUp', n: 3, suffix: '×', label: 'staff productivity' },
    { icon: 'fileChart', n: 5, suffix: '×', label: 'less paperwork' },
  ],
};

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, CountUpDirective, StaggerDirective],
  template: `
    <section id="stats" class="px-6 py-10">
      <div class="glass-strong rainbow-edge mx-auto grid max-w-6xl grid-cols-2 gap-6 rounded-3xl px-6 py-10 md:grid-cols-4" appStagger>
        @for (s of c(); track s.label) {
          <div class="text-center">
            <div class="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <app-icon [name]="s.icon" [size]="22" />
            </div>
            <p class="mt-3 font-display text-3xl font-black text-slate-900 dark:text-white md:text-4xl">
              <span [appCountUp]="s.n" [suffix]="s.suffix">{{ s.n }}{{ s.suffix }}</span>
            </p>
            <p class="mt-1 text-xs leading-snug text-slate-500 dark:text-slate-400">{{ s.label }}</p>
          </div>
        }
      </div>
    </section>
  `,
})
export class Stats {
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
}
