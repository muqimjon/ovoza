import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { SectionHeading } from '../../../../shared/ui/section-heading';
import { Icon } from '../../../../shared/ui/icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { TiltDirective } from '../../../../shared/directives/tilt.directive';

type Card = { sector: string; location: string; icon: string };

type Copy = {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  soon: string;
  pending: string;
  note: string;
  cards: Card[];
};

const CONTENT: Record<Locale, Copy> = {
  uz: {
    eyebrow: 'Mijozlar fikri',
    title: 'Mijozlarimiz',
    accent: 'nima deydi',
    subtitle: 'Real loyiha rahbarlaridan rasmiy fikrlarni hozir yigʻyapmiz — tez orada aynan shu yerda chiqadi.',
    soon: 'Tez orada',
    pending: 'Ushbu yoʻnalishdagi mijozimizning rasmiy fikri tayyorlanmoqda.',
    note: 'Fikrlar mijozlarning yozma roziligi bilan eʼlon qilinadi.',
    cards: [
      { sector: 'Poyabzal fabrikasi', location: 'Fargʻona', icon: 'building' },
      { sector: 'Mikromoliya tarmogʻi', location: 'Oʻzbekiston', icon: 'landmark' },
      { sector: 'Kabel ishlab chiqarish', location: 'Fargʻona', icon: 'building' },
    ],
  },
  ru: {
    eyebrow: 'Отзывы',
    title: 'Что говорят',
    accent: 'клиенты',
    subtitle: 'Сейчас мы собираем официальные отзывы руководителей реальных проектов — скоро они появятся здесь.',
    soon: 'Скоро',
    pending: 'Официальный отзыв нашего клиента в этой сфере готовится.',
    note: 'Отзывы публикуются с письменного согласия клиентов.',
    cards: [
      { sector: 'Обувная фабрика', location: 'Фергана', icon: 'building' },
      { sector: 'Сеть микрофинансирования', location: 'Узбекистан', icon: 'landmark' },
      { sector: 'Производство кабеля', location: 'Фергана', icon: 'building' },
    ],
  },
  en: {
    eyebrow: 'Testimonials',
    title: 'What our',
    accent: 'clients say',
    subtitle: 'We are collecting official testimonials from real project leaders — they will appear here soon.',
    soon: 'Coming soon',
    pending: 'An official testimonial from our client in this sector is on the way.',
    note: 'Testimonials are published with the clients’ written consent.',
    cards: [
      { sector: 'Footwear factory', location: 'Fergana', icon: 'building' },
      { sector: 'Microfinance network', location: 'Uzbekistan', icon: 'landmark' },
      { sector: 'Cable manufacturing', location: 'Fergana', icon: 'building' },
    ],
  },
};

@Component({
  selector: 'app-testimonials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, Icon, RevealDirective, TiltDirective],
  template: `
    <section id="testimonials" class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <app-section-heading
          [eyebrow]="c().eyebrow"
          icon="quote"
          [title]="c().title"
          [accent]="c().accent"
          [subtitle]="c().subtitle"
        />

        <div class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          @for (item of c().cards; track item.sector; let i = $index) {
            <figure
              appReveal
              [appReveal]="i * 120"
              appTilt
              class="glass flex flex-col rounded-2xl border border-dashed border-slate-300/70 p-6 dark:border-white/10"
            >
              <div class="flex items-center justify-between">
                <div class="grid h-12 w-12 place-items-center rounded-2xl bg-slate-500/10 text-slate-400">
                  <app-icon name="quote" [size]="22" />
                </div>
                <span class="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                  <app-icon name="calendar" [size]="13" />{{ c().soon }}
                </span>
              </div>

              <blockquote class="mt-5 flex-1 text-[0.975rem] italic leading-relaxed text-slate-400 dark:text-slate-500">
                {{ c().pending }}
              </blockquote>

              <figcaption class="mt-6 flex items-center gap-3 border-t border-slate-200/60 pt-5 dark:border-white/10">
                <div class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-slate-500/10 text-slate-400">
                  <app-icon [name]="item.icon" [size]="20" />
                </div>
                <div class="min-w-0">
                  <div class="truncate font-semibold text-slate-700 dark:text-slate-200">{{ item.sector }}</div>
                  <div class="truncate text-sm text-slate-500">{{ item.location }}</div>
                </div>
              </figcaption>
            </figure>
          }
        </div>

        <p class="mt-8 text-center text-xs text-slate-500">{{ c().note }}</p>
      </div>
    </section>
  `,
})
export class Testimonials {
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
}
