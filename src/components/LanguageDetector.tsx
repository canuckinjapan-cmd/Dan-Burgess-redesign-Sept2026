import { useEffect, useState, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function LanguageDetector({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Only perform initial browser language detection redirect on root or en home route
    const currentPath = location.pathname.replace(/\/+$/, "") || "/";
    const isEnPath = currentPath === "/en";

    // 1. Check stored user preference first
    const storedPref = localStorage.getItem("user_lang_preference") || localStorage.getItem("site-lang");

    let targetLang: "ja" | "en" = "ja";

    if (storedPref === "en" || storedPref === "EN") {
      targetLang = "en";
    } else if (storedPref === "ja" || storedPref === "JP") {
      targetLang = "ja";
    } else {
      // 2. Fall back to navigator.languages / navigator.language
      const userLangs = navigator.languages || [navigator.language || "en"];
      const prefersJa = userLangs.some((l) => l.toLowerCase().startsWith("ja"));
      targetLang = prefersJa ? "ja" : "en";
      
      // Save initial preference so subsequent visits respect it
      localStorage.setItem("user_lang_preference", targetLang);
    }

    // 3. Tiny splash loader delay (100–150ms maximum) before redirection or serving
    const timer = setTimeout(() => {
      if (targetLang === "en" && !isEnPath) {
        navigate("/en/", { replace: true });
      } else if (targetLang === "ja" && isEnPath) {
        navigate("/", { replace: true });
      }
      setChecking(false);
    }, 120);

    return () => clearTimeout(timer);
  }, [location.pathname, navigate]);

  if (checking) {
    return (
      <div 
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F7F3EC] text-[#1A1A1A] transition-opacity duration-150"
        aria-label="Loading page"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-7 h-7 rounded-full border-2 border-[#1A1A1A]/20 border-t-[#FF6A1F] animate-spin" />
          <span className="font-serif-display font-extrabold tracking-tight text-xl">
            DAN <span className="text-[#FF6A1F]">BURGESS</span> DESIGN
          </span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#1A1A1A]/60">
          Loading...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
