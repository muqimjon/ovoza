import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { Locale } from '../../../../core/i18n/locale';
import { Icon } from '../../../../shared/ui/icon';
import { SectionHeading } from '../../../../shared/ui/section-heading';
import { RevealDirective } from '../../../../shared/directives/reveal.directive';

type Member = {
  initials: string;
  name: string;
  role: string;
  desc: string;
  tagsIcon: string;
  tags: string;
};

const CONTENT: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    accent: string;
    subtitle: string;
    members: Member[];
  }
> = {
  uz: {
    eyebrow: 'Jamoa',
    title: 'Sizning loyihangiz',
    accent: 'orqasidagi jamoa',
    subtitle:
      'Biz shunchaki dasturchi emasmiz — jamoamizda 14 yildan ortiq amaliy biznes tajribasi bor. Har bir loyihada mas’uliyat aniq bo‘linadi: biri siz har kuni ko‘radigan ilovalarni, biri ma’lumot va serverlar ishonchini bo‘yniga oladi.',
    members: [
      {
        initials: 'AS',
        name: 'Avazbek Siddiqov',
        role: 'Desktop & Mobile Developer',
        desc: 'Loyihaning mijoz har kuni ko‘radigan qismiga javobgar: kassa va omborda uzilmay ishlaydigan Windows dasturlari hamda savdo agentlari va sotuvchilar uchun mobil ilovalar. Foydalanuvchi qulayligi va tezligi uning zimmasida.',
        tagsIcon: 'smartphone',
        tags: 'Windows • iOS • Android',
      },
      {
        initials: 'MM',
        name: 'Muqimjon Mamadaliyev',
        role: 'Backend & Deployment',
        desc: "Ma'lumotlaringiz xavfsizligi, serverlar tezligi va tizimlar o'zaro bog'lanishi uchun javobgar. Pul va mijoz ma'lumotlari hech qachon yo'qolmasligini ta'minlaydi.",
        tagsIcon: 'server',
        tags: 'Backend • DevOps • Cloud',
      },
    ],
  },
  ru: {
    eyebrow: 'Команда',
    title: 'Команда за',
    accent: 'вашим проектом',
    subtitle:
      'Мы не просто программисты — за плечами команды более 14 лет реального опыта в бизнесе. В каждом проекте ответственность чётко разделена: один отвечает за приложения, которые вы видите каждый день, другой — за надёжность данных и серверов.',
    members: [
      {
        initials: 'AS',
        name: 'Авазбек Сиддиков',
        role: 'Desktop & Mobile Developer',
        desc: 'Отвечает за ту часть проекта, которую клиент видит каждый день: настольные Windows-программы, работающие без сбоев на кассе и складе, и мобильные приложения для выездных сотрудников и продавцов. Удобство и скорость для пользователя — на нём.',
        tagsIcon: 'smartphone',
        tags: 'Windows • iOS • Android',
      },
      {
        initials: 'MM',
        name: 'Мукимжон Мамадалиев',
        role: 'Backend & Deployment',
        desc: 'Отвечает за безопасность ваших данных, скорость серверов и связку систем между собой. Гарантирует, что деньги и данные клиентов никогда не потеряются.',
        tagsIcon: 'server',
        tags: 'Backend • DevOps • Cloud',
      },
    ],
  },
  en: {
    eyebrow: 'Team',
    title: 'The team behind',
    accent: 'your project',
    subtitle:
      'We are more than developers — the team brings over 14 years of hands-on business experience. On every project responsibility is split clearly: one owns the apps you see every day, the other owns the reliability of your data and servers.',
    members: [
      {
        initials: 'AS',
        name: 'Avazbek Siddiqov',
        role: 'Desktop & Mobile Developer',
        desc: 'Owns the part of the project the client touches every day: reliable Windows apps that never stall at the counter or in the warehouse, plus mobile apps for field staff and sellers. The user’s speed and comfort are his responsibility.',
        tagsIcon: 'smartphone',
        tags: 'Windows • iOS • Android',
      },
      {
        initials: 'MM',
        name: 'Muqimjon Mamadaliyev',
        role: 'Backend & Deployment',
        desc: 'Responsible for the security of your data, fast servers and systems that talk to each other. Makes sure money and client records are never lost.',
        tagsIcon: 'server',
        tags: 'Backend • DevOps • Cloud',
      },
    ],
  },
};

@Component({
  selector: 'app-team',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, SectionHeading, RevealDirective],
  template: `
    <section id="team" class="px-6 py-20 md:py-28">
      <div class="mx-auto max-w-6xl">
        <app-section-heading
          [eyebrow]="c().eyebrow"
          icon="users"
          [title]="c().title"
          [accent]="c().accent"
          [subtitle]="c().subtitle"
        />

        <div class="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          @for (m of c().members; track m.initials) {
            <div appReveal [appReveal]="120" class="glass rainbow-edge rounded-3xl p-7">
              <div class="flex items-center gap-4">
                <div
                  class="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-brand-gradient text-xl font-black text-white shadow-[var(--shadow-glow)]"
                >
                  {{ m.initials }}
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white">{{ m.name }}</h3>
                  <p class="mt-1 font-mono text-xs uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
                    {{ m.role }}
                  </p>
                </div>
              </div>

              <p class="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {{ m.desc }}
              </p>

              <div
                class="mt-6 flex items-center gap-2 border-t border-slate-200/70 pt-4 text-sm font-medium text-slate-500 dark:border-white/10"
              >
                <app-icon [name]="m.tagsIcon" [size]="18" />
                <span>{{ m.tags }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Team {
  protected readonly i18n = inject(I18nService);
  protected readonly c = computed(() => CONTENT[this.i18n.locale()]);
}
