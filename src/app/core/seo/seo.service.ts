import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Locale, LOCALES, LOCALE_OG } from '../i18n/locale';
import { SITE } from '../site';

export interface SeoInput {
  title: string;
  description: string;
  locale: Locale;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  update(input: SeoInput): void {
    const path = input.path ?? '';
    const url = this.absolute(path, input.locale);
    const image = input.image
      ? this.toAbsolute(input.image)
      : `${SITE.baseUrl}/og-image.png`;

    this.title.setTitle(input.title);

    const tags: MetaDefinition[] = [
      { name: 'description', content: input.description },
      { property: 'og:title', content: input.title },
      { property: 'og:description', content: input.description },
      { property: 'og:type', content: input.type ?? 'website' },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:site_name', content: SITE.name },
      { property: 'og:locale', content: LOCALE_OG[input.locale] },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: input.title },
      { name: 'twitter:description', content: input.description },
      { name: 'twitter:image', content: image },
    ];
    if (input.keywords) tags.push({ name: 'keywords', content: input.keywords });
    for (const tag of tags) this.meta.updateTag(tag);

    this.clearManaged();
    this.addLink('canonical', url);
    for (const l of LOCALES) this.addAlternate(l, this.absolute(path, l));
    this.addAlternate('x-default', this.absolute(path, 'uz'));
    for (const l of LOCALES) {
      if (l !== input.locale) this.addOgAlternate(LOCALE_OG[l]);
    }
  }

  private absolute(path: string, locale: Locale): string {
    const clean = path.replace(/^\/+/, '');
    const prefix = locale === 'uz' ? '' : `/${locale}`;
    const tail = clean ? `/${clean}` : '';
    const full = `${prefix}${tail}` || '/';
    return `${SITE.baseUrl}${full}`;
  }

  private toAbsolute(maybeRelative: string): string {
    return maybeRelative.startsWith('http')
      ? maybeRelative
      : `${SITE.baseUrl}${maybeRelative.startsWith('/') ? '' : '/'}${maybeRelative}`;
  }

  private clearManaged(): void {
    this.doc.head
      .querySelectorAll('[data-seo]')
      .forEach((el) => el.remove());
  }

  private addLink(rel: string, href: string): void {
    const el = this.doc.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute('href', href);
    el.setAttribute('data-seo', '');
    this.doc.head.appendChild(el);
  }

  private addAlternate(hreflang: string, href: string): void {
    const el = this.doc.createElement('link');
    el.setAttribute('rel', 'alternate');
    el.setAttribute('hreflang', hreflang);
    el.setAttribute('href', href);
    el.setAttribute('data-seo', '');
    this.doc.head.appendChild(el);
  }

  private addOgAlternate(content: string): void {
    const el = this.doc.createElement('meta');
    el.setAttribute('property', 'og:locale:alternate');
    el.setAttribute('content', content);
    el.setAttribute('data-seo', '');
    this.doc.head.appendChild(el);
  }
}
