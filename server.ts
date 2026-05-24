import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { google } from "googleapis";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper for local data path
const SUBMISSIONS_FILE = path.join(process.cwd(), "submissions.json");

// Lazy initializers for API keys configuration
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// Interactive quiz fallback report when Gemini key is missing
function getQuizFallbackReport(answers: string[], lang: "uz" | "ru" | "en"): string {
  const reports = {
    uz: `### 🔬 Biznesni Avtomatlashtirish Diagnostikasi (Pre-tahlil)

Tizimga yuborilgan ma'lumotlar asosida **Ovoza** muhandislik tahlili:

1. **Joriy Holat**: Siz hozirda asosan qo'lda, Excel yoki Telegram orqali hisob-kitob yuritasiz. Bu jarayonlar tezlikni pasaytiradi va insoniy xatolik xavfini 35% gacha oshiradi.
2. **Kirim-Chiqim va Ombor**: Ma'lumotlarni yig'ish va tahlil qilish uchun ko'p vaqt ketayotgani sababli biznesda pul yo'qolishi yoki ombordagi kamomadlar yuzaga kelishi mumkin.
3. **Mijozlar Nazorati**: Mijozlarni nazoratsiz qoldirish hisobiga o'rtacha 20-30% xaridorlar raqobatchilarga o'tib ketadi. Sizga eslatma tizimi va yagona CRM lozim.
4. **Tavsiya**: Sizning biznesingiz uchun **Ovoza Individual CRM & Ombor Tizimi** tavsiya qilinadi. Bepul konsultatsiyada buni mufassal tushuntirib beramiz!`,
    ru: `### 🔬 Результат Экспресс-Диагностики Бизнеса

На основе предоставленных ответов сформирован предварительный анализ от **Ovoza**:

1. **Текущее положение**: Ведение данных вручную или через Excel/Telegram создает риски ошибок до 35% и замедляет обмен информацией между сотрудниками.
2. **Финансы и склад**: Задержка в отчетах мешает принимать оперативные решения, что может приводить к избытку или дефициту товаров на складе.
3. **Контроль клиентов**: Без четких напоминаний и статусов в CRM бизнес теряет до 20-30% потенциальных обращений.
4. **Рекомендация**: Вашему бизнесу требуется **Индивидуальная CRM и система складского учета Ovoza**. Наш специалист готов провести детальный бесплатный аудит!`,
    en: `### 🔬 Business Automation Express Evaluation

Based on your diagnostic profile, here is the initial audit by **Ovoza**:

1. **Current Tracking**: Using manual spreadsheets or Telegram groups limits workflow visibility, increasing the risk of coordinator mistakes by up to 35%.
2. **Inventory & Records**: Delays in generating profit/loss reports affect rapid decisions, leading to potential inventory shrinking or gaps.
3. **Leads Control**: Without rigid reminders and lead statuses, up to 20-30% of sales opportunities slip away.
4. **Recommendation**: We highly recommend a **Bespoke Ovoza Ledger & CRM system**. Register for our free audit call to map out a precise solution outline!`
  };
  return reports[lang] || reports["uz"];
}

// 1. Dynamic business analysis via Gemini
app.post("/api/analyze-business", async (req, res) => {
  try {
    const { answers, lang } = req.body;
    const currentLang: "uz" | "ru" | "en" = lang || "uz";
    
    const formattedAnswers = Array.isArray(answers) 
      ? answers.map((ans, idx) => `Q${idx + 1}: ${ans}`).join("\n")
      : "No responses provided";

    const client = getGeminiClient();
    if (!client) {
      console.log("Gemini API key not configured or is placeholder. Using fallback evaluation.");
      const fallbackReport = getQuizFallbackReport(answers || [], currentLang);
      return res.json({ analysis: fallbackReport });
    }

    const languageInstruction = {
      uz: "O'zbek tilida yozing. Sodda, samimiy va kichik biznes egasiga mos tilda bo'lsin.",
      ru: "Пишите на русском языке. Пишите просто, профессионально и по делу для малого бизнеса.",
      en: "Write in English. Maintain a helpful, simple, and professional tone for a business owner."
    };

    const prompt = `
      You are a professional B2B automation consultant and UI/UX expert at "Ovoza".
      Analyze these answers from an SME owner who took our quiz:
      
      ${formattedAnswers}

      Provide a short, high-value, and eye-opening custom diagnosis report layout with:
      1. Diagnostic overview (Why their current manual or Excel/Telegram approach limits speed & causes client leaks)
      2. Specific high-risk zones in their business (like inventory shrinkage, human error, supervisor blind spots)
      3. A bespoke solution tailored purely for them (not ready-made templates, but custom-tailored modules like Ombor, CRM, and Call-Center KPIs)
      4. Clear visual roadmap to fix these bottlenecks.

      Formatting: Use Markdown, beautifully structured with clear headings and bullet points.
      Do not exaggerate, use highly practical human labels. Keep it under 250 words.
      Remember to output in: ${languageInstruction[currentLang]}
    `;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error("Gemini analysis failed:", error);
    res.status(500).json({ error: "Failed to generate business report" });
  }
});

// 2. Submit form endpoint
app.post("/api/submit", async (req, res) => {
  try {
    const { name, phone, telegram, business, message, quizAnswers, aiAnalysis, lang } = req.body;
    const currentLang = lang || "uz";

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and Phone number are required" });
    }

    const submissionData = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      name,
      phone,
      telegram: telegram || "N/A",
      business: business || "N/A",
      message: message || "N/A",
      quizAnswers: quizAnswers || [],
      aiAnalysis: aiAnalysis || "N/A",
    };

    // Keep a local copy saved securely in submissions.json file database
    let localSubmissions: any[] = [];
    try {
      if (fs.existsSync(SUBMISSIONS_FILE)) {
        localSubmissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf-8"));
      }
    } catch (e) {
      console.error("Error reading local submissions", e);
    }
    localSubmissions.push(submissionData);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(localSubmissions, null, 2));

    let telegramSent = false;
    let sheetsSaved = false;
    let telegramError = "";
    let sheetsError = "";

    // A. Real Telegram Bot Integration if variables are present
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = "324168525";

    if (botToken && chatId) {
      try {
        const textMessage = `
🔔 *YANGI SO'ROV (OVOZA B2B)*:

👤 *Mijoz*: ${name}
📞 *Telefon*: ${phone}
✈️ *Telegram*: @${telegram ? telegram.replace("@", "") : "N/A"}
🏢 *Kompaniya*: ${business}
📝 *Xabar*: ${message}

📊 *Quiz javoblari*:
${(quizAnswers || []).map((ans: string, i: number) => `   Q${i + 1}: ${ans}`).join("\n")}

🔬 *AI Tahlili (qisqacha)*:
${(aiAnalysis || "").slice(0, 300)}...
        `;

        const tgUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const tgRes = await fetch(tgUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: textMessage,
            parse_mode: "Markdown",
          }),
        });

        if (tgRes.ok) {
          telegramSent = true;
        } else {
          const errText = await tgRes.text();
          telegramError = `Telegram responded with code ${tgRes.status}: ${errText}`;
        }
      } catch (e: any) {
        telegramError = e.message;
        console.error("Telegram send failure:", e);
      }
    }

    // B. Real Google Sheets Integration if credentials are set
    const spreadsheetId = process.env.SPREADSHEET_ID;
    if (spreadsheetId) {
      try {
        let authClient;
        if (fs.existsSync("credentials.json")) {
          authClient = new google.auth.GoogleAuth({
            keyFile: "credentials.json",
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
          });
        } else if (process.env.GOOGLE_CREDENTIALS) {
          // Fallback to reading parsed environment variable object representation
          const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
          authClient = google.auth.fromJSON(credentials);
          (authClient as any).scopes = ["https://www.googleapis.com/auth/spreadsheets"];
        }

        if (authClient) {
          const sheets = google.sheets({ version: "v4", auth: authClient as any });
          
          await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: "Sheet1!A:K",
            valueInputOption: "RAW",
            requestBody: {
              values: [
                [
                  submissionData.date,
                  submissionData.name,
                  submissionData.phone,
                  submissionData.telegram,
                  submissionData.business,
                  submissionData.message,
                  JSON.stringify(submissionData.quizAnswers),
                  submissionData.aiAnalysis,
                ],
              ],
            },
          });
          sheetsSaved = true;
        } else {
          sheetsError = "Neither credentials.json nor GOOGLE_CREDENTIALS environment variable found";
        }
      } catch (e: any) {
        sheetsError = e.message;
        console.error("Google sheets append failure:", e);
      }
    }

    res.json({
      success: true,
      dataId: submissionData.id,
      savedLocally: true,
      telegramSent,
      sheetsSaved,
      integrationsStatus: {
        telegram: { configured: !!(botToken && chatId), sent: telegramSent, error: telegramError },
        sheets: { configured: !!spreadsheetId, saved: sheetsSaved, error: sheetsError }
      }
    });

  } catch (error: any) {
    console.error("Submission processing failed:", error);
    res.status(500).json({ error: "Failed to save submission metadata" });
  }
});

// Setup dev server or static static assets for Cloud Run
if (process.env.NODE_ENV !== "production") {
  // We need dynamic module import for vite because in ES modules, vite is imported dynamically
  import("vite").then((viteModule) => {
    viteModule.createServer({
      server: { middlewareMode: true },
      appType: "spa",
    }).then((vite) => {
      app.use(vite.middlewares);
      app.listen(PORT, "0.0.0.0", () => {
        console.log(`Development Server running on http://localhost:${PORT}`);
      });
    });
  });
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  
  app.get("*", (req, res, next) => {
    // Serve index.html for SPA router fallback
    if (req.path.startsWith("/api/")) {
      return next();
    }
    res.sendFile(path.join(distPath, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Production Server running on port ${PORT}`);
  });
}
