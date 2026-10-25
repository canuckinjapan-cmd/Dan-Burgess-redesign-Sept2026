import { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface ProcessNotes {
  challenge: string;
  approach: string;
  decisions: string[];
  tools: string;
}

interface CaseStudy {
  id: string;
  index: string;
  year: string;
  client: string;
  clientJp: string;
  title: string | ReactNode;
  titleJp: string | ReactNode;
  sector: string;
  sectorJp: string;
  summary: string;
  summaryJp: string;
  role?: string[];
  roleJp?: string[];
  roleDetails: string;
  roleDetailsJp: string | ReactNode;
  process: ProcessNotes;
  processJp: ProcessNotes;
  demoAlign: "left" | "right";
  arrowSide?: "left" | "right";
  stack?: string[];
  outcomes?: { value: string; label: string; jpLabel: string }[];
  image: string;
  jpImage?: string;
  mobileImage?: string;
  jpMobileImage?: string;
  tabletImage?: string;
  jpTabletImage?: string;
  accent?: boolean;
  link?: string;
  jpLink?: string;
}

const cases: CaseStudy[] = [
  {
    id: "taka",
    index: "01",
    year: "2026",
    client: "SUKIMA FIT",
    clientJp: "SUKIMA FIT",
    title: "A bilingual website for a new generation of 24-hour gyms.",
    titleJp: "24時間スマートジムの魅力を伝える、日英バイリンガルサイト。",
    sector: "24-HOUR SMART GYM - WEBSITE CONCEPT",
    sectorJp: "24時間スマートジム - 提案コンセプト",
    summary:
      "A contemporary bilingual website concept for a new type of unmanned gym that has been growing in popularity in Japan. Designed around flexible access, allowing members to train at any time - including during hours when staff are not on site.",
    summaryJp: "スタッフが常駐しない時間帯でも利用できる、スマートアクセス型の24時間ジムを想定したWebサイトの制作サンプルです。日常の「隙間時間」に合わせて、いつでもトレーニングできる新しいジムの利用スタイルを、シンプルで現代的なデザインで表現しました。",
    roleDetails:
      "concept, logo and visual design, AI-generated imagery, responsive front end, and EN/JP content",
    roleDetailsJp:
      "コンセプト、ロゴおよびビジュアルデザイン、AI生成画像、レスポンシブ対応のフロントエンド、英語・日本語のコンテンツ",
    process: {
      challenge:
        "The first version looked like a generic gym template and had nothing to set it apart.",
      approach:
        "I went back to a real trend, 24-hour unmanned smart-access gyms, and narrowed the concept to training in the gaps of your day. QR/NFC entry is the core experience, and I rebuilt the copy, imagery and logo around it.",
      decisions: [
        "Pricing is cut to two plans so the choice is easy.",
        "The four locations (Shibuya, Shinjuku, Yokohama, Omiya) differ in time of day, window view and camera angle, so they don't read as the same photo.",
        "Facilities are limited to four tiles to keep mobile scrolling manageable.",
        "The JP and EN versions are written separately, not translated.",
      ],
      tools: "HTML / CSS / JavaScript, Google AI Studio, Gemini (image generation and editing), GitHub, Cloudflare",
    },
    processJp: {
      challenge:
        "最初のバージョンは、どこにでもある「テンプレート的なジムサイト」に見え、差別化ができていませんでした。",
      approach:
        "「24時間・無人・スマートアクセス」という実在のトレンドに立ち返り、コンセプトを「スキマ時間にトレーニングする」に絞りました。QR・NFCで入館する体験を軸に、コピー、画像、ロゴを一から作り直しています。",
      decisions: [
        "料金プランは2種類に絞り、迷わず選べる構成にしました。",
        "渋谷・新宿・横浜・大宮の4店舗は、時間帯・窓の景色・カメラ位置を変えて、同じ写真に見えないようにしました。",
        "施設紹介は4枚に限定し、モバイルでも長くなりすぎないようにしました。",
        "日本語版と英語版は翻訳ではなく、それぞれ別に書いています。",
      ],
      tools: "HTML / CSS / JavaScript、Google AI Studio、Gemini（画像生成・編集）、GitHub、Cloudflare",
    },
    demoAlign: "left",
    arrowSide: "left",
    image: new URL("../assets/SUKIMA-FIT-desktop-E2.jpg", import.meta.url).href,
    jpImage: new URL("../assets/SUKIMA-FIT-desktop-J2.jpg", import.meta.url).href,
    mobileImage: new URL("../assets/SUKIMA-FIT-phone-E2.jpg", import.meta.url).href,
    jpMobileImage: new URL("../assets/SUKIMA-FIT-phone-J2.jpg", import.meta.url).href,
    tabletImage: new URL("../assets/SUKIMA-FIT-tablet-E2.jpg", import.meta.url).href,
    jpTabletImage: new URL("../assets/SUKIMA-FIT-tablet-J2.jpg", import.meta.url).href,
    accent: true,
    link: `${import.meta.env.BASE_URL}samples/gym01/en/`.replace(/\/+/g, '/'),
    jpLink: `${import.meta.env.BASE_URL}samples/gym01/`.replace(/\/+/g, '/'),
  },
  {
    id: "lumina",
    index: "02",
    year: "2026",
    client: "Rural Japan Living",
    clientJp: "Rural Japan Living",
    title: "Premium property listings designed for overseas buyers.",
    titleJp: (
      <>
        <span className="inline-block">海外の購入者に向けた</span>
        <br />
        <span className="inline-block">不動産検索サイト</span>
      </>
    ),
    sector: "Real Estate · Property DB - PROPOSED CONCEPT",
    sectorJp: "不動産・物件データベース - 提案コンセプト",
    summary:
      "Turning complex property data into a clean, easy-to-use website that helps both Japanese and international buyers find homes with confidence.",
    summaryJp: "複雑な不動産情報を整理し、日本国内外の利用者が物件を探しやすい構成にまとめました。",
    roleDetails:
      "concept, visual design (some stock photos used), responsive front end, property database, and EN/JP content",
    roleDetailsJp: (
      <>
        コンセプト、ビジュアルデザイン（一部ストックフォトを使用）、レスポンシブフロントエンド、物件データベース、英語・日本語の<span className="whitespace-nowrap">コンテンツ</span>
      </>
    ),
    process: {
      challenge:
        "Property data is dense and complicated, and hard to search and compare for overseas buyers who don't know how Japanese real estate works.",
      approach:
        "I organized the information into a structure that can be filtered and compared side by side, and built a working property database so the concept can be tried, not just viewed.",
      decisions: [
        "The audience is prospective buyers both in Japan and abroad.",
        "Some photos are stock, and the card says so.",
        "JP and EN carry the same depth of information.",
      ],
      tools: "HTML / CSS / JavaScript, GitHub, Cloudflare",
    },
    processJp: {
      challenge:
        "物件情報は項目が多く複雑で、日本の不動産に慣れていない海外の購入者には、探しにくく比較もしにくいという問題があります。",
      approach:
        "情報を整理し、物件を絞り込み、並べて比較できる構成にしました。物件データベースを組み込み、実際に検索して動く形で提案しています。",
      decisions: [
        "想定ユーザーは、日本国内外の購入検討者です。",
        "写真の一部にはストックフォトを使い、その旨をカードに明記しています。",
        "日本語・英語の両方で、同じ情報量が得られるようにしました。",
      ],
      tools: "HTML / CSS / JavaScript、GitHub、Cloudflare",
    },
    demoAlign: "right",
    arrowSide: "right",
    image: new URL("../assets/Real01-PCbig-E.jpg", import.meta.url).href,
    jpImage: new URL("../assets/Real01-PCbig-J.jpg", import.meta.url).href,
    mobileImage: new URL("../assets/Real01-phone-E.jpg", import.meta.url).href,
    jpMobileImage: new URL("../assets/Real01-phone-J.jpg", import.meta.url).href,
    tabletImage: new URL("../assets/Real01-tablet-E.jpeg", import.meta.url).href,
    jpTabletImage: new URL("../assets/Real01-tablet-J.jpeg", import.meta.url).href,
    link: `${import.meta.env.BASE_URL}samples/real-estate01/index.html?lang=en`.replace(/\/+/g, '/'),
    jpLink: `${import.meta.env.BASE_URL}samples/real-estate01/index.html?lang=ja`.replace(/\/+/g, '/'),
  },
  {
    id: "apex",
    index: "03",
    year: "2026",
    client: "JDM RETRO RIDES",
    clientJp: "JDM RETRO RIDES",
    title: "Making Japanese vehicle auctions accessible to global buyers.",
    titleJp: "日本の中古車オークションを海外ユーザーにもっと身近に",
    sector: "Automotive · E-commerce - PROPOSED CONCEPT",
    sectorJp: "自動車・ECサイト - 提案コンセプト",
    summary:
      "A streamlined online shop that simplifies bidding, paperwork, and shipping for customers buying vehicles from Japan.",
    summaryJp: "入札から輸出手続きまでを分かりやすく整理し、海外からでも安心して利用できる購入フローを設計しました。",
    roleDetails:
      "concept, logo and visual design, AI-generated imagery, responsive front end, vehicle database, currency converter, and EN/JP content",
    roleDetailsJp:
      "コンセプト、ロゴおよびビジュアルデザイン、AI生成画像、レスポンシブフロントエンド、車両データベース、通貨換算機能、英語・日本語のコンテンツ",
    process: {
      challenge:
        "Japanese used-car auctions are hard to understand for overseas buyers, and the path from bidding to export is full of uncertainty.",
      approach:
        "I broke the journey from bid to export into clear stages, and built a vehicle database and currency converter so buyers can judge prices in their own currency.",
      decisions: [
        "The audience is overseas buyers, so English leads.",
        "The purchase flow answers the usual worry points before they come up.",
        "Logo, visuals and AI-generated imagery were designed together for a consistent look.",
      ],
      tools: "HTML / CSS / JavaScript, Google AI Studio, Gemini (image generation), GitHub, Cloudflare",
    },
    processJp: {
      challenge:
        "日本の中古車オークションは、海外のバイヤーにとって仕組みが分かりにくく、入札から輸出までの手続きにも不安がつきまといます。",
      approach:
        "入札から輸出手続きまでの流れを、段階ごとに分かりやすく整理しました。車両データベースと通貨換算機能を組み込み、海外からでも金額を自国通貨で判断できるようにしています。",
      decisions: [
        "想定ユーザーは海外のバイヤーで、英語版を主軸にしています。",
        "購入フローは、不安になりやすいポイントを先回りして示す設計にしました。",
        "ロゴ、ビジュアル、AI生成画像をまとめて設計し、一貫した世界観に統一しました。",
      ],
      tools: "HTML / CSS / JavaScript、Google AI Studio、Gemini（画像生成）、GitHub、Cloudflare",
    },
    demoAlign: "left",
    arrowSide: "left",
    image: new URL("../assets/MacBook-Pro-indexbig-E.jpg", import.meta.url).href,
    jpImage: new URL("../assets/MacBook-Pro-indexbig-J.jpg", import.meta.url).href,
    mobileImage: new URL("../assets/iPhone-16-index-E.jpg", import.meta.url).href,
    jpMobileImage: new URL("../assets/iPhone-16-index-J.jpg", import.meta.url).href,
    tabletImage: new URL("../assets/iPad-index-E.jpg", import.meta.url).href,
    jpTabletImage: new URL("../assets/iPad-index-J.jpg", import.meta.url).href,
    link: "https://danburgess.com/samples/jdm-retro/?lang=en",
    jpLink: "https://danburgess.com/samples/jdm-retro/?lang=ja",
  },
];

export const CaseStudies = () => {
  const { t, lang } = useLanguage();

  return (
    <div className="space-y-24 lg:space-y-32">
      {cases.map((c, i) => {
        const reverse = i % 2 === 1;
        const currentLink = lang === 'JP' && c.jpLink ? c.jpLink : c.link;
        const currentImage = lang === 'JP' && c.jpImage ? c.jpImage : c.image;
        const currentMobileImage = lang === 'JP' && c.jpMobileImage ? c.jpMobileImage : c.mobileImage;
        const currentTabletImage = lang === 'JP' && c.jpTabletImage ? c.jpTabletImage : c.tabletImage;

        return (
          <article
            key={c.id}
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* Image */}
            <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
              {currentLink ? (
                <a 
                  href={currentLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block relative group cursor-pointer"
                >
                  <div className="absolute -inset-px bg-gradient-to-br from-accent-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                  <div className="relative bg-white p-2 sm:p-3 border rule shadow-[0_30px_60px_-30px_hsl(var(--ink)/0.25)]">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase text-ink-muted px-2 py-1.5">
                      <span>{c.index} / {t(c.client, c.clientJp)}</span>
                      <span>{c.year}</span>
                    </div>
                    <div className={`${(c.id === 'taka' || c.id === 'lumina' || c.id === 'apex') ? 'aspect-auto' : 'aspect-[16/10]'} relative overflow-hidden bg-surface-soft`}>
                      <picture>
                        {currentMobileImage && (
                          <source
                            media="(max-width: 639px) and (orientation: portrait)"
                            srcSet={currentMobileImage}
                          />
                        )}
                        {currentTabletImage && (
                          <source
                            media="(min-width: 640px) and (max-width: 1023px) and (orientation: portrait)"
                            srcSet={currentTabletImage}
                          />
                        )}
                        <img
                          src={currentImage}
                          alt={`${t(c.client, c.clientJp)} - ${t(c.title, c.titleJp)}`}
                          loading="lazy"
                          className={`w-full ${(c.id === 'taka' || c.id === 'lumina' || c.id === 'apex') ? 'h-auto' : 'h-full'} object-cover object-top ease-in-out group-hover:scale-[1.03]`}
                          style={{ transitionDuration: '20000ms' }}
                        />
                      </picture>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="relative group">
                  <div className="absolute -inset-px bg-gradient-to-br from-accent-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                  <div className="relative bg-white p-2 sm:p-3 border rule shadow-[0_30px_60px_-30px_hsl(var(--ink)/0.25)]">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase text-ink-muted px-2 py-1.5">
                      <span>{c.index} / {t(c.client, c.clientJp)}</span>
                      <span>{c.year}</span>
                    </div>
                    <div className={`${(c.id === 'taka' || c.id === 'lumina' || c.id === 'apex') ? 'aspect-auto' : 'aspect-[16/10]'} relative overflow-hidden bg-surface-soft`}>
                      <picture>
                        {currentMobileImage && (
                          <source
                            media="(max-width: 639px) and (orientation: portrait)"
                            srcSet={currentMobileImage}
                          />
                        )}
                        {currentTabletImage && (
                          <source
                            media="(min-width: 640px) and (max-width: 1023px) and (orientation: portrait)"
                            srcSet={currentTabletImage}
                          />
                        )}
                        <img
                          src={currentImage}
                          alt={`${t(c.client, c.clientJp)} - ${t(c.title, c.titleJp)}`}
                          loading="lazy"
                          className={`w-full ${(c.id === 'taka' || c.id === 'lumina' || c.id === 'apex') ? 'h-auto' : 'h-full'} object-cover object-top ease-in-out group-hover:scale-[1.03]`}
                          style={{ transitionDuration: '20000ms' }}
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Copy */}
            <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase text-ink-muted mb-5">
                <span className="text-accent-text">{c.index}</span>
                <span className="h-px w-8 bg-ink/20" />
                <span>{t(c.sector, c.sectorJp)}</span>
              </div>
              <p className="font-mono text-[11px] uppercase text-ink-muted mb-2">
                {t(c.client, c.clientJp)}
              </p>
              
              {currentLink ? (
                <a 
                  href={currentLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block group/text transition-colors duration-300 hover:text-accent-text"
                >
                  <h3 className="font-serif-display text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight text-balance mb-5">
                    {t(c.title, c.titleJp)}
                  </h3>
                  <p className="text-ink-muted leading-relaxed mb-8 max-w-[52ch] group-hover/text:text-accent-text transition-colors duration-300">
                    {t(c.summary, c.summaryJp)}
                  </p>
                </a>
              ) : (
                <>
                  <h3 className="font-serif-display text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight text-balance mb-5">
                    {t(c.title, c.titleJp)}
                  </h3>
                  <p className="text-ink-muted leading-relaxed mb-8 max-w-[52ch]">
                    {t(c.summary, c.summaryJp)}
                  </p>
                </>
              )}

              <div className="border-t rule pt-5 space-y-4">
                <p className="text-ink-muted leading-relaxed max-w-[52ch]">
                  <strong className="font-bold text-ink">
                    {t("My role: ", "担当業務：")}
                  </strong>
                  {t(c.roleDetails, c.roleDetailsJp)}
                </p>

                {currentLink && (
                  <div
                    className={
                      c.demoAlign === "right"
                        ? "flex justify-start lg:justify-end text-left lg:text-right"
                        : "flex justify-start text-left"
                    }
                  >
                    <a
                      href={currentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-sm uppercase font-bold tracking-wider text-ink hover:text-accent-text transition-colors duration-200 cursor-pointer group/demo"
                    >
                      {/* Mobile and tablet displays: Explore the demo ↗ / デモサイトを見る ↗ */}
                      <span className="inline-flex items-center gap-1.5 lg:hidden">
                        <span>{t("Explore the demo", "デモサイトを見る")}</span>
                        <span
                          className="transition-transform duration-200 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </span>

                      {/* Desktop displays: directional arrow pointing to preview */}
                      <span className="hidden lg:inline-flex items-center gap-1.5">
                        {c.arrowSide === "right" ? (
                          <>
                            <span>{t("Explore the demo", "デモサイトを見る")}</span>
                            <span
                              className="transition-transform duration-200 group-hover/demo:translate-x-1"
                              aria-hidden="true"
                            >
                              →
                            </span>
                          </>
                        ) : (
                          <>
                            <span
                              className="transition-transform duration-200 group-hover/demo:-translate-x-1"
                              aria-hidden="true"
                            >
                              ←
                            </span>
                            <span>{t("Explore the demo", "デモサイトを見る")}</span>
                          </>
                        )}
                      </span>
                    </a>
                  </div>
                )}

                <ProcessPanel c={c} />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

const ProcessPanel = ({ c }: { c: CaseStudy }) => {
  const { t } = useLanguage();
  const p = t(c.process, c.processJp);
  const headingClass =
    "font-mono text-[11px] uppercase tracking-wider font-bold text-ink mt-5 mb-1";

  return (
    <details className="group border-t rule pt-1">
      <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 font-mono text-sm uppercase font-bold tracking-wider text-ink transition-colors duration-200 hover:text-accent-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-brand [&::-webkit-details-marker]:hidden">
        <span>{t("View the process notes", "制作プロセスを見る")}</span>
        <span aria-hidden="true" className="text-xl leading-none">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>
      <div className="pb-2 text-ink-muted leading-relaxed max-w-[52ch] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200">
        <h4 className={headingClass}>{t("Challenge", "課題")}</h4>
        <p>{p.challenge}</p>
        <h4 className={headingClass}>{t("Approach", "アプローチ")}</h4>
        <p>{p.approach}</p>
        <h4 className={headingClass}>{t("Key decisions", "主な判断")}</h4>
        <ul className="list-disc pl-5 space-y-1">
          {p.decisions.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <h4 className={headingClass}>{t("Tools", "使用ツール")}</h4>
        <p>{p.tools}</p>
      </div>
    </details>
  );
};
