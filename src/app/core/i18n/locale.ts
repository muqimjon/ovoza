export type Locale = 'uz' | 'ru' | 'en';

export const LOCALES: Locale[] = ['uz', 'ru', 'en'];

export const DEFAULT_LOCALE: Locale = 'uz';

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  uz: 'uz',
  ru: 'ru',
  en: 'en',
};

export const LOCALE_OG: Record<Locale, string> = {
  uz: 'uz_UZ',
  ru: 'ru_RU',
  en: 'en_US',
};

export function isLocale(value: unknown): value is Locale {
  return value === 'uz' || value === 'ru' || value === 'en';
}
