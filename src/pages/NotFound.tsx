import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TopBar } from "@/components/TopBar";
import { useLanguage } from "@/context/LanguageContext";
import manga from "@/assets/danface_manga.svg";
import instagramLogo from "@/assets/Instagram-Logo.png";
import bloggerLogo from "@/assets/Blogger-Logo.png";

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];

    const updateSize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      
      const newColumns = Math.floor(width / 20);
      if (newColumns !== columns) {
        const newDrops: number[] = [];
        for (let i = 0; i < newColumns; i++) {
          newDrops[i] = drops[i] !== undefined ? drops[i] : Math.floor(Math.random() * (height / 20));
        }
        drops = newDrops;
        columns = newColumns;
      }
    };

    updateSize();

    // EN/JP characters for bilingual theme
    const charList = "01ABCDEFGHIJKLMNOPQRSTUVWXYZダンバージェスデザイン".split("");

    const draw = () => {
      if (!ctx || width === 0 || height === 0) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // Black background with trail effect
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#FF6A1F"; // accent-brand orange
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = charList[Math.floor(Math.random() * charList.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 42); // Approx 20% slower than 33ms

    const handleResize = () => {
      updateSize();
    };

    // Ensure we get correct dimensions after layout
    const layoutTimer = setTimeout(updateSize, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      clearTimeout(layoutTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-paper text-ink font-sans-body relative w-full overflow-x-hidden">
      <div className="relative z-[101] bg-paper">
        <TopBar />
      </div>

      <main className="flex-grow flex flex-col items-center justify-center relative z-[101] overflow-hidden px-6 text-center bg-black min-h-[60vh]">
        <MatrixRain />
        
        <div className="relative z-10 p-12 bg-black/40 backdrop-blur-sm rounded-xl border border-white/5 shadow-2xl">
          <h1 className="font-serif-display text-8xl lg:text-9xl font-bold text-accent-brand mb-4 drop-shadow-lg">404</h1>
          
          <div className="space-y-4 mb-8">
            <h2 className="text-2xl lg:text-3xl font-serif-display font-bold text-white">
              {t("Page Not Found", "ページが見つかりません")}
            </h2>
            <p className="text-white/60 font-mono text-sm uppercase tracking-widest animate-pulse">
              {t("Redirecting you home in 5 seconds...", "5秒後にホームへリダイレクトします...")}
            </p>
          </div>

          <Link 
            to="/" 
            className="inline-flex items-center gap-3 bg-accent-brand text-white px-10 py-5 font-mono text-[12px] uppercase tracking-[0.25em] hover:bg-white hover:text-ink transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(255,106,31,0.5)]"
          >
            {t("Return to Home", "ホームへ戻る")}
            <span className="text-[24px]" aria-hidden>→</span>
          </Link>
        </div>
      </main>

      <footer className="relative z-[101] border-t rule bg-paper">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          <div className="flex items-center gap-3">
            <img
              src={manga}
              alt=""
              className="w-7 h-7 rounded-full bg-white transition-transform hover:scale-110"
              style={{ imageRendering: "-webkit-optimize-contrast", transform: "translateZ(0)" }}
              loading="lazy"
            />
            <span>© {currentYear} Dan Burgess Design</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link to="/#work" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("Work", "制作事例")}</Link>
            <Link to="/#about" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("About", "私について")}</Link>
            <Link to="/#services" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("Services", "サービス")}</Link>
            <Link to="/#contact" className="px-2 py-1 hover:text-white hover:bg-accent-brand rounded-sm transition-all">{t("Contact", "お問い合わせ")}</Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-ink-muted">{t("MY SOCIALS →", "自分のSNS→")}</span>
            
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
              
              {/* Tooltip Balloon */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+12px)] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-y-1 group-hover:translate-y-0">
                <div className="relative bg-ink text-surface text-[9px] font-mono uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-2xl">
                  {t("SOME NATURE PHOTOS", "自作自然の写真")}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-ink rotate-45" />
                </div>
              </div>
            </div>

            {/* Blogspot */}
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
              
              {/* Tooltip Balloon */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+12px)] opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-y-1 group-hover:translate-y-0">
                <div className="relative bg-ink text-surface text-[9px] font-mono uppercase tracking-[0.1em] px-2.5 py-1.5 rounded-sm whitespace-nowrap shadow-2xl">
                  {t("3D CG MADE BY ME", "自作の3DCG作例")}
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

export default NotFound;
