# SKILLS.md

Playbook of patterns and lessons from the Dan Burgess Design portfolio: social cards, SEO, structured data,
bilingual build, case studies and static sample sites. `AGENTS.md` covers how to work in this repo and
`DESIGN.md` covers the visual system. This file is the "why" behind the SEO and i18n choices.

## Contents

1. Social cards (Open Graph / Twitter)
2. SEO architecture for a bilingual SPA
3. Search Console lessons
4. Structured data (JSON-LD)
5. Answer-engine (AI search) notes
6. Bilingual writing and layout
7. Case studies and process notes
8. Static sample sites under `public/samples/`
9. Performance and accessibility checklist
10. Pre-deploy checklist

---

## 1. Social cards (Open Graph / Twitter)

Scrapers (LinkedIn, X, Facebook, Slack, LINE, Discord) do not run JavaScript. The tags must be in the static HTML.

- Put the full set in the static `<head>` of both `index.html` (JP) and `en/index.html` (EN). React only keeps the head
  in sync after a client-side language switch (`SEOHead.tsx`). The strings in all three files must be identical.
- One card per language: `public/DJB-og-image-JP.png` and `public/DJB-og-image-EN.png`, 1200 × 630 (1.91:1), under 300 KB
  (they are currently 450–470 KB). Keep important text inside the central 1080 × 560 area.
- Always include `og:image:width`, `og:image:height`, `og:image:alt`, `og:locale` and `og:site_name`.
  The JP page currently has an English `og:image:alt`; a Japanese one is better.
- Use absolute URLs with the canonical host (`https://danburgess.com`, no `www`).
- The social title and description may be shorter and warmer than the `<title>` and meta description; that is
  intended, and `SEOHead.tsx` carries both (`title` / `ogTitle`, `description` / `ogDescription`).
- After changing a card, scrapers cache the old one. Re-scrape with the platform's debugger (Facebook Sharing Debugger,
  LinkedIn Post Inspector).

Template (Japanese page):

```html
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Dan Burgess Design" />
<meta property="og:url" content="https://danburgess.com/" />
<meta property="og:title" content="ダン・バージェス デザイン | Web開発・UI/UXデザイン・ローカライズ" />
<meta property="og:description" content="日本企業の海外発信を支援するWebデザイナー。デザイン、Web制作、日英のコミュニケーション経験を活かして、伝わるWebサイトをつくります。" />
<meta property="og:image" content="https://danburgess.com/DJB-og-image-JP.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="…" />
<meta property="og:locale" content="ja_JP" />
<meta property="og:locale:alternate" content="en_US" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## 2. SEO architecture for a bilingual SPA

### URLs and canonicals

- `/` is Japanese (`<html lang="ja">`), `/en/` is English (`<html lang="en">`). Each page has a self-referencing canonical.
- Every page lists both languages plus `x-default` (Japanese):

```html
<link rel="canonical" href="https://danburgess.com/" />
<link rel="alternate" hreflang="ja" href="https://danburgess.com/" />
<link rel="alternate" hreflang="en" href="https://danburgess.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://danburgess.com/" />
```

- `public/sitemap.xml` lists the same two URLs with the same alternates. Update `lastmod` when content changes.
  `public/robots.txt` points to `https://danburgess.com/sitemap.xml`.
- Pick one host (`danburgess.com`) and use it everywhere: canonicals, sitemap, robots, OG, JSON-LD.

### Pre-rendered body

The Vite build ships an empty React root, so each HTML file also carries a hand-written semantic copy of the page inside
`<div id="dan-app">`: headings, section text and project summaries. Crawlers and non-JS clients read this first.
Keep it in step with the visible copy. It currently omits the capability cards, toolkit and process notes.

### Language detection

`LanguageDetector` does a single `/` → `/en/` hop for first-time visitors whose browser does not list Japanese.
It skips crawlers (user-agent and `navigator.webdriver`), fires once (`lang_auto_redirect_done` in `localStorage`)
and never moves anyone off a URL they opened on purpose. Never add server-side or unconditional redirects by language:
they confuse Googlebot and break shared links.

### Length guidelines (guides, not hard limits)

- English title: about 50–60 characters. English description: about 140–160 characters.
- Japanese title: about 30–35 full-width characters. Japanese description: about 80–120 characters.
- Current EN title is longer than 60 characters because it carries the location; accept that or trim.

### Wording rules

- Do not claim web-design experience "since 1992". 1992 is when Dan moved to Japan: say "based in Japan since 1992".
- Name the prefecture or city level you are comfortable with (Fukuoka), never an address.
- Say "Web Designer / Front-End Developer" consistently across titles, descriptions, JSON-LD and the page.

---

## 3. Search Console lessons

- **"Alternate page with proper canonical tag" for odd URLs (for example `/ja/`).** Cloudflare Pages returns the
  SPA's `index.html` with a 200 for any unknown path, because the repo has no `404.html` or `_redirects`. Google
  sees duplicates of `/` that point their canonical at `/`. Harmless. To clean up, add `public/_redirects`
  (`/ja/  /  301`) or a `404.html`.
- **"Duplicate, Google chose different canonical than user" on `/en/`.** Usually a stale crawl from before the
  static head was correct. Fix the static head, confirm with Test Live URL (the tested HTML must show the EN
  canonical and hreflang), then Request indexing and wait.
- **Verify what crawlers get, not what DevTools shows.** DevTools shows the DOM after React and `SEOHead` have run.
  Use view-source or `curl -s https://danburgess.com/en/ | head -60` for the real response.
- **Stale live HTML after a deploy** is usually a cached copy at the edge. Check the Cloudflare Pages deployment
  succeeded, look at the `cf-cache-status` and `age` response headers, and purge the cache if needed.
- Indexing takes days to weeks. Do not change canonicals again while waiting.

---

## 4. Structured data (JSON-LD)

Use one `@graph` that ties the person to the site. It is in the Japanese page's static head. Match it to what the
page says.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://danburgess.com/#person",
      "name": "ダン・バージェス",
      "alternateName": "Dan Burgess",
      "url": "https://danburgess.com/",
      "jobTitle": "Web Designer / Front-End Developer",
      "image": "https://danburgess.com/DJB-og-image-JP.png",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "福岡県",
        "addressCountry": "JP"
      },
      "knowsLanguage": ["ja", "en"],
      "knowsAbout": ["Web Design", "Front-End Development", "UI/UX Design", "Localization", "Bilingual Websites"],
      "sameAs": [
        "https://www.linkedin.com/in/danburgessinjapan",
        "https://github.com/canuckinjapan-cmd"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://danburgess.com/#website",
      "url": "https://danburgess.com/",
      "name": "Dan Burgess Design",
      "inLanguage": ["ja", "en"],
      "publisher": { "@id": "https://danburgess.com/#person" }
    }
  ]
}
```

- `image` must be a public URL that exists (never a `src/assets/...` path, which is not served).
- Do not add `FAQPage`, `Offer`, `priceRange` or `Service` markup. The site has no FAQ or pricing, and marked-up
  content must be visible on the page.
- Validate with Google's Rich Results Test and the Schema.org validator after any edit.

---

## 5. Answer-engine (AI search) notes

- Lead each section with a plain factual sentence: who, where, what. Avoid vague marketing language.
- State verifiable facts: based in Japan since 1992, Fukuoka, bilingual JP/EN, the stack used.
- The process notes (Challenge → Approach → Key decisions → Tools) are the strongest reasoning content on the site.
  They are not in the static HTML yet. Adding a short text version of them to both HTML files would let crawlers and AI
  agents read them without running JavaScript.
- Keep entity names consistent: "Dan Burgess Design", "ダン・バージェス".

---

## 6. Bilingual writing and layout

- Write English and Japanese independently for their own audiences; never machine-translate one from the other.
  English: short, direct, benefit-first. Japanese: polite, specific and process-minded; what is being offered, how the
  work proceeds, and what to expect.
- Use `t(en, jp)` from `useLanguage()` for every visible string:

```tsx
const { t, lang, setLang } = useLanguage();
<h2>{t("Selected Work", "制作実績")}</h2>
```

- Register: avoid 「募集中」 as a self-description; 「…職を希望」 or 「…のお話も歓迎しています」 reads more naturally for a
  candidate.
- Katakana and Latin mixing: 「Webデザイナー」 (not 「WEB」), half-width digits, no extra spaces around Latin words.
- Japanese line breaking: `:lang(ja) { word-break: auto-phrase; }`, `text-pretty`, and `whitespace-nowrap` spans around
  intended phrase breaks in headings. Test at several widths, because wrap points differ by screen.
- Fonts: IBM Plex Sans with Noto Sans JP as fallback; `font-feature-settings: "palt" 1` for proportional kana.
- Keep the EN/JP switch a fixed width so toggling never shifts the layout.
- Form copy: mark Required / Optional with a visible tag (必須 / 任意). Japanese examples: 「例：山田 太郎」,
  `example@company.co.jp`, 「例：株式会社〇〇」.

---

## 7. Case studies and process notes

Every sample is a portfolio concept, not client work, and says so visibly on the sample itself.

Each `cases` entry in `CaseStudies.tsx` has English and Japanese fields plus `process` / `processJp`:

1. `challenge`: the problem the concept had to solve
2. `approach`: the solution in a sentence or two
3. `decisions[]`: three to four deliberate trade-offs
4. `tools`: the stack and any AI tools used

Presentation: native `<details>/<summary>` ("View the process notes" / 「制作プロセスを見る」), keyboard-operable,
44px summary, `items-start` on the grid so the screenshot stays put when it opens.

Adding a sample:

1. Build it under `public/samples/<name>/` (see section 8).
2. Add the `cases` entry (EN and JP, with process notes).
3. Add it to the pre-rendered HTML in both language files.
4. Decide whether it is indexed (add to the sitemap) or `noindex`.
5. Confirm the visible "portfolio concept" disclosure.
6. Use `import.meta.env.BASE_URL` for internal links. The JDM entry uses absolute `https://danburgess.com/...` URLs;
   keep it consistent when you touch it.

---

## 8. Static sample sites under `public/samples/`

Current samples: `gym01`, `real-estate01`, `jdm-retro`.

- Vite copies `public/` untouched, so each sample is plain static files served at `/samples/<name>/`.
- Relative asset paths resolve against the document URL (`/samples/<name>/index.html`), not the script URL. Keep assets
  next to the page or reference them explicitly (`./assets/...`).
- Image budgets: hero up to 1920 px wide, 80–85% quality, under about 250 KB; cards up to 1200 × 900, under about 150 KB.
- For architecture, gym or real-estate concepts, keep generated images free of people unless the brief needs them.
- Lightboxes: arrow buttons, `ArrowLeft` / `ArrowRight`, swipe, click-outside and `Esc` to close, with focus returned
  to the trigger.
- Each sample needs a visible disclosure that it is a portfolio concept, placed where it is seen without scrolling if
  possible.

---

## 9. Performance and accessibility checklist

Performance

- Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`; keep `display=swap` on the font request.
- Compress OG images and sample photos (budgets above). Give images `width` / `height` to avoid layout shift.
- Add `transform: translateZ(0)` to animated images that look soft in Chromium.

Accessibility (target WCAG 2.1 AA; run Lighthouse and axe before claiming it)

- Colour: follow the token rules in `DESIGN.md`. Never use `#FF6A1F` as text on light surfaces.
- Keep the skip link, `:focus-visible` outlines, one `<h1>` and a logical heading order.
- Links that rely on colour need an underline. Interactive targets are at least 44px high.
- Anything that moves for more than 5 seconds needs a pause control; honour `prefers-reduced-motion`.
- Forms: visible labels, visible Required / Optional tags, `aria-invalid`, and focus moved to the first error.
- Details/summary, menus and lightboxes must work with keyboard alone.

---

## 10. Pre-deploy checklist

- [ ] Title, description and OG text identical in `index.html`, `en/index.html` and `SEOHead.tsx`
- [ ] Pre-rendered `#dan-app` body updated for any copy change
- [ ] Canonical, hreflang and `x-default` correct on both pages
- [ ] `public/sitemap.xml` `lastmod` bumped
- [ ] JSON-LD validates; `image` URL loads
- [ ] OG images under 300 KB and `og:image:alt` set in each language
- [ ] `npm run build` and `npm run lint` pass
- [ ] After deploy: view-source `/` and `/en/`, then Request indexing in Search Console if head tags changed
- [ ] No secrets or email addresses committed
