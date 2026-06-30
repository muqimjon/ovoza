import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <main class="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p class="text-7xl font-black text-cyan-500">404</p>
      <a [routerLink]="i18n.localizedPath()" class="mt-8 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-white">
        {{ i18n.locale() === 'ru' ? 'На главную' : i18n.locale() === 'en' ? 'Back home' : 'Bosh sahifaga' }}
      </a>
    </main>
  `,
})
export class NotFound {
  protected readonly i18n = inject(I18nService);
}
