import { Locale } from '../i18n/locale';

export interface QuizOption {
  label: string;
  weight: number;
}
export interface QuizQuestion {
  q: string;
  options: QuizOption[];
}
export interface QuizDiagnosis {
  level: string;
  title: string;
  text: string;
  modules: string[];
}

export interface QuizContent {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  step: string;
  prev: string;
  next: string;
  finish: string;
  restart: string;
  resultTitle: string;
  scoreLabel: string;
  recommend: string;
  cta: string;
  questions: QuizQuestion[];
  diagnoses: [QuizDiagnosis, QuizDiagnosis, QuizDiagnosis];
}

export const QUIZ: Record<Locale, QuizContent> = {
  uz: {
    eyebrow: 'Tahlil testi',
    title: 'Biznesingizga avtomatlashtirish',
    accent: 'kerakmi?',
    subtitle: "5 ta savol — va biznesingizdagi yashirin yo'qotishlarni darhol ko'rsatamiz.",
    step: 'Savol',
    prev: 'Orqaga',
    next: 'Keyingisi',
    finish: 'Natijani ko‘rish',
    restart: 'Qayta boshlash',
    resultTitle: 'Sizning natijangiz',
    scoreLabel: 'Avtomatlashtirish ehtiyoji',
    recommend: 'Tavsiya etiladigan modullar',
    cta: 'Bepul audit olish',
    questions: [
      { q: 'Hozir hisobotlar va mijozlar bazasi qanday yuritiladi?', options: [
        { label: 'Tayyor CRM yoki tizimda', weight: 0 },
        { label: 'Excel, Google Sheets yoki Telegramda', weight: 2 },
        { label: 'Qog‘oz yoki daftarda', weight: 3 },
        { label: 'Umuman yuritilmaydi (yodda)', weight: 3 } ] },
      { q: 'Kunlik tushum va ombor qoldig‘ini bilish uchun qancha vaqt ketadi?', options: [
        { label: 'Bir necha soniyada avtomatik ko‘rinadi', weight: 0 },
        { label: 'Kun yoki hafta oxirida hisoblaymiz', weight: 2 },
        { label: 'Bir necha kun yoki xodimdan so‘rash kerak', weight: 3 },
        { label: 'Aniq bilmaymiz, taxminan', weight: 3 } ] },
      { q: 'Sotuvchilar yoki call-markaz samaradorligi nazoratdami?', options: [
        { label: 'To‘liq nazorat — dashboardda ko‘rinadi', weight: 0 },
        { label: 'Qisman, lekin aniq emas', weight: 2 },
        { label: 'Faqat kun oxirida qo‘lda hisobot', weight: 3 },
        { label: 'Nazorat qilinmaydi', weight: 3 } ] },
      { q: 'Mijozlar e’tiborsizlik tufayli yo‘qoladimi?', options: [
        { label: 'Yo‘q, eslatmalar bilan tizimlashtirilgan', weight: 0 },
        { label: 'Ba’zan, ayniqsa band paytlarda', weight: 2 },
        { label: 'Ko‘p — qo‘ng‘iroq qilish unutiladi', weight: 3 },
        { label: 'Buni umuman o‘lchay olmaymiz', weight: 3 } ] },
      { q: 'Jamoangizda necha kishi ishlaydi?', options: [
        { label: '1–5 kishi', weight: 1 },
        { label: '5–20 kishi', weight: 2 },
        { label: '20–50 kishi', weight: 3 },
        { label: '50 dan ortiq (filiallar bor)', weight: 3 } ] },
    ],
    diagnoses: [
      { level: 'Past', title: 'Yaxshi yo‘ldasiz — lekin o‘sish imkoni bor', text: 'Asosiy jarayonlaringiz tartibli. Endi maqsad — qo‘lda qolgan oxirgi bo‘g‘inlarni avtomatlashtirib, o‘sishni tezlashtirish va xatolarni nolga tushirish.', modules: ['Hisobotlar & dashboard', 'CRM kengaytmasi', 'Integratsiyalar'] },
      { level: 'O‘rta', title: 'Aniq imkoniyatlar bor', text: 'Ma’lumotlaringiz tarqoq va ko‘p ish qo‘lda bajariladi. Bu vaqt va pul yo‘qotishga olib keladi. Yagona tizim sizga shaffoflik va tezlik beradi.', modules: ['CRM tizimi', 'Ombor & qoldiqlar', 'Hisobotlar'] },
      { level: 'Yuqori', title: 'Avtomatlashtirish zudlik bilan kerak', text: 'Hozirgi tarqoq usul biznesingizga jiddiy zarar yetkazmoqda: mijozlar yo‘qoladi, ombor nazoratsiz, hisobotlar kechikadi. Yagona Ovoza tizimi bu yo‘qotishlarni to‘xtatadi.', modules: ['CRM + Ombor', 'Call-markaz KPI', 'Telegram bot & telefoniya'] },
    ],
  },
  ru: {
    eyebrow: 'Тест-анализ',
    title: 'Нужна ли вашему бизнесу',
    accent: 'автоматизация?',
    subtitle: '5 вопросов — и мы сразу покажем скрытые потери в вашем бизнесе.',
    step: 'Вопрос',
    prev: 'Назад',
    next: 'Далее',
    finish: 'Узнать результат',
    restart: 'Пройти заново',
    resultTitle: 'Ваш результат',
    scoreLabel: 'Потребность в автоматизации',
    recommend: 'Рекомендуемые модули',
    cta: 'Получить бесплатный аудит',
    questions: [
      { q: 'Как сейчас ведётся отчётность и база клиентов?', options: [
        { label: 'В готовой CRM или системе', weight: 0 },
        { label: 'В Excel, Google Таблицах или Telegram', weight: 2 },
        { label: 'На бумаге или в тетради', weight: 3 },
        { label: 'Вообще не ведётся (в уме)', weight: 3 } ] },
      { q: 'Сколько времени нужно, чтобы узнать выручку и остаток на складе?', options: [
        { label: 'Видно автоматически за секунды', weight: 0 },
        { label: 'Считаем в конце дня или недели', weight: 2 },
        { label: 'Несколько дней или опрос сотрудников', weight: 3 },
        { label: 'Точно не знаем, примерно', weight: 3 } ] },
      { q: 'Контролируется ли эффективность продавцов / колл-центра?', options: [
        { label: 'Полный контроль — видно на дашборде', weight: 0 },
        { label: 'Частично, но неточно', weight: 2 },
        { label: 'Только ручной отчёт в конце дня', weight: 3 },
        { label: 'Не контролируется', weight: 3 } ] },
      { q: 'Теряются ли клиенты из-за невнимательности?', options: [
        { label: 'Нет, всё с напоминаниями', weight: 0 },
        { label: 'Иногда, особенно в пик', weight: 2 },
        { label: 'Часто — забывают перезвонить', weight: 3 },
        { label: 'Не можем это измерить', weight: 3 } ] },
      { q: 'Сколько человек в вашей команде?', options: [
        { label: '1–5 человек', weight: 1 },
        { label: '5–20 человек', weight: 2 },
        { label: '20–50 человек', weight: 3 },
        { label: 'Более 50 (есть филиалы)', weight: 3 } ] },
    ],
    diagnoses: [
      { level: 'Низкая', title: 'Вы на верном пути — но есть куда расти', text: 'Основные процессы в порядке. Теперь цель — автоматизировать последние ручные звенья, ускорить рост и свести ошибки к нулю.', modules: ['Отчёты и дашборд', 'Расширение CRM', 'Интеграции'] },
      { level: 'Средняя', title: 'Есть явные возможности', text: 'Данные разрознены, много ручной работы. Это ведёт к потере времени и денег. Единая система даст прозрачность и скорость.', modules: ['CRM система', 'Склад и остатки', 'Отчёты'] },
      { level: 'Высокая', title: 'Автоматизация нужна срочно', text: 'Разрозненный подход серьёзно вредит бизнесу: клиенты теряются, склад без контроля, отчёты опаздывают. Единая система Ovoza остановит эти потери.', modules: ['CRM + Склад', 'KPI колл-центра', 'Telegram-бот и телефония'] },
    ],
  },
  en: {
    eyebrow: 'Assessment',
    title: 'Does your business need',
    accent: 'automation?',
    subtitle: '5 questions — and we instantly show the hidden losses in your business.',
    step: 'Question',
    prev: 'Back',
    next: 'Next',
    finish: 'See result',
    restart: 'Start over',
    resultTitle: 'Your result',
    scoreLabel: 'Automation need',
    recommend: 'Recommended modules',
    cta: 'Get a free audit',
    questions: [
      { q: 'How is reporting and your customer base managed today?', options: [
        { label: 'In a ready CRM or system', weight: 0 },
        { label: 'In Excel, Google Sheets or Telegram', weight: 2 },
        { label: 'On paper or in a notebook', weight: 3 },
        { label: 'Not tracked at all (in our heads)', weight: 3 } ] },
      { q: 'How long does it take to know daily revenue and stock?', options: [
        { label: 'Shown automatically in seconds', weight: 0 },
        { label: 'We total it at day or week end', weight: 2 },
        { label: 'Several days or asking staff', weight: 3 },
        { label: 'We don’t really know, roughly', weight: 3 } ] },
      { q: 'Is salesperson / call-center performance tracked?', options: [
        { label: 'Full control — on a dashboard', weight: 0 },
        { label: 'Partly, but not precise', weight: 2 },
        { label: 'Only a manual end-of-day report', weight: 3 },
        { label: 'Not tracked at all', weight: 3 } ] },
      { q: 'Do customers get lost due to oversights?', options: [
        { label: 'Never, all with reminders', weight: 0 },
        { label: 'Sometimes, especially at peak', weight: 2 },
        { label: 'Often — staff forget to call back', weight: 3 },
        { label: 'We can’t measure it at all', weight: 3 } ] },
      { q: 'How many people are on your team?', options: [
        { label: '1–5 people', weight: 1 },
        { label: '5–20 people', weight: 2 },
        { label: '20–50 people', weight: 3 },
        { label: 'Over 50 (multiple branches)', weight: 3 } ] },
    ],
    diagnoses: [
      { level: 'Low', title: 'You’re on the right track — with room to grow', text: 'Your core processes are organized. Now the goal is to automate the last manual links, accelerate growth and bring errors to zero.', modules: ['Reports & dashboard', 'CRM extension', 'Integrations'] },
      { level: 'Medium', title: 'There are clear opportunities', text: 'Your data is scattered and a lot is done by hand. This costs time and money. A single system gives you transparency and speed.', modules: ['CRM system', 'Inventory & stock', 'Reports'] },
      { level: 'High', title: 'Automation is needed urgently', text: 'The scattered approach is seriously hurting your business: clients are lost, inventory is uncontrolled, reports lag. A single Ovoza system stops these losses.', modules: ['CRM + Inventory', 'Call-center KPI', 'Telegram bot & telephony'] },
    ],
  },
};

export function diagnoseIndex(score: number): 0 | 1 | 2 {
  if (score <= 4) return 0;
  if (score <= 9) return 1;
  return 2;
}

export function maxScore(content: QuizContent): number {
  return content.questions.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.weight)), 0);
}
