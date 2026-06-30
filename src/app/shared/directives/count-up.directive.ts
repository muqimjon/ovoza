import { afterNextRender, Directive, ElementRef, inject, input } from '@angular/core';

@Directive({ selector: '[appCountUp]' })
export class CountUpDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly value = input.required<number>({ alias: 'appCountUp' });
  readonly suffix = input('');
  readonly prefix = input('');
  readonly duration = input(1700);

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.animate(node);
              io.disconnect();
            }
          }
        },
        { threshold: 0.5 },
      );
      io.observe(node);
    });
  }

  private animate(node: HTMLElement): void {
    const target = this.value();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = this.format(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / this.duration());
      const eased = 1 - Math.pow(1 - p, 3);
      node.textContent = this.format(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  private format(n: number): string {
    return `${this.prefix()}${n.toLocaleString('en-US').replace(/,/g, ' ')}${this.suffix()}`;
  }
}
