import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { TopBar } from "@/components/TopBar";
import { CaseStudies } from "@/components/CaseStudies";
import { ContactForm } from "@/components/ContactForm";
import { PortraitPlate } from "@/components/PortraitPlate";
import { Globe } from "@/components/ui/globe";
import aboutBg from "@/assets/photo-1570435229357-79dd1692b110-BC.jpg";

import { 
  ContactIllustration 
} from "@/components/SectionIllustrations";

import instagramLogo from "@/assets/instagram-logo-org.svg";
import bloggerLogo from "@/assets/blogger-logo-org.svg";
import linkedinLogo from "@/assets/linkedin-logo-org.svg";
import { useLanguage } from "@/context/LanguageContext";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { Pause, Play } from "lucide-react";

const Index = () => {
  const [globePaused, setGlobePaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { t, lang } = useLanguage();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });
  const aboutY = useTransform(aboutScrollProgress, [0, 1], [-80, 80]);

  const currentYear = new Date().getFullYear();

  const getSeasonDetails = () => {
    return {
      issueNo: 29,
      seasonEn: "Winter",
      seasonJp: "冬",
      seasonYear: 2026,
    };
  };

  const seasonDetails = getSeasonDetails();

  const capabilities = [
    {
      num: "01",
      label: "DESIGN",
      jpSubtitle: t("", "デザイン・UI"),
      tag: (
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-ink-label px-2 sm:px-2.5 py-1 border border-ink/15 bg-surface-soft/40 whitespace-nowrap">
          Layout · Typography · UI
        </span>
      ),
      body: t(
        "Visual design, layout, typography, information hierarchy, and UI.",
        "レイアウト、タイポグラフィ、情報設計を通じて、伝わりやすく使いやすい画面を設計します。"
      ),
      evidence: t(
        <>
          Layout and type systems for bilingual sites. See{" "}
          <a
            href="#work"
            className="text-ink underline decoration-ink underline-offset-4 hover:text-accent-text hover:decoration-accent-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            SUKIMA FIT
          </a>
          .
        </>,
        <>
          日英サイトのレイアウトとタイポグラフィ設計。実例：
          <a
            href="#work"
            className="text-ink underline decoration-ink underline-offset-4 hover:text-accent-text hover:decoration-accent-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            SUKIMA FIT
          </a>
        </>
      ),
    },
    {
      num: "02",
      label: "BUILD",
      jpSubtitle: t("", "Web制作"),
      tag: (
        <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-ink-label px-2 sm:px-2.5 py-1 border border-ink/15 bg-surface-soft/40 font-semibold whitespace-nowrap">
          <span className="text-accent-text">HTML</span> → <span className="text-ink">CSS</span> → <span className="text-ink">JS</span>
        </span>
      ),
      body: t(
        "Responsive web production using HTML, CSS, JavaScript, and modern production workflows.",
        "HTML、CSS、JavaScriptを活用し、さまざまな画面サイズに対応するWebサイトを制作します。"
      ),
      evidence: t(
        "Hand-coded since the Notepad era. Today: React, Vite and Tailwind, shipped via GitHub to Cloudflare.",
        "メモ帳でHTMLを手書きしていた時代から。現在はReact・Vite・Tailwindで構築し、GitHub経由でCloudflareに公開。"
      ),
    },
    {
      num: "03",
      label: "CONNECT",
      jpSubtitle: t("", "日英コミュニケーション"),
      tag: (
        <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-ink-label px-2 sm:px-2.5 py-1 border border-ink/15 bg-surface-soft/40 font-semibold whitespace-nowrap">
          <span className="text-accent-text">JP</span> ↔ <span className="text-ink">EN</span>
        </span>
      ),
      body: t(
        "Japanese-English communication, localization, and clear communication across languages and cultures.",
        "日本語と英語の両方で情報を整理し、異なる言語や文化の相手にも伝わる表現を考えます。"
      ),
      evidence: t(
        <>
          Separate EN and JP pages, each written for its own audience. See{" "}
          <a
            href="#work"
            className="text-ink underline decoration-ink underline-offset-4 hover:text-accent-text hover:decoration-accent-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            SUKIMA FIT
          </a>
          .
        </>,
        <>
          日本語版と英語版を別ページとして、それぞれの読者に向けて作成。実例：
          <a
            href="#work"
            className="text-ink underline decoration-ink underline-offset-4 hover:text-accent-text hover:decoration-accent-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            SUKIMA FIT
          </a>
        </>
      ),
    },
    {
      num: "04",
      label: "EXPLORE",
      jpSubtitle: t("", "新しい制作手法"),
      tag: (
        <span className="font-mono text-[10px] sm:text-[11px] tracking-wider text-ink-label px-2 sm:px-2.5 py-1 border border-ink/15 bg-surface-soft/40 font-semibold whitespace-nowrap">
          Concept → Prototype → Code
        </span>
      ),
      body: t(
        "AI-assisted prototyping and development, with hands-on review, refinement, and testing.",
        "AIを活用した試作・実装と、自らの確認・修正・検証を組み合わせて制作します。"
      ),
      evidence: t(
        <>
          AI-assisted prototypes, reviewed and edited by hand. See{" "}
          <a
            href="#work"
            className="text-ink underline decoration-ink underline-offset-4 hover:text-accent-text hover:decoration-accent-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            the demos above
          </a>
          .
        </>,
        <>
          AIで試作し、人の目で確認・修正。
          <a
            href="#work"
            className="text-ink underline decoration-ink underline-offset-4 hover:text-accent-text hover:decoration-accent-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            上の作品
          </a>
          をご覧ください。
        </>
      ),
    },
  ];

  const toolkitRows = [
    {
      label: t("DESIGN", "デザイン"),
      itemsEn: ["Photoshop", "Affinity", "layout", "typography", "UI"],
      itemsJp: ["Photoshop", "Affinity", "レイアウト", "タイポグラフィ", "UI"],
    },
    {
      label: t("BUILD", "構築"),
      itemsEn: ["HTML5", "CSS3", "JavaScript", "React", "Vite", "Tailwind CSS", "Framer Motion", "WordPress"],
      itemsJp: ["HTML5", "CSS3", "JavaScript", "React", "Vite", "Tailwind CSS", "Framer Motion", "WordPress"],
    },
    {
      label: t("SHIP", "公開"),
      itemsEn: ["Git / GitHub", "Cloudflare Pages & Functions"],
      itemsJp: ["Git", "GitHub", "Cloudflare Pages・Functions"],
    },
    {
      label: t("QUALITY", "品質"),
      // TODO: remove "(target)" / （準拠を目標） once the accessibility fixes have shipped.
      itemsEn: ["Semantic HTML", "mobile-first", "WCAG 2.1 AA (target)", "performance"],
      itemsJp: ["セマンティックHTML", "モバイルファースト", "WCAG 2.1 AA（準拠を目標）", "パフォーマンス"],
    },
    {
      label: t("BILINGUAL", "日英"),
      itemsEn: ["EN/JP interfaces", "Japanese–Latin typography", "localization"],
      itemsJp: ["日英バイリンガルUI", "和欧混植タイポグラフィ", "ローカライズ"],
    },
  ];

  return (
    <div id="top" className="bg-paper text-ink min-h-dvh font-sans-body w-full overflow-x-hidden relative">
      <TopBar />

      <main id="main-content" className="w-full">
        {/* HERO ============================================================ */}
        <section id="hero" className="relative overflow-hidden w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">
          {/* 3D Spinning Globe Background positioned prominently on the right half, elevated and interactive */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
            <motion.div 
              style={{ y }} 
              className="absolute -right-24 sm:-right-16 md:-right-8 lg:right-0 xl:right-12 top-10 sm:top-8 md:top-6 lg:top-8 xl:top-6 w-[560px] sm:w-[680px] md:w-[780px] lg:w-[880px] xl:w-[980px] aspect-square max-w-none pointer-events-auto"
            >
              <Globe paused={globePaused} />
            </motion.div>
            {/* Subtle Vignette fades to blend seamlessly into textured paper canvas */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper via-paper/60 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 left-0 w-32 sm:w-48 bg-gradient-to-r from-paper to-transparent pointer-events-none" />
          </div>

          <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-10 pb-16 lg:pt-16 lg:pb-24 relative z-10 w-full pointer-events-none">
            
            <motion.div 
              className="w-full pointer-events-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {/* Issue Ribbon */}
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase text-ink/80 mb-8 lg:mb-12 pointer-events-auto w-fit">
                <span
                  className="size-1.5 rounded-full bg-accent-brand motion-safe:animate-pulse-dot"
                  aria-hidden
                />
                <span>
                  <span className="whitespace-nowrap">ISSUE 01 /</span>
                  <br className="inline sm:hidden landscape:hidden" />
                  <span className="hidden sm:inline landscape:inline"> </span>
                  <span className="whitespace-nowrap">2026</span>
                </span>
                <span className="h-px w-8 bg-ink/20" aria-hidden />
                <a
                  href="#contact"
                  className="py-3.5 -my-3.5 text-ink underline decoration-accent-brand decoration-1 underline-offset-4 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
                >
                  {t(
                    <>
                      <span className="whitespace-nowrap">Open to Web Designer /</span>
                      <br className="inline sm:hidden landscape:hidden" />
                      <span className="hidden sm:inline landscape:inline"> </span>
                      <span className="whitespace-nowrap">Front-End Roles</span>
                    </>,
                    <>
                      <span className="whitespace-nowrap">Webデザイナー／</span>
                      <br className="inline sm:hidden landscape:hidden" />
                      <span className="whitespace-nowrap">フロントエンド職を募集中</span>
                    </>
                  )}
                  <span className="sr-only">
                    {t(" (go to contact form)", "（お問い合わせへ）")}
                  </span>
                </a>
              </div>

              {/* Confident Portfolio Hero Typography Hierarchy */}
              <div className="max-w-2xl lg:max-w-3xl pointer-events-none">
                
                {/* 1. Name */}
                <div className="mb-7 sm:mb-9 lg:mb-11 pointer-events-auto">
                  {t(
                    <p className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink leading-tight hero-support-text">
                      Dan Burgess
                    </p>,
                    <div>
                      <p className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink leading-tight hero-support-text">
                        Dan Burgess
                      </p>
                      <small className="block font-sans-body text-xs sm:text-sm lg:text-lg font-medium text-ink/80 tracking-wide mt-1 sm:mt-1.5 hero-support-text">
                        ダン・バージェス
                      </small>
                    </div>
                  )}
                </div>

                {/* 2. Large positioning statement */}
                <div className="relative">
                  {/* Localized feathered radial glow behind hero headline on mobile/tablet where text passes over 3D globe */}
                  <div
                    aria-hidden
                    className="absolute -inset-x-6 -inset-y-6 rounded-3xl pointer-events-none bg-paper/90 sm:bg-paper/75 lg:bg-paper/30 blur-2xl -z-10"
                  />
                  <h1 className="font-serif-display font-extrabold tracking-[-0.025em] text-left text-ink pointer-events-auto mb-6 sm:mb-8 hero-support-text relative">
                    {t(
                      <span className="block text-[2.75rem] sm:text-[3.75rem] md:text-[4.25rem] lg:text-[4.5rem] xl:text-[5.0rem] leading-[1.04] hero-support-text">
                        <span className="text-accent-text-large">Web Designer</span> <br />
                        for Japanese Businesses <br />
                        Going Global
                      </span>,
                      <span className="block text-[2rem] sm:text-[3.5rem] md:text-[4.0rem] lg:text-[4.25rem] xl:text-[4.75rem] leading-[1.40] hero-support-text">
                        日本企業の海外<br />
                        発信を支援する<br />
                        <span className="text-accent-text-large">Webデザイナー</span>
                      </span>
                    )}
                  </h1>
                </div>

                {/* 3. Short supporting sentence */}
                <div className="relative max-w-[52ch] mb-10 pointer-events-auto">
                  {/* Localized feathered radial glow behind paragraph on mobile/tablet where text passes over 3D globe */}
                  <div
                    aria-hidden
                    className="absolute -inset-x-6 -inset-y-5 rounded-full pointer-events-none bg-paper/90 sm:bg-paper/75 lg:bg-paper/40 blur-xl -z-10"
                  />
                  <p className="text-lg sm:text-xl lg:text-[1.35rem] text-ink/90 leading-relaxed font-sans-body hero-support-text relative">
                    {t(
                      "Combining experience in design, web production, and Japanese-English communication to create websites that communicate clearly across cultures.",
                      "デザインとWeb制作、日英のコミュニケーション経験を活かして、伝わるWebサイトをつくります。"
                    )}
                  </p>
                </div>

                {/* 4. Action navigation */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 pointer-events-auto">
                  <a
                    href="#work"
                    className="group inline-flex items-center justify-center text-center gap-2 sm:gap-3 bg-ink text-surface px-3 sm:px-7 py-3 sm:py-4 font-mono text-[11px] sm:text-[13px] font-bold uppercase hover:bg-accent-text transition-colors whitespace-nowrap shadow-sm"
                  >
                    {t("Selected Work", "作品を見る")}
                    <span className="text-[16px] sm:text-[20px] transition-transform group-hover:translate-x-1" aria-hidden>↓</span>
                  </a>
                  <a
                    href="#about"
                    className="inline-flex items-center justify-center text-center gap-2 sm:gap-3 px-3 sm:px-7 py-3 sm:py-4 font-mono text-[11px] sm:text-[13px] font-bold uppercase text-ink hover:text-accent-text transition-all border-2 border-ink/40 hover:border-accent-text bg-paper/90 lg:bg-paper/75 hover:bg-surface-elevated shadow-sm whitespace-nowrap backdrop-blur-[2px]"
                  >
                    {t("About", "私について")}
                  </a>
                  {/* WCAG 2.2.2: the globe auto-rotates for more than 5s, so offer a pause control.
                      Hidden when the OS asks for reduced motion (the globe is already still). */}
                  {!prefersReducedMotion && (
                    <button
                      type="button"
                      onClick={() => setGlobePaused((p) => !p)}
                      aria-label={
                        globePaused
                          ? t("Resume globe animation", "地球儀のアニメーションを再開")
                          : t("Pause globe animation", "地球儀のアニメーションを一時停止")
                      }
                      className="inline-flex items-center justify-center px-3 sm:px-4 py-3 sm:py-4 border-2 border-ink/40 bg-paper/90 lg:bg-paper/75 text-ink hover:text-accent-text hover:border-accent-text transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink whitespace-nowrap shadow-sm backdrop-blur-[2px]"
                    >
                      {globePaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
                    </button>
                  )}
                </div>

              </div>
            </motion.div>
          </div>

        </section>

        {/* 02 - WORK / PROJECTS ============================================= */}
        <section id="work" className="py-24 lg:py-32 w-full overflow-x-hidden relative border-t rule">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <header className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
              <div className="lg:col-span-4 xl:col-span-3">
                <div className="mb-4 sm:mb-6">
                  <span className="font-mono font-bold text-[1.375rem] sm:text-[1.65rem] lg:text-[1.65rem] uppercase text-accent-text-large leading-none tracking-tight whitespace-nowrap block">
                    {t("Selected Work", "作品")}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-8 xl:col-span-9">
                <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.023em] leading-[1.12] sm:leading-[1.08] text-balance">
                  {t(
                    <>Three projects. Three industries.<br /><span className="text-accent-text-large">One design approach.</span></>,
                    <>
                      <span className="whitespace-nowrap">3つのプロジェクト。</span>
                      <br className="inline sm:hidden landscape:hidden" />
                      <span className="whitespace-nowrap">3つの業種。</span>
                      <br />
                      <span className="text-accent-text-large">
                        <span className="whitespace-nowrap">一貫したデザイン</span>
                        <br className="inline sm:hidden landscape:hidden" />
                        <span className="whitespace-nowrap">アプローチ。</span>
                      </span>
                    </>
                  )}
                </h2>
                <p className="mt-6 max-w-[62ch] text-ink-muted text-lg leading-relaxed whitespace-pre-line">
                  {t(
                    "A selection of original website concepts exploring different audiences, industries and visual directions, created for portfolio demonstration purposes rather than commissioned client projects.",
                    "さまざまなターゲットや業種、デザインの方向性を探る、ポートフォリオ用のオリジナルWebサイト提案コンセプトです。"
                  )}
                </p>
              </div>
            </header>

            <CaseStudies />
          </div>
        </section>

        {/* 03 - ABOUT / 私について ========================================= */}
        <section ref={aboutRef} id="about" className="py-24 lg:py-32 border-t rule bg-surface-soft/30 w-full overflow-x-hidden relative">
          {/* Faint, Japan-inspired background fitting exactly the height and width of the section with parallax */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
            <motion.div 
              style={{ y: aboutY }} 
              className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >
              <img
                src={aboutBg}
                alt=""
                className="w-full h-full object-cover object-center opacity-[0.22] mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            {/* Vignette fade to blend seamlessly with the textured paper canvas */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper to-transparent" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-paper to-transparent" />
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-paper to-transparent" />
          </div>

          <motion.div 
            className="max-w-[1320px] mx-auto px-6 lg:px-10 grid grid-cols-1 landscape:grid-cols-12 md:landscape:grid-cols-12 lg:grid-cols-12 gap-10 lg:gap-12 items-start relative z-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Left Column Container: Houses Section title and Polaroid */}
            <div className="grid-cols-1 landscape:col-span-4 md:landscape:col-span-3 lg:col-span-3 flex flex-col gap-8">
              <div>
                <div className="mb-0">
                  <span className="font-mono font-bold text-[1.375rem] sm:text-[1.65rem] lg:text-[1.65rem] uppercase text-accent-text-on-photo leading-none tracking-tight whitespace-nowrap block">
                    {t("About", "私について")}
                  </span>
                </div>
              </div>

              {/* Polaroid Frame: Visible on Desktop OR any Landscape viewport orientation */}
              <div className="hidden landscape:block lg:block">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                  className="w-full max-w-[340px] xl:max-w-[360px] relative bg-surface-elevated border rule p-4 sm:p-5 shadow-[0_30px_80px_-40px_hsl(var(--ink)/0.3)] cursor-pointer"
                >
                  <div className="flex items-center justify-between font-mono text-[8px] lg:text-[10px] uppercase text-ink-muted mb-3 lg:mb-4">
                    <span>Plate 01</span>
                    <span className="flex items-center gap-1.5 lg:gap-2">
                      <span className="size-1 rounded-full lg:size-1.5 bg-accent-brand animate-pulse-dot" />
                      {t("Japan Based", "日本在住")}
                    </span>
                  </div>
                  <div className="w-full aspect-[4/5] overflow-hidden">
                    <PortraitPlate />
                  </div>
                  
                  <div className="mt-4 lg:mt-5 flex items-center justify-between gap-1 pt-3 lg:pt-3.5 border-t rule">
                    <div className="min-w-0 flex-1">
                      <p 
                        className="text-[20px] lg:text-[22px] leading-tight text-ink tracking-tight whitespace-nowrap overflow-visible py-0.5" 
                        style={{ fontFamily: '"Homemade Apple", cursive', backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                      >
                        Dan Burgess
                      </p>
                      <p className="font-mono text-[8px] lg:text-[9px] uppercase text-ink-muted mt-1.5 whitespace-nowrap">
                        {t("Web Designer", "Webデザイナー")}
                      </p>
                    </div>
                    <p className="font-mono text-sm uppercase text-ink-muted text-right leading-none shrink-0 select-none pl-1 flex items-center gap-0.5">
                      <span>🍁</span><span className="text-[10px] text-ink-muted/60 font-sans">→</span><span>🇯🇵</span>
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Thoughtful Career & Background Narrative */}
            <div className="landscape:col-span-8 landscape:col-start-5 md:landscape:col-span-9 md:landscape:col-start-4 lg:col-span-7 lg:col-start-5 landscape:pt-[48px] lg:pt-[54px] xl:pt-[56px] landscape:max-w-[700px] lg:max-w-[700px]">
              <h3 className={`font-serif-display font-bold tracking-[-0.023em] text-ink mb-5 sm:mb-6 ${t(
                "text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-balance leading-[1.14]",
                "text-2xl xs:text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[2.75rem] xl:text-[3.25rem] leading-[1.25] lg:leading-[1.32] xl:leading-[1.35]"
              )}`}>
                {t(
                  <>
                    <span className="text-accent-text">Design</span>
                    <span>, web, and communication across languages.</span>
                  </>,
                  <>
                    <span className="inline-block sm:whitespace-nowrap">
                      <span className="text-accent-text">デザイン</span>
                      <span>とWeb、そして<span className="whitespace-nowrap">日英</span></span>
                    </span>
                    <br className="hidden sm:inline" />
                    <span className="inline-block sm:whitespace-nowrap">のコミュニケーション。</span>
                  </>
                )}
              </h3>
              <p className="text-ink/80 text-[15.5px] sm:text-[16px] lg:text-[16px] xl:text-[16.5px] leading-[1.7] mb-3 sm:mb-3.5 lg:mb-4 font-normal">
                {t(
                  "I began my career in Canada in graphic design and multimedia before moving to Japan in 1992. I worked in web design at a Japanese software company, then in localization for product documentation and software interfaces at Canon's Tokyo headquarters.",
                  "カナダでグラフィックデザインやマルチメディア制作に携わった後、1992年に来日。日本のソフトウェア企業でWebデザインに取り組み、その後はキヤノンの東京本社で、製品マニュアルやソフトウェアUIのローカライズを担当しました。"
                )}
              </p>
              <p className="text-ink/80 text-[15.5px] sm:text-[16px] lg:text-[16px] xl:text-[16.5px] leading-[1.7] mb-3 sm:mb-3.5 lg:mb-4 font-normal">
                {t(
                  "I later focused primarily on Japanese-English translation and localization, while continuing to design and develop websites.",
                  "その後、日英翻訳・ローカライズを中心に活動しながら、Webサイトのデザインや制作にも継続して取り組んできました。"
                )}
              </p>
              <p className="text-ink/80 text-[15.5px] sm:text-[16px] lg:text-[16px] xl:text-[16.5px] leading-[1.7] font-normal">
                {t(
                  <>
                    <span>
                      Today, I draw on that experience to take projects from concept through implementation, combining thoughtful design with modern web technologies and AI-assisted workflows. My aim is to create websites that are visually engaging, well-structured, and clear across languages and cultures. View my experience on{" "}
                    </span>
                    <a
                      href="https://www.linkedin.com/in/danburgessinjapan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-text-link-on-photo underline decoration-accent-text-link-on-photo hover:underline font-medium whitespace-nowrap inline-flex items-baseline gap-0.5"
                    >
                      <span>LinkedIn</span>
                      <span className="text-[13px] leading-none">↗</span>
                    </a>
                  </>,
                  <>
                    <span>
                      現在は、これまでの経験を活かし、デザインから実装まで一貫して取り組んでいます。新しいWeb技術やAIを活用したワークフローも取り入れながら、見た目の美しさと情報の分かりやすさを両立し、言語や文化を越えて伝わるWebサイトを目指しています。
                    </span>
                    <a
                      href="https://www.linkedin.com/in/danburgessinjapan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-text-link-on-photo underline decoration-accent-text-link-on-photo hover:underline font-medium whitespace-nowrap inline-flex items-baseline gap-0.5"
                    >
                      <span>LinkedInで職歴を見る</span>
                      <span className="text-[13px] leading-none">↗</span>
                    </a>
                  </>
                )}
              </p>
            </div>

            {/* Portrait-Only Polaroid Container: Renders explicitly below the text on Mobile & Tablet Portrait viewports */}
            <div className="block landscape:hidden lg:hidden mt-4 w-full flex justify-center">
              <motion.div 
                style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                className="w-full max-w-[320px] relative bg-surface-elevated border rule p-4 shadow-[0_20px_50px_-30px_hsl(var(--ink)/0.25)]"
              >
                <div className="flex items-center justify-between font-mono text-[8px] uppercase text-ink-muted mb-3">
                  <span>Plate 01</span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-1 rounded-full bg-accent-brand animate-pulse-dot" />
                    {t("Japan Based", "日本在住")}
                  </span>
                </div>
                <div className="w-full aspect-[4/5] overflow-hidden">
                  <PortraitPlate />
                </div>
                
                <div className="mt-4 flex items-center justify-between gap-1 pt-3 border-t rule">
                  <div className="min-w-0 flex-1">
                    <p 
                      className="text-[20px] leading-tight text-ink tracking-tight whitespace-nowrap overflow-visible py-0.5" 
                      style={{ fontFamily: '"Homemade Apple", cursive', backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                    >
                      Dan Burgess
                    </p>
                    <p className="font-mono text-[8px] uppercase text-ink-muted mt-1.5 whitespace-nowrap">
                      {t("Web Designer", "Webデザイナー")}
                    </p>
                  </div>
                  <p className="font-mono text-sm uppercase text-ink-muted text-right leading-none shrink-0 select-none pl-1 flex items-center gap-0.5">
                    <span>🍁</span><span className="text-[10px] text-ink-muted/60 font-sans">→</span><span>🇯🇵</span>
                  </p>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </section>

        {/* 04 - SKILLS / APPROACH =========================================== */}
        <section id="skills" className="py-24 lg:py-32 border-t rule w-full overflow-x-hidden relative bg-surface-soft/20">
          <motion.div 
            className="max-w-[1320px] mx-auto px-6 lg:px-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <header className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-20">
              <div className="lg:col-span-4 xl:col-span-3">
                <div className="mb-3 sm:mb-4">
                  <span className="font-mono font-bold text-[1.375rem] sm:text-[1.65rem] lg:text-[1.65rem] uppercase text-accent-text-large leading-none tracking-tight whitespace-nowrap block">
                    {t("Skills & Approach", "スキルと制作アプローチ")}
                  </span>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-label hidden lg:block">
                  {t("Core Capabilities", "主なスキル")}
                </p>
              </div>
              <div className="lg:col-span-8 xl:col-span-9">
                <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.023em] leading-[1.12] text-balance text-ink">
                  {t(
                    <>Design with purpose. <br className="hidden sm:inline" />Build with intent.</>,
                    <>デザインから実装まで、<br className="hidden sm:inline" />目的に合わせて考える。</>
                  )}
                </h2>
                <p className="mt-5 max-w-[64ch] text-ink-muted text-base sm:text-lg lg:text-xl leading-relaxed">
                  {t(
                    "A combination of visual design, hands-on web production, and cross-cultural communication.",
                    "見た目の美しさだけでなく、情報の伝わりやすさや使いやすさを考え、デザインからWeb制作まで一貫して取り組みます。"
                  )}
                </p>
              </div>
            </header>

            {/* 4 Capabilities Editorial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/10 border rule" role="list">
              {capabilities.map((c) => (
                <article
                  key={c.num}
                  className="bg-surface p-6 sm:p-10 lg:p-12 flex flex-col justify-between hover:bg-surface-elevated transition-colors relative group"
                  role="listitem"
                >
                  <div>
                    {/* Top row: Oversized numeral + meaningful graphic detail */}
                    <div className="flex items-center justify-between gap-3 sm:gap-4 mb-8 sm:mb-10">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-ink/20 group-hover:text-accent-text transition-colors select-none" aria-hidden="true">
                          {c.num}
                        </span>
                        <span className="hidden sm:inline font-mono text-[10px] uppercase text-ink-label tracking-wider">
                          / CAPABILITY
                        </span>
                      </div>
                      <div className="shrink-0 select-none">
                        {c.tag}
                      </div>
                    </div>

                    {/* Headline and subtle underline rule */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <h3 className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                          {c.label}
                        </h3>
                        {c.jpSubtitle && (
                          <span className="font-sans-body text-sm sm:text-base text-ink-muted font-medium">
                            — {c.jpSubtitle}
                          </span>
                        )}
                      </div>
                      <div className="h-0.5 w-8 bg-accent-brand mt-3 group-hover:w-16 transition-all duration-300" />
                    </div>

                    {/* Body description */}
                    <p className="text-ink-muted text-[15px] sm:text-base lg:text-[16px] leading-relaxed max-w-[50ch] mt-4">
                      {c.body}
                    </p>
                    {c.evidence && (
                      <p className="text-ink-muted text-[14px] sm:text-[15px] leading-relaxed max-w-[50ch] mt-3">
                        {c.evidence}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Toolkit Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 lg:mt-16 pt-12 border-t rule"
            >
              <h3 className="font-mono text-[11px] uppercase tracking-wider text-ink-muted mb-8">
                {t("TOOLKIT", "ツールキット")}
              </h3>
              <dl className="space-y-6 sm:space-y-5">
                {toolkitRows.map((row, idx) => {
                  const items = t(row.itemsEn, row.itemsJp);
                  const separator = t("·", "／");
                  return (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-1 sm:gap-6 items-baseline">
                      <dt className="font-mono text-[11px] uppercase text-ink-muted-strong font-medium">
                        {row.label}
                      </dt>
                      <dd className="font-sans-body text-sm sm:text-base text-ink/80 leading-relaxed flex flex-wrap items-baseline gap-x-1.5 sm:gap-x-2 gap-y-1">
                        {items.map((item, i) => (
                          <span key={i} className="inline-flex items-baseline whitespace-nowrap">
                            <span>{item}</span>
                            {i < items.length - 1 && (
                              <span className="text-ink-muted/50 ml-1.5 sm:ml-2" aria-hidden="true">
                                {separator}
                              </span>
                            )}
                          </span>
                        ))}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </motion.div>

          </motion.div>
        </section>

        {/* 05 - CONTACT ==================================================== */}
        <section id="contact" className="py-24 lg:py-32 border-t rule w-full overflow-x-hidden relative">
          <motion.div 
            className="max-w-[1320px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="lg:col-span-4 group">
              <div className="mb-4 sm:mb-6">
                <span className="font-mono font-bold text-[1.375rem] sm:text-[1.65rem] lg:text-[1.65rem] uppercase text-accent-text-large leading-none tracking-tight whitespace-nowrap block">
                  {t("Contact", "お問い合わせ")}
                </span>
              </div>
              <h2 className="font-serif-display text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.023em] leading-[1.04] text-balance">
                {t(
                  "Let's talk.",
                  "お問い合わせ"
                )}
              </h2>
              <p className="mt-6 text-ink-muted text-lg leading-relaxed max-w-[44ch]">
                {t(
                  "Have a question about my work or an opportunity to discuss? I'd be happy to hear from you. I also welcome enquiries about web design and front-end roles within a team.",
                  "作品についてのご質問や、お仕事に関するご相談など、お気軽にご連絡ください。Webデザイナー・フロントエンド開発者の採用に関するお問い合わせも歓迎しています。"
                )}
              </p>

              <ContactIllustration className="w-40 md:w-48 h-auto mt-6 select-none pointer-events-none transition-all duration-300 ease-out filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:drop-shadow-[0_8px_20px_rgba(26,26,26,0.15)] group-hover:scale-[1.04]" />

              <dl className="mt-10 space-y-5 font-mono text-[12px] uppercase">
                <div className="flex items-start gap-4">
                  <dt className="text-ink-muted w-20 shrink-0">{t("Contact", "お問い合わせ")}</dt>
                  <dd className="text-ink">
                    {t("USE CONTACT FORM", "フォームよりお問い合わせください")}
                  </dd>
                </div>
                <div className="flex items-start gap-4">
                  <dt className="text-ink-muted w-20 shrink-0">{t("Location", "拠点")}</dt>
                  <dd className="text-ink">
                    {t("Fukuoka, Japan · UTC+9", "日本 福岡県 · UTC+9")}
                  </dd>
                </div>
                <div className="flex items-start gap-4">
                  <dt className="text-ink-muted w-20 shrink-0">{t("Languages", "対応言語")}</dt>
                  <dd className="text-ink">
                    {t("English · Japanese", "英語 · 日本語")}
                  </dd>
                </div>
                <div className="flex items-start gap-4">
                  <dt className="text-ink-muted w-20 shrink-0">{t("Role", "職種")}</dt>
                  <dd className="text-ink">
                    {t("Web Designer / Front-End Developer", "ウェブデザイナー／フロントエンド開発者")}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-8 bg-surface-elevated p-7 lg:p-10 shadow-[0_30px_80px_-40px_hsl(var(--ink)/0.25)] lg:mt-[44px]">
              <ContactForm />
            </div>
          </motion.div>
        </section>
      </main>

      {/* FOOTER SECTION =================================================== */}
      <footer className="py-12 border-t rule bg-surface-soft/10 text-xs w-full">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-ink-muted">
            &copy; {currentYear} Dan Burgess
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 -ml-2 font-mono text-[12px] lg:text-[13px] uppercase">
            <a href="#work" className="px-2 py-1 hover:text-white hover:bg-accent-text rounded-sm transition-all">{t("Work", "作品")}</a>
            <a href="#about" className="px-2 py-1 hover:text-white hover:bg-accent-text rounded-sm transition-all">{t("About", "私について")}</a>
            <a href="#skills" className="px-2 py-1 hover:text-white hover:bg-accent-text rounded-sm transition-all">{t("Skills", "スキル・制作")}</a>
            <a href="#contact" className="px-2 py-1 hover:text-white hover:bg-accent-text rounded-sm transition-all">{t("Contact", "お問い合わせ")}</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-ink-muted">{t("Social →", "SNS →")}</span>
            
            {/* LinkedIn */}
            <div className="relative group">
              <a 
                href="https://www.linkedin.com/in/danburgessinjapan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center size-8 transition-transform hover:scale-110"
              >
                <img 
                  src={linkedinLogo} 
                  alt="LinkedIn" 
                  className="w-full h-full object-contain" 
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
              </a>
              
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+12px)] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-y-1 group-hover:translate-y-0">
                <div className="relative bg-ink text-surface text-[9px] font-mono uppercase px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-2xl">
                  {t("PROFESSIONAL PROFILE", "プロフェッショナル履歴")}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-ink rotate-45" />
                </div>
              </div>
            </div>

            {/* Instagram */}
            <div className="relative group">
              <a 
                href="https://www.instagram.com/canuckinjapan/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center size-8 transition-transform hover:scale-110"
              >
                <img 
                  src={instagramLogo} 
                  alt="Instagram" 
                  className="w-full h-full object-contain" 
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
              </a>
              
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+12px)] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-y-1 group-hover:translate-y-0">
                <div className="relative bg-ink text-surface text-[9px] font-mono uppercase px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-2xl">
                  {t("SOME NATURE PHOTOS", "風景写真など")}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-ink rotate-45" />
                </div>
              </div>
            </div>

            {/* Blogger */}
            <div className="relative group">
              <a 
                href="https://djb-archviz.blogspot.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center size-8 transition-transform hover:scale-110"
              >
                <img 
                  src={bloggerLogo} 
                  alt="Blogger" 
                  className="w-full h-full object-contain" 
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
              </a>
              
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+12px)] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-y-1 group-hover:translate-y-0">
                <div className="relative bg-ink text-surface text-[9px] font-mono uppercase px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-2xl">
                  {t("3D CG MADE BY ME", "3DCG作品")}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-ink rotate-45" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;