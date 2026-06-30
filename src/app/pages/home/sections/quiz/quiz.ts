import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { diagnoseIndex, maxScore, QUIZ } from '../../../../core/quiz/quiz.data';
import { QuizStore } from '../../../../core/quiz/quiz.store';
import { Icon } from '../../../../shared/ui/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading';

@Component({
  selector: 'app-quiz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, SectionHeading],
  template: `
    <section id="quiz" class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-3xl">
        <app-section-heading [eyebrow]="c().eyebrow" icon="target" [title]="c().title" [accent]="c().accent" [subtitle]="c().subtitle" />

        <div class="glass-strong rainbow-edge mt-12 rounded-3xl p-6 md:p-9">
          @if (!finished()) {
            <div class="mb-6 flex items-center justify-between">
              <span class="font-mono text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                {{ c().step }} {{ step() + 1 }} / {{ c().questions.length }}
              </span>
              <div class="flex gap-1.5">
                @for (q of c().questions; track $index; let i = $index) {
                  <span class="h-1.5 rounded-full transition-all duration-300"
                        [class]="i === step() ? 'w-6 bg-cyan-500' : i < step() || selected()[i] !== undefined ? 'w-2.5 bg-indigo-400' : 'w-2.5 bg-slate-300 dark:bg-white/15'"></span>
                }
              </div>
            </div>

            <h3 class="font-display text-xl font-black text-slate-900 dark:text-white md:text-2xl">{{ current().q }}</h3>

            <div class="mt-6 grid gap-3">
              @for (opt of current().options; track opt.label; let i = $index) {
                <button type="button" (click)="choose(i)"
                  class="flex items-center justify-between rounded-2xl border p-4 text-left text-sm font-medium transition-all md:text-base"
                  [class]="selected()[step()] === i
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-800 dark:border-cyan-400 dark:text-cyan-200'
                    : 'border-slate-200 bg-slate-900/[0.02] text-slate-700 hover:border-cyan-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-200'">
                  {{ opt.label }}
                  <span class="grid h-5 w-5 shrink-0 place-items-center rounded-full border-2"
                        [class]="selected()[step()] === i ? 'border-cyan-400 bg-cyan-400 text-white' : 'border-slate-300 dark:border-slate-600'">
                    @if (selected()[step()] === i) { <app-icon name="check" [size]="11" [width]="3" /> }
                  </span>
                </button>
              }
            </div>

            <div class="mt-7 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-white/10">
              <button type="button" (click)="prev()" [disabled]="step() === 0"
                class="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 enabled:hover:text-slate-900 disabled:opacity-30 dark:text-slate-400 dark:enabled:hover:text-white">
                <app-icon name="arrowRight" [size]="15" /><span class="rotate-180">{{ c().prev }}</span>
              </button>
              <button type="button" (click)="next()" [disabled]="selected()[step()] === undefined"
                class="sheen inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-transform enabled:hover:scale-[1.04] disabled:opacity-40">
                {{ step() === c().questions.length - 1 ? c().finish : c().next }}<app-icon name="arrowRight" [size]="16" />
              </button>
            </div>
          } @else {
            <div class="text-center">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
                <app-icon name="sparkles" [size]="13" />{{ c().resultTitle }}
              </span>
              <h3 class="mt-4 font-display text-2xl font-black text-slate-900 dark:text-white md:text-3xl">{{ diagnosis().title }}</h3>

              <div class="mx-auto mt-6 max-w-md">
                <div class="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                  <span>{{ c().scoreLabel }}</span>
                  <span class="text-cyan-600 dark:text-cyan-400">{{ diagnosis().level }}</span>
                </div>
                <div class="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                  <div class="h-full rounded-full bg-brand-gradient transition-[width] duration-700" [style.width.%]="percent()"></div>
                </div>
              </div>

              <p class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">{{ diagnosis().text }}</p>

              <div class="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-2">
                <span class="w-full text-xs font-bold uppercase tracking-wider text-slate-400">{{ c().recommend }}</span>
                @for (m of diagnosis().modules; track m) {
                  <span class="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-700 dark:text-cyan-300">{{ m }}</span>
                }
              </div>

              <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a [routerLink]="i18n.localizedPath()" fragment="contact"
                   class="sheen inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.04]">
                  {{ c().cta }}<app-icon name="arrowRight" [size]="18" />
                </a>
                <button type="button" (click)="restart()" class="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                  <app-icon name="refresh" [size]="15" />{{ c().restart }}
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Quiz {
  protected readonly i18n = inject(I18nService);
  private readonly store = inject(QuizStore);
  protected readonly c = computed(() => QUIZ[this.i18n.locale()]);
  protected readonly step = signal(0);
  protected readonly selected = signal<(number | undefined)[]>([]);
  protected readonly finished = signal(false);

  protected readonly current = computed(() => this.c().questions[this.step()]);
  protected readonly score = computed(() =>
    this.selected().reduce((sum: number, opt, i) => sum + (opt === undefined ? 0 : this.c().questions[i].options[opt].weight), 0),
  );
  protected readonly percent = computed(() => Math.round((this.score() / maxScore(this.c())) * 100));
  protected readonly diagnosis = computed(() => this.c().diagnoses[diagnoseIndex(this.score())]);

  protected choose(i: number): void {
    const next = [...this.selected()];
    next[this.step()] = i;
    this.selected.set(next);
  }

  protected next(): void {
    if (this.selected()[this.step()] === undefined) return;
    if (this.step() < this.c().questions.length - 1) {
      this.step.set(this.step() + 1);
    } else {
      this.finish();
    }
  }

  protected prev(): void {
    if (this.step() > 0) this.step.set(this.step() - 1);
  }

  private finish(): void {
    const content = this.c();
    const answers = content.questions.map((q, i) => {
      const opt = this.selected()[i];
      return `${q.q} → ${opt === undefined ? '—' : q.options[opt].label}`;
    });
    this.store.set(answers, `${this.diagnosis().level} (${this.score()}/${maxScore(content)})`);
    this.finished.set(true);
  }

  protected restart(): void {
    this.step.set(0);
    this.selected.set([]);
    this.finished.set(false);
  }
}
