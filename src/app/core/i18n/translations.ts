import { Locale } from './locale';

export interface TranslationSet {
  nav: {
    services: string;
    advantages: string;
    cases: string;
    process: string;
    blog: string;
    contact: string;
    cta: string;
    home: string;
  };
  common: {
    menu: string;
    theme: string;
    language: string;
    phone: string;
    telegram: string;
    email: string;
    backHome: string;
  };
  footer: {
    tagline: string;
    servicesTitle: string;
    companyTitle: string;
    contactTitle: string;
    rights: string;
    address: string;
  };
}

export const translations: Record<Locale, TranslationSet> = {
  uz: {
    nav: {
      services: 'Xizmatlar',
      advantages: 'Afzalliklar',
      cases: 'Loyihalar',
      process: 'Jarayon',
      blog: 'Blog',
      contact: 'Aloqa',
      cta: 'Bepul audit',
      home: 'Bosh sahifa',
    },
    common: {
      menu: 'Menyu',
      theme: 'Mavzu',
      language: 'Til',
      phone: 'Telefon',
      telegram: 'Telegram',
      email: 'Email',
      backHome: 'Bosh sahifaga',
    },
    footer: {
      tagline:
        "Biznes jarayonlaringizni avtomatlashtiramiz — maxsus CRM, ombor va analitika tizimlari bilan.",
      servicesTitle: 'Xizmatlar',
      companyTitle: 'Kompaniya',
      contactTitle: 'Aloqa',
      rights: 'Barcha huquqlar himoyalangan.',
      address: "Farg'ona viloyati, O'zbekiston",
    },
  },
  ru: {
    nav: {
      services: 'Услуги',
      advantages: 'Преимущества',
      cases: 'Проекты',
      process: 'Процесс',
      blog: 'Блог',
      contact: 'Контакты',
      cta: 'Бесплатный аудит',
      home: 'Главная',
    },
    common: {
      menu: 'Меню',
      theme: 'Тема',
      language: 'Язык',
      phone: 'Телефон',
      telegram: 'Telegram',
      email: 'Email',
      backHome: 'На главную',
    },
    footer: {
      tagline:
        'Автоматизируем бизнес-процессы — индивидуальные CRM, складские и аналитические системы.',
      servicesTitle: 'Услуги',
      companyTitle: 'Компания',
      contactTitle: 'Контакты',
      rights: 'Все права защищены.',
      address: 'Ферганская область, Узбекистан',
    },
  },
  en: {
    nav: {
      services: 'Services',
      advantages: 'Why us',
      cases: 'Work',
      process: 'Process',
      blog: 'Blog',
      contact: 'Contact',
      cta: 'Free audit',
      home: 'Home',
    },
    common: {
      menu: 'Menu',
      theme: 'Theme',
      language: 'Language',
      phone: 'Phone',
      telegram: 'Telegram',
      email: 'Email',
      backHome: 'Back home',
    },
    footer: {
      tagline:
        'We automate your business — with custom CRM, inventory and analytics systems.',
      servicesTitle: 'Services',
      companyTitle: 'Company',
      contactTitle: 'Contact',
      rights: 'All rights reserved.',
      address: 'Fergana region, Uzbekistan',
    },
  },
};
