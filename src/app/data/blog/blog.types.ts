import { Locale } from '../../core/i18n/locale';

export type BlogBlockType = 'p' | 'h2' | 'ul' | 'ol' | 'quote' | 'tip';

export interface BlogBlock {
  type: BlogBlockType;
  text?: string;
  title?: string;
  items?: string[];
}

export interface BlogContent {
  category: string;
  title: string;
  description: string;
  excerpt: string;
  body: BlogBlock[];
}

export interface BlogArticle {
  slug: string;
  icon: string;
  datePublished: string;
  dateModified: string;
  readMinutes: number;
  cta: string;
  locales: Record<Locale, BlogContent>;
}
