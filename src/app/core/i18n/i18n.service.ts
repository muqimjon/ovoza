import { Injectable, signal, computed } from '@angular/core';
import { Locale, DEFAULT_LOCALE, isLocale } from './locale';
import { translations } from './translations';

@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly locale = signal<Locale>(DEFAULT_LOCALE);
  readonly t = computed(() => translations[this.locale()]);

  setLocale(value: unknown): void {
    this.locale.set(isLocale(value) ? value : DEFAULT_LOCALE);
  }

  prefix(locale: Locale = this.locale()): string {
    return locale === 'uz' ? '' : `/${locale}`;
  }

  localizedPath(path = '', locale: Locale = this.locale()): string {
    const clean = path.replace(/^\/+/, '');
    const prefix = this.prefix(locale);
    if (!clean) return prefix || '/';
    return `${prefix}/${clean}`;
  }

  barePath(url: string): string {
    const path = url.split('#')[0].split('?')[0];
    return path.replace(/^\/(ru|en)(?=\/|$)/, '').replace(/^\/+/, '');
  }

  switchPath(url: string, target: Locale): string {
    return this.localizedPath(this.barePath(url), target);
  }
}
