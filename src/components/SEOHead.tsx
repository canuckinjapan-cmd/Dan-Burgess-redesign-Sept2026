import { useEffect } from "react";

interface SEOHeadProps {
  lang: "EN" | "JP";
}

const SITE = "https://danburgess.com";

// Keep these strings identical to the static <head> in index.html (JP) and
// en/index.html (EN). Crawlers and social scrapers read the static HTML; this
// component only keeps the head in sync after a client-side language switch.
const META = {
  EN: {
    path: "/en/",
    locale: "en_US",
    title: "Dan Burgess Design | Web Production, UI/UX Design & Localization (Fukuoka, Japan)",
    ogTitle: "Dan Burgess Design | Web Production, UI/UX Design & Localization",
    description:
      "Dan Burgess is a Canadian web designer and front-end developer, based in Japan since 1992. Bilingual websites, UI/UX design and localization from Fukuoka.",
    ogDescription:
      "Connecting Japanese businesses to global audiences through thoughtful design, modern web production, and cross-cultural communication.",
    image: `${SITE}/DJB-og-image-EN.png`,
  },
  JP: {
    path: "/",
    locale: "ja_JP",
    title: "ダン・バージェス デザイン | Web開発・UI/UXデザイン・ローカライズ（福岡・日本）",
    ogTitle: "ダン・バージェス デザイン | Web開発・UI/UXデザイン・ローカライズ",
    description:
      "ダン・バージェスは福岡を拠点に活動するWebデザイナー／フロントエンド開発者。1992年から日本在住。日英バイリンガルサイト制作、UI/UXデザイン、ローカライズに取り組んでいます。",
    ogDescription:
      "日本企業の海外発信を支援するWebデザイナー。デザイン、Web制作、日英のコミュニケーション経験を活かして、伝わるWebサイトをつくります。",
    image: `${SITE}/DJB-og-image-JP.png`,
  },
} as const;

// Update a <meta> tag, creating it if the static HTML doesn't have it.
const setMeta = (attr: "name" | "property", key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

export const SEOHead = ({ lang }: SEOHeadProps) => {
  useEffect(() => {
    const m = META[lang];
    const url = `${SITE}${m.path}`;

    document.title = m.title;

    setMeta("name", "description", m.description);

    setMeta("property", "og:title", m.ogTitle);
    setMeta("property", "og:description", m.ogDescription);
    setMeta("property", "og:image", m.image);
    setMeta("property", "og:url", url);
    setMeta("property", "og:locale", m.locale);

    setMeta("name", "twitter:title", m.ogTitle);
    setMeta("name", "twitter:description", m.ogDescription);
    setMeta("name", "twitter:image", m.image);
    setMeta("name", "twitter:url", url);

    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", url);
    }
  }, [lang]);

  return null;
};
