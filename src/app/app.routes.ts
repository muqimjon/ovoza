import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BlogList } from './pages/blog/blog-list';
import { BlogPost } from './pages/blog/blog-post';
import { NotFound } from './pages/not-found/not-found';

const localePages = (): Routes => [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'blog', component: BlogList, pathMatch: 'full' },
  { path: 'blog/:slug', component: BlogPost },
];

export const routes: Routes = [
  { path: '', data: { lang: 'uz' }, children: localePages() },
  { path: 'ru', data: { lang: 'ru' }, children: localePages() },
  { path: 'en', data: { lang: 'en' }, children: localePages() },
  { path: '**', component: NotFound, data: { lang: 'uz' } },
];
