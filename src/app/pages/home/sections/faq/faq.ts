import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { Icon } from '../../../../shared/ui/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

type FaqItem = { q: string; a: string };

const CONTENT: Record<Locale, {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  items: FaqItem[];
}> = {
  uz: {
    eyebrow: 'Savol-javob',
    title: "Ko'p so'raladigan",
    accent: 'savollar',
    subtitle: "Eng ko'p beriladigan savollarga aniq javoblar. Javobini topmadingizmi — bizga yozing, soat ichida bog'lanamiz.",
    ctaText: 'Boshqa savolingiz bormi? Bepul audit so‘rang',
    ctaLink: 'Bog‘lanish',
    items: [
      {
        q: 'Loyiha qancha vaqtda tayyor bo‘ladi?',
        a: 'Ko‘pchilik loyihalar bir necha haftadan bir-ikki oygacha tayyor bo‘ladi — hammasi hajmga bog‘liq. Avval bepul audit o‘tkazamiz, so‘ng aniq muddatni belgilab beramiz va bosqichma-bosqich ko‘rsatib boramiz.',
      },
      {
        q: 'Narx qanday belgilanadi?',
        a: 'Avval biznesingizni bepul o‘rganamiz va kerakli ishni aniqlaymiz. Shundan keyin bir martalik qat’iy narx aytamiz — oylik to‘lov yo‘q, yashirin xarajat yo‘q. Kelishilgan narx oxirigacha o‘zgarmaydi.',
      },
      {
        q: 'Ma’lumotlarim xavfsizmi, kimga tegishli bo‘ladi?',
        a: 'Barcha ma’lumot va dasturning manba kodi to‘liq sizniki. Tizim o‘zingizning serveringizda ishlaydi, biz hech narsani garovda ushlab qolmaymiz. Xohlagan paytda boshqa jamoaga o‘tishingiz mumkin — bog‘lanib qolmaysiz.',
      },
      {
        q: 'Men allaqachon Billz yoki MoySklad ishlataman — nega o‘tishim kerak?',
        a: 'Tayyor dasturlar hammaga bir xil. Biz esa aynan sizning ish jarayoningizga moslab quramiz: ular qo‘shmaydigan funksiyalar, sizning hisobotlaringiz, sizning qoidalaringiz. Ustiga — oylik abonent to‘lovi yo‘q, bir marta to‘laysiz va dastur sizniki bo‘ladi.',
      },
      {
        q: 'Xodimlarni o‘rgatasizmi?',
        a: 'Albatta. Ishga tushirishda jamoangizni o‘rgatamiz, soddagina qo‘llanma va video ko‘rsatmalar beramiz. Maqsad — birinchi kundanoq hamma bemalol foydalana olishi.',
      },
      {
        q: 'Ishga tushgandan keyin qo‘llab-quvvatlash bormi?',
        a: 'Ha. Ishlab chiquvchilar bilan to‘g‘ridan-to‘g‘ri aloqadasiz — operator emas, kodni yozgan odam javob beradi. Savol yoki muammo chiqsa tez hal qilamiz, kerak bo‘lsa yangi funksiyalar qo‘shamiz.',
      },
      {
        q: 'Telegram bot, IP-telefoniya yoki buxgalteriyani ulay olasizmi?',
        a: 'Ha, ulashning hammasini qilamiz: Telegram botlar, IP-telefoniya va qo‘ng‘iroqlar nazorati, buxgalteriya va boshqa tizimlar bilan bog‘lash. Hamma narsa bitta joyda yig‘iladi.',
      },
      {
        q: 'Qanday boshlaymiz?',
        a: 'Juda oddiy — bepul auditdan boshlaymiz. Bitta so‘rov qoldiring, biznesingizni o‘rganamiz va nimani avtomatlashtirsa bo‘lishini, qancha vaqt va pul tejashini ko‘rsatib beramiz. Hech qanday majburiyatsiz.',
      },
    ],
  },
  ru: {
    eyebrow: 'Вопросы и ответы',
    title: 'Частые',
    accent: 'вопросы',
    subtitle: 'Чёткие ответы на самые частые вопросы. Не нашли свой — напишите нам, ответим в течение часа.',
    ctaText: 'Остались вопросы? Закажите бесплатный аудит',
    ctaLink: 'Связаться',
    items: [
      {
        q: 'Сколько времени занимает проект?',
        a: 'Большинство проектов готовы за срок от нескольких недель до пары месяцев — всё зависит от объёма. Сначала проводим бесплатный аудит, затем называем точный срок и ведём вас по этапам.',
      },
      {
        q: 'Как формируется цена?',
        a: 'Сначала бесплатно изучаем ваш бизнес и определяем нужный объём работ. После этого называем фиксированную цену за один раз — никаких ежемесячных платежей и скрытых расходов. Согласованная сумма не меняется до конца.',
      },
      {
        q: 'Мои данные в безопасности, кому они принадлежат?',
        a: 'Все данные и исходный код программы полностью ваши. Система работает на вашем сервере, мы ничего не держим в заложниках. В любой момент можете перейти к другой команде — вы не привязаны к нам.',
      },
      {
        q: 'Я уже пользуюсь Billz или МойСклад — зачем переходить?',
        a: 'Готовые программы одинаковы для всех. Мы же строим систему точно под ваши процессы: функции, которые они не добавят, ваши отчёты, ваши правила. И главное — никакой ежемесячной абонплаты: платите один раз, и программа становится вашей.',
      },
      {
        q: 'Обучаете ли вы сотрудников?',
        a: 'Конечно. При запуске обучаем вашу команду, даём простую инструкцию и видео-руководства. Цель — чтобы все уверенно работали с первого дня.',
      },
      {
        q: 'Есть ли поддержка после запуска?',
        a: 'Да. Вы напрямую связаны с разработчиками — отвечает не оператор, а человек, написавший код. Любой вопрос решаем быстро, при необходимости добавляем новые функции.',
      },
      {
        q: 'Можете подключить Telegram-боты, IP-телефонию или бухгалтерию?',
        a: 'Да, делаем любые интеграции: Telegram-боты, IP-телефония и контроль звонков, связка с бухгалтерией и другими системами. Всё собирается в одном месте.',
      },
      {
        q: 'Как начать?',
        a: 'Очень просто — начинаем с бесплатного аудита. Оставьте одну заявку, мы изучим ваш бизнес и покажем, что можно автоматизировать, сколько времени и денег это сэкономит. Без каких-либо обязательств.',
      },
    ],
  },
  en: {
    eyebrow: 'FAQ',
    title: 'Frequently asked',
    accent: 'questions',
    subtitle: 'Clear answers to the questions we hear most. Don’t see yours — message us and we’ll reply within the hour.',
    ctaText: 'Still have questions? Book a free audit',
    ctaLink: 'Get in touch',
    items: [
      {
        q: 'How long does a project take?',
        a: 'Most projects are ready in anywhere from a few weeks to a couple of months, depending on scope. We start with a free audit, then give you a firm timeline and walk you through it stage by stage.',
      },
      {
        q: 'How is the price determined?',
        a: 'First we study your business for free and define exactly what’s needed. Then we quote a fixed, one-time price — no monthly fees, no hidden costs. The agreed amount stays the same to the end.',
      },
      {
        q: 'Is my data safe, and who owns it?',
        a: 'All your data and the program’s source code are fully yours. The system runs on your own server and we hold nothing hostage. You can move to another team whenever you like — you’re never locked in.',
      },
      {
        q: 'I already use Billz or MoySklad — why switch?',
        a: 'Off-the-shelf software is the same for everyone. We build exactly around your workflow: the features they won’t add, your reports, your rules. And there’s no monthly subscription — you pay once and the software becomes yours.',
      },
      {
        q: 'Do you train staff?',
        a: 'Absolutely. At launch we onboard your team and provide a simple guide and video walkthroughs. The goal is for everyone to use it confidently from day one.',
      },
      {
        q: 'What about support after launch?',
        a: 'Yes. You get a direct line to the developers — not a call-centre operator, but the person who wrote the code. We resolve any question fast and add new features as your business grows.',
      },
      {
        q: 'Can you integrate Telegram bots, IP-telephony or accounting?',
        a: 'Yes, we handle all of it: Telegram bots, IP-telephony and call tracking, links to your accounting and other systems. Everything comes together in one place.',
      },
      {
        q: 'How do we start?',
        a: 'It’s simple — we begin with a free audit. Leave one request, we’ll study your business and show what can be automated and how much time and money it saves. With no obligation.',
      },
    ],
  },
};

@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, Icon, SectionHeading, RevealDirective],
  template: `
    <section id="faq" class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <app-section-heading
          eyebrow="{{ c().eyebrow }}"
          icon="sparkles"
          title="{{ c().title }}"
          accent="{{ c().accent }}"
          subtitle="{{ c().subtitle }}"
        />

        <div class="mx-auto mt-12 max-w-3xl space-y-4">
          @for (item of c().items; track item.q; let i = $index) {
            <div appReveal [appReveal]="i * 60" class="glass rounded-2xl overflow-hidden">
              <button
                type="button"
                (click)="toggle(i)"
                [attr.aria-expanded]="open() === i"
                class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span class="text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
                  {{ item.q }}
                </span>
                <span
                  class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cyan-500/10 text-cyan-600 transition-transform duration-300 dark:text-cyan-400"
                  [class.rotate-90]="open() === i"
                >
                  <app-icon name="arrowRight" [size]="18" />
                </span>
              </button>
              @if (open() === i) {
                <div class="px-6 pb-6 -mt-1">
                  <p class="text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                    {{ item.a }}
                  </p>
                </div>
              }
            </div>
          }

          <div class="pt-4 text-center">
            <a
              [routerLink]="i18n.localizedPath()"
              fragment="contact"
              class="sheen inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 font-semibold text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.04]"
            >
              {{ c().ctaText }}
              <app-icon name="arrowRight" [size]="18" />
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Faq {
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
  protected readonly open = signal<number | null>(0);

  protected toggle(i: number) {
    this.open.set(this.open() === i ? null : i);
  }
}
