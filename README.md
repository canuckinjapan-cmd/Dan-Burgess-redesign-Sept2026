# Dan Burgess Design

Portfolio site of Dan Burgess, a Fukuoka-based web designer and front-end developer.
Live: **https://danburgess.com** (日本語) · **https://danburgess.com/en/** (English)

福岡を拠点とするWebデザイナー／フロントエンド開発者、ダン・バージェスのポートフォリオサイトです。

## What this is

A bilingual (JP/EN) portfolio presenting three original website concepts - a 24-hour smart gym, a rural-property search site and a JDM vehicle-export shop - plus a short profile, skills and a contact form.
The sample sites are portfolio concepts, not commissioned client work.
Japanese and English pages are written separately for their own audiences, not machine-translated.

## Tech stack

- React 18 + Vite, TypeScript
- Tailwind CSS 3, `motion` (Framer Motion) for animation
- Cloudflare Pages + Functions (contact form endpoint), deployed from GitHub
- Fonts: IBM Plex Sans, Noto Sans JP

## Features

- **Separate JP / EN routes** (`/` and `/en/`) with hreflang, canonical URLs and static pre-rendered HTML for crawlers
- **Selected Work** cards with expandable process notes (challenge, approach, key decisions, tools)
- **Accessibility target: WCAG 2.1 AA** - semantic HTML, contrast-checked colour tokens, keyboard-operable controls, reduced-motion support and a pause control for the hero globe
- **Contact form** with honeypot spam protection, inline validation and bilingual messages
- Static Open Graph images for each language

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run lint
```

## Workflow note

The project was designed and developed using a combination of professional tools and AI-assisted workflows. All output is reviewed, edited and tested by hand.
AGENTS.md, DESIGN.md and SKILLS.md document the project's conventions and provide guidance for AI assistants working in the repository.

## License

Text, photography, illustrations and AI-generated images © Dan Burgess, all rights reserved, except the background photo by Ben Wicks (Unsplash License).