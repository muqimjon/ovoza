import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { LeadService } from '../../../../core/lead/lead.service';
import { QuizStore } from '../../../../core/quiz/quiz.store';
import { SITE } from '../../../../core/site';
import { Icon } from '../../../../shared/ui/icon';

const CONTENT: Record<Locale, {
  eyebrow: string; title: string; subtitle: string;
  name: string; phone: string; telegram: string; business: string; message: string;
  namePh: string; businessPh: string; messagePh: string;
  submit: string; sending: string; success: string; successSub: string; again: string; error: string;
  quizNote: string; reach: string; promise: string;
}> = {
  uz: {
    eyebrow: 'Aloqa', title: 'Bepul auditni boshlaymizmi?',
    subtitle: "Ma'lumotlaringizni qoldiring — 1 ish kuni ichida bog'lanamiz va biznesingiz uchun aniq yechimni muhokama qilamiz.",
    name: 'Ism familiya', phone: 'Telefon raqam', telegram: 'Telegram (ixtiyoriy)', business: 'Biznesingiz', message: 'Xabar (ixtiyoriy)',
    namePh: 'Avazbek Siddiqov', businessPh: 'Masalan: oyoq kiyim ishlab chiqarish', messagePh: "Qisqacha — nimani avtomatlashtirmoqchisiz?",
    submit: "So'rov yuborish", sending: 'Yuborilmoqda…', success: "So'rovingiz qabul qilindi!", successSub: "Tez orada bog'lanamiz. Rahmat!", again: 'Yana yuborish', error: "Xatolik yuz berdi. Telefon yoki Telegram orqali bog'laning.",
    quizNote: 'Test natijangiz avtomatik biriktiriladi.', reach: "To'g'ridan-to'g'ri aloqa", promise: '1 ish kuni ichida javob beramiz',
  },
  ru: {
    eyebrow: 'Контакты', title: 'Начнём с бесплатного аудита?',
    subtitle: 'Оставьте контакты — свяжемся в течение 1 рабочего дня и обсудим точное решение для вашего бизнеса.',
    name: 'Имя и фамилия', phone: 'Номер телефона', telegram: 'Telegram (необязательно)', business: 'Ваш бизнес', message: 'Сообщение (необязательно)',
    namePh: 'Авазбек Сиддиков', businessPh: 'Например: производство обуви', messagePh: 'Кратко — что хотите автоматизировать?',
    submit: 'Отправить заявку', sending: 'Отправка…', success: 'Заявка принята!', successSub: 'Скоро свяжемся. Спасибо!', again: 'Отправить ещё', error: 'Произошла ошибка. Свяжитесь по телефону или в Telegram.',
    quizNote: 'Результат теста прикрепится автоматически.', reach: 'Прямая связь', promise: 'Ответим в течение 1 рабочего дня',
  },
  en: {
    eyebrow: 'Contact', title: 'Shall we start with a free audit?',
    subtitle: 'Leave your details — we’ll reach out within 1 business day and discuss the exact solution for your business.',
    name: 'Full name', phone: 'Phone number', telegram: 'Telegram (optional)', business: 'Your business', message: 'Message (optional)',
    namePh: 'Avazbek Siddiqov', businessPh: 'e.g. footwear manufacturing', messagePh: 'Briefly — what do you want to automate?',
    submit: 'Send request', sending: 'Sending…', success: 'Request received!', successSub: 'We’ll be in touch soon. Thank you!', again: 'Send another', error: 'Something went wrong. Reach us by phone or Telegram.',
    quizNote: 'Your quiz result will be attached automatically.', reach: 'Reach us directly', promise: 'We reply within 1 business day',
  },
};

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <section id="contact" class="grid-bg px-6 py-20 md:py-28">
      <div class="mx-auto max-w-5xl">
        <div class="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <span class="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300">
              <app-icon name="send" [size]="13" />{{ c().eyebrow }}
            </span>
            <h2 class="mt-4 font-display text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">{{ c().title }}</h2>
            <p class="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">{{ c().subtitle }}</p>

            <div class="mt-8 space-y-3">
              <p class="text-xs font-bold uppercase tracking-wider text-slate-400">{{ c().reach }}</p>
              <a [href]="'tel:' + site.phone" class="flex items-center gap-3 text-slate-700 hover:text-cyan-600 dark:text-slate-200 dark:hover:text-cyan-400">
                <span class="grid h-9 w-9 place-items-center rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"><app-icon name="phone" [size]="16" /></span>
                <span class="font-mono font-semibold">{{ site.phoneDisplay }}</span>
              </a>
              <a [href]="site.telegram" target="_blank" rel="noopener" class="flex items-center gap-3 text-slate-700 hover:text-cyan-600 dark:text-slate-200 dark:hover:text-cyan-400">
                <span class="grid h-9 w-9 place-items-center rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"><app-icon name="send" [size]="16" /></span>
                <span class="font-semibold">{{ site.handle }}</span>
              </a>
              <a [href]="'mailto:' + site.email" class="flex items-center gap-3 text-slate-700 hover:text-cyan-600 dark:text-slate-200 dark:hover:text-cyan-400">
                <span class="grid h-9 w-9 place-items-center rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"><app-icon name="mail" [size]="16" /></span>
                <span class="font-semibold">{{ site.email }}</span>
              </a>
              <p class="flex items-center gap-2 pt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400"><app-icon name="clock" [size]="15" />{{ c().promise }}</p>
            </div>
          </div>

          <div class="glass-strong rainbow-edge rounded-3xl p-6 md:p-8">
            @if (success()) {
              <div class="flex flex-col items-center py-10 text-center">
                <div class="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"><app-icon name="check" [size]="34" [width]="2.5" /></div>
                <h3 class="mt-5 font-display text-2xl font-black text-slate-900 dark:text-white">{{ c().success }}</h3>
                <p class="mt-2 text-slate-600 dark:text-slate-400">{{ c().successSub }}</p>
                <button type="button" (click)="success.set(false)" class="mt-6 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white">{{ c().again }}</button>
              </div>
            } @else {
              <form (submit)="submit($event)" class="space-y-4">
                @if (quiz.completed()) {
                  <div class="flex items-center gap-2 rounded-xl bg-cyan-500/10 px-4 py-3 text-sm font-medium text-cyan-700 dark:text-cyan-300">
                    <app-icon name="check" [size]="16" />{{ c().quizNote }}
                  </div>
                }
                <div class="grid gap-4 sm:grid-cols-2">
                  <label class="block">
                    <span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ c().name }} <span class="text-red-500">*</span></span>
                    <input class="field" [value]="name()" (input)="name.set(val($event))" [placeholder]="c().namePh" required />
                  </label>
                  <label class="block">
                    <span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ c().phone }} <span class="text-red-500">*</span></span>
                    <input class="field" type="tel" [value]="phone()" (input)="phone.set(val($event))" placeholder="+998 90 123 45 67" required />
                  </label>
                  <label class="block">
                    <span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ c().telegram }}</span>
                    <input class="field" [value]="telegram()" (input)="telegram.set(val($event))" placeholder="@username" />
                  </label>
                  <label class="block">
                    <span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ c().business }}</span>
                    <input class="field" [value]="business()" (input)="business.set(val($event))" [placeholder]="c().businessPh" />
                  </label>
                </div>
                <label class="block">
                  <span class="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{{ c().message }}</span>
                  <textarea class="field" rows="3" [value]="message()" (input)="message.set(val($event))" [placeholder]="c().messagePh"></textarea>
                </label>

                @if (error()) {
                  <p class="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400"><app-icon name="alert" [size]="16" />{{ c().error }}</p>
                }

                <button type="submit" [disabled]="sending() || !name() || !phone()"
                        class="sheen flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-4 font-display font-bold text-white shadow-[var(--shadow-glow)] transition-transform enabled:hover:scale-[1.02] disabled:opacity-50">
                  {{ sending() ? c().sending : c().submit }}<app-icon name="send" [size]="17" />
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Contact {
  protected readonly i18n = inject(I18nService);
  protected readonly quiz = inject(QuizStore);
  private readonly lead = inject(LeadService);
  protected readonly site = SITE;
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);

  protected readonly name = signal('');
  protected readonly phone = signal('');
  protected readonly telegram = signal('');
  protected readonly business = signal('');
  protected readonly message = signal('');
  protected readonly sending = signal(false);
  protected readonly success = signal(false);
  protected readonly error = signal(false);

  protected val(e: Event): string {
    return (e.target as HTMLInputElement | HTMLTextAreaElement).value;
  }

  protected async submit(e: Event): Promise<void> {
    e.preventDefault();
    if (!this.name() || !this.phone() || this.sending()) return;
    this.sending.set(true);
    this.error.set(false);
    const ok = await this.lead.submit({
      name: this.name(),
      phone: this.phone(),
      telegram: this.telegram(),
      business: this.business(),
      message: this.message(),
      quizSummary: this.quiz.summary(),
      quizAnswers: this.quiz.answers(),
      lang: this.i18n.locale(),
    });
    this.sending.set(false);
    if (ok) {
      this.success.set(true);
      this.name.set('');
      this.phone.set('');
      this.telegram.set('');
      this.business.set('');
      this.message.set('');
    } else {
      this.error.set(true);
    }
  }
}
