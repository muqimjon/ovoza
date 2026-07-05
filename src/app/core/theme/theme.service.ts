import { afterNextRender, DOCUMENT, inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly theme = signal<'light' | 'dark'>('light');

  constructor() {
    afterNextRender(() => {
      this.theme.set(this.doc.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
  }

  toggle(): void {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    const el = this.doc.documentElement;
    el.classList.toggle('dark', next === 'dark');
    el.style.colorScheme = next === 'dark' ? 'dark' : 'light';
    el.style.backgroundColor = next === 'dark' ? '#080a0f' : '#f7f9fc';
    try {
      localStorage.setItem('ovoza-theme', next);
    } catch {}
  }
}
