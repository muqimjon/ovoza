# Ovoza — landing site

Marketing site for **Ovoza Dasturlar** (Fergana, Uzbekistan) — a studio building custom CRM, inventory, KPI and automation systems for small and medium business.

Built with **Angular 22** (zoneless, standalone, signals), prerendered to static HTML (SSG) for the best SEO and Core Web Vitals, multilingual (uz / ru / en), and deployed on **Cloudflare Pages** with one Pages Function for the lead form.

## Stack

- Angular 22 — standalone components, zoneless, signals, new control flow
- Static prerender via `@angular/ssr` (`outputMode: "static"`, `RenderMode.Prerender`)
- Tailwind CSS v4
- Runtime i18n (signal-based) with locale-prefixed routes: `/` (uz), `/ru`, `/en`
- `functions/api/lead.ts` — Cloudflare Pages Function → Telegram notification

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

Set these in **Cloudflare Pages → Settings → Environment variables → Production** (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | Bot that sends lead notifications |
| `TELEGRAM_CHAT_ID` | Chat/channel that receives leads |
| `APP_BASE_URL` | (optional) overrides the canonical base URL used by the sitemap generator |

Changing environment variables requires a fresh deploy to take effect.

## Deploy (Cloudflare Pages)

Connected to GitHub — every push to `main` builds and ships automatically.

- **Framework preset:** None
- **Build command:** `npm run build`
- **Build output directory:** `dist/ovoza/browser`
- **Node version:** pinned to `24.15.0` via `.node-version` (Angular 22 requires Node ≥ 22.22.3 / 24.15.0; Cloudflare's default is older and does not honour `package.json` `engines`).

`functions/api/lead.ts` is auto-detected as a Pages Function and served at `/api/lead` — no config needed.

## SEO

- Per-locale `<title>`, meta description, canonical, full hreflang cluster (uz/ru/en + x-default) and Open Graph — all baked into the prerendered HTML.
- JSON-LD: Organization, ProfessionalService, WebSite, Service/OfferCatalog on the home page; BlogPosting + BreadcrumbList on articles.
- `public/sitemap.xml` and `public/robots.txt` are generated from the route + blog-slug list.

Base URL is configured in `src/app/core/site.ts` (`baseUrl`). Change it there (and re-run the build) when a custom domain is ready.
