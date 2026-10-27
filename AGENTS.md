# AGENTS.md

Guidelines for AI coding assistants (and humans) working on the Dan Burgess Design portfolio.
Read `DESIGN.md` before changing any UI. `SKILLS.md` holds the wider SEO / i18n playbook.

## What this project is

A bilingual (Japanese / English) portfolio for a web designer and front-end developer,
aimed at Japan-based employers and clients. It has four sections: Selected Work (`#work`),
About (`#about`), Skills & Approach (`#skills`) and Contact (`#contact`).
There is no pricing or FAQ section. The sample sites are portfolio concepts, not client work.

## Stack and commands

- React 18, Vite 5, TypeScript, Tailwind CSS 3, `motion` (Framer Motion), `lucide-react`, `react-router-dom`
- Cloudflare Pages deploys from GitHub; the contact endpoint is a Pages Function
- Path alias: `@` points to `src`

```bash
npm install
npm run dev      # Vite dev server on port 3000 (keep it on 3000)
npm run build
npm run lint
```

There is no automated test suite. `vitest` is installed but no `test` script exists yet.

## Repository layout

| Path | What lives there |
| :--- | :--- |
| `index.html` | Japanese page: static `<head>`, JSON-LD and a hand-written semantic copy of the page body for crawlers |
| `en/index.html` | The same for English. Both files are Vite build inputs (`vite.config.ts`) |
| `public/` | `robots.txt`, `sitemap.xml`, OG images (`DJB-og-image-EN.png` / `-JP.png`) and the static sample sites under `public/samples/` (`gym01`, `real-estate01`, `jdm-retro`) |
| `functions/api/contact.js` | Contact form endpoint (Cloudflare Pages Function) |
| `functions/_lib/contact.js` | Validation, message building and SMTP helpers for that function |
| `src/App.tsx` | Router, providers, `SEOHead`, `LanguageDetector` |
| `src/pages/Index.tsx` | The whole page: hero, work, about, skills, contact, footer |
| `src/components/` | `TopBar`, `CaseStudies`, `ContactForm`, `SEOHead`, `LanguageDetector`, `PortraitPlate`, `SectionIllustrations`, `ui/` |
| `src/context/LanguageContext.tsx` | `useLanguage()` provider |
| `src/hooks/` | `use-reduced-motion`, `use-toast` |
| `src/assets/` | Images, logos and the manga avatar SVG |

## Language and routing

- The URL is the source of truth: `/` is Japanese, `/en/` is English. `LanguageContext` derives `lang` from the path.
- `useLanguage()` returns `{ lang, setLang, t }`. `setLang` navigates between the two routes.
- Every visible string goes through `t(en, jp)`. Write the English and Japanese versions independently for their own
  audiences; do not machine-translate one from the other.
- Deliberate exceptions that are the same in both languages: mono labels such as `ISSUE 01 / 2026`, `Plate 01`,
  `/ CAPABILITY` and the `HTML → CSS → JS` chips. Do not add further decorative English eyebrow labels to the Japanese page.
- `LanguageDetector` makes one automatic hop from `/` to `/en/`, only for a first-time visitor whose browser does not
  list Japanese. It never fires for crawlers (user-agent and `navigator.webdriver` checks), never fires twice
  (`localStorage` key `lang_auto_redirect_done`) and never moves anyone off a URL they opened on purpose.

## Head tags, pre-rendered HTML and SEO

- Crawlers and social scrapers read the static HTML, not React. The static `<head>` in `index.html` and `en/index.html`
  is the source of truth for title, description, canonical, hreflang, Open Graph and Twitter tags.
- `SEOHead.tsx` only keeps the head in sync after a client-side language switch. Its strings must stay identical to
  the static HTML. If you change a title or description, change all three files.
- The body inside `<div id="dan-app">` in each HTML file is a hand-maintained semantic copy of the page for crawlers and
  non-JS clients. Update it when page copy changes. It does not currently include the capabilities cards, toolkit or
  process notes.
- Description rules: do not claim web-design experience "since 1992". 1992 is when Dan moved to Japan; say
  "based in Japan since 1992".
- `public/sitemap.xml` lists `/` and `/en/` with hreflang alternates. Update `lastmod` when you deploy content changes.
- Cloudflare Pages serves `index.html` with a 200 for any unknown path because there is no `404.html` or `_redirects`.
  Junk URLs therefore appear in Search Console as "Alternate page with proper canonical tag". This is harmless;
  add redirects or a `404.html` if it becomes noisy.

## Case studies and process notes (`CaseStudies.tsx`)

- Cards are data-driven from the `cases` array. Each entry has English and Japanese fields, including `process` and
  `processJp` (`challenge`, `approach`, `decisions[]`, `tools`).
- `ProcessPanel` renders a native `<details>/<summary>` labelled "View the process notes" / 「制作プロセスを見る」, with a +/− indicator.
  Keep it keyboard-operable and keep the 44px minimum height on the summary.
- The card grid uses `items-start` so expanding the notes does not move the screenshot column.
- Internal links use `import.meta.env.BASE_URL`. The JDM entry currently uses absolute `https://danburgess.com/...` URLs.
- When adding a sample: add a `cases` entry (EN and JP), add it to the pre-rendered HTML in both files, decide whether it
  should be indexed (sitemap, or `noindex`), and make sure the sample carries a visible "portfolio concept" disclosure.

## Contact form

`ContactForm.tsx` posts JSON to `/api/contact`. The Pages Function checks same-origin, content type and a 20 KB limit,
validates the fields, silently accepts honeypot hits (`hp_field`), then sends the message by SMTP using
`cloudflare:sockets`. Nothing is stored by the site.

- Environment variables, set in Cloudflare and never committed: `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL`, optionally `SMTP_HOST`
  (defaults to `smtp.gmail.com`).
- Required / optional state is a visible tag (必須 / 任意, Required / Optional), not an asterisk or a placeholder.
- Validation is manual (`noValidate`): invalid fields get `aria-invalid` and the first one receives focus.
- The request has a 15 second timeout.

## Accessibility (target: WCAG 2.1 AA)

This is a target, not a certified claim; run Lighthouse and axe before claiming conformance.

- Keep the skip link, `:focus-visible` outlines, the single `<h1>` and a logical heading order (About uses an `<h2>`).
- Respect `prefers-reduced-motion` via `usePrefersReducedMotion`. The hero globe has a pause/resume button (WCAG 2.2.2).
- Decorative items (numerals, arrows, dots, illustrations) are `aria-hidden`. Images that carry meaning have alt text.
- Do not use `--accent-brand` (#FF6A1F) as text on light backgrounds. Use the tokens listed in `DESIGN.md`.
- Links that rely on colour also need an underline. New interactive targets should be at least 44px high.

## Styling conventions

- Tailwind utilities first. Use inline `style` only for motion values or browser fixes (for example `imageRendering`).
- Headings use `font-serif-display`, which maps to IBM Plex Sans Bold (with Noto Sans JP for Japanese).
- Secondary text uses `text-ink-muted`. Use the colour tokens in `tailwind.config.ts`, not raw hex values.
- Interface icons come from `lucide-react`. Brand logos (LinkedIn, Instagram, Blogger) and the manga avatar are SVGs in `src/assets`.
- Animate with `motion/react`. Use `transform: "translateZ(0)"` on animated images that look soft in Chromium.

## Known loose ends

- The OG images are about 450–470 KB; aim for under 300 KB.
- The static pre-rendered HTML omits the capability cards, toolkit and process notes.
- No `LICENSE` file; the README states how code and content are treated.
- `vitest` is installed but there is no `test` script.

## Do not

- Add raw user-visible strings outside `t()`.
- Commit secrets or put email addresses in source or git history.
- Reintroduce pricing, FAQ or client-project claims.
- Change static head tags without updating `SEOHead.tsx` (and the reverse).
