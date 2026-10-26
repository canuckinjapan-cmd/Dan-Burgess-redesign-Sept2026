# Future Projects Knowledge Base & Skills Guide (SKILLS.md)

This document serves as an architectural blueprint and practical playbook for future web design, development, SEO, and AI search projects. It captures patterns, best practices, and lessons learned from the Dan Burgess Design portfolio and interactive sample sites.

---

## 📑 Table of Contents
1. [Open Graph (OG) & Social Card Architecture](#1-open-graph-og--social-card-architecture)
2. [Search Engine Optimization (SEO) Architecture](#2-search-engine-optimization-seo-architecture)
3. [Answer Engine Optimization (AEO) & AI Search](#3-answer-engine-optimization-aeo--ai-search)
4. [Structured Data (Schema.org / JSON-LD)](#4-structured-data-schemaorg--json-ld)
5. [Bilingual (I18n) & Cross-Cultural Architecture](#5-bilingual-i18n--cross-cultural-architecture)
6. [Case Study & Process Documentation Pattern](#6-case-study--process-documentation-pattern)
7. [Subdirectory Sites & Static Asset Routing](#7-subdirectory-sites--static-asset-routing)
8. [Performance, Accessibility & Core Web Vitals](#8-performance-accessibility--core-web-vitals)

---

## 1. Open Graph (OG) & Social Card Architecture

When links are shared on LinkedIn, X (Twitter), Facebook, Slack, Discord, or messaging apps, social scrapers fetch metadata **without executing client-side JavaScript**.

### Key Rules
- **Static Pre-rendering**: Always place the default tags directly inside the static HTML files (`index.html` and `en/index.html`). Do not rely solely on React hydration for social bot unfurls.
- **Dual-Language OG Assets**: Produce dedicated graphic share cards for each target language:
  - English: `/public/DJB-og-image-EN.png`
  - Japanese: `/public/DJB-og-image-JP.png`
- **Recommended Dimensions & Format**:
  - Resolution: `1200 × 630 px` (1.91:1 aspect ratio).
  - File size: Keep under `300 KB` (optimized PNG or high-quality JPEG/WebP) to ensure instant rendering across all social scrapers.
  - Safe zone: Keep crucial text and logos within the central `1080 × 560 px` box to avoid edge clipping on mobile feeds.
- **Dynamic Client Sync (`SEOHead.tsx`)**:
  When a user toggles languages on the client SPA, update `<meta property="og:*">` and `<meta name="twitter:*">` so that client bookmarks or in-app sharing reflect the chosen language.

### Standard Tag Implementation Template
```html
<!-- Open Graph / Meta -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://danburgess.com/" />
<meta property="og:site_name" content="Dan Burgess Design" />
<meta property="og:title" content="ダン・バージェス デザイン | Web開発・UI/UXデザイン・ローカライズ" />
<meta property="og:description" content="福岡を拠点に、世界に伝わるWebサイト、UI/UXデザイン、ローカライズを提供。" />
<meta property="og:image" content="https://danburgess.com/DJB-og-image-JP.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Dan Burgess Design Portfolio Preview" />
<meta property="og:locale" content="ja_JP" />
<meta property="og:locale:alternate" content="en_US" />

<!-- Twitter / X Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://danburgess.com/" />
<meta name="twitter:title" content="ダン・バージェス デザイン | Web開発・UI/UXデザイン・ローカライズ" />
<meta name="twitter:description" content="福岡を拠点に、世界に伝わるWebサイト、UI/UXデザイン、ローカライズを提供。" />
<meta name="twitter:image" content="https://danburgess.com/DJB-og-image-JP.png" />
```

---

## 2. Search Engine Optimization (SEO) Architecture

### Bilingual URL & Canonical Strategy
1. **Directory Routing**:
   - Default / Japanese: `https://danburgess.com/` (`<html lang="ja">`)
   - English: `https://danburgess.com/en/` (`<html lang="en">`)
2. **Bidirectional `hreflang` Annotations**:
   Every page must explicitly reference all language variants plus `x-default`:
   ```html
   <link rel="canonical" href="https://danburgess.com/" />
   <link rel="alternate" hreflang="ja" href="https://danburgess.com/" />
   <link rel="alternate" hreflang="en" href="https://danburgess.com/en/" />
   <link rel="alternate" hreflang="x-default" href="https://danburgess.com/" />
   ```
3. **Semantic Pre-rendered HTML (`#dan-app`)**:
   For SPAs, render semantic HTML (headings, nav links, paragraphs, project summaries) inside `<div id="dan-app">` before the React root mounts. Search engine spiders (Googlebot, Bingbot) read this text immediately on the initial HTTP response without waiting for client JavaScript execution.

### Character & Keyword Standards
- **English Titles**: 50–60 characters. Format: `Primary Name / Role | Key Specialty (Location)`
- **English Meta Descriptions**: 140–160 characters. Active voice, clear value proposition, and call to action.
- **Japanese Titles**: 28–32 full-width characters (全角).
- **Japanese Meta Descriptions**: 80–120 full-width characters. Natural Japanese phrasing emphasizing credibility, track record, and specific benefits.

---

## 3. Answer Engine Optimization (AEO) & AI Search

Answer Engine Optimization ensures that AI-driven search engines (Perplexity, ChatGPT Search, Google AI Overviews, Gemini, Claude, Bing Copilot) can parse, comprehend, and cite the site as an authoritative source.

### Principles of AEO
1. **Direct Answer Structure (Inverted Pyramid)**:
   - Provide direct, concise answers in the opening sentence of each section.
   - Avoid vague marketing jargon; use clear facts, verified dates (e.g. "active in Japan since 1992"), locations ("Fukuoka, Japan"), and technical proficiencies.
2. **Entity-Based Association**:
   - Explicitly link the person/brand entity to recognized industry topics: `Web Development`, `UI/UX Design`, `Localization`, `Bilingual Web Design`, `Information Architecture`.
3. **Structured Process Reasoning**:
   - AI search models favor content that demonstrates *why* decisions were made. The "Process Notes" component in `CaseStudies.tsx` (Challenge → Approach → Key Decisions → Tools) provides structured reasoning traces that AI agents can cite directly.
4. **FAQ Schema for Direct Ingestion**:
   - Provide Q&A pairs answering real client questions: timeline, bilingual workflow, tech stack, pricing models, and remote collaboration.

---

## 4. Structured Data (Schema.org / JSON-LD)

Use a multi-entity `@graph` structure in JSON-LD. This connects the author, website, and portfolio into an interconnected knowledge graph.

### Standard Schema Template
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
      "jobTitle": "Lead Web Developer & UI/UX Designer",
      "image": "https://danburgess.com/src/assets/danface_manga.svg",
      "description": "Dan Burgess is a Fukuoka-based designer specializing in web development, UI/UX design, and bilingual localization.",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "福岡県",
        "addressCountry": "JP"
      },
      "knowsLanguage": ["ja", "en"],
      "knowsAbout": [
        "Web Development",
        "UI/UX Design",
        "Localization",
        "Bilingual Web Design",
        "Information Architecture"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/danburgessdesign/",
        "https://github.com/canuckinjapan-cmd"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://danburgess.com/#website",
      "url": "https://danburgess.com/",
      "name": "Dan Burgess Design",
      "inLanguage": ["ja", "en"],
      "publisher": {
        "@id": "https://danburgess.com/#person"
      }
    }
  ]
}
```

---

## 5. Bilingual (I18n) & Cross-Cultural Architecture

### Independent Copywriting vs. Translation
- **Never rely on machine translation**: English and Japanese serve different cultural expectations.
- **Western / English Tone**: Concise, benefit-focused, direct active verbs, clear value propositions.
- **Japanese Tone**: Polite, trust-building, context-rich, detailing craftsmanship, process reliability, and clear business background.

### Implementation Pattern (`LanguageContext.tsx`)
```tsx
const { t, lang, setLang } = useLanguage();

// In JSX:
<h2>{t("Selected Work", "制作実績")}</h2>
<p>{t(item.summaryEn, item.summaryJp)}</p>
```

### Japanese Typography & Natural Word-Breaking
- **Auto-phrase Line Breaking**: Standard CJK line-breaking can awkwardly break semantic phrases and compound kanji words across lines.
- **Implementation**:
  ```css
  :lang(ja) {
    word-break: auto-phrase;
  }
  ```
  This activates browser-native phrase segmentation (using machine-learning models like BudouX in Chromium and WebKit), preventing single-character orphan lines and keeping grammatical phrases together naturally on responsive and mobile displays.

### Layout Stability (Zero Cumulative Layout Shift)
- Ensure language switchers have fixed widths (`w-5` or fixed padding) so toggling between "EN" and "JP" or hover flag icons does not trigger layout shifts.
- Maintain consistent button and badge heights across both languages.

---

## 6. Case Study & Process Documentation Pattern

High-impact portfolio case studies require both visual proof and strategic context.

### The 4-Part Process Framework
For every featured project, document:
1. **Challenge (`challenge`)**: The core business or user problem the project had to solve.
2. **Approach (`approach`)**: The strategic and creative solution developed.
3. **Key Decisions (`decisions`)**: Bulleted list of intentional trade-offs (e.g. limiting options to reduce friction, tailoring photography to location, independent bilingual copywriting).
4. **Tools (`tools`)**: Concrete stack (HTML/CSS/JS, Vite, Tailwind, AI tools, Cloudflare, etc.).

### Layout Rule for Expandable Drawers
- In 2-column grid layouts (Screenshot on one side, Copy + Process Notes on the other), set grid alignment to **`items-start`** (not `items-center`).
- This guarantees that when the user expands the accordion, the screenshot stays firmly in place rather than jumping or dropping down.

---

## 7. Subdirectory Sites & Static Asset Routing

When embedding static demo sites (e.g. `/samples/gym01/`, `/samples/real-estate01/`, `/samples/jdm-retro/`):

### Relative Path Discipline
- In client bundles, relative asset paths (like `src="./image.jpg"`) resolve against the **document URL** (`/samples/real-estate01/index.html`), NOT the script URL (`/samples/real-estate01/assets/main.js`).
- Always ensure static assets referenced by demo sites are placed in the root of the sample directory (e.g. `/public/samples/real-estate01/`) or explicitly prefixed with `./assets/`.

### Image Optimization Checklist
- **Hero Backgrounds**: Max 1920px width, 80–85% JPEG/WebP quality, target size < 250 KB.
- **Listing & Card Photos**: Max 1200 × 900px, 85% quality, target size < 150 KB.
- **Zero-People Rule**: For architectural, real estate, or gym interior demonstrations unless requested, exclude people from generated images to keep focus strictly on the environment.
- **Interactive Lightboxes**: Support left/right arrow buttons, keyboard arrow navigation (`ArrowLeft`/`ArrowRight`), touch swipe on mobile, click outside to dismiss, and `ESC` key handling.

---

## 8. Performance, Accessibility & Core Web Vitals

### Performance
- **Preconnect**: Preconnect to critical third-party font servers (`fonts.googleapis.com`, `fonts.gstatic.com`).
- **Font Display**: Always include `display=swap` on Google Fonts to prevent Flash of Invisible Text (FOIT).
- **Hardware Acceleration**: Apply `transform: "translateZ(0)"` to continuous animations or marquees.
- **Sharp Image Contrast**: For small vector or raster icons (favicons, nav logos), apply `imageRendering: "-webkit-optimize-contrast"`.

### Accessibility (WCAG 2.1 AA)
- **Contrast Discipline**: Brand orange (`#FF6A1F`) must only be used as a background carrying dark ink text (`#111318`), or as decorative rules. For text links or body copy, use AA-compliant `--accent-text` (`#C2410C`).
- **Interactive Affordance**: Text links must include underlines or explicit hover indicators so color is never the sole carrier of meaning.
- **Keyboard Navigation**: Ensure all custom modals, details drawers, and carousels are fully controllable via Tab, Enter, Space, Arrows, and Escape.
