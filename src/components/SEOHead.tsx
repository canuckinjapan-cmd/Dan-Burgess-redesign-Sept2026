import { useEffect } from "react";

interface SEOHeadProps {
  lang: "EN" | "JP";
}

export const SEOHead = ({ lang }: SEOHeadProps) => {
  useEffect(() => {
    const isEn = lang === "EN";

    const title = isEn
      ? "Dan Burgess Design | Web Production, UI/UX Design & Localization (Fukuoka, Japan)"
      : "ダン・バージェス デザイン | Web開発・UI/UXデザイン・ローカライズ（福岡・日本）";

    const description = isEn
      ? "Dan Burgess is a Canadian web designer and developer in Japan specializing in bilingual websites, UI/UX design, and localization since 1992."
      : "ダン・バージェスは福岡を拠点に、海外へ伝わるWebサイト制作、UI/UXデザイン、ローカライズを提供しています。1992年からの実績で日・英コミュニケーションを成功に導きます。";

    document.title = title;

    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute("content", description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", title);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", description);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute("content", isEn ? "https://danburgess.com/DJB-og-image-EN.png" : "https://danburgess.com/DJB-og-image-JP.png");
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute("content", isEn ? "https://danburgess.com/DJB-og-image-EN.png" : "https://danburgess.com/DJB-og-image-JP.png");
    }
  }, [lang]);

  return null;
};
