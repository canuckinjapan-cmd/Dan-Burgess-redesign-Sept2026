import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Language = "EN" | "JP";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: <T>(en: T, jp: T) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isEnPath = location.pathname.startsWith("/en");
  const lang: Language = isEnPath ? "EN" : "JP";

  useEffect(() => {
    const langCode = lang === "JP" ? "ja" : "en";
    document.documentElement.lang = langCode;
    localStorage.setItem("user_lang_preference", langCode);
    localStorage.setItem("site-lang", lang);
  }, [lang]);

  const setLang = (newLang: Language) => {
    const targetCode = newLang === "JP" ? "ja" : "en";
    localStorage.setItem("user_lang_preference", targetCode);
    localStorage.setItem("site-lang", newLang);

    if (newLang === "EN" && !isEnPath) {
      navigate("/en/", { replace: false });
    } else if (newLang === "JP" && isEnPath) {
      navigate("/", { replace: false });
    }
  };

  const t = <T,>(en: T, jp: T): T => (lang === "EN" ? en : jp);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
