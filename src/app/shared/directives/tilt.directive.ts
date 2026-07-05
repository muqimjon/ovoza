import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

@Directive({ selector: '[appTilt]' })
export class TiltDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const node = this.el.nativeElement;
      node.style.transition = 'transform 0.25s ease-out';
      let raf = 0;

      const onMove = (e: MouseEvent) => {
        const r = node.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          node.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
        });
      };
      const onLeave = () => {
        cancelAnimationFrame(raf);
        node.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
      };

      node.addEventListener('mousemove', onMove);
      node.addEventListener('mouseleave', onLeave);
      this.destroyRef.onDestroy(() => {
        node.removeEventListener('mousemove', onMove);
        node.removeEventListener('mouseleave', onLeave);
        cancelAnimationFrame(raf);
      });
    });
  }
}
