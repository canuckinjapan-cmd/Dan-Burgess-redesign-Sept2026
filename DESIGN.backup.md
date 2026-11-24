# DESIGN.md

Design system for the Dan Burgess Design portfolio. Tokens live in `src/index.css` (CSS variables) and
`tailwind.config.ts` (Tailwind names). Use the Tailwind names, not raw hex values.

## Brand idea

Western minimalism with Japanese trust-building: a clean, editorial "paper and ink" frame, with the detail a
Japanese client looks for (process, roles, plain contact steps) kept visible. Premium, quiet, functionally dense.
Conversion first: one clear next step per section.

## Colour tokens

Contrast ratios were calculated from the actual token values against the three surfaces used on the site:
paper `#F7F3EC`, white (cards, form fields) and the About photo wash (`#E1DBD2`–`#E8D9CE`).
WCAG 2.1 AA needs 4.5:1 for normal text and 3:1 for large text (24px regular, or 18.66px bold) and UI components.

| Token (Tailwind) | Value | Paper | White | Photo wash | Use |
| :--- | :--- | ---: | ---: | ---: | :--- |
| `bg-paper` / `background` | `#F7F3EC` | – | – | – | Page base |
| `surface-elevated` / `card` | `#FFFFFF` | – | – | – | Cards, form fields |
| `surface-soft` | `36 20% 93%` | – | – | – | Alternate section tint |
| `ink` | `#14161A` | 16.4 | 18.1 | 13.2 | Body text, borders |
| `ink-muted` | `#5C6370` | 5.5 | 6.1 | 4.4 | Secondary text |
| `ink-label` / `ink-muted-strong` | `#5F636A` | 5.5 | 6.0 | 4.4 | Small mono labels, chips |
| `ink-placeholder` | `#6B6F76` | 4.6 | 5.1 | 3.7 | Form placeholders (on white only) |
| `ink-subtle` | `#8F96A3` | 2.7 | 3.0 | 2.2 | Decoration only, never text |
| `ink-dark` | `#111318` | 16.8 | 18.6 | 13.5 | Text on brand orange |
| `accent-brand` | `#FF6A1F` | 2.6 | 2.9 | 2.1 | Decorative fills only (see below) |
| `accent-text` | `#C03F0C` | 4.8 | 5.3 | 3.9 | Orange text and links on paper or white; large text on photo wash |
| `accent-text-large` | `#DB500F` | 3.7 | 4.1 | 3.0 | Large text only (hero and section headings, big numerals) |
| `accent-text-on-photo` | `#A8360A` | 5.9 | 6.6 | 4.8 | Small orange labels over the About photo |
| `accent-text-link-on-photo` | `#9A3412` | 6.6 | 7.3 | 5.3 | Underlined links over the About photo |
| `border` / `rule` | ink at 12–15% | – | – | – | Hairline structure |

`accent-brand` with `ink-dark` text is about 6.4:1. White text on `accent-brand` is about 2.9:1 and fails.

### Colour rules

1. Never use `accent-brand` (#FF6A1F) as text or icon stroke on a light surface, and never put white text on it.
   It is for dots, rules, arcs, selection highlight, and buttons or pills that carry `ink-dark` text.
2. Orange text: `accent-text` for anything normal-sized; `accent-text-large` only for large type.
3. Over the About photo wash, use the two `on-photo` tokens (see table). Links there are underlined.
4. White text on an orange background must use `accent-text` as the background (5.3:1).
5. Colour never carries meaning alone: orange text links are underlined; required fields carry a visible tag.
6. Focus outlines use ink or `accent-text` and must be visible (3:1 or better).
7. Decorative numerals, arrows and dots are `aria-hidden`.

## Typography

One family stack throughout: **IBM Plex Sans** with **Noto Sans JP** as the Japanese fallback. The Tailwind
families `display`, `serif`, `serif-display`, `sans`, `sans-body` and `mono` all resolve to this stack
(`mono` ends in `ui-monospace`). "Mono" labels are therefore small uppercase Plex Sans, not a true monospace.

| Role | Class | Notes |
| :--- | :--- | :--- |
| Headings | `font-serif-display font-bold` | Tracking about `-0.023em`; `text-balance` on section headings |
| Body | `font-sans-body` | 16–20px, `leading-relaxed`, secondary text `text-ink-muted` |
| Labels | `font-mono text-[11–12px] uppercase` | `text-ink-muted` or `ink-label` |

- Fonts load from Google Fonts in `index.css` with `display=swap`. `html` has `font-feature-settings: "palt" 1`
  (proportional Japanese kerning).
- `:lang(ja) { word-break: auto-phrase; }` breaks Japanese at phrase boundaries. Long JP headings also use
  `whitespace-nowrap` spans around intended break points, and body copy adds `text-pretty`.
- Write Japanese as 「Webデザイナー」, not 「WEBデザイナー」.
- Keep decorative English eyebrows off the Japanese page (see `AGENTS.md`).

## Layout and spacing

- Page container: `max-w-[1320px] mx-auto px-6 lg:px-10`. Sections use `py-24 lg:py-32` and a `border-t rule` divider.
- 12-column grids from `lg` (About, Contact). About also switches to a 12-column layout in landscape on tablets.
- Radius is small: `--radius: 0.25rem`.
- Sections in order: Hero (`#hero`), Selected Work (`#work`), About (`#about`), Skills & Approach (`#skills`),
  Contact (`#contact`), footer. The nav label for Skills is 「スキル・制作」; the section heading is
  「スキルと制作アプローチ」.
- Tap targets are at least 44px high where practical (process-notes summary, form fields, buttons).
- Heading order: one `<h1>` in the hero, `<h2>` for each section (About included), `<h3>` inside sections.

## Components

### TopBar
Fixed, `h-16`, with a spacer so content does not jump. Logo with the manga avatar, section links, "Get in Touch"
button, and a fixed-width EN/JP switch (no layout shift). Hovering a language pill shows a flag or 🍁 glyph in a
fixed-width slot. The mobile menu is a full-screen panel (`aria-expanded` on the toggle) with LinkedIn, Instagram
and Blogger icon links, each with an `aria-label`.

### Hero
Left-aligned `<h1>` over a `cobe` globe (`ui/globe.tsx`). The text uses `.hero-support-text`, an off-white
text-shadow halo, so it stays readable over the moving globe; mobile portrait gets a heavier outline. A pause/resume
button controls the globe (WCAG 2.2.2), and the globe respects `prefers-reduced-motion`.

### Selected Work cards (`CaseStudies.tsx`)
Data-driven from the `cases` array, bilingual fields per entry. Each card has screenshot, tagline, short
description, role, stack chips, a link to the live sample and a visible "portfolio concept" disclosure.
- Process notes: native `<details>/<summary>` labelled "View the process notes" / 「制作プロセスを見る」, with a
  `+` / `−` indicator, hairline dividers and uppercase labels (Challenge, Approach, Key decisions, Tools).
- The grid uses `items-start` so expanding the notes never moves the screenshot.

### About
Portrait plate (`PortraitPlate.tsx`) in a white framed card that scales slightly on hover (`whileHover` 1.02), beside
the bio. The plate is a static photograph with alt text; it is not a photo-to-illustration transition. Small
labels and links over the photo wash use the `on-photo` tokens.

### Skills & Approach
Capability cards with decorative numerals (`aria-hidden`), a toolkit block and a short "how I work" note.

### Contact (`ContactForm.tsx`)
Left column: heading, short paragraph and a details list (method, location, hours). Right column: the form.
- Fields: name, email, company, message. Required / Optional is a visible tag (必須 / 任意), not an asterisk.
- Manual validation: inline bilingual error text under each bad field (`text-red-700`, linked with `aria-describedby`),
  `aria-invalid`, and focus moved to the first bad field.
- Placeholders use `ink-placeholder` on white; Japanese examples are 「例：山田 太郎」, `example@company.co.jp`,
  「例：株式会社〇〇」.
- Submit button: ink background, `accent-text` on hover, arrow nudges on `group-hover`.
- Honeypot field is off-screen, `aria-hidden`, `tabIndex={-1}`.
- `ContactIllustration` (origami crane with letter) is the only section illustration in use.

## Motion

- Entrances use `cubic-bezier(0.16, 1, 0.3, 1)` (the `fade-in-up` keyframe). Nothing bouncy.
- Use `motion/react` for hover and entrance animation. Add `transform: translateZ(0)` to animated images that look
  soft in Chromium.
- Honour `prefers-reduced-motion` through `usePrefersReducedMotion` (`src/hooks/use-reduced-motion.ts`).
- Anything that moves for more than 5 seconds needs a visible pause control (the globe has one).
- `motion-safe:animate-in` (from `tailwindcss-animate`) is used on the process-notes panel.

## Imagery

- Photos and screenshots: meaningful alt text; decorative art is `aria-hidden`.
- OG images are 1200 × 630 PNGs, `DJB-og-image-EN.png` and `DJB-og-image-JP.png`, currently 450–470 KB.
  Aim for under 300 KB.
- Small icons that look soft can take `imageRendering: "-webkit-optimize-contrast"`.

## Notes

- `SectionIllustrations.tsx` now exports only `ContactIllustration`. Add new section art there, with `aria-hidden`.
- The logo ring (`TopBar.tsx`) and portrait ring (`PortraitPlate.tsx`) are static. If you animate them, define the
  keyframe in `tailwind.config.ts`, wrap it in `motion-safe:`, and respect `usePrefersReducedMotion`.
- The About section has no drop cap.
