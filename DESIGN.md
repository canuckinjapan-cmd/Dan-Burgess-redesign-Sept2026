# Design System Specification (DESIGN.md)

## 🎯 Brand Identity
**"Bridging Western minimalism and Japanese trust-based design."**
The "Ver. 2" aesthetic is inspired by high-end editorial layouts—think premium broadsheet newspapers or architectural monographs. It balances the warmth of tactile paper with the precision of digital ink.

## 🎨 Color Tokens
| Token | HSL / Hex | Usage |
| :--- | :--- | :--- |
| `--background` | `36 25% 96%` (#F7F3EC) | Warm paper base. |
| `--foreground` | `220 15% 9%` | Primary ink color for text and borders. |
| `--accent-brand`| `19 100% 56%` (#FF6A1F) | Signature orange for CTAs, highlights, and drop-caps. |
| `--surface-elevated`| `0 0% 100%` | High-contrast card backgrounds. |
| `--rule` | `220 15% 9%` / 12% opacity | Hairline borders for structure. |

## 🖋️ Typography
| Role | Family | Weights | Details |
| :--- | :--- | :--- | :--- |
| **Display (Serif)** | `Playfair Display` | 100-900 | Elegant, classic editorial headers. Often paired with `tracking-tight`. |
| **Body (Sans)** | `Inter` | 100-900 | High legibility for bilingual content. Handles EN/JP pairing gracefully. |
| **Monospace** | `JetBrains Mono`| 400-800 | Technical data, tool stacks, and "Plate" identification labels. |
| **Japanese** | `Noto Sans JP` | 100-900 | Matched with Inter for a unified sans-serif look. |

## 📐 Layout & Spacing
- **Grid Strategy**: 12-column desktop grid with a `max-w-7xl` container.
- **Borders**: Sharp 0.25rem radius (`--radius`) for cards, combined with `rule` (12% ink) borders.
- **Paper Texture**: A subtle radial gradient grain is applied via `.bg-paper` for tactile depth.
- **Drop-cap**: Editorial start for the "About" section using `Playfair Display` and `accent-brand` color.

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
  - **§04 Pricing**: `PricingIllustration` — Traditional Japanese wooden soroban (abacus) with select highlighted orange beads.
  - **§05 Contact**: `ContactIllustration` — Stylized folded origami paper crane carrying an international letter with orange postmark stamp.
  - **§06 FAQ**: `FAQIllustration` — Integrated custom portrait line-drawing from `danface_only-2025.svg` paired with an elegant floating vector thought bubble enclosing a bold orange question mark (`?`).
