import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Icon } from './icon';

@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <div [class]="align() === 'left' ? 'max-w-2xl' : 'mx-auto max-w-2xl text-center'">
      @if (eyebrow()) {
        <span
          class="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300"
        >
          <app-icon [name]="icon()" [size]="13" />
          {{ eyebrow() }}
        </span>
      }
      <h2 class="mt-4 font-display text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {{ title() }}
        @if (accent()) {
          <span class="text-gradient">{{ accent() }}</span>
        }
      </h2>
      @if (subtitle()) {
        <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">{{ subtitle() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly eyebrow = input('');
  readonly icon = input('sparkles');
  readonly title = input('');
  readonly accent = input('');
  readonly subtitle = input('');
  readonly align = input<'center' | 'left'>('center');
}
