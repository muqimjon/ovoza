export type Language = "uz" | "ru" | "en";

export interface ContactFormData {
  name: string;
  phone: string;
  telegram: string;
  business: string;
  message: string;
}

export interface QuizSubmission {
  quizAnswers: string[];
  aiAnalysis: string;
}
