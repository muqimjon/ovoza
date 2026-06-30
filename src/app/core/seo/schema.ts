import { Locale } from '../i18n/locale';
import { SITE } from '../site';

const ORG_ID = `${SITE.baseUrl}/#org`;
const BUSINESS_ID = `${SITE.baseUrl}/#business`;

const ORG_DESCRIPTION: Record<Locale, string> = {
  uz: "Kichik va o'rta biznes uchun maxsus CRM, ombor va analitika tizimlarini ishlab chiqamiz.",
  ru: 'Разрабатываем индивидуальные CRM, складские и аналитические системы для малого и среднего бизнеса.',
  en: 'We build custom CRM, inventory and analytics systems for small and medium businesses.',
};

const SERVICE_NAMES: Record<Locale, string[]> = {
  uz: ['CRM tizimi', 'Ombor dasturi', 'Call-markaz KPI analitikasi', 'Telegram bot integratsiyasi', 'IP-telefoniya', 'Biznes avtomatlashtirish'],
  ru: ['CRM система', 'Складская программа', 'Аналитика KPI колл-центра', 'Интеграция Telegram-ботов', 'IP-телефония', 'Автоматизация бизнеса'],
  en: ['CRM system', 'Inventory software', 'Call-center KPI analytics', 'Telegram bot integration', 'IP telephony', 'Business automation'],
};

export function organizationNode(locale: Locale): object {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.legalName,
    url: SITE.baseUrl + '/',
    logo: `${SITE.baseUrl}/favicon.svg`,
    description: ORG_DESCRIPTION[locale],
    foundingDate: String(SITE.foundedYear),
    email: SITE.email,
    sameAs: Object.values(SITE.social),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      contactType: 'sales',
      areaServed: 'UZ',
      availableLanguage: ['uz', 'ru', 'en'],
    },
  };
}

export function localBusinessNode(locale: Locale): object {
  return {
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name: SITE.legalName,
    parentOrganization: { '@id': ORG_ID },
    url: SITE.baseUrl + '/',
    image: `${SITE.baseUrl}/og-image.png`,
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: '$$',
    description: ORG_DESCRIPTION[locale],
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.address.geo.lat,
      longitude: SITE.address.geo.lng,
    },
    areaServed: { '@type': 'Country', name: 'Uzbekistan' },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  };
}

export function websiteNode(): object {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.baseUrl}/#website`,
    url: SITE.baseUrl + '/',
    name: SITE.name,
    publisher: { '@id': ORG_ID },
    inLanguage: ['uz', 'ru', 'en'],
  };
}

export function serviceNode(locale: Locale): object {
  return {
    '@type': 'Service',
    '@id': `${SITE.baseUrl}/#service`,
    serviceType: SERVICE_NAMES[locale][5],
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Uzbekistan' },
    description: ORG_DESCRIPTION[locale],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: SERVICE_NAMES[locale][5],
      itemListElement: SERVICE_NAMES[locale].slice(0, 6).map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  };
}

export function breadcrumbNode(items: { name: string; url: string }[]): object {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE.baseUrl}${item.url}`,
    })),
  };
}

export function blogPostingNode(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  locale: Locale;
}): object {
  return {
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    inLanguage: article.locale,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    image: article.image ? `${SITE.baseUrl}${article.image}` : `${SITE.baseUrl}/og-image.png`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE.baseUrl}${article.url}` },
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}

const BLOG_NAME: Record<Locale, string> = {
  uz: 'Ovoza blogi — biznes avtomatlashtirish',
  ru: 'Блог Ovoza — автоматизация бизнеса',
  en: 'Ovoza blog — business automation',
};

export function blogIndexNode(locale: Locale, items: { title: string; slug: string }[]): object {
  const prefix = locale === 'uz' ? '' : `/${locale}`;
  const base = `${SITE.baseUrl}${prefix}/blog`;
  return {
    '@type': 'Blog',
    '@id': `${base}#blog`,
    url: base,
    name: BLOG_NAME[locale],
    inLanguage: locale,
    publisher: { '@id': ORG_ID },
    blogPost: items.map((it) => ({
      '@type': 'BlogPosting',
      headline: it.title,
      url: `${base}/${it.slug}`,
    })),
  };
}

export function homeGraph(locale: Locale): object[] {
  return [organizationNode(locale), localBusinessNode(locale), websiteNode(), serviceNode(locale)];
}
