interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
}

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

const json = (status: number, data: unknown): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;

  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return json(400, { ok: false });
  }

  const name = (body.name ?? '').trim();
  const phone = (body.phone ?? '').trim();
  if (!name || !phone || name.length > 120 || phone.length > 40) {
    return json(400, { ok: false });
  }

  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return json(500, { ok: false });
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

  const debug = new URL(request.url).searchParams.get('debug') === '1';
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
      const detail = await tg.text().catch(() => '');
      console.error('telegram sendMessage failed', tg.status, detail);
      return json(502, debug ? { ok: false, status: tg.status, detail } : { ok: false });
    }
    return json(200, { ok: true });
  } catch (e) {
    console.error('lead handler error', e);
    return json(502, debug ? { ok: false, error: String(e) } : { ok: false });
  }
};
