import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';

interface Cell {
  i: number;
  ch: string;
  prev: string | null;
  phase: number;
}

@Component({
  selector: 'app-roll',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="roll">
      @for (cell of cells(); track cell.i) {
        <span class="roll-col">
          <span class="roll-cur" [class.a]="cell.phase === 1" [class.b]="cell.phase === 2">{{ cell.ch }}</span>
          @if (cell.prev !== null) {
            <span class="roll-prev" aria-hidden="true">{{ cell.prev }}</span>
          }
        </span>
      }
    </span>
  `,
  styles: [`
    .roll { display: inline-flex; font-variant-numeric: tabular-nums; }
    .roll-col { position: relative; display: inline-block; overflow: hidden; line-height: 1.15; }
    .roll-cur { display: inline-block; }
    .roll-cur.a { animation: roll-in-a 1.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
    .roll-cur.b { animation: roll-in-b 1.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
    .roll-prev { position: absolute; left: 0; top: 0; animation: roll-out 1.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
    @keyframes roll-in-a { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes roll-in-b { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    @keyframes roll-out { from { transform: translateY(0); opacity: 1; } to { transform: translateY(-100%); opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .roll-cur.a, .roll-cur.b { animation: none; }
      .roll-prev { display: none; }
    }
  `],
})
export class Roll {
  readonly text = input.required<string>();
  protected readonly cells = signal<Cell[]>([]);
  private mirror: Cell[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    effect(() => {
      const chars = Array.from(this.text());
      const prevCells = this.mirror;
      if (prevCells.length === 0) {
        const init = chars.map((ch, i) => ({ i, ch, prev: null, phase: 0 }));
        this.mirror = init;
        this.cells.set(init);
        return;
      }
      let changed = false;
      const next: Cell[] = chars.map((ch, i) => {
        const old = prevCells[i];
        if (old && old.ch === ch) return { i, ch, prev: null, phase: old.phase };
        changed = true;
        return { i, ch, prev: old ? old.ch : null, phase: old && old.phase === 1 ? 2 : 1 };
      });
      this.mirror = next;
      this.cells.set(next);
      if (changed) {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(
          () => this.cells.update((cs) => cs.map((c) => (c.prev === null ? c : { ...c, prev: null }))),
          1650,
        );
      }
    });
  }
}
