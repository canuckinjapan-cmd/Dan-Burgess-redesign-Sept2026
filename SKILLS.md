# SKILLS.md

Playbook of patterns and lessons for danburgess.com (the Japanese → English translator profile): social cards, SEO,
structured data, bilingual writing and layout, accessibility and deploy checks.
`AGENTS.md` covers how to work in the repo and `DESIGN.md` covers the visual system.
Lessons from the archived Version 2 portfolio are in `SKILLS.backup.md`.

## Contents

1. Social cards (Open Graph / Twitter)
2. SEO architecture for a bilingual site
3. Search Console and fetch-tool lessons
4. Structured data (JSON-LD)
5. Content wording rules
6. Bilingual writing and layout
7. Contact form and spam protection
8. Performance and accessibility checklist
9. Pre-deploy checklist

---

## 1. Social cards (Open Graph / Twitter)

Scrapers (LinkedIn, X, Facebook, Slack, LINE, Discord) do not run JavaScript. The tags must be in the static HTML.

- Put the full set in the static `<head>` of `index.html` (JP) and `en/index.html` (EN). `SEOHead.tsx` only keeps the
  head in sync after a client-side change. Strings in all three must be identical.
- One card per language: `public/DJB-og-image-JP.png` and `public/DJB-og-image-EN.png`, 1200 × 630, ideally under 300 KB.
  Keep important text inside the central 1080 × 560 area.
- Always include `og:image:width`, `og:image:height`, `og:image:alt` (in the page's own language), `og:locale`, `og:site_name`.
- Use absolute URLs on the canonical host: `https://danburgess.com` (no `www`).
- After changing a card, scrapers cache the old one. Re-scrape with the Facebook Sharing Debugger or LinkedIn Post Inspector.

---

## 2. SEO architecture for a bilingual site

- `/` is Japanese (`<html lang="ja">`), `/en/` is English (`<html lang="en">`). Each page has a self-referencing canonical.
- Each page lists both languages plus `x-default` (the Japanese root):

```html
<link rel="canonical" href="https://danburgess.com/en/" />
<link rel="alternate" hreflang="ja" href="https://danburgess.com/" />
<link rel="alternate" hreflang="en" href="https://danburgess.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://danburgess.com/" />
```

- The EN/JP toggle is plain `<a>` links. No JS-only switching and no redirect by browser language. Server-side or
  unconditional language redirects confuse Googlebot and break shared links.
- `public/sitemap.xml` lists the same two URLs with the same alternates; bump `lastmod` on content changes.
  `robots.txt` points to the sitemap. One host (`danburgess.com`) everywhere: canonicals, sitemap, OG, JSON-LD.
- The static body in each HTML file is a semantic copy of the page text. Keep it in step with the React copy.
- Length guides: EN title about 50–60 characters, EN description about 140–160. JP title about 30–35 full-width
  characters, JP description about 80–120.
- English meta description wording: say "English-native Japanese → English translator". Never "Native Japanese to English
  translator", which reads as a native Japanese speaker.

---

## 3. Search Console and fetch-tool lessons

- **Verify what crawlers get, not what DevTools shows.** DevTools shows the DOM after React runs. Use view-source
  (Ctrl+U) or `curl -s https://danburgess.com/en/ | head -60`.
- Fetch tools (and some AI assistants) can serve a stale cached copy of a page for hours or longer. A query string
  usually does not bypass the Cloudflare edge cache. If view-source is correct, the site is correct.
- After a deploy, check that the Cloudflare Pages deployment succeeded, look at `cf-cache-status` and `age` headers,
  and purge the cache if needed.
- Cloudflare Pages returns `index.html` with a 200 for unknown paths (no `404.html` / `_redirects`). Junk URLs then show
  as "Alternate page with proper canonical tag" in Search Console. Harmless.
- After head or copy changes, use URL Inspection → Request Indexing for `/` and `/en/`. Indexing takes days.
  Do not change canonicals again while waiting.
- Indexing controls: `/`, `/en/`, and `/samples/*` stay indexable. `public/_headers` marks `*.pages.dev` noindex.
  Do not add `Disallow` rules for noindexed paths (the crawler then cannot see the noindex tag).

---

## 4. Structured data (JSON-LD)

One `Person` block per page, matching what the page says:

- `name` (JP: ダン・バージェス; EN: Dan Burgess), `jobTitle` "Japanese-English translator" (JP: 日英翻訳者),
  `knowsLanguage` ["ja", "en"], `address` locality Fukuoka / country JP, `sameAs` LinkedIn only,
  `image` = a public URL that exists (never a `src/assets/...` path).
- No email, no phone, no street address. Do not add `FAQPage`, `Offer`, `priceRange` or `Service` markup.
- Validate with Google's Rich Results Test and the Schema.org validator after any edit.

---

## 5. Content wording rules

- Use the dates on the page: software company 1994–2004, Canon Tokyo 2004–2007, freelance 2007–present.
  Do not invent years of experience, clients, credentials or certifications. None are claimed (no ProZ, no associations).
- Canon is the only named client. Do not add client names or project titles.
- Subtitling is listed as "translation" only. Do not claim SRT / caption file delivery unless Dan updates it.
- "CV available on request" is intentional (no downloadable CV, to avoid bots). Keep it that way.
- US spelling by default; Canadian on request. Name the city level only (Fukuoka), never an address.
- Lead each section with a plain factual sentence. Avoid vague marketing language.

---

## 6. Bilingual writing and layout

- Write English and Japanese independently for their own audiences; never machine-translate one from the other.
  English: short, direct. Japanese: polite, specific.
- Use `t(en, jp)` from `useLanguage()` for every visible string.
- Katakana and Latin mixing: 「Webデザイン」 (not 「WEB」), half-width digits, no extra spaces around Latin words.
- Japanese line breaking and `palt` rules are in `DESIGN.md`. Test at several widths because wrap points differ by screen.
- Keep the EN/JP switch a fixed width so toggling never shifts the layout.
- Form copy: visible 必須 / 任意 tags. Examples: 「例：山田 太郎」, `example@company.co.jp`, 「例：株式会社〇〇」.
- When a JP string reads unnaturally, flag it to Dan instead of silently rewriting.

---

## 7. Contact form and spam protection

- Honeypot `website`: hidden with positioning, `aria-hidden`, `tabindex="-1"`, `autocomplete="off"`. If it has any value the
  server returns a normal success and silently discards the message. It must never trap keyboard or screen reader users.
- Cloudflare Turnstile (managed, light theme, `data-language` `ja` / `en`). The token MUST be verified server-side with
  `siteverify` plus `CF-Connecting-IP`. Client-only is decoration.
- Secrets live in Cloudflare variables, never in git: `TURNSTILE_SECRET_KEY` (Secret), `VITE_TURNSTILE_SITE_KEY` (Text,
  needed at build time, so redeploy after changing it), plus the SMTP variables listed in `AGENTS.md`.
  Preview deployments need the same variables under the Preview environment, and the Turnstile widget needs the preview
  hostname added.
- To test the honeypot in a React app, set the field through the native value setter and dispatch an `input` event (a plain
  `.value = ...` may not reach React state). Expect on-screen success and no email.
- Never display an email address on the site.

---

## 8. Performance and accessibility checklist

Performance
- Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`; `display=swap` on the font request.
- Compress OG images; give images `width` / `height` to avoid layout shift. Reveals and hovers must not cause CLS.

Accessibility (target WCAG 2.1 AA; run Lighthouse and axe before claiming it)
- Colour rules are in `DESIGN.md`. Never use `#FF6A1F` as text on light surfaces.
- Skip link, `:focus-visible` styles, one `<h1>`, logical heading order. Underline links that rely on colour.
- Honour `prefers-reduced-motion`. Hover effects also work on focus. Tooltips are never the only carrier of information.
- Forms: visible labels, visible Required / Optional tags, `aria-invalid`, focus moved to the first error,
  `aria-live` for status and Turnstile errors.
- Check contrast of placeholders and the small uppercase REQUIRED / OPTIONAL tags.

---

## 9. Pre-deploy checklist

- [ ] Title, description and OG text identical in `index.html`, `en/index.html` and `SEOHead.tsx`
- [ ] Static body text updated for any copy change
- [ ] Canonical, hreflang (`ja`, `en`, `x-default`) and `<html lang>` correct on both pages
- [ ] `public/sitemap.xml` `lastmod` bumped
- [ ] JSON-LD validates; `image` URL loads
- [ ] OG images set, `og:image:alt` in each language
- [ ] `npm run build`, `npm run lint` and `node --test functions/_lib/contact.test.mjs` pass
- [ ] No secrets or email addresses committed
- [ ] After deploy: view-source `/` and `/en/`; send a test message in both languages; Request Indexing if head tags changed
