import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import headshot from "@/assets/DJB-headshot01.jpg";
import manga from "@/assets/danface_manga.svg";

export const PortraitPlate = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<"photo" | "manga">("photo");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setPhase("photo");
            setIsVisible(true);
            setCycle((c) => c + 1);
          } else {
            // Scrolled out: reset to photo instantly for next entrance
            setPhase("photo");
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    // Only start the blend timer if the component is currently in view
    const t = window.setTimeout(() => setPhase("manga"), 2500);
    return () => window.clearTimeout(t);
  }, [cycle, isVisible]);

  return (
    <div ref={ref} className="relative aspect-square bg-surface-soft overflow-hidden">
      <div
        className="absolute inset-6 border border-dashed border-ink/15 rounded-full animate-spin-slow"
        aria-hidden
      />
      
      {/* Photo Portrait */}
      <motion.img
        initial={false}
        animate={{ opacity: phase === "photo" ? 1 : 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        src={headshot}
        alt="Photo portrait of Dan Burgess"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      {/* Manga Avatar */}
      <motion.img
        initial={false}
        animate={{ opacity: phase === "manga" ? 1 : 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        src={manga}
        alt="Manga-style self portrait of Dan Burgess"
        className="absolute inset-0 w-full h-full object-contain p-6"
        style={{ 
          imageRendering: "-webkit-optimize-contrast",
          transform: "translateZ(0)"
        }}
        loading="eager"
      />
      
      <span
        className="absolute bottom-4 right-4 size-3 bg-accent-brand rotate-45 border-2 border-surface-elevated z-10"
        aria-hidden
      />
    </div>
  );
};

