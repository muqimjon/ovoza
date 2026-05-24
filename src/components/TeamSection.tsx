import React from "react";
import { Cpu, Smartphone, Layout, Send } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface TeamSectionProps {
  lang: Language;
}

export default function TeamSection({ lang }: TeamSectionProps) {
  const t = translations[lang];

  return (
    <section id="team" className="py-24 px-4 md:px-6 relative overflow-hidden">
      {/* Visual Ambient Blur circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight text-white mb-4">
            {t.teamTitle}
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-400">
            {t.teamSubtitle}
          </p>
        </div>

        {/* Members cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Avazbek Siddiqov */}
          <div className="liquid-glass-card rainbow-edge p-6 md:p-8 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
            
            <div>
              {/* Profile placeholder with stylized liquid glass look */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white text-2xl font-display font-black shadow-[inset_0_2px_4px_rgba(255,255,255,0.7)] shadow-lg">
                  AS
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-white">
                    {t.teamMembers.avazbek.name}
                  </h3>
                  <span className="text-xs font-semibold text-cyan-400 tracking-wider font-mono">
                    {t.teamMembers.avazbek.role}
                  </span>
                </div>
              </div>

              <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
                {t.teamMembers.avazbek.desc}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Smartphone size={16} className="text-cyan-400" />
              <span>Windows Apps, iOS, Android</span>
            </div>
          </div>

          {/* Muqimjon Mamadaliyev */}
          <div className="liquid-glass-card rainbow-edge p-6 md:p-8 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

            <div>
              {/* Profile placeholder with stylized liquid glass look */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-505 flex items-center justify-center text-white text-2xl font-display font-black shadow-[inset_0_2px_4px_rgba(255,255,255,0.7)] shadow-lg">
                  MM
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl text-white">
                    {t.teamMembers.muqimjon.name}
                  </h3>
                  <span className="text-xs font-semibold text-cyan-400 tracking-wider font-mono">
                    {t.teamMembers.muqimjon.role}
                  </span>
                </div>
              </div>

              <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
                {t.teamMembers.muqimjon.desc}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Cpu size={16} className="text-purple-400" />
              <span>Express API, DevOps, Database, Cloud</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
