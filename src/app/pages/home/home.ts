import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { Locale } from '../../core/i18n/locale';
import { SeoService } from '../../core/seo/seo.service';
import { JsonLdService } from '../../core/seo/json-ld.service';
import { homeGraph } from '../../core/seo/schema';
import { Hero } from './sections/hero/hero';
import { TrustStrip } from './sections/trust-strip/trust-strip';
import { Problem } from './sections/problem/problem';
import { Services } from './sections/services/services';
import { WhyOvoza } from './sections/why-ovoza/why-ovoza';
import { Comparison } from './sections/comparison/comparison';
import { Process } from './sections/process/process';
import { Cases } from './sections/cases/cases';
import { Stats } from './sections/stats/stats';
import { Quiz } from './sections/quiz/quiz';
import { Roi } from './sections/roi/roi';
import { Team } from './sections/team/team';
import { Testimonials } from './sections/testimonials/testimonials';
import { Pricing } from './sections/pricing/pricing';
import { Faq } from './sections/faq/faq';
import { FinalCta } from './sections/final-cta/final-cta';
import { Contact } from './sections/contact/contact';
import { Social } from './sections/social/social';

const SEO: Record<Locale, { title: string; description: string }> = {
  uz: {
    title: 'Biznes avtomatlashtirish, CRM va ombor tizimi — Ovoza',
    description:
      "Kichik va o'rta biznes uchun maxsus CRM, ombor va analitika tizimlari. Bir martalik to'lov, 100% moslashuvchanlik. Farg'ona, O'zbekiston.",
  },
  ru: {
    title: 'Автоматизация бизнеса, CRM и складская система — Ovoza',
    description:
      'Индивидуальные CRM, складские и аналитические системы для малого и среднего бизнеса. Разовая оплата, гибкость 100%. Фергана, Узбекистан.',
  },
  en: {
    title: 'Business automation, CRM & inventory system — Ovoza',
    description:
      'Custom CRM, inventory and analytics systems for small and medium business. One-time payment, 100% flexibility. Fergana, Uzbekistan.',
  },
};

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Hero, TrustStrip, Problem, Services, WhyOvoza, Comparison, Process, Cases,
    Stats, Quiz, Roi, Team, Testimonials, Pricing, Faq, FinalCta, Contact, Social,
  ],
  template: `
    <main>
      <app-hero />
      <app-trust-strip />
      <app-problem />
      <app-services />
      <app-why-ovoza />
      <app-comparison />
      <app-process />
      <app-cases />
      <app-stats />
      <app-quiz />
      <app-roi />
      <app-team />
      <app-testimonials />
      <app-pricing />
      <app-faq />
      <app-final-cta />
      <app-contact />
      <app-social />
    </main>
  `,
})
export class Home {
  private readonly route = inject(ActivatedRoute);
  private readonly i18n = inject(I18nService);
  private readonly seo = inject(SeoService);
  private readonly jsonLd = inject(JsonLdService);

  constructor() {
    this.i18n.setLocale(this.route.snapshot.data['lang']);
    const locale = this.i18n.locale();
    this.seo.update({
      title: SEO[locale].title,
      description: SEO[locale].description,
      locale,
      path: '',
      keywords: 'biznes avtomatlashtirish, CRM tizimi, ombor dasturi, elektron biznes, call-markaz, Telegram bot, Billz, MoySklad',
    });
    this.jsonLd.set(homeGraph(locale));
  }
}
