import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "@/context/LanguageContext";
import manga from "@/assets/danface_manga.svg";
import instagramLogo from "@/assets/Instagram-Logo.png";
import bloggerLogo from "@/assets/Blogger-Logo.png";

const navItems = [
  { label: "Work", jpLabel: "制作事例", href: "#work" },
  { label: "About", jpLabel: "私について", href: "#about" },
  { label: "Services", jpLabel: "サービス", href: "#services" },
  { label: "Contact", jpLabel: "お問い合わせ", href: "#contact" },
];

export const TopBar = () => {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Determine if scrolled all the way to the bottom with a 15px margin
      setIsAtBottom(windowHeight + scrollY >= documentHeight - 15);
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const renderLangSwitcher = (extraClass = "") => (
    <div className={`flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest border rule rounded-sm px-1 py-0.5 ${extraClass}`}>
      <Link
        to="/en/"
        onClick={() => setLang("EN")}
        className={`px-1.5 py-0.5 transition-colors ${lang === "EN" ? "bg-accent-brand text-surface font-semibold" : "text-ink-muted hover:text-ink"}`}
        aria-label="Switch to English"
      >
        EN
      </Link>
      <Link
        to="/"
        onClick={() => setLang("JP")}
        className={`px-1.5 py-0.5 transition-colors ${lang === "JP" ? "bg-accent-brand text-surface font-semibold" : "text-ink-muted hover:text-ink"}`}
        aria-label="日本語へ切り替え"
      >
        JP
      </Link>
    </div>
  );

  return (
    <div className="h-16 w-full relative">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isMenuOpen
            ? "bg-surface border-b rule"
            : scrolled
            ? "bg-surface/95 backdrop-blur-md border-b rule"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-4 md:px-6 lg:px-10 h-16 flex items-center justify-between gap-3 md:gap-6">
        {/* Logo Left: Face only on sm+, Text always */}
        <a 
          href="#top" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 group shrink-0 relative h-10" 
          aria-label="Dan Burgess Design home"
        >
          <span className="relative hidden sm:inline-block">
            <span className="absolute -inset-1 rounded-full border border-ink/20 animate-spin-slow" aria-hidden />
            <img
              src={manga}
              alt=""
              className="relative w-11 h-11 rounded-full bg-white object-cover"
              style={{ imageRendering: "-webkit-optimize-contrast", transform: "translateZ(0)" }}
              loading="eager"
            />
          </span>
          <span className="font-serif-display font-extrabold tracking-tight text-[22px] sm:text-2xl">
            <span className="text-black">DAN</span>
            <span className="text-accent-brand">BURGESS</span>
            <span className="text-black">DESIGN</span>
          </span>
          {/* Tooltip Balloon - persistent when at bottom, interactive on hover otherwise */}
          <div 
            className={`absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] transition-all duration-200 pointer-events-none z-30 ${
              isAtBottom 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
            }`}
          >
            <div className="relative bg-ink text-surface text-[9px] font-mono uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-2xl">
              {t("Return to top", "トップへ戻る")}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-ink rotate-45" />
            </div>
          </div>
        </a>

        {/* Desktop/Tablet Landscape Center: Nav */}
        <nav className="hidden md:landscape:flex lg:portrait:hidden flex-1 items-center justify-center gap-6 xl:gap-8 font-mono text-[10px] lg:text-[11px] uppercase tracking-[0.14em] lg:tracking-[0.18em]">
          {navItems.map((n) => (
            <a key={n.label} href={n.href} className="px-1.5 py-1 text-ink-muted hover:text-white hover:bg-accent-brand rounded-sm transition-all whitespace-nowrap">
              {t(n.label, n.jpLabel)}
            </a>
          ))}
        </nav>

        {/* Right Side Tools */}
        <div className="flex items-center gap-1 md:gap-1.5 shrink-0">
          {/* Lang Switcher - Visible right for mobile/tablet, and within desktop tools */}
          {renderLangSwitcher("flex ml-1.5 sm:ml-6 md:ml-8 lg:ml-10")}
          
          {/* Desktop/Tablet Landscape Tools */}
          <div className="hidden xl:flex items-center ml-2.5 lg:ml-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-ink text-surface px-3 py-1.5 landscape:px-3 landscape:py-1.5 lg:px-4 lg:py-2 font-mono text-[10px] lg:text-[11px] uppercase tracking-widest hover:bg-accent-brand transition-colors"
            >
              {t("Start a Project", "プロジェクト相談")} <span aria-hidden>→</span>
            </a>
          </div>

          {/* Mobile Right: Hamburger (Visible on lg:hidden, hidden on tablet/desktop landscape) */}
          <div className="relative md:landscape:hidden lg:hidden lg:portrait:flex mr-1 sm:mr-3 h-10 flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-ink hover:text-accent-brand transition-colors flex items-center justify-center relative z-10"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Bottom-reached Navigation Menu Overlay */}
            <AnimatePresence>
              {isAtBottom && !isMenuOpen && (
                <motion.div
                  key="nav-menu-overlay"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsMenuOpen(true)}
                  className="absolute right-0 top-[calc(100%+8px)] bg-surface text-ink border border-ink shadow-2xl rounded-sm py-1.5 px-3 font-mono text-[9px] uppercase tracking-[0.12em] whitespace-nowrap z-30 cursor-pointer hover:bg-accent-brand hover:text-white hover:border-accent-brand transition-all flex items-center group"
                >
                  {t("Navigation Menu", "ナビメニュー")}
                  {/* Hollow/Open border-matching triangle at the top pointing up */}
                  <div className="absolute -top-1 right-4 w-2 h-2 bg-surface border-t border-l border-ink rotate-45 group-hover:bg-accent-brand group-hover:border-accent-brand transition-all" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 top-16 z-40 bg-surface md:landscape:hidden lg:hidden lg:portrait:block border-t rule shadow-2xl overflow-y-auto"
          >
            <div className="bg-paper absolute inset-0 -z-10" /> {/* Solid texture background */}
            <nav className="flex flex-col p-8 gap-8 landscape:p-6 landscape:gap-3">
              {navItems.map((n, i) => (
                <motion.a
                  key={n.label}
                  href={n.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  className="font-serif-display text-4xl landscape:text-lg font-bold tracking-tight text-ink hover:text-accent-brand transition-colors"
                >
                  {t(n.label, n.jpLabel)}
                </motion.a>
              ))}
            </nav>
            <div className="absolute bottom-10 landscape:bottom-3 left-8 right-8 landscape:left-6 landscape:right-6 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              <div className="flex items-center gap-4">
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
              </div>
              <span>© {new Date().getFullYear()} Dan Burgess Design</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  </div>
  );
};
