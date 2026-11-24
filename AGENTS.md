# AGENTS.md

Guidelines for AI coding assistants (and humans) working on danburgess.com.
Read `DESIGN.md` before changing any UI. `SKILLS.md` holds the SEO / i18n playbook.

## What this project is (read this first)

The LIVE site is a bilingual (Japanese / English) profile page for **Dan Burgess, a Japanese → English translator
and localization specialist** (software, UI, games, SaaS, camera/electronics documentation). The audience is
translation agencies and project managers. It is NOT a design portfolio.

- `/` = Japanese, `/en/` = English.
- Live page sections, in order: header, hero (portrait, name, positioning line, meta list, intro), Professional
  Experience, Specializations, Tools & Formats, Web & Technical Background, Professional Inquiries (contact form), footer.
- `COMING_SOON_MODE = true` in `src/pages/Index.tsx` renders this profile page.

## Archived: Version 2 web-design portfolio (do not use as a reference)

The old portfolio code is still in the repo behind the flag, and is backed up on branch `backup/live-v2`.
Ignore it unless Dan explicitly asks: `CaseStudies.tsx`, `PortraitPlate.tsx` (portrait still used? check before
deleting), `SectionIllustrations.tsx`, `ui/globe.tsx`, the Version 2 JSX in `Index.tsx`, and `public/samples/`.
Anything in `*.backup.md` files describes the OLD site. Do not describe the live site from those files.

## Stack and commands

- React 18, Vite 5 (multi-page: `index.html` and `en/index.html`), TypeScript, Tailwind CSS 3, `motion`, `lucide-react`
- Cloudflare Pages + Functions deploys from GitHub. Pushing to `main` deploys to production.
- Path alias: `@` points to `src`

```bash
npm install
npm run dev      # port 3000
npm run build
npm run lint
node --test functions/_lib/contact.test.mjs   # contact + Turnstile helper tests
```

## Repository layout (live parts)

| Path | What it is |
| :--- | :--- |
| `index.html` | Japanese page: static `<head>`, JSON-LD and static semantic body for crawlers |
| `en/index.html` | Same for English |
| `public/` | `robots.txt`, `sitemap.xml`, `_headers`, OG images (`DJB-og-image-EN.png` / `-JP.png`) |
| `functions/api/contact.js` | Contact endpoint (Pages Function) |
| `functions/_lib/contact.js` | Validation, Turnstile check, message building, SMTP helpers |
| `src/App.tsx` | Router, providers, `SEOHead` |
| `src/pages/Index.tsx` | The page |
| `src/components/` | `TopBar`, `ContactForm`, `SEOHead`, `ui/` |
| `src/context/LanguageContext.tsx` | `useLanguage()` provider |
| `src/hooks/` | `use-reduced-motion`, `use-toast` |

## Language and routing

- The URL is the source of truth. `useLanguage()` returns `{ lang, setLang, t }`.
- The EN/JP toggle is plain links (`/` and `/en/`). Do NOT add automatic redirects by browser language.
- Every visible string goes through `t(en, jp)`. Write English and Japanese independently; never machine-translate one
  from the other.
- English uses US spelling ("Inquiries", "Localization").

## Head tags and static HTML (important)

- Crawlers, link previews and fetch tools read the static HTML, not React. The static `<head>` and body in
  `index.html` and `en/index.html` are the source of truth for title, description, canonical, hreflang, Open Graph,
  Twitter tags, JSON-LD and the page text.
- `SEOHead.tsx` only keeps the head in sync after a client-side change. Strings must be identical in all three
  places. If you change copy, a title or a description, change `index.html`, `en/index.html` AND the React code.
- Both pages need: correct `<html lang>`, self-referencing canonical, hreflang `ja` / `en` / `x-default` (root), localized
  title, description and og tags, and `Person` JSON-LD (no email, no phone).
- `public/sitemap.xml` lists `/` and `/en/`. Update `lastmod` when content changes.
- `/` and `/en/` (as well as `/samples/*`) stay indexable. Never add `noindex` to them.
- `public/_headers` marks `*.pages.dev` as `noindex`. Do not change indexing rules without asking Dan.
- Do not `Disallow` noindexed paths in `robots.txt` (crawlers then cannot see the noindex tag).

## Contact form

`ContactForm.tsx` posts JSON to `/api/contact`. The Pages Function checks same-origin, content type and a 20 KB limit,
validates the fields, discards honeypot hits silently (returns a normal success), verifies the Turnstile token
server-side, then sends the message by SMTP using `cloudflare:sockets`. Nothing is stored by the site.

- Spam protection: honeypot field `website` (off-screen, `aria-hidden`, `tabIndex={-1}`, `autocomplete="off"`) plus
  Cloudflare Turnstile (managed mode, light theme, `data-language` = `ja` on `/` and `en` on `/en/`).
- The server MUST verify the token with Cloudflare `siteverify`, including `CF-Connecting-IP`. Client-only is not acceptable.
- Environment variables (set in Cloudflare, never committed): `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL`, optional `SMTP_HOST`,
  `TURNSTILE_SECRET_KEY` (secret), `VITE_TURNSTILE_SITE_KEY` (build-time text variable).
  `.env.example` lists names only. Local dev and tests use Cloudflare's published always-pass test keys.
- Required / optional is a visible tag (必須 / 任意, Required / Optional). Validation is manual (`noValidate`) with
  inline messages linked by `aria-describedby`, `aria-invalid`, and focus moved to the first error.
- Do NOT display an email address anywhere (page, markup, JSON-LD, source). The form is the only contact method.

## Accessibility (target WCAG 2.1 AA)

Run Lighthouse and axe before claiming conformance.

- Keep the skip link, `:focus-visible` styles, a single `<h1>`, logical heading order.
- Respect `prefers-reduced-motion`. Every hover effect also works on keyboard focus.
- Do not use `--accent-brand` (#FF6A1F) as text on light backgrounds. Use the tokens in `DESIGN.md`.
- Decorative items (flags, numerals, arrows) are `aria-hidden`. The LinkedIn icon link has an `aria-label`.
- Interactive targets are at least 44px high where practical.

## Styling conventions

- Tailwind utilities first. Use the colour tokens in `tailwind.config.ts`, not raw hex values.
- Motion tokens and rules are in `DESIGN.md`. No new animation libraries.
- Japanese typography rules are in `DESIGN.md` (headings: `auto-phrase`, `line-break: strict`, `palt` on headings only).

## Do not

- Describe or edit the site as a design portfolio. Do not reintroduce Work, case studies, pricing, FAQ or client claims.
- Add Instagram or Blogger links. LinkedIn is the only social link.
- Add credentials, certifications, ProZ or association claims. None are claimed.
- Add raw user-visible strings outside `t()`.
- Commit secrets, or put email addresses in source or git history.
- Change static head tags without updating `SEOHead.tsx` (and the reverse).
- Edit `functions/`, Turnstile or honeypot logic unless the task is about the form.
