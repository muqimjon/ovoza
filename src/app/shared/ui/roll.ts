import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';

@Component({
  selector: 'app-roll',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="roll">
      <span class="roll-cur" [class.a]="phase() === 1" [class.b]="phase() === 2">{{ text() }}</span>
      @if (prev()) {
        <span class="roll-prev" aria-hidden="true">{{ prev() }}</span>
      }
    </span>
  `,
  styles: [`
    .roll { position: relative; display: inline-flex; overflow: hidden; vertical-align: bottom; line-height: 1.15; }
    .roll-cur { display: inline-block; }
    .roll-cur.a, .roll-cur.b { animation: roll-in 1.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
    .roll-prev { position: absolute; left: 0; top: 0; animation: roll-out 1.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
    @keyframes roll-in { from { transform: translateY(85%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes roll-out { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-85%); opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .roll-cur.a, .roll-cur.b { animation: none; }
      .roll-prev { display: none; }
    }
  `],
})
export class Roll {
  readonly text = input.required<string>();
  protected readonly phase = signal(0);
  protected readonly prev = signal('');
  private current: string | null = null;
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      const t = this.text();
      if (this.current === null) {
        this.current = t;
        return;
      }
      if (t === this.current) return;
      this.prev.set(this.current);
      this.current = t;
      this.phase.update((p) => (p === 1 ? 2 : 1));
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => this.prev.set(''), 1650);
    });
  }
}
