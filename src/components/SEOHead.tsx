import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function SEOHead({ lang }: { lang: "EN" | "JP" }) {
  const location = useLocation();

  useEffect(() => {
    const isEn = lang === "EN" || location.pathname.startsWith("/en");
    const currentLangCode = isEn ? "en" : "ja";

    // 1. Set <html> lang attribute
    document.documentElement.lang = currentLangCode;

    // 2. Localized Page Title & Description
    if (isEn) {
      document.title = "Dan Burgess Design | Web Development, UI/UX & Localization in Japan";
    } else {
      document.title = "ダン・バージェス デザイン | Web開発・UI/UXデザイン・ローカライズ（福岡・日本）";
    }

    const descriptionText = isEn
      ? "Dan Burgess creates high-conversion bilingual websites and custom digital interfaces in Fukuoka, Japan. Specialized in Web Development, UI/UX Design, and Localization since 1992."
      : "ダン・バージェスは福岡を拠点に、海外へ伝わるWebサイト制作、UI/UXデザイン、ローカライズを提供しています。1992年からの実績で日・英コミュニケーションを成功に導きます。";

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", descriptionText);

    // 3. Canonical URL
    const canonicalUrl = isEn ? "https://danburgess.com/en/" : "https://danburgess.com/";
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // 4. Hreflang Tags
    let hreflangJa = document.querySelector('link[rel="alternate"][hreflang="ja"]');
    if (!hreflangJa) {
      hreflangJa = document.createElement("link");
      hreflangJa.setAttribute("rel", "alternate");
      hreflangJa.setAttribute("hreflang", "ja");
      document.head.appendChild(hreflangJa);
    }
    hreflangJa.setAttribute("href", "https://danburgess.com/");

    let hreflangEn = document.querySelector('link[rel="alternate"][hreflang="en"]');
    if (!hreflangEn) {
      hreflangEn = document.createElement("link");
      hreflangEn.setAttribute("rel", "alternate");
      hreflangEn.setAttribute("hreflang", "en");
      document.head.appendChild(hreflangEn);
    }
    hreflangEn.setAttribute("href", "https://danburgess.com/en/");

    // 5. Open Graph Metadata
    const updateOg = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement("meta");
        ogTag.setAttribute("property", property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute("content", content);
    };

    updateOg("og:type", "website");
    updateOg("og:url", canonicalUrl);
    updateOg(
      "og:title",
      isEn
        ? "Dan Burgess Design | Web Development, UI/UX & Localization in Japan"
        : "ダン・バージェス デザイン | Web開発・UI/UXデザイン・ローカライズ"
    );
    updateOg(
      "og:description",
      isEn
        ? "Canadian designer and developer based in Fukuoka, Japan. Specializing in bilingual web development, UI/UX design, and localization for global markets."
        : "福岡を拠点に、世界に伝わるWebサイト、UI/UXデザイン、ローカライズを提供。1992年からの実績で日・英コミュニケーションを成功に導きます。"
    );
    updateOg("og:image", "https://danburgess.com/src/assets/danface_manga.svg");

    // Remove Twitter Card metadata (Explicit constraint in prompt: "Do NOT include Twitter Card metadata.")
    document.querySelectorAll('meta[property^="twitter:"]').forEach((el) => el.remove());
    document.querySelectorAll('meta[name^="twitter:"]').forEach((el) => el.remove());

    // 6. Schema.org JSON-LD Structured Data
    let jsonLdScript = document.getElementById("json-ld-structured-data");
    if (!jsonLdScript) {
      jsonLdScript = document.createElement("script");
      jsonLdScript.id = "json-ld-structured-data";
      jsonLdScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(jsonLdScript);
    }

    const jsonLdData = isEn
      ? {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfessionalService",
              "@id": "https://danburgess.com/en/#service",
              "name": "Dan Burgess Design",
              "url": "https://danburgess.com/en/",
              "inLanguage": "en",
              "logo": "https://danburgess.com/src/assets/danface_manga.svg",
              "image": "https://danburgess.com/src/assets/danface_manga.svg",
              "description": "Dan Burgess Design is a premium web development, UI/UX design, and localization studio based in Fukuoka, Japan. Specializing in high-performance bilingual websites bridging Western minimalism and Japanese market expectations.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Fukuoka",
                "addressRegion": "Fukuoka Prefecture",
                "addressCountry": "JP"
              },
              "knowsAbout": [
                "Web Development",
                "UI/UX Design",
                "Bilingual Localization",
                "Information Architecture",
                "Figma Design Systems"
              ],
              "founder": {
                "@id": "https://danburgess.com/#person"
              }
            },
            {
              "@type": "Person",
              "@id": "https://danburgess.com/#person",
              "name": "Dan Burgess",
              "url": "https://danburgess.com/en/",
              "jobTitle": "Lead Web Developer & UI/UX Designer",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Fukuoka",
                "addressCountry": "JP"
              },
              "knowsLanguage": ["en", "ja"],
              "knowsAbout": [
                "Web Development",
                "UI/UX Design",
                "Localization"
              ],
              "sameAs": [
                "https://www.instagram.com/canuckinjapan/",
                "https://djb-archviz.blogspot.com"
              ]
            },
            {
              "@type": "WebSite",
              "@id": "https://danburgess.com/en/#website",
              "url": "https://danburgess.com/en/",
              "name": "Dan Burgess Design",
              "inLanguage": "en"
            }
          ]
        }
      : {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfessionalService",
              "@id": "https://danburgess.com/#service",
              "name": "ダン・バージェス デザイン",
              "url": "https://danburgess.com/",
              "inLanguage": "ja",
              "logo": "https://danburgess.com/src/assets/danface_manga.svg",
              "image": "https://danburgess.com/src/assets/danface_manga.svg",
              "description": "ダン・バージェス デザインは福岡を拠点とするWeb開発、UI/UXデザイン、ローカライズのスタジオです。海外・国内の成果に繋がる高品質なバイリンガルWebサイトを制作します。",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "福岡市",
                "addressRegion": "福岡県",
                "addressCountry": "JP"
              },
              "knowsAbout": [
                "Webデザイン",
                "UI/UXデザイン",
                "バイリンガルローカライズ",
                "Web開発",
                "情報設計"
              ],
              "founder": {
                "@id": "https://danburgess.com/#person"
              }
            },
            {
              "@type": "Person",
              "@id": "https://danburgess.com/#person",
              "name": "ダン・バージェス",
              "alternateName": "Dan Burgess",
              "url": "https://danburgess.com/",
              "jobTitle": "Lead Web Developer & UI/UX Designer",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "福岡市",
                "addressCountry": "JP"
              },
              "knowsLanguage": ["ja", "en"],
              "knowsAbout": [
                "Web開発",
                "UI/UXデザイン",
                "ローカライズ"
              ],
              "sameAs": [
                "https://www.instagram.com/canuckinjapan/",
                "https://djb-archviz.blogspot.com"
              ]
            },
            {
              "@type": "WebSite",
              "@id": "https://danburgess.com/#website",
              "url": "https://danburgess.com/",
              "name": "ダン・バージェス デザイン",
              "inLanguage": "ja"
            }
          ]
        };

    jsonLdScript.textContent = JSON.stringify(jsonLdData);
  }, [lang, location.pathname]);

  return null;
}
