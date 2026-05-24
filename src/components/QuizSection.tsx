import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, ArrowRight, ArrowLeft, Brain, Cpu, Sparkles, CheckSquare } from "lucide-react";
import { Language } from "../types";
import { translations } from "../data/translations";

interface QuizSectionProps {
  lang: Language;
  onQuizComplete: (answers: string[], report: string) => void;
}

export default function QuizSection({ lang, onQuizComplete }: QuizSectionProps) {
  const t = translations[lang];
  const questions = t.quizQuestions;

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentStep] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Analyze Answers
      handleSubmitAnalysis();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitAnalysis = async () => {
    setLoading(true);
    setAiReport(null);
    try {
      const formattedAnswers = selectedAnswers.map((ans, idx) => {
        return `Q: ${questions[idx].question} -> Selected: ${ans}`;
      });

      const response = await fetch("/api/analyze-business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: formattedAnswers,
          lang: lang,
        }),
      });

      const result = await response.json();
      if (result.analysis) {
        setAiReport(result.analysis);
        onQuizComplete(selectedAnswers, result.analysis);
      } else {
        throw new Error("No report generated");
      }
    } catch (e) {
      console.error("Analysis generation failure. Using offline templates.", e);
      // Hard fallback
      const reportText = `### 🔬 Biznesni Avtomatlashtirish Diagnostikasi (Xulosa)
      * **Joriy Holat**: Jarayonlar asosan jadallayotgan bo'lsa-da, hisob-kitoblar va ma'lumotlar tarqoqligi ish unumdorligini 30% gacha kechiktirmoqda.
      * **Mijozlar**: Aloqalar va eslatmalar yetishmasligi evaziga xaridorlarni yo'qotish va zaxira yetishmovchiligi xavfi mavjud.
      * **Taklif**: Sizga maxsus Ovoza CRM & Ombor dasturi zarur. Quyida aloqa ma'lumotlarini qoldirib shaxsan gaplashing.`;
      setAiReport(reportText);
      onQuizComplete(selectedAnswers, reportText);
    } finally {
      setLoading(false);
    }
  }  // Safe client-side markdown formatter for gorgeous UI rendering without external packages
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("###")) {
        return (
          <h4 key={idx} className="font-display font-bold text-xl text-slate-900 dark:text-white mt-4 mb-2">
            {trimmed.replace("###", "").trim()}
          </h4>
        );
      }
      if (trimmed.startsWith("##")) {
        return (
          <h3 key={idx} className="font-display font-black text-2xl text-cyan-600 dark:text-cyan-400 mt-5 mb-3">
            {trimmed.replace("##", "").trim()}
          </h3>
        );
      }
      if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
        return (
          <li key={idx} className="text-sm md:text-base text-slate-700 dark:text-slate-300 ml-6 list-disc mb-1.5 leading-relaxed">
            {trimmed.substring(1).trim()}
          </li>
        );
      }
      if (trimmed.startsWith("1.") || trimmed.startsWith("2.") || trimmed.startsWith("3.") || trimmed.startsWith("4.")) {
        return (
          <div key={idx} className="text-sm md:text-base text-slate-700 dark:text-slate-300 ml-4 mb-2 pl-2 border-l-2 border-cyan-500/40 leading-relaxed">
            {trimmed}
          </div>
        );
      }
      return trimmed === "" ? (
        <br key={idx} />
      ) : (
        <p key={idx} className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
          {trimmed}
        </p>
      );
    });
  };

  const currentQuestion = questions[currentStep];
  const isAnswered = selectedAnswers[currentStep] !== undefined;

  return (
    <section id="quiz" className="py-24 px-4 md:px-6 relative overflow-hidden bg-transparent">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-cyan-400/5 to-purple-400/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-widest uppercase bg-cyan-500/10 text-cyan-400 mb-4 border border-cyan-500/20">
            <Brain size={12} className="animate-pulse text-cyan-400" />
            <span>AI Diagnostic Engine</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight text-slate-900 dark:text-white mb-4">
            {t.quizTitle}
          </h2>
          <p className="max-w-2xl mx-auto text-base text-slate-650 dark:text-slate-400">
            {t.quizSubtitle}
          </p>
        </div>

        {/* Liquid Glass Diagnostic Container */}
        <div className="liquid-glass-card rainbow-edge p-6 md:p-10 shadow-2xl relative overflow-hidden min-h-[420px] flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            {loading ? (
              /* Analyzing Loader */
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="relative w-24 h-24 mb-6">
                  {/* Glassy interactive fluid loaders */}
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-500/15" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 animate-spin" />
                  <div className="absolute inset-4 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg">
                    <Sparkles size={24} className="text-cyan-400 animate-bounce" />
                  </div>
                </div>
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">
                  {t.quizAnalyzing}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm">
                  Ovozaning muhandislik algoritmi biznesingiz xavfsizligini tekshirishni boshladi.
                </p>
              </motion.div>
            ) : aiReport ? (
              /* Diagnostic report feedback */
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-4"
              >
                <div className="flex items-center gap-3 border-b border-black/10 dark:border-white/10 pb-4 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                    <CheckSquare size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl md:text-2xl text-slate-900 dark:text-white">
                      {t.quizResultsTitle}
                    </h3>
                  </div>
                </div>

                {/* Report payload styled with custom container MD */}
                <div className="bg-black/[0.02] dark:bg-white/5 rounded-2xl p-6 border border-black/10 dark:border-white/10 shadow-md mb-8">
                  {renderMarkdown(aiReport)}
                </div>

                {/* Action button to form */}
                <div className="flex justify-center">
                  <a
                    href="#contact"
                    className="liquid-glass-pill sheen px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-display font-bold text-base flex items-center gap-2 shadow-lg hover:scale-102 transition-transform duration-300 pointer-events-auto"
                  >
                    <span>{t.heroBtnContact}</span>
                    <ArrowRight size={18} />
                  </a>
                </div>
              </motion.div>
            ) : (
              /* Quiz steps workflow */
              <motion.div
                key="step"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col justify-between h-full"
              >
                {/* Step indicators */}
                <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4 mb-6">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    {t.quizStep} {currentStep + 1} / {questions.length}
                  </span>
                  
                  {/* Small progress ticks */}
                  <div className="flex items-center gap-1.5">
                    {questions.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          currentStep === i 
                            ? "w-6 bg-cyan-500" 
                            : i < selectedAnswers.length 
                              ? "w-2.5 bg-blue-500" 
                              : "w-2.5 bg-slate-300 dark:bg-slate-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question phrase */}
                <div className="mb-8">
                  <h3 className="font-display font-extrabold text-xl md:text-2xl text-slate-900 dark:text-white leading-snug">
                    {currentQuestion.question}
                  </h3>
                </div>

                {/* Core Options */}
                <div className="flex flex-col gap-3.5 mb-8">
                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedAnswers[currentStep] === option;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 font-medium text-sm md:text-base flex items-center justify-between pointer-events-auto ${
                          isSelected
                            ? "bg-cyan-500/10 border-cyan-500 dark:border-cyan-400 text-cyan-700 dark:text-cyan-300 font-bold scale-[1.01]"
                            : "bg-black/[0.02] dark:bg-white/5 border-black/10 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-black/[0.05] dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 hover:scale-[1.005] hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        <span className="flex-1 pr-4">{option}</span>
                        {/* Radio select glass ball */}
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected 
                            ? "border-cyan-400 bg-cyan-400" 
                            : "border-slate-600"
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Actions bottom controller */}
                <div className="flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-6">
                  {/* Back btn */}
                  <button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    type="button"
                    className={`px-5 py-2.5 rounded-full flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-all ${
                      currentStep === 0
                        ? "text-slate-300 dark:text-slate-800 cursor-not-allowed"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                    }`}
                  >
                    <ArrowLeft size={14} />
                    <span>{t.quizPrev}</span>
                  </button>

                  {/* Next / Submit btn */}
                  <button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    type="button"
                    className={`px-6 py-3 rounded-full flex items-center gap-1.5 font-display font-bold text-sm tracking-wide transition-all shadow-md ${
                      isAnswered
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-102 transition-transform duration-300 shadow-md shadow-cyan-500/10 pointer-events-auto cursor-pointer"
                        : "bg-slate-200 dark:bg-slate-850 text-slate-400 dark:text-slate-600 cursor-not-allowed pointer-events-none"
                    }`}
                  >
                    <span>
                      {currentStep === questions.length - 1 ? t.quizSubmit : t.quizNext}
                    </span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
