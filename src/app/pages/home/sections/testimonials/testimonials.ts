import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { SectionHeading } from '../../../../shared/ui/section-heading';
import { Icon } from '../../../../shared/ui/icon';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

type Card = { quote: string; name: string; initials: string; role: string };

type Copy = {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  note: string;
  cards: Card[];
};

const CONTENT: Record<Locale, Copy> = {
  uz: {
    eyebrow: 'Mijozlar fikri',
    title: 'Mijozlarimiz',
    accent: 'nima deydi',
    subtitle: 'Ishlab chiqarish, savdo va xizmat koʻrsatishda dasturlarimiz har kuni qanday yordam berayotgani haqida.',
    note: 'Ismlar mijozlar maxfiyligi uchun vakillik tarzida keltirilgan.',
    cards: [
      {
        quote:
          'Ilgari ombor qoldigʻini Excelda yuritardik va oy oxirida hisob har doim chalkash chiqardi. Endi har bir model va oʻlcham boʻyicha qoldiq real vaqtda koʻrinadi. Inventarizatsiyada yoʻqotish deyarli toʻxtadi.',
        name: 'Sardor Yoʻldoshev',
        initials: 'SY',
        role: 'Ishlab chiqarish boshligʻi, poyabzal fabrikasi',
      },
      {
        quote:
          'Bizda 40 dan ortiq filial bor va har birida nima boʻlayotganini bilish qiyin edi. Tizim har bir filialni bitta ekranda koʻrsatadi. Kunlik hisobotni kutib oʻtirmayman — tushdan oldin toʻliq manzara qoʻlimda.',
        name: 'Nigora Karimova',
        initials: 'NK',
        role: 'Operatsiyalar rahbari, mikromoliya tarmogʻi',
      },
      {
        quote:
          'Qoʻngʻiroqlar avval daftarda yozilardi, kim qancha ishlaganini aniqlash mumkin emasdi. Endi har bir operatorning natijasi raqamlarda. Javobsiz qoʻngʻiroqlar kamaydi, mijozlar kamroq yoʻqolyapti.',
        name: 'Jahongir Aliyev',
        initials: 'JA',
        role: 'Call-markaz rahbari, kabel zavodi',
      },
    ],
  },
  ru: {
    eyebrow: 'Отзывы',
    title: 'Что говорят',
    accent: 'клиенты',
    subtitle: 'Как наши программы каждый день помогают в производстве, продажах и сервисе.',
    note: 'Имена указаны условно в целях конфиденциальности клиентов.',
    cards: [
      {
        quote:
          'Раньше мы вели складские остатки в Excel, и в конце месяца цифры всегда не сходились. Теперь остаток по каждой модели и размеру виден в реальном времени. Потери на инвентаризации практически прекратились.',
        name: 'Сардор Юлдашев',
        initials: 'СЮ',
        role: 'Начальник производства, обувная фабрика',
      },
      {
        quote:
          'У нас более 40 филиалов, и понимать, что происходит в каждом, было сложно. Система показывает все филиалы на одном экране. Я больше не жду отчётов — полная картина у меня уже до обеда.',
        name: 'Нигора Каримова',
        initials: 'НК',
        role: 'Руководитель операций, сеть микрофинансирования',
      },
      {
        quote:
          'Звонки раньше записывались в тетрадь, и понять, кто сколько работает, было невозможно. Теперь результат каждого оператора в цифрах. Пропущенных звонков стало меньше, клиенты реже теряются.',
        name: 'Джахонгир Алиев',
        initials: 'ДА',
        role: 'Руководитель call-центра, кабельный завод',
      },
    ],
  },
  en: {
    eyebrow: 'Testimonials',
    title: 'What our',
    accent: 'clients say',
    subtitle: 'How our software helps every day across production, sales and customer service.',
    note: 'Names are representative to protect client confidentiality.',
    cards: [
      {
        quote:
          'We used to track stock in Excel and the numbers never matched at month-end. Now the balance for every model and size is visible in real time. Losses during stock-taking have almost stopped.',
        name: 'Sardor Yuldashev',
        initials: 'SY',
        role: 'Production Manager, footwear factory',
      },
      {
        quote:
          'We run more than 40 branches and it was hard to know what was happening in each one. The system shows every branch on a single screen. I no longer wait for daily reports — the full picture is in my hands before noon.',
        name: 'Nigora Karimova',
        initials: 'NK',
        role: 'Head of Operations, microfinance network',
      },
      {
        quote:
          'Calls were written in a notebook and it was impossible to tell who handled how much. Now every operator’s result is in numbers. Missed calls are down and we lose far fewer customers.',
        name: 'Jahongir Aliyev',
        initials: 'JA',
        role: 'Call-center Lead, cable factory',
      },
    ],
  },
};

@Component({
  selector: 'app-testimonials',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, Icon, RevealDirective],
  template: `
    <section id="testimonials" class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <app-section-heading
          [eyebrow]="c().eyebrow"
          icon="quote"
          [title]="c().title"
          [accent]="c().accent"
          [subtitle]="c().subtitle"
        />

        <div class="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          @for (item of c().cards; track item.name; let i = $index) {
            <figure
              appReveal
              [appReveal]="i * 120"
              class="glass rainbow-edge flex flex-col rounded-2xl p-6"
            >
              <div class="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <app-icon name="quote" [size]="22" />
              </div>

              <blockquote class="mt-5 flex-1 text-[0.975rem] leading-relaxed text-slate-600 dark:text-slate-300">
                {{ item.quote }}
              </blockquote>

              <figcaption class="mt-6 flex items-center gap-3 border-t border-slate-200/60 pt-5 dark:border-white/10">
                <div
                  class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-gradient text-sm font-semibold text-white shadow-[var(--shadow-glow)]"
                  aria-hidden="true"
                >
                  {{ item.initials }}
                </div>
                <div class="min-w-0">
                  <div class="truncate font-semibold text-slate-900 dark:text-white">{{ item.name }}</div>
                  <div class="truncate text-sm text-slate-500">{{ item.role }}</div>
                </div>
              </figcaption>
            </figure>
          }
        </div>

        <p class="mt-8 text-center text-xs text-slate-500">{{ c().note }}</p>
      </div>
    </section>
  `,
})
export class Testimonials {
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
}
