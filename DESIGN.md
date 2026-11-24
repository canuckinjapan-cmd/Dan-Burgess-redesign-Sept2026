# DESIGN.md

Design system for the LIVE danburgess.com translator profile. Tokens live in `src/index.css` (CSS variables) and
`tailwind.config.ts`. Use Tailwind token names, not raw hex values.
The Version 2 portfolio visuals (globe, case-study cards, process notes, section illustrations) are archived in
`DESIGN.backup.md` and branch `backup/live-v2`. Do not use them.

## Brand idea

"Trust-building minimalism": a clean editorial "paper and ink" frame with precise, scannable content for translation
agency project managers. Quiet, premium, functionally dense. One clear next step: the inquiry form.
Restraint is the design signal. Consistency of motion and focus states matters more than decoration.

## Colour tokens

WCAG 2.1 AA needs 4.5:1 for normal text, 3:1 for large text (24px regular or 18.66px bold) and UI components.

| Token (Tailwind) | Value | On paper | On white | Use |
| :--- | :--- | ---: | ---: | :--- |
| `bg-paper` / `background` | `#F7F3EC` | – | – | Page base |
| `surface-elevated` / `card` | `#FFFFFF` | – | – | Form card, fields, hover lift |
| `ink` | `#14161A` | 16.4 | 18.1 | Body text, borders |
| `ink-muted` | `#5C6370` | 5.5 | 6.1 | Secondary text |
| `ink-label` | `#5F636A` | 5.5 | 6.0 | Small uppercase labels, tags |
| `ink-placeholder` | `#6B6F76` | 4.6 | 5.1 | Placeholders (on white only) |
| `ink-subtle` | `#8F96A3` | 2.7 | 3.0 | Decoration only, never text |
| `ink-dark` | `#111318` | 16.8 | 18.6 | Text on brand orange |
| `accent-brand` | `#FF6A1F` | 2.6 | 2.9 | Decorative fills only |
| `accent-text` | `#C03F0C` | 4.8 | 5.3 | Orange text, links, focus border |
| `accent-text-large` | `#DB500F` | 3.7 | 4.1 | Large type only (section labels at large size, big numerals) |
| `border` / `rule` | ink at 12–15% | – | – | Hairlines |

### Colour rules

1. Never use `accent-brand` (#FF6A1F) as text or icon stroke on a light surface, and never put white text on it.
2. Orange text: `accent-text` for anything normal-sized; `accent-text-large` only for large type.
3. White text on an orange background must use `accent-text` as the background.
4. Colour never carries meaning alone: orange text links are underlined; required fields carry a visible tag.
5. Focus indicators use ink or `accent-text` and need 3:1 or better.
6. Decorative numerals, arrows, flags and dots are `aria-hidden`.

## Typography

One stack: **IBM Plex Sans** with **Noto Sans JP** as the Japanese fallback. Pair them consistently in both languages.

| Role | Style |
| :--- | :--- |
| Name / headings | Bold, tracking about `-0.023em`, `text-balance` |
| Positioning line | Orange (`accent-text-large`), medium weight, directly under the name |
| Body | 16–20px, `leading-relaxed`, secondary text `text-ink-muted` |
| Section headings | Bold, Title Case in English (`text-xl sm:text-2xl`, `tracking-[-0.02em]`), orange (`accent-text`) e.g. Professional Experience |

Japanese rules:
- `:lang(ja)` headings and card titles: `word-break: auto-phrase; line-break: strict; text-wrap: balance;`.
  `auto-phrase` is Chromium-only, so use `<wbr>` or `whitespace-nowrap` spans at phrase boundaries for Safari / Firefox.
  Known breakage to avoid: mid-word breaks like ローカライ/ズ and ユーザーインター/フェース.
- `font-feature-settings: "palt"` on headings only. Never on JP body paragraphs.
- Write 「Webデザイナー」 style: half-width digits, no extra spaces around Latin words.
- Check JP/EN font pairing after any typography change.

## Layout

- Cream page background, content in a centered column (wide max width, `px-6 lg:px-10`). Sections separated by hairline rules.
- Desktop: portrait on the left, name + positioning line + meta list + intro on the right. Mobile: single column, stacked.
- The meta list (Native English · US spelling by default; Canadian on request · Accepting new projects · Based in
  Fukuoka, Japan) is a list with subtle separators.
- Sections: Hero, Professional Experience, Specializations, Tools & Formats, Web & Technical Background,
  Professional Inquiries, footer. Sections stay flat (no card around them), except the form card.
- Mobile first. Tap targets are at least 44px high where practical.

## Components

### Header
Fixed bar: logo (manga avatar) + wordmark DANBURGESS.COM (BURGESS in orange) on the left, EN/JP toggle on the right.
- Hover or focus on the wordmark shows a "RETURN TO TOP" balloon (also appears at the page bottom).
- After about 20px of scroll, a hairline bottom border appears.
- The EN/JP toggle is plain links, fixed width (no layout shift), with a flag / maple leaf glyph on hover and focus.
  Glyphs are decorative (`aria-hidden`); the EN / JP text is the real indicator.

### Hero and portrait
White-framed portrait, scales up slightly on hover (max 1.03). Hero content rises into place on load.

### Professional Experience items
Timeline with a left vertical rule. Three items: numbered heading, dates / company line, description.
- Hover or focus: number turns orange to ink and the heading colour wipes ink to orange, left to right.
- Desktop (`@media (hover: hover)`): the item background lifts to white with a very soft shadow and a little extra padding.
- Touch (`hover: none`): the item nearest the vertical centre of the viewport becomes "active" (left rule full orange,
  number orange). Only one active at a time. Never change a background on scroll.

### Specializations tag grid
Semantic `<ul>` / `<li>`, displayed as bordered tags: two columns on desktop, one column on mobile portrait.
- 1px warm-grey border, small padding, same type as body.
- Hover or focus (`hover: hover` only): white fill, orange border. Not links: no pointer cursor.
- Check Japanese wrapping for long items such as カメラ・電子機器の技術資料.

### Tools & Formats, Web & Technical Background
Plain text. No hover effects.

### Contact form (Professional Inquiries)
Short line "CV available on request. Please use the form below." then the form in a white card.
- Fields: name, email, company / organization (optional), message. Visible Required / Optional tags (必須 / 任意).
- Focus state: a SINGLE thin orange border (`accent-text`). No double outline and no extra ring (Dan rejected it as too much).
- Inline validation messages are hidden until blur or submit, linked by `aria-describedby`, and fade in.
- Turnstile widget (managed, light) sits above the submit button. Localized `aria-live` error if the check fails or expires.
- Honeypot field `website` is off-screen, `aria-hidden`, `tabIndex={-1}`.
- Submit button: ink background, turns orange on hover, arrow slides right. Do not change.
- Footer note: "Replies within 1–2 business days · JST" (EN) / 「通常1〜2営業日以内に返信いたします。」(JP).

### Footer
© line and "Social →" (EN) / "SNS →" (JP) with the LinkedIn icon only. Hover or focus shows a "PROFESSIONAL PROFILE" balloon.
The icon link has an `aria-label`. No Instagram or Blogger.

## Motion

Define once as CSS variables and reuse everywhere:
- `--motion-fast: 200ms` (hover / focus), `--motion-slow: 500ms` (reveals), `--ease: cubic-bezier(0.22, 1, 0.36, 1)`.
- Animate only `transform`, `opacity`, `color`, `background-color`, `border-color`, `box-shadow`. No layout properties.
- `@media (prefers-reduced-motion: reduce)` disables reveals, the hero rise, the portrait scale and all transforms.
  Colour changes may stay as instant swaps.
- Every hover effect also applies on `:focus-visible` / `:focus-within`. Hover-only styling lives in `@media (hover: hover)`.
- Scroll reveal is progressive enhancement: content is visible by default (no JS, crawlers, print). Hiding may only
  start after JS adds a class to `<html>` before first paint. Nothing already in view on load animates. Do not make the
  effect stronger unless Dan asks.
- Do NOT add parallax, cursor followers, typewriter text, animated counters, looping or bouncing animation, spinners.

## Imagery

- Portrait and logo have alt text where meaningful; decorative art is `aria-hidden`.
- OG images: 1200 × 630 PNG, `DJB-og-image-EN.png` and `DJB-og-image-JP.png`. Aim for under 300 KB.
