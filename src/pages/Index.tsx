import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Instagram, Rss, ChevronDown } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { CaseStudies } from "@/components/CaseStudies";
import { ContactForm } from "@/components/ContactForm";
import { PortraitPlate } from "@/components/PortraitPlate";
import manga from "@/assets/danface_manga.svg";
import japanBg from "@/assets/images/japan_sumie_panoramic_bg_1781882609398.jpg";
import aboutBg from "@/assets/images/photo-1570435229357-79dd1692b110-BC.jpg";

import { 
  SelectedWorkIllustration, 
  BilingualServicesIllustration, 
  ContactIllustration, 
  FAQIllustration 
} from "@/components/SectionIllustrations";

import instagramLogo from "@/assets/Instagram-Logo.png";
import bloggerLogo from "@/assets/Blogger-Logo.png";
import { useLanguage } from "@/context/LanguageContext";

// Version 2.2.4 - Re-aligned section layouts to fix font jitter bugs and match top edge redlines perfectly

const Index = () => {
  const { t, lang } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
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
    const today = new Date();
    const month = today.getMonth(); // 0-11 (Jan is 0, Dec is 11)
    const year = today.getFullYear();

    let seasonEn: string;
    let seasonJp: string;
    let seasonIndex: number; // 0 = Spring, 1 = Summer, 2 = Autumn, 3 = Winter
    let seasonYear: number;

    if (month >= 2 && month <= 4) {
      // Mar, Apr, May
      seasonEn = "Spring";
      seasonJp = "春";
      seasonIndex = 0;
      seasonYear = year;
    } else if (month >= 5 && month <= 7) {
      // Jun, Jul, Aug
      seasonEn = "Summer";
      seasonJp = "夏";
      seasonIndex = 1;
      seasonYear = year;
    } else if (month >= 8 && month <= 10) {
      // Sep, Oct, Nov
      seasonEn = "Autumn";
      seasonJp = "秋";
      seasonIndex = 2;
      seasonYear = year;
    } else {
      // Dec, Jan, Feb
      seasonEn = "Winter";
      seasonJp = "冬";
      seasonIndex = 3;
      seasonYear = month === 11 ? year : year - 1;
    }

    const issueNo = 26 + (seasonYear - 2026) * 4 + seasonIndex;

    return {
      issueNo,
      seasonEn,
      seasonJp,
      seasonYear,
    };
  };

  const seasonDetails = getSeasonDetails();

  const stats = [
    { value: "30+", label: t("Years working between English & Japanese", "翻訳・デザイン経験") },
    { value: "1992", label: t("Based in Japan", "日本在住") },
    { value: "EN / JP", label: t("Professional bilingual", "英語・日本語対応") },
  ];

  const services = [
    {
      no: "01",
      title: t("Website Design", "Webサイトデザイン・構築"),
      body: t(
        "Modern, responsive websites designed to help businesses communicate clearly, perform well, and grow online. From small business websites to multilingual corporate projects, every site is tailored to your goals and audience.",
        "ビジネスの目的を明確に伝え、快適なユーザー体験と優れたパフォーマンスを実現するWebサイトを制作します。小規模なビジネスサイトから多言語のコーポレートサイトまで、目的やターゲットに合わせて設計します。"
      ),
    },
    {
      no: "02",
      title: t("Localization & Bilingual UX", "ローカライズ & バイリンガルUX"),
      body: t(
        "Creating websites that feel natural in both English and Japanese. Beyond translation, I consider language, layout, navigation, and cultural expectations to deliver a seamless experience for every visitor.",
        "日本語と英語のどちらでも自然に伝わるWebサイトを設計します。単なる翻訳ではなく、言葉の違い、レイアウト、ナビゲーション、文化的な違いまで考慮し、どちらの言語でも使いやすいUXを実現します。"
      ),
    },
    {
      no: "03",
      title: t("Design & Digital Consulting", "デザイン & デジタルコンサルティング"),
      body: t(
        "Need advice before starting a project? I can help with website planning, content structure, UX reviews, localization strategy, SEO, accessibility, and improving existing websites.",
        "プロジェクト開始前のご相談もお気軽にどうぞ。サイト企画、コンテンツ構造、UXレビュー、ローカライズ戦略、SEO、アクセシビリティ、既存サイトの改善まで幅広くサポートします。"
      ),
    },
  ];

  return (
    <div id="top" className="bg-paper text-ink min-h-dvh font-sans-body w-full overflow-x-hidden relative">
      <TopBar />

      <main id="main-content" className="w-full">
        {/* HERO ============================================================ */}
        <section id="hero" className="relative overflow-hidden w-full">
          {/* Faint, parallax-shifting Japan-inspired background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
            <motion.div 
              style={{ y }} 
              className="absolute inset-0 w-full h-[125%]"
            >
              <img
                src={japanBg}
                alt=""
                className="w-full h-full object-cover object-center opacity-[0.8] mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            {/* Vignette fade to blend seamlessly with the textured paper canvas */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper to-transparent" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-paper to-transparent" />
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-paper to-transparent" />
          </div>

          <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-8 md:landscape:pt-10 lg:pt-16 lg:landscape:pt-16 pb-12 md:landscape:pb-12 lg:pb-16 lg:landscape:pb-16 relative z-10">
            
            <motion.div 
              className="w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              {/* Issue Ribbon */}
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/80 mb-8">
                <span className="size-1.5 rounded-full bg-accent-brand animate-pulse-dot" aria-hidden />
                <span>Issue №{seasonDetails.issueNo} · {t(`${seasonDetails.seasonEn} ${seasonDetails.seasonYear}`, `${seasonDetails.seasonJp} ${seasonDetails.seasonYear}`)}</span>
                <span className="h-px w-8 bg-ink/20" />
                <span>Fukuoka, JPN · UTC+9</span>
              </div>

              {/* Layout Engine */}
              <div className="grid grid-cols-1 landscape:grid-cols-12 lg:grid-cols-12 gap-8 landscape:gap-10 lg:gap-12 items-start">
                
                {/* Left Side: Large Title Typography */}
                <div className="landscape:col-span-7 lg:col-span-7 w-full">
                  <h1 className="font-serif-display font-extrabold tracking-[-0.02em] text-left">
                    {t(
                      <span className="block text-[2.5rem] sm:text-[3.5rem] landscape:text-[2.25rem] md:landscape:text-[2.85rem] lg:text-[3.25rem] lg:landscape:text-[3.0rem] xl:text-[4.0rem] xl:landscape:text-[4.0rem] leading-[1.05] landscape:leading-[1.2] lg:leading-[1.2]">
                        Websites designed in <span className="text-accent-brand">Japan</span>, built for <span className="text-accent-brand">global</span> audiences.
                      </span>,
                      <span className="block text-[2.6rem] sm:text-[3.73rem] landscape:text-[2.2rem] md:landscape:text-[3.25rem] lg:text-[3.73rem] lg:landscape:text-[3.73rem] xl:text-[4.59rem] xl:landscape:text-[4.59rem] leading-[1.1]">
                        海外に伝わる<br />Webサイトを、<br /><span className="text-accent-brand">日本から。</span>
                      </span>
                    )}
                  </h1>

                  {/* CTA Buttons for Mobile Landscape only */}
                  <div className="hidden landscape:flex lg:hidden flex-wrap items-center gap-4 landscape:gap-2.5 w-full mt-8">
                    <a
                      href="#contact"
                      className="group inline-flex items-center justify-center text-center gap-3 landscape:gap-1.5 bg-ink text-surface px-6 py-4 landscape:px-3.5 landscape:py-3 font-mono text-[11px] landscape:text-[9.5px] lg:landscape:text-[11px] lg:landscape:px-6 lg:landscape:py-4 font-bold uppercase tracking-[0.22em] landscape:tracking-[0.1em] lg:landscape:tracking-[0.22em] hover:bg-accent-brand transition-colors w-full sm:w-auto landscape:w-auto whitespace-nowrap"
                    >
                      {t("Start a Project", "プロジェクト相談")}
                      <span className="text-[22px] landscape:text-[18px] lg:landscape:text-[22px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                    </a>
                    <a
                      href="#work"
                      className="inline-flex items-center justify-center text-center gap-3 landscape:gap-1.5 px-6 py-4 landscape:px-3.5 landscape:py-3 font-mono text-[11px] landscape:text-[9.5px] lg:landscape:text-[11px] lg:landscape:px-6 lg:landscape:py-4 font-bold uppercase tracking-[0.22em] landscape:tracking-[0.1em] lg:landscape:tracking-[0.22em] text-ink hover:text-accent-brand transition-all border-2 border-ink/40 hover:border-accent-brand hover:bg-white/40 shadow-sm w-full sm:w-auto landscape:w-auto whitespace-nowrap"
                    >
                      {t("See Selected Work", "制作実績を見る")}
                    </a>
                  </div>
                </div>

                {/* Right Side: Paragraph Block and Action Buttons */}
                <div className="landscape:col-span-5 lg:col-span-5 w-full flex flex-col gap-8 landscape:pt-4 lg:pt-4">
                  <p className="max-w-[42ch] portrait:text-[15.3px] portrait:leading-[1.42] sm:portrait:text-lg sm:portrait:leading-relaxed text-lg md:landscape:text-base lg:landscape:text-base xl:landscape:text-lg xl:text-lg lg:text-lg text-ink/85 leading-relaxed">
                    {t(
                      <>Expanding into international markets requires more than translation.
I help Japanese businesses communicate effectively with English-speaking audiences through web design, UI design, and localization.<br />
Based in Japan since 1992, I bring over 30 years of experience working between English and Japanese in software, product development, and digital design.</>,
                      <>
                        日本企業の海外発信を支援するWebデザイナー。<br />
                        英語対応Webサイト、UIデザイン、ローカライズを一貫してサポートしています。<br />
                        カナダ出身。1992年より日本在住。<br />
                        30年以上にわたり、日本語と英語の両方に対応したWebサイトやデジタルプロダクトの制作に携わってきました。
                      </>
                    )}
                  </p>

                  <div className="flex landscape:hidden lg:flex flex-wrap landscape:flex-nowrap lg:flex-nowrap items-center gap-4 landscape:gap-2.5 lg:gap-4 w-full">
                    <a
                      href="#contact"
                      className="group inline-flex items-center justify-center text-center gap-3 landscape:gap-1.5 bg-ink text-surface px-6 py-4 landscape:px-3.5 landscape:py-3 font-mono text-[11px] landscape:text-[9.5px] lg:landscape:text-[11px] lg:landscape:px-6 lg:landscape:py-4 font-bold uppercase tracking-[0.22em] landscape:tracking-[0.1em] lg:landscape:tracking-[0.22em] hover:bg-accent-brand transition-colors w-full sm:w-auto landscape:w-auto whitespace-nowrap"
                    >
                      {t("Start a Project", "プロジェクト相談")}
                      <span className="text-[22px] landscape:text-[18px] lg:landscape:text-[22px] transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                    </a>
                    <a
                      href="#work"
                      className="inline-flex items-center justify-center text-center gap-3 landscape:gap-1.5 px-6 py-4 landscape:px-3.5 landscape:py-3 font-mono text-[11px] landscape:text-[9.5px] lg:landscape:text-[11px] lg:landscape:px-6 lg:landscape:py-4 font-bold uppercase tracking-[0.22em] landscape:tracking-[0.1em] lg:landscape:tracking-[0.22em] text-ink hover:text-accent-brand transition-all border-2 border-ink/40 hover:border-accent-brand hover:bg-white/40 shadow-sm w-full sm:w-auto landscape:w-auto whitespace-nowrap"
                    >
                      {t("See Selected Work", "制作実績を見る")}
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Stat strip - Hidden on mobile/tablet */}
          <motion.div 
            className="border-y border-ink bg-surface-soft/40 hidden lg:block md:landscape:block relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <dl className="max-w-[1320px] mx-auto px-6 lg:px-10 grid grid-cols-3 divide-x divide-ink">
              {stats.map((s, i) => (
                <div key={s.label} className={`px-6 py-5 md:landscape:py-4 lg:py-7 lg:landscape:py-7 transition-[background-color] duration-300 hover:bg-surface-elevated cursor-pointer ${i === 0 ? "border-l-0" : ""}`}>
                  <dt className="font-serif-display text-4xl md:landscape:text-3xl lg:text-5xl lg:landscape:text-5xl font-bold tracking-tight leading-none text-ink/85">
                    {s.value}
                  </dt>
                  <dd className="mt-3 md:landscape:mt-2 lg:landscape:mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/80 font-semibold">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

        </section>

        {/* WORK ============================================================ */}
        <section id="work" className="py-24 lg:py-32 w-full overflow-x-hidden relative">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
            <header className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
              <div className="lg:col-span-3 group cursor-pointer">
                <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] text-accent-brand mb-3">
                  §01 - {t("Selected Work", "制作実績")}
                </p>
                <SelectedWorkIllustration className="w-40 md:w-48 h-auto mt-4 select-none pointer-events-none transition-all duration-300 ease-out filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:drop-shadow-[0_8px_20px_rgba(26,26,26,0.15)] group-hover:scale-[1.04]" />
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05] text-balance">
                  {t(
                    <>Three projects, three industries - one <em className="italic text-accent-brand font-medium">bilingual</em> design approach.</>,
                    <>業種は違っても、アプローチは同じです。</>
                  )}
                </h2>
                <p className="mt-6 max-w-[60ch] text-ink-muted text-lg leading-relaxed">
                  {t(
                    "Every project begins with understanding your audience and business goals. These concept case studies demonstrate my approach to bilingual design and user experience. Click any homepage to open a live demo in a new tab.",
                    "まずはターゲットユーザーとビジネス目標を理解することから始めます。\n以下は、バイリンガル対応とユーザー体験を重視したコンセプト事例です。ホームページ画像をクリックするとデモサイトが開きます。"
                  )}
                </p>
              </div>
            </header>

            <CaseStudies />
          </div>
        </section>

{/* ABOUT =========================================================== */}
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
        className="w-full h-full object-cover object-center opacity-[0.25] mix-blend-multiply"
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
    {/* Left Column Container: Houses Title always at top, and Polaroid on Desktop/Landscape layout splits */}
    <div className="grid-cols-1 landscape:col-span-4 md:landscape:col-span-3 lg:col-span-3 flex flex-col gap-8">
      <div>
        <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] landscape:tracking-[0.06em] lg:tracking-[0.22em] text-accent-brand mb-0">
          §02 - {t("About", "私について")}
        </p>
      </div>

      {/* Polaroid Frame: Visible on Desktop OR any Landscape viewport orientation */}
      <div className="hidden landscape:block lg:block">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
          className="w-full max-w-[310px] relative bg-surface-elevated border rule p-4 shadow-[0_30px_80px_-40px_hsl(var(--ink)/0.3)] cursor-pointer"
        >
          <div className="flex items-center justify-between font-mono text-[8px] lg:text-[10px] uppercase tracking-widest text-ink-muted mb-3 lg:mb-4">
            <span>Plate 01</span>
            <span className="flex items-center gap-1.5 lg:gap-2">
              <span className="size-1 rounded-full lg:size-1.5 bg-accent-brand animate-pulse-dot" />
              {t("Accepting Q3", "ご相談受付中")}
            </span>
          </div>
          <PortraitPlate />
          
          <div className="mt-4 lg:mt-5 flex items-center justify-between gap-1 pt-3 lg:pt-3.5 border-t rule">
            <div className="min-w-0 flex-1">
              <p 
                className="text-lg lg:text-xl leading-none tracking-tight whitespace-nowrap overflow-visible" 
                style={{ fontFamily: '"Homemade Apple", cursive', backfaceVisibility: "hidden" }}
              >
                Dan Burgess
              </p>
              <p className="font-mono text-[8px] lg:text-[9px] uppercase tracking-widest text-ink-muted mt-1.5 whitespace-nowrap">
                {t("Designer · Translator", "デザイナー · 翻訳者")}
              </p>
            </div>
            <p className="font-mono text-sm uppercase tracking-normal text-ink-muted text-right leading-none shrink-0 select-none pl-1 flex items-center gap-0.5">
              <span>🍁</span><span className="text-[10px] text-ink-muted/60 font-sans">→</span><span>🇯🇵</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>

    {/* Right Column: Narrative Copy. Takes natural grid order in portrait stacks */}
    <div className="landscape:col-span-8 landscape:col-start-5 md:landscape:col-span-9 md:landscape:col-start-4 lg:col-span-7 lg:col-start-5 landscape:pt-[54px] lg:pt-[92px] landscape:max-w-[700px] lg:max-w-[700px]">
      <p className="drop-cap text-lg leading-[1.7] text-ink/85 mb-6">
        {t(
          "Originally from Canada, I have lived and worked in Japan since 1992, helping Japanese companies connect more clearly with international audiences.",
          "カナダ出身で、1992年より日本を拠点に、日本企業の海外向けコミュニケーション支援に携わっています。"
        )}
      </p>
      <p className="text-ink-muted leading-relaxed mb-6">
        {t(
          "My background includes website design, UI design, software localization, and technical communication. Working across both creative and technical fields has given me a practical understanding of how design, language, and user experience work together.",
          "Webデザイン、UIデザイン、ソフトウェアローカライズ、テクニカルコミュニケーションを組み合わせたキャリアを歩んできました。クリエイティブと技術の領域を横断する実務経験を通じ、デザイン、言語、ユーザー体験がどのように連動するかを実践的に理解しています。その経験を活かし、日本語と英語のどちらでも自然に伝わるWebサイトを制作しています。"
        )}
      </p>
      <p className="text-ink-muted leading-relaxed mb-6">
        {t(
          "After many years focused on localization and bilingual communication, I have returned my attention to modern web design. Today, I create websites that are visually clear, easy to use, and built for performance, accessibility, and long-term search visibility.",
          "長年、ローカライズやバイリンガルコミュニケーションに携わってきましたが、現在はその経験を活かして、Webデザインに再び軸足を移しています。視覚的にわかりやすく、使いやすいだけでなく、パフォーマンス、アクセシビリティ、長期的な検索での見つけやすさまで考えたWebサイトを制作しています。"
        )}
      </p>
      <p className="text-ink-muted leading-relaxed">
        {t(
          "When you work with me, you work directly with an experienced designer from planning through launch. There are no account managers, outsourced teams, or unnecessary layers of communication, just clear advice and practical solutions.",
          "企画から公開まで、経験豊富なデザイナーである私が直接対応します。営業担当者や外注チームを介することなく、最初のご相談から制作、公開後のサポートまで一貫してお付き合いします。わかりやすいアドバイスと実践的な提案を大切にし、日本と海外のビジネスに関わる技術面・文化面の違いも考慮しながら進めます。"
        )}
      </p>
    </div>

    {/* Portrait-Only Polaroid Container: Renders explicitly below the text on Mobile & Tablet Portrait viewports */}
    <div className="block landscape:hidden lg:hidden mt-4 w-full flex justify-center">
      <motion.div 
        style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        className="w-full max-w-[310px] relative bg-surface-elevated border rule p-4 shadow-[0_20px_50px_-30px_hsl(var(--ink)/0.25)]"
      >
        <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-widest text-ink-muted mb-3">
          <span>Plate 01</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1 rounded-full bg-accent-brand animate-pulse-dot" />
            {t("Accepting Q3", "ご相談受付中")}
          </span>
        </div>
        <PortraitPlate />
        
        <div className="mt-4 flex items-center justify-between gap-1 pt-3 border-t rule">
          <div className="min-w-0 flex-1">
            <p 
              className="text-lg leading-none tracking-tight whitespace-nowrap overflow-visible" 
              style={{ fontFamily: '"Homemade Apple", cursive', backfaceVisibility: "hidden" }}
            >
              Dan Burgess
            </p>
            <p className="font-mono text-[8px] uppercase tracking-widest text-ink-muted mt-1.5 whitespace-nowrap">
              {t("Designer · Translator", "デザイナー · 翻訳者")}
            </p>
          </div>
          <p className="font-mono text-sm uppercase tracking-normal text-ink-muted text-right leading-none shrink-0 select-none pl-1 flex items-center gap-0.5">
            <span>🍁</span><span className="text-[10px] text-ink-muted/60 font-sans">→</span><span>🇯🇵</span>
          </p>
        </div>
      </motion.div>
    </div>

  </motion.div>
</section>

        {/* SERVICES ======================================================== */}
        <section id="services" className="py-24 lg:py-32 border-t rule w-full overflow-x-hidden relative">
          <motion.div 
            className="max-w-[1320px] mx-auto px-6 lg:px-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <header className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-20">
              <div className="lg:col-span-3 group cursor-pointer">
                <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] text-accent-brand mb-3">
                  §03 - {t("Services", "サービス")}
                </p>
                <BilingualServicesIllustration className="w-40 md:w-48 h-auto mt-4 select-none pointer-events-none transition-all duration-300 ease-out filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:drop-shadow-[0_8px_20px_rgba(26,26,26,0.15)] group-hover:scale-[1.04]" />
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-serif-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.05] text-balance">
                  {t(
                    <>
                      <span className="text-accent-brand">Modern</span> websites.<br />
                      Built for <span className="text-accent-brand">Japanese</span> and international audiences.
                    </>,
                    <>
                      <span className="text-accent-brand">モダン</span>なWebサイト。<br />
                      <span className="text-accent-brand">日本</span>国内外のユーザーに向けて。
                    </>
                  )}
                </h2>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-px bg-ink/10 border rule" role="list">
              {services.map((s) => (
                <article key={s.no} className="group bg-surface p-8 sm:p-10 md:p-12 lg:px-16 lg:py-12 hover:bg-surface-elevated transition-colors" role="listitem">
                  <div className="flex items-center justify-between mb-4 lg:mb-6">
                    <header className="font-mono text-[22px] uppercase tracking-[0.22em] text-accent-brand">
                      {s.no}
                    </header>
                    <span className="font-mono text-[22px] uppercase tracking-widest text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                      →
                    </span>
                  </div>
                  <h3 className="font-serif-display text-2xl lg:text-3xl font-bold tracking-tight mb-4 text-ink">
                    {s.title}
                  </h3>
                  <p className="text-ink-muted text-base lg:text-lg leading-relaxed max-w-[72ch]">{s.body}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CONTACT ========================================================= */}
        <section id="contact" className="py-24 lg:py-32 border-t rule w-full overflow-x-hidden relative">
          <motion.div 
            className="max-w-[1320px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="lg:col-span-4 group cursor-pointer">
              <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] text-accent-brand mb-4">
                §04 - {t("Contact", "お問い合わせ")}
              </p>
              <h2 className="font-serif-display text-4xl md:text-5xl lg:text-[3.75rem] font-bold tracking-[-0.02em] leading-[1.02] text-balance">
                {t(
                  <>Let's discuss your <em className="italic text-accent-brand font-medium">project</em></>,
                  <>まずはお気軽にご相談ください</>
                )}
              </h2>
              <p className="mt-6 text-ink-muted text-lg leading-relaxed max-w-[44ch] whitespace-pre-line">
                {t(
                  "Please share a short outline of your project, budget range, and preferred schedule. I typically reply within 1–2 business days after reviewing your message.",
                  "プロジェクト概要、ご予算、スケジュールなどをお知らせください。\n内容を確認後、通常1〜2営業日以内にご返信いたします。"
                )}
              </p>

              <ContactIllustration className="w-40 md:w-48 h-auto mt-6 select-none pointer-events-none transition-all duration-300 ease-out filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.04)] group-hover:drop-shadow-[0_8px_20px_rgba(26,26,26,0.15)] group-hover:scale-[1.04]" />

              <dl className="mt-10 space-y-5 font-mono text-[12px] uppercase tracking-[0.18em]">
                <div className="flex items-start gap-4">
                  <dt className="text-ink-muted w-20">Contact</dt>
                  <dd className="text-ink">
                    {t("USE CONTACT FORM", "フォームよりお問い合わせください")}
                  </dd>
                </div>
                <div className="flex items-start gap-4">
                  <dt className="text-ink-muted w-20">Studio</dt>
                  <dd className="text-ink">Fukuoka, JP · UTC+9</dd>
                </div>
                <div className="flex items-start gap-4">
                  <dt className="text-ink-muted w-20">Lang</dt>
                  <dd className="text-ink">English · 日本語</dd>
                </div>
                <div className="flex items-start gap-4">
                  <dt className="text-ink-muted w-20">Status</dt>
                  <dd className="text-ink flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent-brand animate-pulse-dot" />
                    {t("Accepting Q3 Projects", "ご相談受付中")}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-8 bg-surface-elevated p-7 lg:p-10 shadow-[0_30px_80px_-40px_hsl(var(--ink)/0.25)] lg:mt-[44px]">
              <ContactForm />
            </div>
          </motion.div>
        </section>

        {/* FAQ SECTION ===================================================== */}
        <section id="faq" className="py-24 lg:py-32 border-t rule w-full overflow-x-hidden relative bg-surface-soft/25">
          <motion.div 
            className="max-w-[1320px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-10 lg:gap-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="lg:col-span-4 group cursor-pointer">
              <p className="font-mono font-bold text-[16px] uppercase tracking-[0.22em] text-accent-brand mb-3">
                §05 - {t("FAQ & Insights", "よくあるご質問")}
              </p>
              <h2 className="font-serif-display text-4xl font-bold tracking-[-0.02em] leading-[1.1]">
                {t("Questions about bilingual websites, localization, and support.", "日英Webサイト制作とローカライズに関する、よくあるご質問")}
              </h2>
              <p className="mt-6 text-ink-muted text-sm leading-relaxed max-w-[32ch]">
                {t(
                  "Here are a few common questions about the design process, bilingual website strategy, and post-launch support.",
                  "制作の進め方、バイリンガル対応、公開後のサポートについて、よくいただくご質問をまとめました。"
                )}
              </p>
              <FAQIllustration className="mt-6 select-none pointer-events-none transition-all duration-300 ease-out transform filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.02)] group-hover:drop-shadow-[0_8px_20px_rgba(26,26,26,0.15)] group-hover:scale-[1.04]" />
            </div>

            <div className="lg:col-span-8 space-y-4">
              {[
                {
                  q: t("Which website is right for your business?", "あなたのビジネスに最適なWebサイトはどれですか？"),
                  a: t(
                    <div className="space-y-4">
                      <div>
                        <strong className="text-ink font-bold block mb-1">Small Business Website</strong>
                        <p>Best for freelancers, consultants, local businesses, and small teams that need a professional online presence without unnecessary complexity. It focuses on clear communication, essential business information, and lead generation. If the content is relatively simple, a bilingual version can also be included.</p>
                      </div>
                      <div>
                        <strong className="text-ink font-bold block mb-1">Business Website</strong>
                        <p>Designed for growing companies that need a stronger and more scalable web presence. This typically includes more pages, a blog or news section, SEO-conscious structure, and optional English/Japanese localization. It is a good fit for businesses serving both domestic and international audiences.</p>
                      </div>
                      <div>
                        <strong className="text-ink font-bold block mb-1">Corporate & Global Websites</strong>
                        <p>Built for established companies that need a more customized solution. These projects may include multilingual corporate websites, product or service sites, CMS integration, custom functionality, and localization strategy. They are best suited to businesses planning for long-term growth and more complex communication needs.</p>
                      </div>
                    </div>,
                    <div className="space-y-4">
                      <div>
                        <strong className="text-ink font-bold block mb-1">スモールビジネス向けWebサイト</strong>
                        <p>フリーランス、コンサルタント、地域の店舗、小規模事業者向けです。必要な情報をわかりやすく伝え、信頼感のあるオンライン窓口を整えたい場合に適しています。内容が比較的シンプルであれば、日英対応も可能です。</p>
                      </div>
                      <div>
                        <strong className="text-ink font-bold block mb-1">ビジネスWebサイト</strong>
                        <p>成長中の企業や、より充実した情報発信が必要な事業者向けです。ページ数の追加、ブログやお知らせ機能、SEOを意識した設計、必要に応じた日英ローカライズに対応します。国内外の顧客に向けて、継続的に運用しやすい構成です。</p>
                      </div>
                      <div>
                        <strong className="text-ink font-bold block mb-1">企業・グローバル向けWebサイト</strong>
                        <p>多言語対応や独自機能を含む、より本格的なWeb展開向けです。コーポレートサイト、製品・サービスサイト、CMS連携、カスタム機能、ローカライズ戦略まで含めて設計します。企画段階から公開後の成長まで、長期的な視点で進めるプロジェクトに適しています。</p>
                      </div>
                    </div>
                  )
                },
                {
                  q: t("What is the difference between a bilingual website and localization & bilingual UX?", "「バイリンガルWebサイト制作」と「ローカライズ & バイリンガルUX」の違いは何ですか？"),
                  a: t(
                    "A bilingual website project means designing and building a new website, or fully redesigning an existing one, for both English and Japanese. Localization & bilingual UX focuses on improving an existing website or app so the content, interface, and overall user experience feel natural in both languages without requiring a full rebuild.",
                    "バイリンガルWebサイト制作は、新規制作または全面リニューアルとして、英語と日本語の両方に対応したサイトを設計・構築するサービスです。ローカライズ & バイリンガルUXは、既存のWebサイトやアプリを活かしながら、言葉・UI・レイアウトを日本国内外のユーザーに自然に伝わる形へ最適化するサービスです。"
                  )
                },
                {
                  q: t("How do you handle layout differences between English and Japanese?", "英語と日本語でレイアウトは変わりますか？"),
                  a: t(
                    "English and Japanese have different text density, rhythm, and visual balance. Typography, spacing, and layout are adjusted for each language so the overall experience feels consistent and natural.",
                    "はい。英語と日本語では文字量や読みやすい余白の取り方が異なるため、それぞれの言語に合わせてタイポグラフィやレイアウトを調整しています。"
                  )
                },
                {
                  q: t("Can you help with English content and translation?", "英語コンテンツや翻訳もお願いできますか？"),
                  a: t(
                    "Yes. I handle English copywriting, translation, editing, and localization directly. Because the work is not split between multiple vendors, the tone stays consistent and the final message feels more natural for international audiences.",
                    "はい。英語コピーの作成、既存原稿の翻訳、表現の調整、ローカライズまで一貫して対応しています。外部に委託せず、私自身が一貫して担当するため、言葉のトーンや伝わり方に一貫性を持たせやすいのが特長です。"
                  )
                },
                {
                  q: t("How long does a typical project take?", "制作期間はどのくらいですか？"),
                  a: t(
                    "Most projects take about 2 to 8 weeks. The schedule depends on scope, content readiness, and whether bilingual support is included.",
                    "目安は2〜8週間程度です。ページ数、原稿の準備状況、日英対応の有無によって変わります。"
                  )
                },
                {
                  q: t("Are bilingual websites optimized for search?", "SEOにも対応していますか？"),
                  a: t(
                    "Yes. Websites are built with clean structure, technical SEO best practices, and bilingual content considerations to help people find your business more easily online.",
                    "はい。検索されやすい構造、基本的な技術SEO、日英コンテンツ設計を意識して制作しています。"
                  )
                },
                {
                  q: t("What is included in the support plans?", "保守プランには何が含まれますか？"),
                  a: t(
                    "Essential Care includes routine maintenance, plugin updates, security checks, and backups. Business Care adds priority support, site monitoring, content updates, and ongoing improvement advice. Flexible hourly support is also available for occasional updates or troubleshooting without a monthly plan.",
                    "エッセンシャル保守では、定期メンテナンス、プラグイン更新、バックアップ、セキュリティ確認などに対応します。ビジネス保守では、これに加えて優先対応、サイトの状態確認、コンテンツ更新、継続的な改善相談なども含まれます。月額プランを利用せず、必要なときだけ依頼できるスポット対応もご利用いただけます。"
                  )
                }
              ].map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="bg-surface border border-ink/10 transition-colors duration-300 hover:border-accent-brand/40 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-5 lg:p-6 flex items-center justify-between gap-4 group cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <h3 className="font-serif-display text-lg lg:text-xl font-bold text-ink group-hover:text-accent-brand transition-colors pr-2">
                        {faq.q}
                      </h3>
                      <span className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen 
                          ? 'bg-ink text-surface border-ink rotate-180' 
                          : 'border-ink/20 text-ink group-hover:border-accent-brand group-hover:text-accent-brand'
                      }`}>
                        <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                      </span>
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 lg:px-6 lg:pb-7 pt-3 border-t border-ink/10 text-ink-muted text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>
      </main>

      {/* FOOTER SECTION =================================================== */}
      <footer className="py-12 border-t rule bg-surface-soft/10 text-xs w-full">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-ink-muted">
            &copy; 2026 Dan Burgess Design
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 -ml-2">
            <a href="#work" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("Work", "制作実績")}</a>
            <a href="#about" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("About", "私について")}</a>
            <a href="#services" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("Services", "サービス")}</a>
            <a href="#contact" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("Contact", "お問い合わせ")}</a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-ink-muted">{t("SNS →", "SNS →")}</span>
            
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
                <div className="relative bg-ink text-surface text-[9px] font-mono uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-2xl">
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
                <div className="relative bg-ink text-surface text-[9px] font-mono uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-2xl">
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