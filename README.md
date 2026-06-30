# Ovoza — landing site

Marketing site for **Ovoza Dasturlar** (Fergana, Uzbekistan) — a studio building custom CRM, inventory, KPI and automation systems for small and medium business.

Built with **Angular 22** (zoneless, standalone, signals), prerendered to static HTML (SSG) for the best SEO and Core Web Vitals, multilingual (uz / ru / en), and deployed on **Vercel** with one serverless function for the lead form.

## Stack

- Angular 22 — standalone components, zoneless, signals, new control flow
- Static prerender via `@angular/ssr` (`outputMode: "static"`, `RenderMode.Prerender`)
- Tailwind CSS v4
- Runtime i18n (signal-based) with locale-prefixed routes: `/` (uz), `/ru`, `/en`
- `api/lead.ts` — Vercel Node function → Telegram notification

## Local development

```bash
npm install
npm start          # dev server at http://localhost:4200
```

## Build

```bash
npm run build      # runs prebuild (sitemap/robots) then prerenders all routes
```

Output: `dist/ovoza/browser` (pure static — no server bundle is deployed).

`npm run seo` regenerates `public/sitemap.xml` and `public/robots.txt` (also runs automatically before every build).

## Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | Bot that sends lead notifications |
| `TELEGRAM_CHAT_ID` | Chat/channel that receives leads |
| `APP_BASE_URL` | (optional) overrides the canonical base URL used by the sitemap generator |

## Deploy (Vercel)

1. `npm i -g vercel` and `vercel login`
2. From the project root: `vercel` (first run links the project), then `vercel --prod`
3. Add the environment variables above, then redeploy.

`vercel.json` pins the static output and Angular build; `api/lead.ts` is detected automatically as a serverless function.

## SEO

- Per-locale `<title>`, meta description, canonical, full hreflang cluster (uz/ru/en + x-default) and Open Graph — all baked into the prerendered HTML.
- JSON-LD: Organization, ProfessionalService, WebSite, Service/OfferCatalog on the home page; BlogPosting + BreadcrumbList on articles.
- `public/sitemap.xml` and `public/robots.txt` are generated from the route + blog-slug list.

Base URL is configured in `src/app/core/site.ts` (`baseUrl`). Change it there (and re-run the build) when the custom domain is ready.
