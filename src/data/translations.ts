export interface TranslationSet {
  navLogo: string;
  navServices: string;
  navComparison: string;
  navPortfolio: string;
  navTeam: string;
  navQuiz: string;
  navContact: string;

  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBtnQuiz: string;
  heroBtnContact: string;

  trustedTitle: string;
  trustedSubtitle: string;
  clients: {
    yuksalish: {
      name: string;
      desc: string;
      results: string;
      location: string;
    };
    alMansur: {
      name: string;
      desc: string;
      results: string;
      location: string;
    };
    hamroh: {
      name: string;
      desc: string;
      results: string;
      location: string;
    };
  };

  experienceTitle: string;
  experienceText: string;

  comparisonTitle: string;
  comparisonSubtitle: string;
  comparisonHeaders: {
    feature: string;
    readySuite: string;
    bespokeOvoza: string;
  };
  comparisonPoints: {
    flexibility: {
      title: string;
      ready: string;
      bespoke: string;
    };
    integration: {
      title: string;
      ready: string;
      bespoke: string;
    };
    pricing: {
      title: string;
      ready: string;
      bespoke: string;
    };
    addFeature: {
      title: string;
      ready: string;
      bespoke: string;
    };
    support: {
      title: string;
      ready: string;
      bespoke: string;
    };
  };

  teamTitle: string;
  teamSubtitle: string;
  teamMembers: {
    avazbek: {
      name: string;
      role: string;
      desc: string;
    };
    muqimjon: {
      name: string;
      role: string;
      desc: string;
    };
  };

  quizTitle: string;
  quizSubtitle: string;
  quizStep: string;
  quizPrev: string;
  quizNext: string;
  quizSubmit: string;
  quizResultsTitle: string;
  quizAnalyzing: string;
  quizRedirecting: string;

  contactTitle: string;
  contactSubtitle: string;
  formName: string;
  formPhone: string;
  formTelegram: string;
  formBusiness: string;
  formMessage: string;
  formSubmit: string;
  formSuccess: string;
  formError: string;
  formHelper: string;

  quizQuestions: {
    id: number;
    question: string;
    options: string[];
  }[];
}

export const translations: Record<"uz" | "ru" | "en", TranslationSet> = {
  uz: {
    navLogo: "Ovoza",
    navServices: "Xizmatlar",
    navComparison: "Taqqoslash",
    navPortfolio: "Mijozlarimiz",
    navTeam: "Biz haqimizda",
    navQuiz: "Tahlil testi",
    navContact: "Aloqa",

    heroBadge: "Kichik va o'rta biznes uchun yechimlar",
    heroTitle: "Biznesingizdagi qo'lda bajariladigan ishlarni avtomatlashtiramiz",
    heroSubtitle: "Excel, Telegram va daftarustidagi tarqoq jarayonlarni sizning biznesingizga to'liq moslashtirilgan yagona CRM va analitika tizimiga aylantiramiz.",
    heroBtnQuiz: "Marmar testini topshirish",
    heroBtnContact: "Bepul mini-audit olish",

    trustedTitle: "Bizga ishonch bildirganlar",
    trustedSubtitle: "Biz shunchaki kod yozmaymiz, balki biznesingizdagi eng og'riqli joylarni o'rganib samarali yechim beramiz.",
    clients: {
      yuksalish: {
        name: "\"YUKSALISH TEKSTIL\" MCHJ (Bekson Shoes)",
        desc: "Oyoq kiyim ishlab chiqarish zavodi. Ombor, savdo tizimlari, to'lovlar va mijozlar hisobotlarini boshqarish tizimi.",
        results: "Zavoddagi kirim-chiqimlar va belgilangan vaqt oralig'idagi hisobotlarni ko'rish va nazorat qilish tezligi bir necha barobarga oshdi. Barcha jarayon shaffoflashdi.",
        location: "Farg'ona viloyati, Uchko'prik tumani, G'ijdon qishlog'i"
      },
      alMansur: {
        name: "\"AL-MANSUR\" xususiy korxonasi",
        desc: "Kabel ishlab chiqarish zavodi. Maxsulot aylanmasi, xaridlar va ombor hisobotlarini avtomatlashtirish.",
        results: "Ombordagi xomashyo va tayyor mahsulotlar hisoboti tizimlashtirilib, xatoliklar va yo'qotishlar bartaraf etildi. Hujjatbozlik vaqtini 5 barobar qisqartirdi.",
        location: "Farg'ona viloyati, Buvayda tumani, Beshterak qishlog'i"
      },
      hamroh: {
        name: "\"HAMROH MIKROMOLIYA TASHKILOTI\" MCHJ",
        desc: "Respublika bo'ylab 46 ta filialga ega mikromoliya muassasasi. Call-markaz va unumdorlik analitikasi tizimi.",
        results: "Call-markaz operatorlari samaradorligi va xodimlar unumdorligi ko'rsatkichlari (KPI) shaffof o'lchanadigan bo'ldi. Ish unumdorligi 3+ barobarga ko'tarildi.",
        location: "Farg'ona viloyati, Buvayda tumani, Yangiqo'rg'on QFY"
      }
    },

    experienceTitle: "Noldan joriy etish tajribasi",
    experienceText: "Bizning jamoada 14+ yildan buyon tadbirkorlik sohasi bilan shaxsan shug'ullangan a'zolar bor. Biz biznesning ichki qiyinchiliklarini, mijozlarning yo'qotilish sabablarini va tushunarsiz hisobotlar daryosini juda yaxshi bilamiz.",

    comparisonTitle: "Tayyor tizim (SaaS) yoki Individual loyiha?",
    comparisonSubtitle: "O'zbekistondagi Billz, Hippo yoki Moysklad kabi tayyor tizimlar bilan bizning shaxsiy yechimlarimiz orasidagi farqni solishtiring.",
    comparisonHeaders: {
      feature: "Xususiyat",
      readySuite: "Tayyor tizimlar (Billz, Moysklad...)",
      bespokeOvoza: "Ovoza (Siz uchun maxsus)"
    },
    comparisonPoints: {
      flexibility: {
        title: "Biznesga moslashuvchanlik",
        ready: "Siz ularning standart andozasiga moslashishingiz shart. Muhim funksiyalar cheklangan.",
        bespoke: "Tizim 100% sizning biznes jarayonlaringizga moslashtiriladi. Cheklovlar yo'q."
      },
      integration: {
        title: "Maxsus integratsiyalar",
        ready: "Faqat ular ruxsat bergan cheklangan integratsiyalar. Maxsus ichki botlar yoki CRM ulab bo'lmaydi.",
        bespoke: "Istalgan Telegram bot, IP-telefoniya, billing yoki ichki buxgalteriya bilan to'g'ridan to'g'ri bog'lanadi."
      },
      pricing: {
        title: "To'lov tizimi",
        ready: "Xodimlar va filiallar soniga qarab cheksiz oylik obuna haqi. Yillar oxirida katta mablag'.",
        bespoke: "Bir marta to'lov qilinadi. Hech qanday majburiy oylik litsenziya to'lovlari yo'q."
      },
      addFeature: {
        title: "Yangi yangilik kiritish",
        ready: "Juda qiyin yoki imkonsiz. Ular minglab foydalanuvchilar talab qilmaguncha yangi funksiya qo'shmaydi.",
        bespoke: "Juda oson va tezkor. Istalgan vaqtda yangi boshqaruv bloki yoki hisobot modulini kiritamiz."
      },
      support: {
        title: "Texnik yordam",
        ready: "Uzoq kutiladigan navbatlar va andozaviy chat botlari orqali javoblar.",
        bespoke: "Har doim yaqin aloqada bo'ladigan, sizni va muammoingizni shaxsan biladigan texnik hamkor."
      }
    },

    teamTitle: "Bizning jamoa",
    teamSubtitle: "Loyihamiz asosi bo'lgan professional texnik muhandislar.",
    teamMembers: {
      avazbek: {
        name: "Avazbek Siddiqov",
        role: "Desktop & Mobile Developer",
        desc: "Mijozlar uchun qulay, tezkor va zamonaviy o'rnatiladigan Windows dasturlari va mobil ilovalarni mukammal darajada ishlab chiqadi."
      },
      muqimjon: {
        name: "Muqimjon Mamadaliyev",
        role: "Backend & Server Deployment Specialist",
        desc: "Ma'lumotlar xavfsizligi, tezkor API serverlari, tizim integratsiyalari va bulutli platformalarni sozlash uchun mas'ul."
      }
    },

    quizTitle: "Biznesingizga avtomatlashtirish kerakmi?",
    quizSubtitle: "5 ta oddiy savol orqali biznesingizdagi muammolarni aniqlang va bepul professional tahlilni oling.",
    quizStep: "Qadam",
    quizPrev: "Orqaga",
    quizNext: "Keyingisi",
    quizSubmit: "Tahlil qilish",
    quizResultsTitle: "Sizning biznesingiz diagnostikasi",
    quizAnalyzing: "Sun'iy intellekt ma'lumotlarni tahlil qilmoqda. Iltimos kuting...",
    quizRedirecting: "Tahlil yakunlandi! Aloqa formasiga yo'naltirilmoqda...",

    contactTitle: "Biz bilan bog'laning",
    contactSubtitle: "Biznesingizdagi muammolar va quiz tahlili natijalari bo'yicha amaliy taklif oling.",
    formName: "Ismingiz va familiyangiz",
    formPhone: "Telefon raqamingiz",
    formTelegram: "Telegram username (agar bo'lsa)",
    formBusiness: "Faoliyat turi / Biznesingiz nomi",
    formMessage: "Savol va maxsus takliflaringiz",
    formSubmit: "So'rovni yuborish",
    formSuccess: "Sizning ma'lumotlaringiz mofaqqiyatli yuborildi! Tez orada mutaxassislarimiz siz bilan bog'lanishadi.",
    formError: "Xatolik yuz berdi. Iltimos qaytib urinib ko'ring yoki to'g'ridan to'g'ri qo'ng'iroq qiling.",
    formHelper: "Tahlil natijalari avtomatik ravishda so'rovga biriktiriladi.",

    quizQuestions: [
      {
        id: 1,
        question: "Hozirda biznesingizdagi hisobotlar va mijozlar bazasi qanday yuritiladi?",
        options: [
          "Qog'ozda yoki daftarustida",
          "Excel, Google Sheets yoki Telegram guruhlarda",
          "Tayyor obunali tizimlarda (CRM bor)",
          "Umuman yuritilmaydi (yodda tutiladi)"
        ]
      },
      {
        id: 2,
        question: "Kunlik kirim-chiqim, savdolar va ombor qoldig'ini bilish uchun qancha vaqt ketadi?",
        options: [
          "Bir necha soniyada avtomatik ko'rinadi",
          "Kun yoki hafta oxirida jadvallarni hisoblab chiqish kerak",
          "Bir necha kun ketadi yoki xodimlardan so'rash kerak",
          "Aniq bilmaymiz, taxminiy hisoblaymiz"
        ]
      },
      {
        id: 3,
        question: "Call-markaz yoki sotuvchilaringiz samaradorligi va buyurtmalar soni qat'iy nazoratdami?",
        options: [
          "To'liq nazorat bor, har bir qo'ng'iroq/sotuv dashboardda turadi",
          "Qisman hisobotlar bor, lekin xodim samarasini aniq bilmaymiz",
          "Faqat kun oxirida yozma hisobot berishadi",
          "Nazorat qilinmaydi"
        ]
      },
      {
        id: 4,
        question: "Biznesingizda mijozlar unutilib qolish holatlari uchraydimi?",
        options: [
          "Hech qachon, hamma narsa eslatmalar bilan tizimlashtirilgan",
          "Ba'zida bo'lib turadi, ayniqsa mijoz ko'p kelganda",
          "Ko'p yo'qotamiz, xodimlar javob berishni/qong'iroq qilishni unutadi",
          "Bu ko'rsatkichni umuman o'lchay olmaymiz"
        ]
      },
      {
        id: 5,
        question: "Sizning jamoangizda necha kishi ishlaydi va qo'lda bajariladigan operatsiyalar ko'pmi?",
        options: [
          "1-5 kishi (kichik hajmdagi ishlar)",
          "5-20 kishi (Excel, Telegram orqali muvofiqlashadi)",
          "20-50 kishi (ombordagi va do'kondagi hisobotlar tarqoq)",
          "50 dan ortiq xodim (filiallar ko'p, avtomatlashtirmaslik katta zarar beryapti)"
        ]
      }
    ]
  },
  ru: {
    navLogo: "Ovoza",
    navServices: "Услуги",
    navComparison: "Сравнение",
    navPortfolio: "Наши клиенты",
    navTeam: "О нас",
    navQuiz: "Тест-анализ",
    navContact: "Контакты",

    heroBadge: "Решения для малого и среднего бизнеса",
    heroTitle: "Автоматизируем ручные процессы в вашем бизнесе",
    heroSubtitle: "Превратим хаотичные таблицы Excel, чаты в Telegram и тетради в единую CRM и аналитику, созданную точно под специфику вашего бизнеса.",
    heroBtnQuiz: "Пройти тест-анализ",
    heroBtnContact: "Получить бесплатный аудит",

    trustedTitle: "Нам доверяют лидеры",
    trustedSubtitle: "Мы не просто пишем код — мы глубоко изучаем ваши проблемы и внедряем решения, которые ускоряют бизнес.",
    clients: {
      yuksalish: {
        name: "ООО \"YUKSALISH TEKSTIL\" (Bekson Shoes)",
        desc: "Завод по производству обуви. Комплексная система управления складом, продажами, платежами и клиентской базой.",
        results: "Скорость формирования периодических отчетов и отслеживание прихода-расхода сырья увеличились в несколько раз. Все процессы стали абсолютно прозрачными.",
        location: "Ферганская область, Учкуприкский район, село Гиждон"
      },
      alMansur: {
        name: "Частное предприятие \"AL-MANSUR\"",
        desc: "Кабельный завод. Автоматизация учета готовой продукции, движения ресурсов на складе и материальных балансов.",
        results: "Систематизирован учет сырья и готовой кабельной продукции, сведены к минимуму потери. Бумажная волокита сократилась более чем в 5 раз.",
        location: "Ферганская область, Бувайдинский район, село Бештерек"
      },
      hamroh: {
        name: "ООО \"HAMROH MIKROMOLIYA TASHKILOTI\"",
        desc: "Микрофинансовая организация с 46 филиалами по всему Узбекистану. Система аналитики колл-центра и продуктивности персонала.",
        results: "Внедрена прозрачная система KPI для операторов колл-центра. Продуктивность работы операторов повысилась более чем в 3 раза.",
        location: "Ферганская область, Бувайдинский район, поселок Янгикурган"
      }
    },

    experienceTitle: "Опыт реального внедрения",
    experienceText: "В нашей команде есть основатели, которые лично занимаются бизнесом более 14 лет. Мы досконально знаем боли предпринимателей: от упущенных заявок до хаоса в ручных финансовых отчётах.",

    comparisonTitle: "Готовый сервис (SaaS) или индивидуальная разработка?",
    comparisonSubtitle: "Сравните готовые платформы облачного учета (Billz, Hippo, МойСклад) и адаптируемые системы от Ovoza.",
    comparisonHeaders: {
      feature: "Критерий",
      readySuite: "Готовые облачные решения",
      bespokeOvoza: "Ovoza (Сделано под вас)"
    },
    comparisonPoints: {
      flexibility: {
        title: "Гибкость под структуру",
        ready: "Вы вынуждены менять свои процессы под жесткий шаблон готовой программы. Критичные модули недоступны.",
        bespoke: "Система на 100% строится вокруг ваших текущих привычек и процессов. Ограничений нет."
      },
      integration: {
        title: "Кастомные интеграции",
        ready: "Только стандартный набор интеграций. Сложно подключить внутренние Telegram боты или свои базы.",
        bespoke: "Легко соединяется с любыми ботами, IP-телефонией, локальным оборудованием и бухгалтерией."
      },
      pricing: {
        title: "Модель оплаты",
        ready: "Ежемесячная абонентская плата, растущая с каждым новым сотрудником, складом или филиалом.",
        bespoke: "Единоразовая оплата стоимости разработки. Никаких скрытых ежемесячных лицензий."
      },
      addFeature: {
        title: "Добавление новых функций",
        ready: "Почти невозможно. Разработчики сервиса не будут добавлять фичу, пока о ней не попросят тысячи компаний.",
        bespoke: "Быстро и просто. Мы добавляем кастомные отчеты или кнопки по первому вашему запросу."
      },
      support: {
        title: "Техническая поддержка",
        ready: "Стандартные автоответы чат-ботов и долгое ожидание в очереди обращений.",
        bespoke: "Вы общаетесь напрямую с разработчиками, которые знают специфику вашего проекта лично."
      }
    },

    teamTitle: "Наша команда",
    teamSubtitle: "Инженеры, которые создают надежные системы для автоматизации вашего бизнеса.",
    teamMembers: {
      avazbek: {
        name: "Авазбек Сиддиков",
        role: "Desktop & Mobile Developer",
        desc: "Проектирует и создает молниеносные и надежные десктопные решения для Windows, а также кроссплатформенные мобильные приложения."
      },
      muqimjon: {
        name: "Мукимжон Мамадалиев",
        role: "Backend & Server Deployment Specialist",
        desc: "Отвечает за архитектуру баз данных, разработку отказоустойчивых API, интеграцию сторонних сервисов и безопасность данных."
      }
    },

    quizTitle: "Нужна ли автоматизация именно вашему бизнесу?",
    quizSubtitle: "Ответьте на 5 вопросов, чтобы оценить скрытые финансовые потери и получить расчет пользы автоматизации.",
    quizStep: "Шаг",
    quizPrev: "Назад",
    quizNext: "Далее",
    quizSubmit: "Анализировать",
    quizResultsTitle: "Диагностика вашего бизнеса",
    quizAnalyzing: "Искусственный интеллект анализирует ваши ответы. Пожалуйста, подождите...",
    quizRedirecting: "Анализ завершен! Перенаправляем на форму контакта...",

    contactTitle: "Связаться с нами",
    contactSubtitle: "Оставьте заявку для детального обсуждения ваших процессов и результатов экспресс-диагностики.",
    formName: "Ваше имя и фамилия",
    formPhone: "Номер телефона",
    formTelegram: "Ник в Telegram (если есть)",
    formBusiness: "Тип деятельности / Название компании",
    formMessage: "Вопросы или ваши пожелания",
    formSubmit: "Отправить заявку",
    formSuccess: "Ваши данные успешно отправлены! Наши специалисты свяжутся с вами в ближайшее время.",
    formError: "Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или позвоните нам напрямую.",
    formHelper: "Результаты вашего теста будут автоматически прикреплены к этой заявке.",

    quizQuestions: [
      {
        id: 1,
        question: "Как сейчас ведется отчетность и база клиентов в вашем бизнесе?",
        options: [
          "На бумаге или в блокнотах",
          "В Excel, Google Таблицах или разрозненных Telegram чатах",
          "В готовых облачных CRM системах",
          "Вообще не ведется (все держится в уме у сотрудников)"
        ]
      },
      {
        id: 2,
        question: "Сколько времени уходит на то, чтобы узнать дневную выручку, расходы и остаток на складе?",
        options: [
          "Видно за пару секунд в автоматическом режиме",
          "В конце дня или недели менеджеры долго сводят файлы",
          "Уходит несколько дней или нужно опрашивать сотрудников",
          "Точно не знаем, считаем приблизительно"
        ]
      },
      {
        id: 3,
        question: "Контролируется ли эффективность и количество звонков/заказов операторов или продавцов?",
        options: [
          "Да, вся аналитика и записи звонков выводятся на дашборд",
          "Есть примерные отчеты, но реальную эффективность оценить сложно",
          "Отчитываются только вручную в конце рабочей смены",
          "Эффективность никак не контролируется"
        ]
      },
      {
        id: 4,
        question: "Бывают ли случаи утери клиентов из-за невнимательности команды?",
        options: [
          "Никогда, все автоматизировано с жесткими напоминаниями",
          "Иногда бывает, особенно при большом потоке обращений",
          "Часто теряем, сотрудники просто забывают перезванивать",
          "Вообще не можем измерить этот показатель"
        ]
      },
      {
        id: 5,
        question: "Сколько человек работает в команде и много ли ручных рутинных процессов?",
        options: [
          "1-5 человек (минимум рутины)",
          "5-20 человек (координируемся через таблицы и чаты)",
          "20-50 человек (сложный склад, задержки в согласованиях)",
          "Более 50 человек (филиалы, отсутствие единой системы тормозит рост)"
        ]
      }
    ]
  },
  en: {
    navLogo: "Ovoza",
    navServices: "Services",
    navComparison: "Comparison",
    navPortfolio: "Our Clients",
    navTeam: "About Us",
    navQuiz: "Evaluation Test",
    navContact: "Contact",

    heroBadge: "Solutions for Small & Medium Businesses",
    heroTitle: "We Automate Manual Operations in Your Business",
    heroSubtitle: "Transform scattered Excel sheets, Telegram chats, and paper books into a unified custom CRM and analytics ecosystem built specifically for your flow.",
    heroBtnQuiz: "Take Liquid Test",
    heroBtnContact: "Get Free Mini-Audit",

    trustedTitle: "Trusted by Manufacturers & Brands",
    trustedSubtitle: "We don't just write code — we analyze structural bottlenecks and implement systems that drive real business results.",
    clients: {
      yuksalish: {
        name: "\"YUKSALISH TEKSTIL\" LLC (Bekson Shoes)",
        desc: "Footwear manufacturing factory. Complete management system for inventory, sales, payment processing, and customer ledgers.",
        results: "The visibility of material ins-and-outs and interval reporting speeded up several fold. Internal inventory flows became 100% transparent.",
        location: "Fergana Region, Uchkoprik District, Gijdon village"
      },
      alMansur: {
        name: "\"AL-MANSUR\" private enterprise",
        desc: "Cable manufacturing factory. Automation of incoming raw materials, finished inventory, and sales balance tracking.",
        results: "Raw materials and cable outputs are fully tracking in real-time, removing staff errors and losses. Reduced invoice overhead by over 5 times.",
        location: "Fergana Region, Buvayda District, Beshterak village"
      },
      hamroh: {
        name: "\"HAMROH MICROFINANCE ORGANIZATION\" LLC",
        desc: "Microfinance institution operating 46 branches across Uzbekistan. Call center analytics & performance management dashboard.",
        results: "Call center interactions and staff performance indicators (KPI) are transparently tracked. Handled call volume and operator output boosted 3+ times.",
        location: "Fergana Region, Buvayda District, Yangikorgan"
      }
    },

    experienceTitle: "Practical Business Grounding",
    experienceText: "Our core team has 14+ years of personal, hands-on business ownership background inside Uzbekistan. We understand the physical pain of missing orders, raw material leaks, and messy ledgers.",

    comparisonTitle: "Bespoke System vs Subscription-Based SaaS?",
    comparisonSubtitle: "See how ready-made cloud solutions in Uzbekistan (Billz, Hippo, Moysklad) compare with tailored development from Ovoza.",
    comparisonHeaders: {
      feature: "Criteria",
      readySuite: "Ready-Made Cloud Solutions",
      bespokeOvoza: "Ovoza (Bespoke Development)"
    },
    comparisonPoints: {
      flexibility: {
        title: "Bespoke System Fit",
        ready: "You are forced to alter your business routines to match the provider's rigid templates.",
        bespoke: "The software fits 100% around your specific business logic and staff routines with no limits."
      },
      integration: {
        title: "Custom Integrations",
        ready: "Only standard, basic plugins. Connecting local hardware, specific webhooks or legacy databases is blocked.",
        bespoke: "Integrated directly with any local Telegram bot, custom IP-telephony, accounting ledger, and specialized hardware."
      },
      pricing: {
        title: "Structure Fee",
        ready: "Continuous monthly subscriptions based on user licenses, locations, and data storage limits.",
        bespoke: "One-off custom development fee. Zero recurring mandatory software licensing costs."
      },
      addFeature: {
        title: "Adding New Features",
        ready: "Exceedingly difficult. No custom requests are satisfied unless requested by thousands of monthly subscribers.",
        bespoke: "Frictionless and fast. We append new visual dashboards, custom report filters, and sections on your call."
      },
      support: {
        title: "Technical Support",
        ready: "Generic ticketing, predefined robot answers, and lengthy wait lists to resolve server issues.",
        bespoke: "Direct lines of communication to the actual developers who built and understand your system."
      }
    },

    teamTitle: "Our Core Team",
    teamSubtitle: "Software engineers and business consultants who translate your pain points into robust systems.",
    teamMembers: {
      avazbek: {
        name: "Avazbek Siddiqov",
        role: "Desktop & Mobile Developer",
        desc: "Engineers responsive desktop software and robust cross-platform mobile apps for field staff and operations."
      },
      muqimjon: {
        name: "Muqimjon Mamadaliyev",
        role: "Backend & Deployment Expert",
        desc: "Oversees core ledger API, data security, third-party integrations, and robust cloud hosting administration."
      }
    },

    quizTitle: "Does Your Business Need Automation?",
    quizSubtitle: "Answer 5 brief questions to diagnose hidden time and money leaks, and obtain an instant AI-powered strategic analysis.",
    quizStep: "Step",
    quizPrev: "Back",
    quizNext: "Next",
    quizSubmit: "Run Diagnostics",
    quizResultsTitle: "Your Custom Business Diagnosis",
    quizAnalyzing: "AI is analyzing your answers against SME templates. Please hold on...",
    quizRedirecting: "Analysis complete! Taking you to the consultation form...",

    contactTitle: "Get in Touch",
    contactSubtitle: "Request a custom roadmap tailored specifically for your quiz results and operational bottlenecks.",
    formName: "Full Name",
    formPhone: "Phone Number",
    formTelegram: "Telegram Username (optional)",
    formBusiness: "Company Name / Business Line",
    formMessage: "Questions or custom requirements",
    formSubmit: "Submit Audit Request",
    formSuccess: "Your audit request was submitted successfully! Our partners will contact you shortly.",
    formError: "Something went wrong. Please check your network and attempt submission again.",
    formHelper: "Your AI diagnostic report will be bundled automatically with this submission.",

    quizQuestions: [
      {
        id: 1,
        question: "How is customer database and core tracking managed currently?",
        options: [
          "On paper, ledger notebooks or cash journals",
          "In Excel, Google Sheets or active chat groups (Telegram)",
          "Using template cloud SaaS suites",
          "Not tracked systematically (stored in managers' heads)"
        ]
      },
      {
        id: 2,
        question: "How long does it take you to find out daily net profits, expenses, and exact stock counts?",
        options: [
          "Instantly accessible, updated automatically on a dashboard",
          "Meticulous, manual end-of-week spreadsheet matching is required",
          "Takes several days or requires questioning staff and physical counting",
          "Unclear, we calculate approximate figures"
        ]
      },
      {
        id: 3,
        question: "Are your salespeople or operator call counts and efficiencies closely monitored?",
        options: [
          "Perfect tracking, every call and status is displayed on visual analytics",
          "Rough summaries, though real effectiveness cannot be evaluated",
          "Managers write out a simple end-of-shift report manually",
          "No tracking or control is established currently"
        ]
      },
      {
        id: 4,
        question: "Do customer inquiries go cold or get forgotten due to coordinator errors?",
        options: [
          "Never, workflows are automated with timely alerts",
          "Occasionally, particularly during peak operating hours",
          "Frequently, staff fail to follow-up on leads on time",
          "We cannot measure this indicator at all"
        ]
      },
      {
        id: 5,
        question: "How many employees are in your team and does routine require manual work?",
        options: [
          "1-5 employees (minimal repetitive overhead)",
          "5-20 employees (coordinating spreadsheets via Telegram)",
          "20-50 employees (warehousing and accounting is disjointed)",
          "More than 50 (multilocational, lack of system stops expansion)"
        ]
      }
    ]
  }
};
