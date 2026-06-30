import type { VercelRequest, VercelResponse } from '@vercel/node';

interface LeadBody {
  name?: string;
  phone?: string;
  telegram?: string;
  business?: string;
  message?: string;
  quizSummary?: string;
  quizAnswers?: string[];
  lang?: string;
}

const esc = (s: string): string =>
  s.replace(/[<&>]/g, (ch) => (ch === '<' ? '&lt;' : ch === '>' ? '&gt;' : '&amp;'));

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false });
    return;
  }

  let body: LeadBody;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body ?? {});
  } catch {
    res.status(400).json({ ok: false });
    return;
  }

  const name = (body.name ?? '').trim();
  const phone = (body.phone ?? '').trim();
  if (!name || !phone || name.length > 120 || phone.length > 40) {
    res.status(400).json({ ok: false });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    res.status(500).json({ ok: false });
    return;
  }

  const lines = [
    '🔔 <b>Yangi so‘rov — Ovoza</b>',
    `👤 <b>Ism:</b> ${esc(name)}`,
    `📞 <b>Telefon:</b> ${esc(phone)}`,
  ];
  const add = (label: string, value?: string) => {
    const v = (value ?? '').trim();
    if (v) lines.push(`${label} ${esc(v.slice(0, 1500))}`);
  };
  add('✈️ <b>Telegram:</b>', body.telegram);
  add('🏢 <b>Biznes:</b>', body.business);
  add('💬 <b>Xabar:</b>', body.message);
  add('📊 <b>Test:</b>', body.quizSummary);
  if (Array.isArray(body.quizAnswers) && body.quizAnswers.length) {
    lines.push(`📝 ${body.quizAnswers.map((a) => esc(String(a))).join(' · ').slice(0, 2000)}`);
  }
  add('🌐', body.lang);

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });
    if (!tg.ok) {
      res.status(502).json({ ok: false });
      return;
    }
    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ ok: false });
  }
}
