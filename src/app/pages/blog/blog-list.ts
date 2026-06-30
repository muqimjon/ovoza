import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { SeoService } from '../../core/seo/seo.service';
import { JsonLdService } from '../../core/seo/json-ld.service';
import { organizationNode, breadcrumbNode, blogIndexNode } from '../../core/seo/schema';
import { Icon } from '../../shared/ui/icon';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { ARTICLES, BLOG_INDEX, formatDate } from '../../data/blog/blog.data';

@Component({
  selector: 'app-blog-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, RevealDirective],
  template: `
    <main class="px-6 pb-24 pt-28 md:pt-36">
      <div class="mx-auto max-w-6xl">
        <header class="mx-auto max-w-2xl text-center">
          <span class="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
            <app-icon name="fileChart" [size]="13" />{{ c().eyebrow }}
          </span>
          <h1 class="mt-4 font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl md:leading-[1.1]">
            {{ c().h1 }} <span class="text-gradient">{{ c().accent }}</span>
          </h1>
          <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">{{ c().subtitle }}</p>
        </header>

        <div class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          @for (a of cards(); track a.slug) {
            <a
              appReveal [appReveal]="$index * 90"
              [routerLink]="i18n.localizedPath('blog/' + a.slug)"
              class="glass rainbow-edge group flex flex-col rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <div class="flex items-center justify-between gap-3">
                <div class="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <app-icon [name]="a.icon" [size]="22" />
                </div>
                <span class="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
                  {{ a.category }}
                </span>
              </div>

              <h2 class="mt-5 font-display text-xl font-black leading-snug tracking-tight text-slate-900 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-400">
                {{ a.title }}
              </h2>
              <p class="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{{ a.excerpt }}</p>

              <div class="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                <span>{{ a.date }}</span>
                <span class="inline-flex items-center gap-1.5">
                  <app-icon name="clock" [size]="14" />{{ a.readMinutes }} {{ c().readSuffix }}
                </span>
              </div>
            </a>
          }
        </div>
      </div>
    </main>
  `,
})
export class BlogList {
  private readonly route = inject(ActivatedRoute);
  protected readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);
  private readonly jsonLd = inject(JsonLdService);

  protected readonly c = computed(() => BLOG_INDEX[this.i18n.locale()]);

  protected readonly cards = computed(() => {
    const locale = this.i18n.locale();
    return ARTICLES.map((a) => {
      const l = a.locales[locale];
      return {
        slug: a.slug,
        icon: a.icon,
        category: l.category,
        title: l.title,
        excerpt: l.excerpt,
        readMinutes: a.readMinutes,
        date: formatDate(a.datePublished, locale),
      };
    });
  });

  constructor() {
    this.i18n.setLocale(this.route.snapshot.data['lang']);
    const locale = this.i18n.locale();
    const c = BLOG_INDEX[locale];
    this.seo.update({
      title: c.metaTitle,
      description: c.metaDescription,
      locale,
      path: 'blog',
      keywords: 'biznes avtomatlashtirish, CRM tizimi, ombor dasturi, call-markaz KPI, blog',
    });
    this.jsonLd.set([
      organizationNode(locale),
      breadcrumbNode([
        { name: c.crumbHome, url: this.i18n.localizedPath('', locale) },
        { name: c.crumbBlog, url: this.i18n.localizedPath('blog', locale) },
      ]),
      blogIndexNode(locale, this.cards().map((a) => ({ title: a.title, slug: a.slug }))),
    ]);
  }
}
