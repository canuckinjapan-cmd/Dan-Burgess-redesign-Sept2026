# Design System Specification (DESIGN.md)

## 🎯 Brand Identity
**"Bridging Western minimalism and Japanese trust-based design."**
The "Ver. 2" aesthetic is inspired by high-end editorial layouts—think premium broadsheet newspapers or architectural monographs. It balances the warmth of tactile paper with the precision of digital ink.

## 🎨 Color Tokens
| Token | HSL / Hex | Usage |
| :--- | :--- | :--- |
| `--background` | `36 25% 96%` (#F7F3EC) | Warm paper base. |
| `--foreground` | `220 15% 9%` | Primary ink color for text and borders. |
| `--accent-brand`| `19 100% 56%` (#FF6A1F) | Signature brand orange for decorative fills only (dots, underlines, rules, blobs, arcs, and buttons/pills carrying dark ink text #111318). Never use as text on light backgrounds. |
| `--accent-text` | `17 88% 40%` (#C2410C) | WCAG AA compliant (4.57:1 on paper, 3.76:1 on photo wash) for normal-size text, links, small labels, icons, and large headlines over photo washes. |
| `--accent-text-large` | `19 87% 46%` (#D9500F) | WCAG AA compliant (3.63:1 on paper) for large text (>=24px regular or >=18.66px bold, e.g. hero headline, section headlines, section numerals). |
| `--accent-text-on-photo` | `#A8360A` | WCAG AA compliant (4.77:1 on photo wash #E1DBD2/#E8D9CE) for small items (e.g. "About" section label) over the About photo background. |
| `--accent-text-link-on-photo` | `#9A3412` | WCAG AA compliant (5.31:1 on photo wash #E1DBD2/#E8D9CE) for underlined links (e.g. LinkedIn link) over the About photo background. |
| `--ink-dark` | `#111318` | Dark ink text for active language pill and high-contrast buttons on `#FF6A1F` background (6.49:1). |
| `--ink-label` | `#5F636A` | High-contrast grey for small uppercase labels (`/ CAPABILITY`, `CORE CAPABILITIES`) and chips on paper/cards (5.46:1 on paper, 6.04:1 on white). |
| `--ink-placeholder` | `#6B6F76` | Form input placeholder text (5.05:1 on white). |
| `--surface-elevated`| `0 0% 100%` | High-contrast card backgrounds. |
| `--rule` | `220 15% 9%` / 12% opacity | Hairline borders for structure. |

### WCAG 2.1 AA Contrast Rules
1. **Never use #FF6A1F as text on light backgrounds**: Brand orange `#FF6A1F` on paper (~#F4F0EC) measures 2.5–2.7:1 (fails AA). White text on `#FF6A1F` measures 2.86:1 (fails AA). Never use `#FF6A1F` with white text, or as text/icon stroke on light surfaces.
2. **Standard Text Tokens**: Use `--accent-text` (`#C2410C`) for normal text/icons (>= 4.5:1 on paper), and `--accent-text-large` (`#D9500F`) strictly for large text (>= 3:1 on paper).
3. **About Section Over Photo Wash**: Background photo wash measures between `#E1DBD2` and `#E8D9CE`. Large items ("02" numeral, "Design" headline) use `--accent-text` (`#C2410C`, 3.76:1). Small labels ("About") use `--accent-text-on-photo` (`#A8360A`, 4.77:1). Links ("LinkedIn ↗") use `--accent-text-link-on-photo` (`#9A3412`, 5.31:1) with an underline.
4. **Buttons & Pills**: Buttons with `#FF6A1F` background must carry dark ink text (`--ink-dark` / `#111318`, 6.49:1). Buttons/badges with white text must use `--accent-text` (`#C2410C`, 5.18:1).
5. **Form & Small Greys**: Form placeholders use `--ink-placeholder` (`#6B6F76`, 5.05:1 on white). Small labels and chip text use `--ink-label` (`#5F636A`, 5.46:1 on paper, 6.04:1 on white).
6. **Decorative Numerals**: Large grey card numerals ("01-04") are decorative and marked with `aria-hidden="true"`.
7. **Underlines on Links**: Text links must not rely on colour alone; orange text links must use an underline.
8. **Hover & Focus**: Hover and focus states never place `#FF6A1F` text on light backgrounds. Focus outlines use dark ink or `--accent-text` (>= 3:1).

## 🖋️ Typography
| Role | Family | Weights | Details |
| :--- | :--- | :--- | :--- |
| **Display** | `IBM Plex Sans` | 700 (Bold) | Authoritative, clean modern editorial headers. Kerning tightened by ~15% (`-0.029em`). |
| **Body (Sans)** | `IBM Plex Sans` | 400 (Regular) | High legibility for bilingual content. Handles EN/JP pairing gracefully. |
| **Monospace** | `IBM Plex Sans`| 400 (Regular) | Technical data, tool stacks, labels, and indices. Default kerning (`letter-spacing: normal`). |
| **Japanese** | `Noto Sans JP` | 100-900 | Matched with IBM Plex Sans for a unified look. |

## 📐 Layout & Spacing
- **Grid Strategy**: 12-column desktop grid with a `max-w-7xl` container.
- **Borders**: Sharp 0.25rem radius (`--radius`) for cards, combined with `rule` (12% ink) borders.
- **Paper Texture**: A subtle radial gradient grain is applied via `.bg-paper` for tactile depth.
- **Drop-cap**: Editorial start for the "About" section using `IBM Plex Sans` (Bold 700) and `accent-brand` color.

## 🎞️ Component Patterns

### 1. Portrait Plate
- **Interaction**: Features a timed transition from photo to manga illustration.
- **Hover**: Subject to a clockwise rotation (2 degrees) with a smooth `easeInOut` transition.

### 2. Case Study Cards
- **Content**: Displays rich project data including summary, specific roles, and tech stack.
- **Action**: Hover states feature subtle scaling (`scale-[1.01]`) and shadow enhancement.

### 3. Kinetic Wordmark (Marquee)
- **Velocity**: 38s linear cycle.
- **Optimization**: Uses `translateZ(0)` and `-webkit-optimize-contrast` for sharp rendering in Chromium browsers.

## 🏗️ Motion Guidelines
- **Ease**: Prefer `cubic-bezier(0.16, 1, 0.3, 1)` for entrances (the "fade-up" effect).
- **Subtlety**: Animations should feel authoritative and smooth, never "bouncy" or distracting.
- **Responsive**: Complex hover effects are maintained through the `motion` library's `whileHover` prop.

## 🎨 Block Illustrations (Section Graphics)
To enrich sections visually, pristine inline vector SVGs are dynamically rendered under headers/descriptions in the left-hand column (with the exception of §02 — About):
- **Aesthetic**: Minimalist hand-drawn manga/sketched brush stroke style with clean, organic shapes, solid white inner boundaries, and a single solid accent of bright orange (`#FF6A1F`).
- **Styling Specs**: Sized precisely at `w-40 md:w-48` and marked as `pointer-events-none` to remain elegant, crispy high-resolution landmarks. Fully transparent backgrounds outside outline boundaries.
- **Component Mapping (/src/components/SectionIllustrations.tsx)**:
  - **§01 Selected Work**: `SelectedWorkIllustration` — Sketch-style browser wireframe mockup with custom click arrow and orange CTA action.
  - **§03 Services**: `BilingualServicesIllustration` — Intersecting handwritten dialogue balloons showing bilingual mastery ("ABC" in English serif, "あいう" in Japanese Mincho serif with orange accent).
  - **§04 Contact**: `ContactIllustration` — Stylized folded origami paper crane carrying an international letter with orange postmark stamp.
  - **§05 FAQ**: `FAQIllustration` — Integrated custom portrait line-drawing from `danface_only-2025.svg` paired with an elegant floating vector thought bubble enclosing a bold orange question mark (`?`).
  *(Note: The standalone Pricing section and table have been removed in favor of bespoke consultation via Contact).*
