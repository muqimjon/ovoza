import React from "react";
import { Building2, Landmark, CheckCircle, MapPin, Gauge } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface PortfolioSectionProps {
  lang: Language;
}

export default function PortfolioSection({ lang }: PortfolioSectionProps) {
  const t = translations[lang];

  const caseStudies = [
    {
      title: t.clients.yuksalish.name,
      desc: t.clients.yuksalish.desc,
      results: t.clients.yuksalish.results,
      location: t.clients.yuksalish.location,
      metrics: lang === "uz" ? "Ombor, Savdo, Mijozlar" : lang === "ru" ? "Склад, Продажи, Клиенты" : "Stock, Sales, CRM",
      tag: "Bekson Shoes",
      icon: <Building2 className="text-cyan-400" size={24} />
    },
    {
      title: t.clients.alMansur.name,
      desc: t.clients.alMansur.desc,
      results: t.clients.alMansur.results,
      location: t.clients.alMansur.location,
      metrics: lang === "uz" ? "Kirim-chiqim, Ombor" : lang === "ru" ? "Приход-расход, Склад" : "Inputs, Finished stock",
      tag: "AL-MANSUR",
      icon: <Building2 className="text-blue-400" size={24} />
    },
    {
      title: t.clients.hamroh.name,
      desc: t.clients.hamroh.desc,
      results: t.clients.hamroh.results,
      location: t.clients.hamroh.location,
      metrics: lang === "uz" ? "KPI Tahlili, Call-Center (46 filial)" : lang === "ru" ? "Анализ KPI, Колл-центр (46 филиалов)" : "KPI Analytics, Call-Center (46 branches)",
      tag: "HAMROH",
      icon: <Landmark className="text-purple-400" size={24} />
    }
  ];

  return (
    <section id="portfolio" className="py-24 px-4 md:px-6 relative bg-transparent liquid-grid-bg">
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight text-slate-900 dark:text-white mb-4">
            {t.trustedTitle}
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 dark:text-slate-400">
            {t.trustedSubtitle}
          </p>
        </div>

        {/* Bento Grid layout style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((cs, idx) => (
            <div 
              key={idx}
              className="liquid-glass-card rainbow-edge flex flex-col justify-between p-6 md:p-8 hover:-translate-y-2 transition-transform duration-300 shadow-xl relative group overflow-hidden"
              id={`portfolio-card-${idx}`}
            >
              {/* Glass Sheen overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div>
                {/* Header Icon + tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
                    {cs.icon}
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400">
                    {cs.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-xl md:text-2xl text-slate-950 dark:text-white leading-tight mb-3">
                  {cs.title}
                </h3>

                {/* Location */}
                <span className="inline-flex items-center gap-1 text-xs text-slate-550 dark:text-slate-400 font-medium mb-4">
                  <MapPin size={12} className="text-red-500" />
                  {cs.location}
                </span>

                {/* Description */}
                <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed mb-6">
                  {cs.desc}
                </p>
              </div>

              {/* Automation deliverables & results */}
              <div className="border-t border-white/10 pt-5 mt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  {lang === "uz" ? "Erishilgan Natija" : lang === "ru" ? "Результат работы" : "Tangible Result"}
                </span>
                
                <div className="flex items-start gap-2 text-sm text-slate-800 dark:text-slate-200 font-medium mb-3">
                  <CheckCircle className="text-cyan-600 dark:text-cyan-400 mt-0.5 shrink-0" size={16} />
                  <span>{cs.results}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono font-bold">
                  <Gauge size={14} />
                  <span>{cs.metrics}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* 14+ years experience summary box */}
        <div className="mt-16 liquid-glass-card rainbow-edge p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between shadow-lg relative overflow-hidden">
          <div className="absolute -right-24 -bottom-24 w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
          
          <div className="flex-1">
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight mb-2">
              🏆 {t.experienceTitle}
            </h3>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
              {t.experienceText}
            </p>
          </div>
          
          <div className="text-center md:text-right shrink-0">
            <div className="text-5xl md:text-6xl font-display font-black bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">
              14+
            </div>
            <div className="text-xs font-mono font-bold tracking-wider uppercase text-slate-550 dark:text-slate-550">
              {lang === "uz" ? "Yillik Tajriba" : lang === "ru" ? "Лет Практики" : "Years Experience"}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
