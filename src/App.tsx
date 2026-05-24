import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, CheckCircle2, ChevronDown, Check, Zap, Laptop, FileSpreadsheet, Send, Instagram, Linkedin, Youtube } from "lucide-react";
import Navbar from "./components/Navbar";
import PortfolioSection from "./components/PortfolioSection";
import ComparisonSection from "./components/ComparisonSection";
import QuizSection from "./components/QuizSection";
import ContactSection from "./components/ContactSection";
import { Language } from "./types";
import { translations } from "./data/translations";

export default function App() {
  const [lang, setLang] = useState<Language>("uz");
  const [darkMode, setDarkMode] = useState(false);
  
  // Interactive quiz findings to automatically bind to the contact form
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");

  // Minimalist cursor tracking spot glow
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Sync preference with systems default
  useEffect(() => {
    // We default to light theme which looks phenomenal with Liquid Glass, but support dark mode toggle
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const t = translations[lang];

  const handleQuizFinish = (answers: string[], report: string) => {
    setQuizAnswers(answers);
    setAiAnalysis(report);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-[#0a0c10] dark:text-[#cfd6e0] transition-colors duration-500 overflow-x-hidden relative selection:bg-cyan-500/30 selection:text-white">
      
      {/* Liquid Glass Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-650/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 dark:bg-purple-650/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-emerald-500/4 dark:bg-emerald-500/8 rounded-full blur-[85px] pointer-events-none"></div>

      {/* Dynamic Cursor Light Spot Tracker */}
      <div 
        className="hidden md:block pointer-events-none fixed z-0 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-cyan-400/5 to-purple-500/5 blur-[100px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Glass Top Floating Nav */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />

      {/* HERO SECTION */}
      <header className="pt-36 pb-24 px-4 md:px-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
        {/* Abstract floating bubbles for Liquid Glass depth cues */}
        <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-500/5 to-blue-500/5 blur-3xl pointer-events-none animate-pulse duration-5000" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-gradient-to-tr from-purple-500/5 to-indigo-500/5 blur-3xl pointer-events-none animate-pulse duration-7000" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          
          {/* Glassy badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm animate-bounce duration-3000">
            <Sparkles size={12} className="text-cyan-400" />
            <span>{t.heroBadge}</span>
          </div>

          {/* Bold Display Title */}
          <h1 className="font-display font-black text-4xl md:text-7xl tracking-tight text-slate-900 dark:text-white leading-[1.1] md:leading-[1.05]">
            {t.heroTitle.split(" ").map((word, idx) => {
              if (idx >= t.heroTitle.split(" ").length - 2) {
                return (
                  <span key={idx} className="bg-gradient-to-r from-cyan-600 via-blue-550 to-indigo-500 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent italic mr-2 select-text font-serif">
                    {word}{" "}
                  </span>
                );
              }
              return <span key={idx} className="mr-2 select-text">{word} </span>;
            })}
          </h1>

          {/* Subtitle description */}
          <p className="max-w-2xl mx-auto text-base md:text-xl text-slate-650 dark:text-slate-400 font-medium leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Glass Button Actions Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Primary Quiz btn */}
            <a 
              href="#quiz" 
              className="liquid-glass-pill sheen px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-display font-black text-base tracking-wide flex items-center gap-2 shadow-xl hover:scale-102 hover:shadow-cyan-500/20 transition-transform duration-300 pointer-events-auto"
            >
              <span>{t.heroBtnQuiz}</span>
              <ArrowRight size={18} />
            </a>

            {/* Secondary Audit btn */}
            <a 
              href="#contact" 
              className="liquid-glass-pill sheen px-8 py-4 bg-black/5 dark:bg-white/5 text-slate-705 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/15 font-display font-bold text-base tracking-wide flex items-center gap-2 shadow-md hover:scale-102 transition-transform duration-300 pointer-events-auto"
            >
              <span>{t.heroBtnContact}</span>
            </a>
          </div>

        </div>

        {/* Scroll Indicator helper */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-1.5 text-xs text-slate-400 font-mono font-bold tracking-widest uppercase">
          <span>{lang === "uz" ? "Pastga" : lang === "ru" ? "Вниз" : "Scroll"}</span>
          <ChevronDown size={14} />
        </div>
      </header>

      {/* CORE BENEFITS EXPLANATION MODULE (3 visual points) */}
      <section id="services" className="py-24 px-4 md:px-6 relative overflow-hidden border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 1. Client Leaks */}
            <div className="liquid-glass-card rainbow-edge p-6 md:p-8 flex flex-col justify-between shadow-lg hover:scale-101 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6">
                <Laptop size={22} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg md:text-xl text-slate-900 dark:text-white mb-2">
                  {lang === "uz" ? "Mijozlarni Unutmaslik" : lang === "ru" ? "Забудьте об упущенных сделках" : "No Missed Clients"}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {lang === "uz" ? "Har bir qo'ng'iroq va ariza avtomatik tizimga ulanadi, eslatmalar orqali mijozlar nazorati tushmaydi." : lang === "ru" ? "Все заявки автоматически попадают в систему с четкими напоминаниями о звонках." : "Every call or message enters the central workflow automatically, managed by structural status rules."}
                </p>
              </div>
            </div>

            {/* 2. Automated Reports */}
            <div className="liquid-glass-card rainbow-edge p-6 md:p-8 flex flex-col justify-between shadow-lg hover:scale-101 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-blue-400 flex items-center justify-center mb-6">
                <FileSpreadsheet size={22} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg md:text-xl text-slate-900 dark:text-white mb-2">
                  {lang === "uz" ? "Avtomatik Real-Vaqt Hisobotlari" : lang === "ru" ? "Отчеты в один клик" : "Real-time Live Reports"}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {lang === "uz" ? "Ombordagi qoldiqlar, kunlik savdo tushumi va xarajatlarni hisoblash uchun endi soatlab Excel varaqlari shart emas." : lang === "ru" ? "Остатки на складе, выручка и расходы видны в реальном времени без ручного пересчета." : "Instantly see current net profits, stock levels, and expenses without reconcile sheet delays."}
                </p>
              </div>
            </div>

            {/* 3. Team KPIs */}
            <div className="liquid-glass-card rainbow-edge p-6 md:p-8 flex flex-col justify-between shadow-lg hover:scale-101 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
                <Send size={22} />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg md:text-xl text-slate-900 dark:text-white mb-2">
                  {lang === "uz" ? "Xodimlar Ish Unumdorligi" : lang === "ru" ? "Объективная оценка персонала" : "Operator Performance metrics"}
                </h3>
                <p className="text-sm text-slate-605 dark:text-slate-400 leading-relaxed">
                  {lang === "uz" ? "Call-Markaz operatorlari nima ish qilayotgani va unumdorlik ko'rsatkichlari (KPI) shaffof dashboardda baralla ko'rinadi." : lang === "ru" ? "Вы будете точно знать, сколько звонков сделал каждый менеджер и какова его конверсия." : "Interactive KPIs and call center handler analytics are visible instantly, boosting output safely."}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* COMPARISON MODULE */}
      <ComparisonSection lang={lang} />

      {/* PORTFOLIO & HISTORIC SOCIAL PROOF MODULE */}
      <PortfolioSection lang={lang} />

      {/* ASSESSMENT QUIZ MODULE */}
      <QuizSection lang={lang} onQuizComplete={handleQuizFinish} />

      {/* PERSISTENT CONTACT FORM */}
      <ContactSection 
        lang={lang} 
        quizAnswers={quizAnswers} 
        aiAnalysis={aiAnalysis} 
        onRestartQuiz={() => {
          const quizEl = document.getElementById("quiz");
          if (quizEl) {
            quizEl.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />

      {/* SOCIAL MEDIA CONNECTIONS BENCH */}
      <section id="social" className="py-24 px-4 md:px-6 relative overflow-hidden bg-transparent border-t border-black/5 dark:border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12 max-w-2xl mx-auto">
            <h2 className="font-display font-black text-2xl md:text-4xl tracking-tight text-slate-900 dark:text-white mb-3">
              {lang === "uz" ? "Biz ijtimoiy tarmoqlarda" : lang === "ru" ? "Мы в социальных сетях" : "We are on Social Media"}
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
              {lang === "uz" 
                ? "Barcha platformalarda bizni bitta sahifa nomi orqali topishingiz mumkin: @ovozadasturlar" 
                : lang === "ru" 
                ? "Вы можете найти нас на всех платформах по единому имени: @ovozadasturlar" 
                : "You can find us on all platforms under a single handle: @ovozadasturlar"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
            {/* Instagram */}
            <a 
              href="https://instagram.com/ovozadasturlar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group liquid-glass-card rainbow-edge p-6 flex flex-col items-center gap-3 shadow-md hover:scale-105 hover:shadow-pink-500/10 transition-all duration-300 pointer-events-auto"
            >
              <div className="w-12 h-12 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Instagram size={24} />
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-250">Instagram</span>
              <span className="text-xs font-mono text-slate-400">@ovozadasturlar</span>
            </a>

            {/* Telegram */}
            <a 
              href="https://t.me/ovozadasturlar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group liquid-glass-card rainbow-edge p-6 flex flex-col items-center gap-3 shadow-md hover:scale-105 hover:shadow-cyan-500/10 transition-all duration-300 pointer-events-auto"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Send size={24} className="translate-x-[-1px] translate-y-[1px]" />
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-250">Telegram</span>
              <span className="text-xs font-mono text-slate-400">@ovozadasturlar</span>
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/company/ovozadasturlar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group liquid-glass-card rainbow-edge p-6 flex flex-col items-center gap-3 shadow-md hover:scale-105 hover:shadow-blue-500/10 transition-all duration-300 pointer-events-auto"
            >
              <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-405 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Linkedin size={24} />
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-250">LinkedIn</span>
              <span className="text-xs font-mono text-slate-400">ovozadasturlar</span>
            </a>

            {/* YouTube */}
            <a 
              href="https://youtube.com/@ovozadasturlar" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group liquid-glass-card rainbow-edge p-6 flex flex-col items-center gap-3 shadow-md hover:scale-105 hover:shadow-red-500/10 transition-all duration-300 pointer-events-auto"
            >
              <div className="w-12 h-12 rounded-full bg-red-550/10 text-red-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Youtube size={24} />
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-250">YouTube</span>
              <span className="text-xs font-mono text-slate-400">@ovozadasturlar</span>
            </a>
          </div>
        </div>
      </section>

      {/* CONCISE SOLID FOOTER */}
      <footer className="mt-auto border-t border-black/5 dark:border-white/5 py-12 px-4 md:px-6 bg-slate-100 dark:bg-[#07080c] text-center relative z-10 text-xs md:text-sm text-slate-500 transition-colors">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            {/* Embedded Logo in footer matching header theme */}
            <div className="w-6 h-6 shrink-0">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full shadow-sm rounded-lg">
                <rect width="32" height="32" rx="8" fill="url(#logo-grad-footer)" />
                <rect x="7" y="13" width="2" height="6" rx="1" fill="white" />
                <rect x="11" y="9" width="2" height="14" rx="1" fill="white" />
                <rect x="15" y="6" width="2" height="20" rx="1" fill="white" />
                <rect x="19" y="10" width="2" height="12" rx="1" fill="white" />
                <rect x="23" y="13" width="2" height="6" rx="1" fill="white" />
                <circle cx="16" cy="16" r="6" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 3" className="animate-spin duration-[15s]" />
                <defs>
                  <linearGradient id="logo-grad-footer" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#22d3ee" />
                    <stop offset="0.5" stopColor="#06b6d4" />
                    <stop offset="1" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="font-display font-bold text-base text-slate-800 dark:text-white">
              Ovoza Dasturlar
            </span>
          </div>
          <div>
            <span>© {new Date().getFullYear()} Ovoza.uz. Barcha huquqlar himoyalangan.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+998973340334" className="hover:underline font-mono text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400">+998 97 334 03 34</a>
            <span>|</span>
            <a href="https://t.me/ovoza_robot" target="_blank" className="hover:underline text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400">Telegram</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
