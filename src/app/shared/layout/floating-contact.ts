import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../../core/site';

@Component({
  selector: 'app-floating-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [href]="site.telegram"
      target="_blank"
      rel="noopener"
      aria-label="Telegram"
      class="group fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-brand-gradient text-white shadow-[0_12px_36px_-8px_rgba(6,182,212,0.7)] transition-transform hover:scale-110"
    >
      <span class="absolute inset-0 -z-10 animate-ping rounded-full bg-cyan-400/40 [animation-duration:2.6s]"></span>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M21.9 4.3 18.6 19.8c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-4.9 9-8.1c.4-.3-.1-.5-.6-.2L6.1 13.6 1.3 12c-1-.3-1-1 .2-1.5l19-7.3c.9-.3 1.6.2 1.4 1.1z" /></svg>
    </a>
  `,
})
export class FloatingContact {
  protected readonly site = SITE;
}
