import { afterNextRender, Directive, ElementRef, inject } from '@angular/core';

@Directive({ selector: '[appStagger]' })
export class StaggerDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      (Array.from(node.children) as HTMLElement[]).forEach((k, i) =>
        k.style.setProperty('--stg-i', String(i)),
      );
      node.setAttribute('data-stagger', '');
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              node.classList.add('stg-in');
              io.disconnect();
            }
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
      );
      io.observe(node);
    });
  }
}
