import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="width()" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      @switch (name()) {
        @case ('check') { <path d="M20 6 9 17l-5-5" /> }
        @case ('x') { <path d="M18 6 6 18M6 6l12 12" /> }
        @case ('arrowRight') { <path d="M5 12h14M13 6l6 6-6 6" /> }
        @case ('arrowUpRight') { <path d="M7 17 17 7M8 7h9v9" /> }
        @case ('star') { <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /> }
        @case ('quote') { <path d="M7 7h4v6c0 2-1 3.5-3.5 4M15 7h4v6c0 2-1 3.5-3.5 4" /> }
        @case ('users') { <circle cx="9" cy="8" r="3.2" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M16 5.5a3 3 0 0 1 0 5.6M17 20a5.5 5.5 0 0 0-3-4.9" /> }
        @case ('box') { <path d="M21 8 12 3 3 8v8l9 5 9-5z" /><path d="M3 8l9 5 9-5M12 13v8" /> }
        @case ('gauge') { <path d="M12 14l4-4" /><path d="M4 18a8 8 0 1 1 16 0z" /> }
        @case ('bot') { <rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 8V4M8 13h.01M16 13h.01M9 17h6" /> }
        @case ('phone') { <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4z" /> }
        @case ('fileChart') { <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 16v-3M12 16v-5M15 16v-2" /> }
        @case ('sheet') { <rect x="4" y="3" width="16" height="18" rx="2" /><path d="M4 9h16M4 15h16M10 3v18" /> }
        @case ('userX') { <circle cx="9" cy="8" r="3.2" /><path d="M3.5 20a5.5 5.5 0 0 1 10 0" /><path d="M16 9l4 4M20 9l-4 4" /> }
        @case ('eyeOff') { <path d="M10.6 6.1A9 9 0 0 1 21 12a13 13 0 0 1-2.2 2.9M6.2 6.2A13 13 0 0 0 3 12a9 9 0 0 0 12.6 4.9" /><path d="M3 3l18 18M9.9 9.9a3 3 0 0 0 4.2 4.2" /> }
        @case ('clock') { <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /> }
        @case ('alert') { <path d="M12 3 2 20h20z" /><path d="M12 9v5M12 17h.01" /> }
        @case ('phoneOff') { <path d="M11 5l-1-1H7L5 6a16 16 0 0 0 3 5M14 14a16 16 0 0 0 4 2l1-1v-3l-3-1-1 1M3 3l18 18" /> }
        @case ('sliders') { <path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h7M15 18h5" /><circle cx="16" cy="6" r="2" /><circle cx="8" cy="12" r="2" /><circle cx="13" cy="18" r="2" /> }
        @case ('wallet') { <path d="M3 7a2 2 0 0 1 2-2h13v4M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-3M3 7h16" /><path d="M16 12h5v4h-5a2 2 0 0 1 0-4z" /> }
        @case ('headset') { <path d="M4 13v-1a8 8 0 0 1 16 0v1" /><path d="M4 13a2 2 0 0 1 2 2v2a2 2 0 0 1-4 0v-2a2 2 0 0 1 2-2zM20 13a2 2 0 0 1 2 2v2a2 2 0 0 1-4 0v-2a2 2 0 0 1 2-2z" /><path d="M20 17v1a3 3 0 0 1-3 3h-3" /> }
        @case ('shield') { <path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6z" /><path d="m9 12 2 2 4-4" /> }
        @case ('lock') { <rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /> }
        @case ('search') { <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /> }
        @case ('clipboard') { <rect x="8" y="3" width="8" height="4" rx="1" /><path d="M9 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3M9 13l2 2 4-4" /> }
        @case ('code') { <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /> }
        @case ('rocket') { <path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5a2 2 0 0 0-2.5-2.5z" /><path d="M9 13a14 14 0 0 1 8-9c2 0 3 1 3 3a14 14 0 0 1-9 8z" /><path d="M9 13l2 2" /> }
        @case ('building') { <rect x="5" y="3" width="14" height="18" rx="1" /><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01M10 21v-3h4v3" /> }
        @case ('landmark') { <path d="M3 21h18M5 21V10M19 21V10M9 21v-7M15 21v-7M12 3 4 8h16z" /> }
        @case ('calendar') { <rect x="4" y="5" width="16" height="16" rx="2" /><path d="M16 3v4M8 3v4M4 10h16" /> }
        @case ('layers') { <path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /> }
        @case ('server') { <rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /> }
        @case ('smartphone') { <rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /> }
        @case ('send') { <path d="M21.9 4.3 18.6 19.8c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3-.6-4.6 9-8.1c.4-.3-.1-.6-.6-.3L6.1 13.6 1.7 12c-1-.3-1-1 .2-1.4z" /> }
        @case ('mail') { <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /> }
        @case ('mapPin') { <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /> }
        @case ('zap') { <path d="M13 3 4 14h7l-1 7 9-11h-7z" /> }
        @case ('trendingUp') { <path d="M3 17l6-6 4 4 7-7M14 8h6v6" /> }
        @case ('target') { <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" /> }
        @case ('chart') { <path d="M4 4v16h16" /><path d="M8 16v-4M12 16V8M16 16v-6" /> }
        @case ('refresh') { <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" /> }
        @case ('plug') { <path d="M9 2v6M15 2v6M7 8h10v3a5 5 0 0 1-10 0zM12 16v6" /> }
        @default { <path d="M12 3l1.8 4.7L18 9.5l-4.2 1.8L12 16l-1.8-4.7L6 9.5l4.2-1.8z" /> }
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input(24);
  readonly width = input(1.8);
}
