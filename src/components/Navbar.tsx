import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import { useState } from "react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navbar({ lang, setLang, darkMode, setDarkMode }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = [
    { label: t.navServices, href: "#services" },
    { label: t.navComparison, href: "#comparison" },
    { label: t.navPortfolio, href: "#portfolio" },
    { label: t.navQuiz, href: "#quiz" },
    { label: t.navContact, href: "#contact" }
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Floating Glass Container */}
      <div className="liquid-glass-card rainbow-edge px-4 py-3 md:px-8 md:py-4 flex items-center justify-between transition-all duration-300">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 shrink-0 transition-transform duration-500 group-hover:scale-110">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full shadow-md rounded-lg">
              <rect width="32" height="32" rx="8" fill="url(#logo-grad-svg)" />
              {/* Voice Soundwaves forming an elegant, glowing tech waveform */}
              <rect x="7" y="13" width="2" height="6" rx="1" fill="white" />
              <rect x="11" y="9" width="2" height="14" rx="1" fill="white" />
              <rect x="15" y="6" width="2" height="20" rx="1" fill="white" />
              <rect x="19" y="10" width="2" height="12" rx="1" fill="white" />
              <rect x="23" y="13" width="2" height="6" rx="1" fill="white" />
              <circle cx="16" cy="16" r="6" stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="3 3" className="animate-spin duration-[15s]" />
              <defs>
                <linearGradient id="logo-grad-svg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#22d3ee" />
                  <stop offset="0.5" stopColor="#06b6d4" />
                  <stop offset="1" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white bg-clip-text transition-colors">
            {t.navLogo}
          </span>
        </a>

        {/* Desktop Menu items */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-650 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-205 hover:bg-black/5 dark:hover:bg-white/5"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Actions (Language & Theme Toggles) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language selection pill */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-black/10 border border-white/10">
            {(["uz", "ru", "en"] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  lang === l
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Theme Selector Button */}
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/15 bg-white/5 text-slate-350 hover:text-cyan-400 hover:bg-white/10 transition-all duration-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]"
          >
            {darkMode ? <Sun size={18} className="animate-pulse" /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Theme Toggle for mobile */}
          <button
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-slate-300 hover:text-cyan-400 transition-all"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Hamburguer */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-slate-305"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Glass) */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 max-w-full rounded-2xl liquid-glass-card rainbow-edge p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>

          <hr className="border-black/10 dark:border-white/10" />

          {/* Mobile Language buttons */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
              <Globe size={16} /> Til / Язык / Language
            </span>
            <div className="flex items-center gap-1 p-1 rounded-full bg-black/10 border border-white/10">
              {(["uz", "ru", "en"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${
                    lang === l
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
