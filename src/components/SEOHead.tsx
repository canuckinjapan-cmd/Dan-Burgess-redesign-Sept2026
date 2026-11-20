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
    title: "Dan Burgess | Japanese → English Translator (Fukuoka, Japan)",
    ogTitle: "Dan Burgess | Japanese → English Translator",
    description:
      "English-native Japanese → English translator in Fukuoka, Japan, specializing in software, UI strings, games, SaaS, camera documentation, and subtitling.",
    ogDescription:
      "Japanese → English translator for software, UI, games, SaaS, and technical documentation. Uses Trados, Felix, HTML, JSON, and XLIFF.",
    image: `${SITE}/DJB-og-image-EN.png`,
  },
  JP: {
    path: "/",
    locale: "ja_JP",
    title: "ダン・バージェス | 日英翻訳者（ソフトウェア・UI・技術文書）",
    ogTitle: "ダン・バージェス | 日英翻訳者（ソフトウェア・UI・技術文書）",
    description:
      "福岡を拠点とする英語ネイティブの日英翻訳者。ソフトウェア・UI、ゲーム、カメラ・電子機器の技術資料、SaaS、字幕翻訳に対応。Trados・Felix使用、HTML・JSON・XLIFF直接対応可。",
    ogDescription:
      "ソフトウェア・UI・技術文書専門の日英翻訳者（福岡拠点・英語ネイティブ）。Trados・FelixやHTML・JSON・XLIFFの直接編集に対応。",
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
