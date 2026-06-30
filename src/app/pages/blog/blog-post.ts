import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { SeoService } from '../../core/seo/seo.service';
import { JsonLdService } from '../../core/seo/json-ld.service';
import { organizationNode, breadcrumbNode, blogPostingNode } from '../../core/seo/schema';
import { SITE } from '../../core/site';
import { Icon } from '../../shared/ui/icon';
import { ARTICLES, BLOG_POST_UI, getArticle, formatDate } from '../../data/blog/blog.data';

@Component({
  selector: 'app-blog-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon],
  template: `
    @if (article(); as a) {
      @if (content(); as c) {
        <main class="px-6 pb-24 pt-28 md:pt-32">
          <article class="mx-auto max-w-3xl">
            <nav aria-label="breadcrumb" class="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <a [routerLink]="i18n.localizedPath()" class="hover:text-cyan-600 dark:hover:text-cyan-400">{{ ui().home }}</a>
              <span>/</span>
              <a [routerLink]="i18n.localizedPath('blog')" class="hover:text-cyan-600 dark:hover:text-cyan-400">{{ ui().blog }}</a>
            </nav>

            <header class="mt-6">
              <span class="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
                {{ c.category }}
              </span>
              <h1 class="mt-4 font-display text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-[2.6rem] md:leading-[1.12]">
                {{ c.title }}
              </h1>
              <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                <span class="inline-flex items-center gap-1.5"><app-icon name="calendar" [size]="15" />{{ date() }}</span>
                <span class="inline-flex items-center gap-1.5"><app-icon name="clock" [size]="15" />{{ a.readMinutes }} {{ ui().readSuffix }}</span>
                <span class="inline-flex items-center gap-1.5"><app-icon name="users" [size]="15" />{{ site.legalName }}</span>
              </div>
            </header>

            <div class="mt-10 space-y-5">
              @for (block of c.body; track $index) {
                @switch (block.type) {
                  @case ('h2') {
                    <h2 class="mt-10 font-display text-2xl font-black tracking-tight text-slate-900 dark:text-white">{{ block.text }}</h2>
                  }
                  @case ('p') {
                    <p class="text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-300">{{ block.text }}</p>
                  }
                  @case ('ul') {
                    <ul class="space-y-2.5">
                      @for (item of block.items ?? []; track $index) {
                        <li class="flex gap-3 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-300">
                          <app-icon name="check" [size]="20" class="mt-1 shrink-0 text-cyan-500" />
                          <span>{{ item }}</span>
                        </li>
                      }
                    </ul>
                  }
                  @case ('ol') {
                    <ol class="space-y-3">
                      @for (item of block.items ?? []; track $index) {
                        <li class="flex gap-3.5 text-[1.0625rem] leading-relaxed text-slate-700 dark:text-slate-300">
                          <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan-500/10 text-sm font-bold text-cyan-600 dark:text-cyan-400">{{ $index + 1 }}</span>
                          <span class="pt-0.5">{{ item }}</span>
                        </li>
                      }
                    </ol>
                  }
                  @case ('quote') {
                    <blockquote class="my-8 border-l-4 border-cyan-500 bg-cyan-500/5 px-6 py-4 text-lg font-medium italic leading-relaxed text-slate-800 dark:text-slate-200">
                      {{ block.text }}
                    </blockquote>
                  }
                  @case ('tip') {
                    <div class="glass my-8 flex gap-4 rounded-2xl p-5">
                      <div class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-600 dark:text-amber-400">
                        <app-icon name="zap" [size]="20" />
                      </div>
                      <div>
                        <p class="font-display font-black text-slate-900 dark:text-white">{{ block.title }}</p>
                        <p class="mt-1.5 leading-relaxed text-slate-600 dark:text-slate-300">{{ block.text }}</p>
                      </div>
                    </div>
                  }
                }
              }
            </div>

            <div class="bg-brand-gradient relative mt-14 overflow-hidden rounded-3xl p-8 text-white md:p-10">
              <div class="relative z-10">
                <h2 class="font-display text-2xl font-black tracking-tight md:text-3xl">{{ ui().ctaTitle }}</h2>
                <p class="mt-3 max-w-xl leading-relaxed text-white/85">{{ ui().ctaText }}</p>
                <a [routerLink]="i18n.localizedPath()" [fragment]="a.cta"
                  class="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900 transition-transform hover:scale-[1.04]">
                  {{ ui().ctaButton }}<app-icon name="arrowRight" [size]="18" />
                </a>
              </div>
            </div>

            @if (related().length) {
              <section class="mt-16">
                <h2 class="font-display text-xl font-black tracking-tight text-slate-900 dark:text-white">{{ ui().relatedTitle }}</h2>
                <div class="mt-6 grid gap-4 sm:grid-cols-3">
                  @for (r of related(); track r.slug) {
                    <a [routerLink]="i18n.localizedPath('blog/' + r.slug)"
                      class="glass group rounded-2xl p-5 transition-transform hover:-translate-y-1">
                      <app-icon [name]="r.icon" [size]="22" class="text-cyan-600 dark:text-cyan-400" />
                      <p class="mt-3 font-display font-bold leading-snug text-slate-900 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">{{ r.title }}</p>
                    </a>
                  }
                </div>
              </section>
            }

            <a [routerLink]="i18n.localizedPath('blog')"
              class="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:gap-3 dark:text-cyan-400">
              <app-icon name="arrowRight" [size]="16" class="rotate-180" />{{ ui().backToBlog }}
            </a>
          </article>
        </main>
      }
    } @else {
      <main class="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <p class="text-6xl font-black text-cyan-500">404</p>
        <a [routerLink]="i18n.localizedPath('blog')" class="mt-6 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-white">{{ ui().backToBlog }}</a>
      </main>
    }
  `,
})
export class BlogPost {
  private readonly route = inject(ActivatedRoute);
  protected readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);
  private readonly jsonLd = inject(JsonLdService);
  protected readonly site = SITE;

  private readonly params = toSignal(this.route.paramMap);
  protected readonly article = computed(() => getArticle(this.params()?.get('slug') ?? ''));
  protected readonly content = computed(() => this.article()?.locales[this.i18n.locale()] ?? null);
  protected readonly ui = computed(() => BLOG_POST_UI[this.i18n.locale()]);
  protected readonly date = computed(() => {
    const a = this.article();
    return a ? formatDate(a.datePublished, this.i18n.locale()) : '';
  });
  protected readonly related = computed(() => {
    const a = this.article();
    const locale = this.i18n.locale();
    if (!a) return [];
    return ARTICLES.filter((x) => x.slug !== a.slug)
      .slice(0, 3)
      .map((x) => ({ slug: x.slug, icon: x.icon, title: x.locales[locale].title }));
  });

  constructor() {
    this.i18n.setLocale(this.route.snapshot.data['lang']);
    this.applySeo();
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe(() => this.applySeo());
  }

  private applySeo(): void {
    const a = this.article();
    if (!a) return;
    const locale = this.i18n.locale();
    const c = a.locales[locale];
    const path = `blog/${a.slug}`;
    this.seo.update({ title: c.title, description: c.description, locale, path, type: 'article' });
    this.jsonLd.set([
      organizationNode(locale),
      blogPostingNode({
        title: c.title,
        description: c.description,
        url: this.i18n.localizedPath(path, locale),
        datePublished: a.datePublished,
        dateModified: a.dateModified,
        locale,
      }),
      breadcrumbNode([
        { name: this.ui().home, url: this.i18n.localizedPath('', locale) },
        { name: this.ui().blog, url: this.i18n.localizedPath('blog', locale) },
        { name: c.title, url: this.i18n.localizedPath(path, locale) },
      ]),
    ]);
  }
}
