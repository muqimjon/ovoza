import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" [attr.width]="size()" [attr.height]="size()" fill="none" class="shrink-0 drop-shadow-sm" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
        <rect x="7" y="13" width="2" height="6" rx="1" fill="#fff" />
        <rect x="11" y="9" width="2" height="14" rx="1" fill="#fff" />
        <rect x="15" y="6" width="2" height="20" rx="1" fill="#fff" />
        <rect x="19" y="10" width="2" height="12" rx="1" fill="#fff" />
        <rect x="23" y="13" width="2" height="6" rx="1" fill="#fff" />
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop stop-color="#22d3ee" />
            <stop offset="0.5" stop-color="#06b6d4" />
            <stop offset="1" stop-color="#2563eb" />
          </linearGradient>
        </defs>
      </svg>
      @if (showWord()) {
        <span class="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">Ovoza</span>
      }
    </span>
  `,
})
export class Logo {
  readonly size = input(32);
  readonly showWord = input(true);
}
