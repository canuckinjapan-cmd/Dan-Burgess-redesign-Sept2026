# Dan Burgess — Japanese → English Translator

Website of Dan Burgess, a Fukuoka-based Japanese → English translator and localization specialist focusing on software, UI strings, games, SaaS, and technical content.
Live: **https://danburgess.com** (日本語) · **https://danburgess.com/en/** (English)

福岡を拠点とする日英翻訳者、ダン・バージェスの公式サイトです。ソフトウェア・UI・技術文書を中心に日英翻訳・ローカライズを行っています。

## What this is

A bilingual (JP/EN) translator profile and agency inquiry site featuring Dan's career experience (`1994–2004` software & game localization, `2004–2007` Canon HQ technical & UI localization, `2007–Present` freelance translation), specializations, CAT tools and file formats (`Trados`, `Felix`, `HTML`, `JSON`, `XLIFF`), web and technical background, and an agency contact form.

- Japanese and English pages are written separately for their respective audiences, not machine-translated.
- The active profile view is controlled by `COMING_SOON_MODE = true` in `src/pages/Index.tsx`; the previous Version 2 web-design portfolio code and `/samples/` concepts are preserved in the repository (and backed up on branch `backup/live-v2`) with `noindex, nofollow` applied via HTML meta tags and `public/_headers`.

## Tech stack

- React 18 + Vite 5 (multi-page build: `index.html` and `en/index.html`), TypeScript
- Tailwind CSS 3, `motion` (Framer Motion)
- Cloudflare Pages + Functions (`functions/api/contact.js` SMTP delivery via `cloudflare:sockets`)
- Cloudflare Turnstile (managed mode) + honeypot spam protection
- Fonts: IBM Plex Sans, Noto Sans JP

## Features

- **Separate JP / EN pages** (`/` and `/en/`) linked via plain `<a>` navigation with self-referencing canonicals, `hreflang` (`ja`, `en`, `x-default`), `Person` JSON-LD structured data, Open Graph images, and static pre-rendered HTML for crawlers
- **Japanese typography** tuned with `line-break: strict`, `word-break: auto-phrase`, phrase-boundary `<wbr>` wrapping, and proportional kerning (`palt`) on headings only
- **Accessibility target: WCAG 2.1 AA** — semantic HTML, contrast-checked colour tokens (`DESIGN.md`), keyboard-operable controls, `prefers-reduced-motion` support, and visible Required / Optional labels (`必須` / `任意`)
- **Contact form** with Cloudflare Turnstile verification (`siteverify` with `CF-Connecting-IP`), an off-screen `website` honeypot field, inline accessible validation, and bilingual status/error feedback
- **Indexing controls** (`public/_headers`) keeping `/samples/*` and `*.pages.dev` previews out of search indexes while keeping `/` and `/en/` indexable

## Development

```bash
npm install
npm run dev                                  # local dev server (port 3000)
npm run build                                # production build
npm run lint                                 # ESLint check
node --test functions/_lib/contact.test.mjs  # contact & Turnstile helper tests
```

## Workflow note

The site was designed and developed using a combination of professional tools and AI-assisted workflows. All output is reviewed, edited, and tested by hand.
The original pre-translator `README.md` is preserved in `README.backup.md`.

## License

Text, photography, and original assets © Dan Burgess, all rights reserved.