import React from "react";
import { Check, X, Shield, Sparkles, Layers, Zap } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface ComparisonSectionProps {
  lang: Language;
}

export default function ComparisonSection({ lang }: ComparisonSectionProps) {
  const t = translations[lang];
  const p = t.comparisonPoints;

  const points = [
    {
      title: p.flexibility.title,
      ready: p.flexibility.ready,
      bespoke: p.flexibility.bespoke,
      readyOk: false,
      bespokeOk: true,
      icon: <Layers size={20} className="text-cyan-400" />
    },
    {
      title: p.integration.title,
      ready: p.integration.ready,
      bespoke: p.integration.bespoke,
      readyOk: false,
      bespokeOk: true,
      icon: <Zap size={20} className="text-blue-400" />
    },
    {
      title: p.pricing.title,
      ready: p.pricing.ready,
      bespoke: p.pricing.bespoke,
      readyOk: false,
      bespokeOk: true,
      icon: <Shield size={20} className="text-cyan-450" />
    },
    {
      title: p.addFeature.title,
      ready: p.addFeature.ready,
      bespoke: p.addFeature.bespoke,
      readyOk: false,
      bespokeOk: true,
      icon: <Sparkles size={20} className="text-purple-400" />
    },
    {
      title: p.support.title,
      ready: p.support.ready,
      bespoke: p.support.bespoke,
      readyOk: false,
      bespokeOk: true,
      icon: <Sparkles size={20} className="text-emerald-400" />
    }
  ];

  return (
    <section id="comparison" className="py-24 px-4 md:px-6 relative overflow-hidden">
      {/* Dynamic Background bubble blur */}
      <div className="absolute -top-12 -left-12 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-400/5 to-transparent blur-3xl" />
      <div className="absolute -bottom-12 -right-12 w-96 h-96 rounded-full bg-gradient-to-bl from-purple-400/5 to-transparent blur-3xl" />
      
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight text-slate-900 dark:text-white mb-4">
            {t.comparisonTitle}
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 dark:text-slate-400">
            {t.comparisonSubtitle}
          </p>
        </div>

        {/* Comparison grid/panel */}
        <div className="liquid-glass-card rainbow-edge overflow-hidden shadow-2xl">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 p-4 md:p-6 font-display font-bold text-sm md:text-base tracking-tight text-slate-800 dark:text-slate-200">
            <div className="md:col-span-4 flex items-center gap-2">
              <span>{t.comparisonHeaders.feature}</span>
            </div>
            <div className="md:col-span-4 mt-2 md:mt-0 flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-400" />
              <span>{t.comparisonHeaders.readySuite}</span>
            </div>
            <div className="md:col-span-4 mt-2 md:mt-0 flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span>{t.comparisonHeaders.bespokeOvoza}</span>
            </div>
          </div>

          {/* Points list */}
          <div className="divide-y divide-white/5">
            {points.map((point, index) => (
              <div 
                key={index} 
                className="grid grid-cols-1 md:grid-cols-12 p-4 md:p-6 items-start gap-4 hover:bg-white/5 transition-colors duration-200"
              >
                {/* Title and Icon */}
                <div className="md:col-span-4 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center shadow-sm">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-slate-900 dark:text-white text-base">
                      {point.title}
                    </h3>
                  </div>
                </div>

                {/* SaaS Cloud info */}
                <div className="md:col-span-4 text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2 bg-red-500/5 rounded-xl p-3 md:bg-transparent md:p-0">
                  <X className="text-red-500 shrink-0 mt-0.5" size={16} />
                  <span>{point.ready}</span>
                </div>

                {/* Bespoke Custom info */}
                <div className="md:col-span-4 text-sm text-slate-850 dark:text-slate-300 font-medium flex items-start gap-2 bg-cyan-500/5 rounded-xl p-3 md:bg-transparent md:p-0">
                  <Check className="text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" size={16} />
                  <span>{point.bespoke}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
