import { afterNextRender, Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class RevealDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly delay = input(0, {
    alias: 'appReveal',
    transform: (v: number | string) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    },
  });

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      const delay = Number(this.delay()) || 0;
      if (delay) node.style.transitionDelay = `${delay}ms`;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              node.classList.add('is-visible');
              io.disconnect();
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
      );
      io.observe(node);
    });
  }
}
