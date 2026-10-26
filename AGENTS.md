# Coding Agent Instructions (AGENTS.md)

This document provides technical guidelines and implementation patterns for AI agents working on Dan Burgess Design Ver. 2.

## 🏗️ Architecture & Philosophy
- **Framework**: Vite-powered React SPA.
- **I18n Architecture**: Multi-language support is handled via a custom `LanguageContext`. All UI text must be wrapped in the `t(en, jp)` helper function.
- **Component Strategy**: High-density components (like `CaseStudies` and `Experience`) should be modular and data-driven via local arrays or constants.
- **Section Structure**: The page is structured into 4 core editorial sections:
  - Selected Work (`#work`)
  - About (`#about`)
  - Skills & Approach (`#skills`)
  - Contact (`#contact`)
  *(Note: Standalone Pricing and FAQ sections have been removed; project scopes and estimates are discussed directly via Contact).*

## 🚦 Session Start Protocol
1.  **Read Directives**: Always consult `DESIGN.md` and `SKILLS.md` before making UI changes.
2.  **Bilingual Compliance**: Every text modification **MUST** include both English and Japanese versions using the `t()` helper.
3.  **Port Safety**: Ensure the dev server remains on **Port 3000**.

## 🎨 Implementation Patterns

### Case Studies & Process Notes (`CaseStudies.tsx`)
- **Process Accordion**: Each case study includes an expandable "View the process notes" (`ProcessPanel`) with Challenge, Approach, Key decisions, and Tools.
- **Grid Stability**: The parent article grid uses `items-start` alignment so that expanding process notes downwards does not cause the desktop screenshot column to shift or drop down.

### Typography & Icons
- **Headings**: Always use `font-serif-display` (IBM Plex Sans Bold 700 / Noto Sans JP).
- **Body**: Use `text-ink-muted` for secondary descriptions to maintain contrast ratios.
- **Icons**: Exclusively use `lucide-react`. Do not import SVGs directly unless requested.

### Language Switcher (`TopBar.tsx`)
- **Interaction**: The language switcher uses a hover effect. When EN is active, hover shows the Japanese flag icon; when JP is active, hover shows the Canada maple leaf icon.
- **Layout Stability**: To prevent layout shifts during hover, ensure the switcher maintains a fixed width using `w-5`, `text-center`, and `border-transparent` for non-hover states.
- **Outline**: On hover, use an orange outline around the background area (same size and shape as the normal state orange background).

### Toolkit Block (`Index.tsx`)
- **Structure**: The "Toolkit" section is a bilingual data-driven block. Use the `t()` helper for all labels and text.
- **Capabilities**: Capability cards should feature `#work` links to related case studies.

### SEO & OG Images
- **Dynamic OG**: OG images are served dynamically (`DJB-og-image-EN.png` / `DJB-og-image-JP.png`). Ensure `SEOHead.tsx` maintains accurate meta tags.

### Framer Motion (via `motion/react`)
- Use `whileHover` for simple interactive states.
- Performance: Apply `transform: "translateZ(0)"` to animated images or marquees to ensure hardware acceleration and crisp rendering.

### Asset Management
- **Manga Avatar**: `/src/assets/danface_manga-2025.png`.
- **Optimized Rendering**: For small graphics (like favicons or small nav avatars), apply `imageRendering: "-webkit-optimize-contrast"` to avoid blurriness in Chromium.

## 🛠️ Build & Deployment
- **Base URL**: Access the base path via `import.meta.env.BASE_URL` in `BrowserRouter` or resource links.

## ⚠️ Anti-Patterns
- **No Hardcoded Strings**: Never add raw strings; always use the `t()` helper.
- **No Inline Styles**: Use Tailwind classes for 95% of styling. Use the `style={{}}` prop only for dynamic motion values or browser-specific rendering fixes (e.g., `imageRendering`).
- **No Absolute Paths**: For internal links or assets, respect the `base` URL of the project.
