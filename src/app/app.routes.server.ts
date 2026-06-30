import { RenderMode, ServerRoute } from '@angular/ssr';
import { BLOG_SLUGS } from './data/blog/blog.data';

const slugParams = () => Promise.resolve(BLOG_SLUGS.map((slug) => ({ slug })));

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'blog', renderMode: RenderMode.Prerender },
  { path: 'blog/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: slugParams },
  { path: 'ru', renderMode: RenderMode.Prerender },
  { path: 'ru/blog', renderMode: RenderMode.Prerender },
  { path: 'ru/blog/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: slugParams },
  { path: 'en', renderMode: RenderMode.Prerender },
  { path: 'en/blog', renderMode: RenderMode.Prerender },
  { path: 'en/blog/:slug', renderMode: RenderMode.Prerender, getPrerenderParams: slugParams },
  { path: '**', renderMode: RenderMode.Prerender },
];
