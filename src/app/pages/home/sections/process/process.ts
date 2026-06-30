import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';
import { Icon } from '../../../../shared/ui/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading';

interface Step {
  icon: string;
  title: string;
  desc: string;
}

const CONTENT: Record<Locale, { eyebrow: string; title: string; accent: string; subtitle: string; steps: Step[] }> = {
  uz: {
    eyebrow: 'Jarayon',
    title: 'Boshlashdan ishga tushirishgacha —',
    accent: '5 qadam',
    subtitle: "Hammasi shaffof: har bosqichda nima bo'layotganini bilib turasiz.",
    steps: [
      { icon: 'search', title: 'Bepul audit', desc: "Biznesingizni o'rganamiz va og'riqli joylarni aniqlaymiz — bepul." },
      { icon: 'clipboard', title: 'Aniq taklif', desc: "Ko'lam, muddat va qat'iy narx bilan tushunarli taklif beramiz." },
      { icon: 'code', title: 'Ishlab chiqish', desc: "Tizimni siz uchun quramiz, har bosqichda ko'rsatib boramiz." },
      { icon: 'rocket', title: 'Joriy etish', desc: "Tizimni o'rnatamiz, ma'lumotni ko'chiramiz va xodimlarni o'qitamiz." },
      { icon: 'headset', title: "Qo'llab-quvvatlash", desc: "Ishga tushgach ham yoningizdamiz — yangiliklar va yordam." },
    ],
  },
  ru: {
    eyebrow: 'Процесс',
    title: 'От старта до запуска —',
    accent: '5 шагов',
    subtitle: 'Всё прозрачно: на каждом этапе вы знаете, что происходит.',
    steps: [
      { icon: 'search', title: 'Бесплатный аудит', desc: 'Изучаем ваш бизнес и находим узкие места — бесплатно.' },
      { icon: 'clipboard', title: 'Чёткое предложение', desc: 'Даём понятное предложение с объёмом, сроком и фиксированной ценой.' },
      { icon: 'code', title: 'Разработка', desc: 'Строим систему под вас и показываем результат на каждом этапе.' },
      { icon: 'rocket', title: 'Внедрение', desc: 'Устанавливаем систему, переносим данные и обучаем сотрудников.' },
      { icon: 'headset', title: 'Поддержка', desc: 'После запуска остаёмся рядом — обновления и помощь.' },
    ],
  },
  en: {
    eyebrow: 'Process',
    title: 'From start to launch —',
    accent: '5 steps',
    subtitle: 'Everything is transparent: at each stage you know exactly what is happening.',
    steps: [
      { icon: 'search', title: 'Free audit', desc: 'We study your business and find the bottlenecks — for free.' },
      { icon: 'clipboard', title: 'Clear proposal', desc: 'A clear proposal with scope, timeline and a fixed price.' },
      { icon: 'code', title: 'Development', desc: 'We build the system for you and show progress at every stage.' },
      { icon: 'rocket', title: 'Deployment', desc: 'We install the system, migrate data and train your staff.' },
      { icon: 'headset', title: 'Support', desc: 'After launch we stay by your side — updates and help.' },
    ],
  },
};

@Component({
  selector: 'app-process',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, SectionHeading, RevealDirective],
  template: `
    <section id="process" class="grid-bg px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <app-section-heading [eyebrow]="c().eyebrow" icon="rocket" [title]="c().title" [accent]="c().accent" [subtitle]="c().subtitle" />

        <div class="relative mt-14 grid gap-8 md:grid-cols-5 md:gap-4">
          <div class="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/40 to-indigo-500/0 md:block"></div>
          @for (step of c().steps; track step.title; let i = $index) {
            <div class="relative text-center md:text-left" appReveal [appReveal]="i * 110">
              <div class="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-[var(--shadow-glow)] md:mx-0">
                <app-icon [name]="step.icon" [size]="24" />
              </div>
              <span class="mt-4 block font-mono text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">0{{ i + 1 }}</span>
              <h3 class="mt-1 font-display text-lg font-black text-slate-900 dark:text-white">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{{ step.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Process {
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
}
