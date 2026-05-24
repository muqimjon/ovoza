import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Language, ContactFormData } from "../types";
import { translations } from "../data/translations";

interface ContactSectionProps {
  lang: Language;
  quizAnswers: string[];
  aiAnalysis: string;
  onRestartQuiz?: () => void;
}

export default function ContactSection({ lang, quizAnswers, aiAnalysis, onRestartQuiz }: ContactSectionProps) {
  const t = translations[lang];

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    telegram: "",
    business: "",
    message: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setSubmitting(true);
    setErrorText("");

    try {
      const payload = {
        ...formData,
        quizAnswers,
        aiAnalysis,
        lang
      };

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: "",
          phone: "",
          telegram: "",
          business: "",
          message: ""
        });
      } else {
        throw new Error(result.error || "Submission rejected");
      }
    } catch (e: any) {
      console.error(e);
      setErrorText(t.formError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-6 relative overflow-hidden bg-transparent liquid-grid-bg">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight text-slate-900 dark:text-white mb-4">
            {t.contactTitle}
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-650 dark:text-slate-400">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          
          {/* Main Intelligent Assessment Intake Form */}
          <div className="liquid-glass-card rainbow-edge p-6 md:p-10 shadow-2xl">
              
              {success ? (
                /* Success feedback card */
                <div className="text-center py-12 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-650 dark:text-emerald-400 flex items-center justify-center mb-6 border border-emerald-500/25">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="font-display font-black text-2xl text-slate-900 dark:text-white mb-3">
                    {lang === "uz" ? "So'rov muvaffaqiyatli qabul qilindi!" : lang === "ru" ? "Заявка принята!" : "Audit Request Submitted!"}
                  </h3>
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-sm mb-8 leading-relaxed">
                    {t.formSuccess}
                  </p>
                  <button 
                    onClick={() => setSuccess(false)}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm transition-all hover:scale-102"
                  >
                    {lang === "uz" ? "Qayta yuborish" : lang === "ru" ? "Отправить еще раз" : "Send another"}
                  </button>
                </div>
              ) : (
                /* Contact form payload inputs */
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Form Indicator with quiz evaluation alert */}
                  {quizAnswers.length > 0 && (
                    <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 text-xs md:text-sm text-cyan-300 font-medium flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="shrink-0" />
                        <span>{t.formHelper}</span>
                      </div>
                      {onRestartQuiz && (
                        <button
                          type="button"
                          onClick={onRestartQuiz}
                          className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 hover:underline shrink-0"
                        >
                          {lang === "uz" ? "Qayta test topshirish ↺" : lang === "ru" ? "Пройти тест заново ↺" : "Retake audit ↺"}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">
                      {t.formName} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={lang === "uz" ? "Avazbek Siddiqov" : lang === "ru" ? "Авазбек Сиддиков" : "Avazbek Siddiqov"}
                      className="w-full text-sm md:text-base px-4 py-3 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/20 rounded-xl focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">
                      {t.formPhone} <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+998 90 123 45 67"
                      className="w-full text-sm md:text-base px-4 py-3 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/20 rounded-xl focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Telegram field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">
                        {t.formTelegram}
                      </label>
                      <input 
                        type="text" 
                        name="telegram"
                        value={formData.telegram}
                        onChange={handleChange}
                        placeholder={lang === "uz" ? "sizning_usernameingiz" : lang === "ru" ? "sizning_usernameingiz" : "sizning_usernameingiz"}
                        className="w-full text-sm px-4 py-3 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/20 rounded-xl focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                      />
                    </div>

                    {/* Company Type field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">
                        {t.formBusiness}
                      </label>
                      <input 
                        type="text" 
                        name="business"
                        value={formData.business}
                        onChange={handleChange}
                        placeholder={lang === "uz" ? "BMW avtomobil ishlab chiqarish" : lang === "ru" ? "Производство автомобилей BMW" : "BMW car manufacturing"}
                        className="w-full text-sm px-4 py-3 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/20 rounded-xl focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                      />
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-550 dark:text-slate-400">
                      {t.formMessage}
                    </label>
                    <textarea 
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="..."
                      className="w-full text-sm px-4 py-3 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/20 rounded-xl focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                    />
                  </div>

                  {errorText && (
                    <div className="p-4 rounded-xl bg-red-500/5 border border-red-550/20 text-red-500 dark:text-red-400 text-xs md:text-sm font-semibold flex items-center gap-2">
                      <AlertCircle size={16} />
                      <span>{errorText}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full liquid-glass-pill sheen p-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-102 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span>{submitting ? "Yuborilmoqda..." : t.formSubmit}</span>
                    <Send size={16} />
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </section>
  );
}
