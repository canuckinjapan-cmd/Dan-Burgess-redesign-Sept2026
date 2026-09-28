import { useLanguage } from "@/context/LanguageContext";

interface CaseStudy {
  id: string;
  index: string;
  year: string;
  client: string;
  clientJp: string;
  title: string;
  titleJp: string;
  sector: string;
  sectorJp: string;
  summary: string;
  summaryJp: string;
  role: string[];
  roleJp: string[];
  stack: string[];
  outcomes: { value: string; label: string; jpLabel: string }[];
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
    title: "A proposed website concept for a new generation of 24-hour smart-access gyms.",
    titleJp: "日本で増えている、24時間型スマートジムのWebサイト提案",
    sector: "24-HOUR SMART GYM - PROPOSED SAMPLE PROJECT",
    sectorJp: "24時間スマートジム - 制作サンプル",
    summary:
      "A contemporary bilingual website concept for a new type of unmanned gym that has been growing in popularity in Japan. Designed around flexible access, allowing members to train at any time - including during hours when staff are not on site.",
    summaryJp: "スタッフが常駐しない時間帯でも利用できる、スマートアクセス型の24時間ジムを想定したWebサイトの制作サンプルです。日常の「隙間時間」に合わせて、いつでもトレーニングできる新しいジムの利用スタイルを、シンプルで現代的なデザインで表現しました。",
    role: ["Strategy", "UX/UI", "Front-end", "Bilingual Copy"],
    roleJp: ["戦略策定", "UX/UIデザイン", "フロントエンド実装", "コピーライティング"],
    stack: ["Webflow", "GSAP", "Calendar API", "i18n"],
    outcomes: [
      { value: "QR / APP", label: "Smart access", jpLabel: "スマートアクセス" },
      { value: "EN / JP", label: "Bilingual support", jpLabel: "日英バイリンガル対応" },
      { value: "RWD", label: "Responsive design", jpLabel: "レスポンシブ設計" },
    ],
    image: new URL("../assets/SUKIMA-FIT-desktop-E.jpg", import.meta.url).href,
    jpImage: new URL("../assets/SUKIMA-FIT-desktop-J.jpg", import.meta.url).href,
    mobileImage: new URL("../assets/SUKIMA-FIT-phone-E.jpg", import.meta.url).href,
    jpMobileImage: new URL("../assets/SUKIMA-FIT-phone-J.jpg", import.meta.url).href,
    tabletImage: new URL("../assets/SUKIMA-FIT-tablet-E.jpg", import.meta.url).href,
    jpTabletImage: new URL("../assets/SUKIMA-FIT-tablet-J.jpg", import.meta.url).href,
    accent: true,
    link: `${import.meta.env.BASE_URL}samples/gym01/en/`.replace(/\/+/g, '/'),
    jpLink: `${import.meta.env.BASE_URL}samples/gym01/`.replace(/\/+/g, '/'),
  },
  {
    id: "lumina",
    index: "02",
    year: "2024",
    client: "Rural Japan Living",
    clientJp: "Rural Japan Living",
    title: "Premium property listings designed for overseas buyers.",
    titleJp: "海外の購入者に向けた不動産検索サイト",
    sector: "Real Estate · Property DB - Sample Project",
    sectorJp: "不動産・物件データベース - 制作サンプル",
    summary:
      "Turning complex property data into a clean, easy-to-use website that helps both Japanese and international buyers find homes with confidence.",
    summaryJp: "複雑な不動産情報を整理し、日本国内外の利用者が物件を探しやすい構成にまとめました。",
    role: ["IA", "UX/UI", "Search UX", "Localization"],
    roleJp: ["情報設計", "UX/UIデザイン", "検索体験設計", "ローカライズ"],
    stack: ["Next.js", "Algolia", "Sanity", "Tailwind"],
    outcomes: [
      { value: "UX", label: "Property search", jpLabel: "物件検索UX" },
      { value: "EN/JP", label: "Bilingual support", jpLabel: "日英バイリンガル対応" },
      { value: "DB", label: "Property database", jpLabel: "物件データベース" },
    ],
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
    sector: "Automotive · E-commerce - Sample Project",
    sectorJp: "自動車・ECサイト - 制作サンプル",
    summary:
      "A streamlined online shop that simplifies bidding, paperwork, and shipping for customers buying vehicles from Japan.",
    summaryJp: "入札から輸出手続きまでを分かりやすく整理し、海外からでも安心して利用できる購入フローを設計しました。",
    role: ["Product Strategy", "UI System", "Checkout UX"],
    roleJp: ["プロダクト戦略", "UIシステム設計", "購入フロー設計"],
    stack: ["Framer", "Custom Liquid", "i18n"],
    outcomes: [
      { value: "UX", label: "Purchase flow", jpLabel: "購入フロー設計" },
      { value: "EN/JP", label: "Bilingual support", jpLabel: "日英対応" },
      { value: "UI", label: "UI system", jpLabel: "UIシステム設計" },
    ],
    image: new URL("../assets/MacBook-Pro-indexbig-E.jpg", import.meta.url).href,
    jpImage: new URL("../assets/MacBook-Pro-indexbig-J.jpg", import.meta.url).href,
    mobileImage: new URL("../assets/iPhone-16-index-E.jpg", import.meta.url).href,
    jpMobileImage: new URL("../assets/iPhone-16-index-J.jpg", import.meta.url).href,
    tabletImage: new URL("../assets/iPad-index-E.jpg", import.meta.url).href,
    jpTabletImage: new URL("../assets/iPad-index-J.jpg", import.meta.url).href,
    link: "https://canuckinjapan-cmd.github.io/JDM-final-version/?lang=en",
    jpLink: "https://canuckinjapan-cmd.github.io/JDM-final-version/?lang=ja",
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
            className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start lg:items-center"
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
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-muted px-2 py-1.5">
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
                          className={`w-full ${(c.id === 'taka' || c.id === 'lumina' || c.id === 'apex') ? 'h-auto' : 'h-full'} object-cover object-top transition-transform duration-[20000ms] ease-in-out group-hover:scale-[1.03]`}
                        />
                      </picture>
                    </div>
                  </div>
                </a>
              ) : (
                <div className="relative group">
                  <div className="absolute -inset-px bg-gradient-to-br from-accent-brand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
                  <div className="relative bg-white p-2 sm:p-3 border rule shadow-[0_30px_60px_-30px_hsl(var(--ink)/0.25)]">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-muted px-2 py-1.5">
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
                          className={`w-full ${(c.id === 'taka' || c.id === 'lumina' || c.id === 'apex') ? 'h-auto' : 'h-full'} object-cover object-top transition-transform duration-[20000ms] ease-in-out group-hover:scale-[1.03]`}
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Copy */}
            <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-5">
                <span className="text-accent-brand">{c.index}</span>
                <span className="h-px w-8 bg-ink/20" />
                <span>{t(c.sector, c.sectorJp)}</span>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted mb-2">
                {t(c.client, c.clientJp)}
              </p>
              
              {currentLink ? (
                <a 
                  href={currentLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block group/text transition-colors duration-300 hover:text-accent-brand"
                >
                  <h3 className="font-serif-display text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight text-balance mb-5">
                    {t(c.title, c.titleJp)}
                  </h3>
                  <p className="text-ink-muted leading-relaxed mb-8 max-w-[52ch] group-hover/text:text-accent-brand transition-colors duration-300">
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

              <dl className="grid grid-cols-3 gap-4 border-t rule pt-5">
                {c.outcomes.map((o) => (
                  <div key={o.label}>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-muted mb-1">
                      {t(o.label, o.jpLabel)}
                    </dt>
                    <dd className="font-serif-display text-2xl font-bold tracking-tight">
                      {o.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        );
      })}
    </div>
  );
};
