import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const BASE = process.env.APP_BASE_URL || 'https://ovoza.vercel.app';
const LOCALES = ['uz', 'ru', 'en'];
const SLUGS = [
  'biznesni-avtomatlashtirish-nimadan-boshlanadi',
  'crm-tizimi-yoki-excel',
  'ombor-dasturini-qanday-tanlash',
  'call-markaz-kpi-qanday-olchanadi',
];

const prefix = (l) => (l === 'uz' ? '' : `/${l}`);
const abs = (l, p) => {
  const pre = prefix(l);
  return `${BASE}${p ? `${pre}/${p}` : pre || '/'}`;
};

const pages = ['', 'blog', ...SLUGS.map((s) => `blog/${s}`)];

const block = (p) => {
  const alternates = [
    ...LOCALES.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(l, p)}"/>`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs('uz', p)}"/>`,
  ].join('\n');
  return LOCALES.map(
    (l) => `  <url>
    <loc>${abs(l, p)}</loc>
${alternates}
    <changefreq>${p === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${p === '' ? '1.0' : p === 'blog' ? '0.8' : '0.7'}</priority>
  </url>`,
  ).join('\n');
};

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages.map(block).join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${BASE}/sitemap.xml
`;

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
mkdirSync(pub, { recursive: true });
writeFileSync(join(pub, 'sitemap.xml'), sitemap);
writeFileSync(join(pub, 'robots.txt'), robots);
console.log(`SEO files generated: ${pages.length * LOCALES.length} urls -> public/sitemap.xml, public/robots.txt`);
