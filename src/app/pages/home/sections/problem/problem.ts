import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { Icon } from '../../../../shared/ui/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { TiltDirective } from '../../../../shared/directives/tilt.directive';

type Pain = { icon: string; title: string; text: string };

const CONTENT: Record<Locale, {
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  pains: Pain[];
}> = {
  uz: {
    eyebrow: 'Tanish muammolar',
    title: 'Bu holatlar sizga',
    accent: 'tanishmi?',
    subtitle:
      "Ma'lumotlar Excel, daftar va Telegramga sochilib ketgan, qo'lda ishlash esa kun sayin vaqt, pul va mijozlaringizni o'g'irlamoqda.",
    pains: [
      {
        icon: 'sheet',
        title: "Hammasi turli joyda sochilgan",
        text: "Bir narsa Excelda, ikkinchisi daftarda, uchinchisi Telegram yozishmalarida. Yagona joy yo'q — kerakli raqamni topguningizcha yarim kun ketadi.",
      },
      {
        icon: 'userX',
        title: "Mijozlar bildirmay yo'qoladi",
        text: "Hech kim qayta qo'ng'iroq qilmaydi, eslatma yo'q. Qiziqqan mijoz unutiladi va sizdan emas, raqobatchidan sotib oladi.",
      },
      {
        icon: 'eyeOff',
        title: "Bugungi holatni ko'rmaysiz",
        text: "Bugun qancha tushdi, qancha xarajat bo'ldi, omborda nima qoldi — buni real vaqtda bilolmaysiz. Qarorni taxminga qarab qabul qilasiz.",
      },
      {
        icon: 'clock',
        title: 'Hisobotga soatlab vaqt ketadi',
        text: "Har kuni yoki haftada hisobotni qo'lda yig'asiz. Bu soatlar oddiy hisob-kitobga sarflanadi, asosiy ishga emas.",
      },
      {
        icon: 'box',
        title: "Omborda xato va kamomad",
        text: "Tovar yetishmaydi, ortiqcha buyurtma qilinadi, kamomad esa kech aniqlanadi. Har xato — to'g'ridan-to'g'ri zarar.",
      },
      {
        icon: 'phoneOff',
        title: "Sotuvchilar ustidan nazorat yo'q",
        text: "Kim qo'ng'iroq qildi, nima va'da berdi, qancha sotdi — bilmaysiz. Call-markaz va sotuvchilar nazoratsiz ishlaydi.",
      },
    ],
  },
  ru: {
    eyebrow: 'Знакомые проблемы',
    title: 'Это вам',
    accent: 'знакомо?',
    subtitle:
      'Данные разбросаны по Excel, тетрадям и Telegram, а ручная работа каждый день забирает у вас время, деньги и клиентов.',
    pains: [
      {
        icon: 'sheet',
        title: 'Всё разбросано по разным местам',
        text: 'Одно в Excel, другое в тетради, третье в переписке Telegram. Единого места нет — чтобы найти нужную цифру, уходит полдня.',
      },
      {
        icon: 'userX',
        title: 'Клиенты уходят незаметно',
        text: 'Никто не перезванивает, напоминаний нет. Заинтересованный клиент забывается и покупает у конкурента, а не у вас.',
      },
      {
        icon: 'eyeOff',
        title: 'Не видно текущей картины',
        text: 'Сколько пришло сегодня, сколько потратили, что осталось на складе — в реальном времени не видно. Решения принимаются наугад.',
      },
      {
        icon: 'clock',
        title: 'Отчёты отнимают часы',
        text: 'Каждый день или неделю вы собираете отчёт вручную. Эти часы уходят на рутинные подсчёты, а не на развитие бизнеса.',
      },
      {
        icon: 'box',
        title: 'Ошибки и недостача на складе',
        text: 'Товара не хватает, заказывают лишнее, а недостачу замечают слишком поздно. Каждая ошибка — это прямой убыток.',
      },
      {
        icon: 'phoneOff',
        title: 'Нет контроля над продавцами',
        text: 'Кто звонил, что обещал, сколько продал — вы не знаете. Call-центр и продавцы работают без контроля.',
      },
    ],
  },
  en: {
    eyebrow: 'Familiar pains',
    title: 'Does this',
    accent: 'sound familiar?',
    subtitle:
      'Your data is scattered across Excel, notebooks and Telegram, while manual work quietly drains your time, money and customers every single day.',
    pains: [
      {
        icon: 'sheet',
        title: 'Everything lives in different places',
        text: 'One thing is in Excel, another in a notebook, a third in Telegram chats. Nothing is in one place — finding a single number eats up half a day.',
      },
      {
        icon: 'userX',
        title: 'Clients slip away unnoticed',
        text: 'Nobody follows up, there are no reminders. An interested client gets forgotten and buys from a competitor instead of you.',
      },
      {
        icon: 'eyeOff',
        title: "You can't see today's picture",
        text: "How much came in today, what you spent, what's left in stock — you can't see it in real time. Decisions end up being guesswork.",
      },
      {
        icon: 'clock',
        title: 'Reports steal hours every day',
        text: 'Every day or week you build reports by hand. Those hours go into routine number-crunching instead of growing the business.',
      },
      {
        icon: 'box',
        title: 'Warehouse errors and shrinkage',
        text: 'Stock runs out, too much gets ordered, and shortages are noticed far too late. Every mistake is a direct loss.',
      },
      {
        icon: 'phoneOff',
        title: 'No control over your sales team',
        text: 'Who called, what they promised, how much they sold — you have no idea. The call-center and salespeople work with zero oversight.',
      },
    ],
  },
};

@Component({
  selector: 'app-problem',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, SectionHeading, RevealDirective, TiltDirective],
  template: `
    <section id="problem" class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <app-section-heading
          [eyebrow]="c().eyebrow"
          icon="alert"
          [title]="c().title"
          [accent]="c().accent"
          [subtitle]="c().subtitle"
        />

        <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (pain of c().pains; track pain.title; let i = $index) {
            <div
              [appReveal]="i * 90"
              appTilt
              class="glass rainbow-edge rounded-2xl p-6"
            >
              <div
                class="grid h-12 w-12 place-items-center rounded-2xl"
                [class]="i % 2 === 0
                  ? 'bg-red-500/10 text-red-500'
                  : 'bg-amber-500/10 text-amber-500'"
              >
                <app-icon [name]="pain.icon" [size]="22" />
              </div>
              <h3 class="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                {{ pain.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {{ pain.text }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Problem {
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
}
