import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { Icon } from '../../../../shared/ui/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading';

type Feature = { icon: string; title: string; text: string };

const CONTENT: Record<Locale, {
  eyebrow: string; title: string; accent: string; subtitle: string; features: Feature[];
}> = {
  uz: {
    eyebrow: 'Nega Ovoza',
    title: 'Tayyor andoza emas —',
    accent: 'siz uchun tizim',
    subtitle:
      'Tayyor dasturlar sizni o‘z qoliplariga tiqadi. Biz teskarisini qilamiz — tizimni aynan sizning ish uslubingizga quramiz.',
    features: [
      {
        icon: 'sliders',
        title: '100% moslashuvchanlik',
        text: 'Tizim sizning jarayonlaringizga quriladi — siz tayyor andozaga moslashmaysiz. Har bir tugma, hisobot va bosqich aynan sizning ishingizdek ishlaydi.',
      },
      {
        icon: 'wallet',
        title: 'Bir martalik to‘lov',
        text: 'Bir marta to‘laysiz — tizim sizniki bo‘ladi. Oylik obuna yo‘q, har yili uzaytirish yo‘q, foydalanuvchi sonidan kelib chiqqan yashirin to‘lovlar yo‘q.',
      },
      {
        icon: 'headset',
        title: 'To‘g‘ridan-to‘g‘ri dasturchi yordami',
        text: 'Navbat, ticket va javob bermaydigan botlar emas — tizimingizni va biznesingizni shaxsan biladigan jamoa bilan to‘g‘ridan-to‘g‘ri gaplashasiz.',
      },
      {
        icon: 'shield',
        title: 'Kod va ma’lumot o‘zingizniki',
        text: 'Tizim sizning serveringizda ishlaydi, mijoz bazangiz va savdo ma’lumotlaringiz to‘liq nazoratingizda. Hech kim ularni bloklab yoki o‘chirib qo‘ya olmaydi.',
      },
    ],
  },
  ru: {
    eyebrow: 'Почему Ovoza',
    title: 'Не готовый шаблон —',
    accent: 'система под вас',
    subtitle:
      'Готовые программы заставляют вас подстраиваться под их рамки. Мы делаем наоборот — строим систему точно под то, как работаете вы.',
    features: [
      {
        icon: 'sliders',
        title: '100% гибкость',
        text: 'Система строится под ваши процессы — это не вы подстраиваетесь под шаблон. Каждая кнопка, отчёт и этап работают именно так, как принято у вас.',
      },
      {
        icon: 'wallet',
        title: 'Разовая оплата',
        text: 'Платите один раз — и система ваша. Никакой ежемесячной подписки, ежегодного продления и скрытых доплат за количество пользователей.',
      },
      {
        icon: 'headset',
        title: 'Прямая поддержка разработчика',
        text: 'Никаких очередей, тикетов и ботов, которые не отвечают. Вы общаетесь напрямую с командой, которая лично знает вашу систему и ваш бизнес.',
      },
      {
        icon: 'shield',
        title: 'Код и данные принадлежат вам',
        text: 'Система работает на вашем сервере, а база клиентов и данные о продажах полностью под вашим контролем. Никто не сможет их заблокировать или удалить.',
      },
    ],
  },
  en: {
    eyebrow: 'Why Ovoza',
    title: 'Not a template —',
    accent: 'a system for you',
    subtitle:
      'Off-the-shelf software forces you into its boxes. We do the opposite — we build the system around exactly how you already work.',
    features: [
      {
        icon: 'sliders',
        title: '100% adaptable',
        text: 'The system is built around your processes — you never bend to fit a template. Every button, report and step works the way your business actually runs.',
      },
      {
        icon: 'wallet',
        title: 'One-time payment',
        text: 'You pay once and the system is yours. No monthly subscription, no yearly renewal and no hidden fees based on how many people use it.',
      },
      {
        icon: 'headset',
        title: 'Direct developer support',
        text: 'No queues, no tickets and no bots that never reply. You talk straight to the team that personally knows your system and your business.',
      },
      {
        icon: 'shield',
        title: 'You own the code and data',
        text: 'The system runs on your own server, and your client base and sales data stay fully under your control. No one can lock you out or shut it down.',
      },
    ],
  },
};

@Component({
  selector: 'app-why-ovoza',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeading, Icon, RevealDirective],
  template: `
    <section id="advantages" class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <app-section-heading
          [eyebrow]="c().eyebrow"
          icon="sparkles"
          [title]="c().title"
          [accent]="c().accent"
          [subtitle]="c().subtitle"
        />

        <div class="mt-14 grid gap-6 sm:grid-cols-2">
          @for (f of c().features; track f.title) {
            <div appReveal [appReveal]="$index * 100" class="glass rainbow-edge group rounded-3xl p-7">
              <div class="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-600 transition-transform group-hover:scale-110 dark:text-cyan-400">
                <app-icon [name]="f.icon" [size]="26" />
              </div>
              <h3 class="mt-6 text-xl font-bold text-slate-900 dark:text-white">{{ f.title }}</h3>
              <p class="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">{{ f.text }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class WhyOvoza {
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
}
