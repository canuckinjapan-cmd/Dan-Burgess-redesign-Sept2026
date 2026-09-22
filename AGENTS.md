# Coding Agent Instructions (AGENTS.md)

This document provides technical guidelines and implementation patterns for AI agents working on Dan Burgess Design Ver. 2.

## 🏗️ Architecture & Philosophy
- **Framework**: Vite-powered React SPA.
- **I18n Architecture**: Multi-language support is handled via a custom `LanguageContext`. All UI text must be wrapped in the `t(en, jp)` helper function.
- **Component Strategy**: High-density components (like `CaseStudies` and `Experience`) should be modular and data-driven via local arrays or constants.

## 🚦 Session Start Protocol
1.  **Read Directives**: Always consult `DESIGN.md` before making UI changes.
2.  **Bilingual Compliance**: Every text modification **MUST** include both English and Japanese versions using the `t()` helper.
3.  **Port Safety**: Ensure the dev server remains on **Port 3000**.

## 🎨 Implementation Patterns

### Typography & Icons
- **Headings**: Always use `font-serif-display` (Playfair Display).
- **Body**: Use `text-ink-muted` for secondary descriptions to maintain contrast ratios.
- **Icons**: Exclusively use `lucide-react`. Do not import SVGs directly unless requested.

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
