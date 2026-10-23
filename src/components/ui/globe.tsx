"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { createCustomGlobe, GlobeOptions, GlobeInstance } from "./globe-engine";

// Markers matching requested destinations with size 0.015:
const HERO_MARKERS: NonNullable<GlobeOptions["markers"]> = [
  // Fukuoka, Japan
  {
    location: [33.5904, 130.4017],
    size: 0.015,
    color: [251 / 255, 100 / 255, 21 / 255],
  },
  // Vancouver, Canada
  {
    location: [49.2827, -123.1207],
    size: 0.015,
    color: [251 / 255, 100 / 255, 21 / 255],
  },
  // Los Angeles, USA
  {
    location: [34.0522, -118.2437],
    size: 0.015,
    color: [251 / 255, 100 / 255, 21 / 255],
  },
  // Manila, Philippines
  {
    location: [14.5995, 120.9842],
    size: 0.015,
    color: [251 / 255, 100 / 255, 21 / 255],
  },
  // Darwin, Australia
  {
    location: [-12.4634, 130.8456],
    size: 0.015,
    color: [251 / 255, 100 / 255, 21 / 255],
  },
  // Colombo, Sri Lanka
  {
    location: [6.9271, 79.8612],
    size: 0.015,
    color: [251 / 255, 100 / 255, 21 / 255],
  },
  // Khartoum, Sudan
  {
    location: [15.5007, 32.5599],
    size: 0.015,
    color: [251 / 255, 100 / 255, 21 / 255],
  },
  // London, England
  {
    location: [51.5074, -0.1278],
    size: 0.015,
    color: [251 / 255, 100 / 255, 21 / 255],
  },
];

interface GlobeProps {
  className?: string;
  config?: Partial<GlobeOptions>;
  speed?: number;
  initialPhi?: number;
  /** User-controlled pause (WCAG 2.2.2). Reduced-motion, off-screen and background-tab pauses are automatic. */
  paused?: boolean;
}

export const Globe = React.memo(function Globe({
  className,
  config,
  speed = 0.0022,
  // phi = 0.65 radians (~37°) positions Japan on the left side of the visible globe
  initialPhi = 0.65,
  paused = false,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef(false);
  const lastPointerX = useRef(0);
  const phiRef = useRef(initialPhi);
  const globeRef = useRef<GlobeInstance | null>(null);
  const pausedRef = useRef(paused);
  const syncRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    phiRef.current = initialPhi;
    const theta = config?.theta ?? 0.28;
    let width = container.offsetWidth || 600;
    let animFrameId = 0;
    let isDestroyed = false;

    const markers = config?.markers ?? HERO_MARKERS;

    const globe = createCustomGlobe(canvas, {
      width: width * 2,
      height: width * 2,
      devicePixelRatio: Math.min(window.devicePixelRatio || 2, 2),
      phi: phiRef.current,
      theta,
      dark: 0,
      diffuse: 0.45,
      mapSamples: 16000,
      mapBrightness: 1.2,
      mapBaseBrightness: 0.0,
      baseColor: [0.84, 0.84, 0.84],
      glowColor: [0.68, 0.68, 0.68],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      markers,
      markerElevation: 0,
      scale: 1,
      offset: [0, 0],
      ...config,
    });
    globeRef.current = globe;

    requestAnimationFrame(() => {
      if (canvas && !isDestroyed) {
        canvas.style.opacity = "1";
      }
    });

    // Rotation runs only while it is visible, the tab is active, motion is not
    // reduced and the user has not paused it. Otherwise draw one still frame.
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    let tabVisible = !document.hidden;

    const shouldAnimate = () =>
      !isDestroyed && !pausedRef.current && !reduceMq.matches && inView && tabVisible;

    const frame = () => {
      animFrameId = 0;
      if (!shouldAnimate()) return;
      if (!pointerInteracting.current) {
        phiRef.current += speed;
      }
      globe.update({ phi: phiRef.current });
      animFrameId = requestAnimationFrame(frame);
    };

    const sync = () => {
      if (isDestroyed) return;
      if (shouldAnimate()) {
        if (!animFrameId) animFrameId = requestAnimationFrame(frame);
      } else {
        if (animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = 0;
        }
        if (inView && tabVisible) globe.update({ phi: phiRef.current });
      }
    };
    syncRef.current = sync;

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver((entries) => {
            inView = entries[entries.length - 1]?.isIntersecting ?? true;
            sync();
          })
        : null;
    io?.observe(container);

    const onVisibility = () => {
      tabVisible = !document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);
    reduceMq.addEventListener("change", sync);

    sync();

    const onResize = () => {
      if (!container || !canvas || isDestroyed) return;
      const newWidth = container.offsetWidth;
      if (newWidth && newWidth !== width) {
        width = newWidth;
        globe.update({
          width: width * 2,
          height: width * 2,
        });
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      isDestroyed = true;
      globeRef.current = null;
      syncRef.current = () => {};
      if (animFrameId) cancelAnimationFrame(animFrameId);
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMq.removeEventListener("change", sync);
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [config, speed, initialPhi]);

  useEffect(() => {
    pausedRef.current = paused;
    syncRef.current();
  }, [paused]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = true;
    lastPointerX.current = e.clientX;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!pointerInteracting.current) return;
    const deltaX = e.clientX - lastPointerX.current;
    phiRef.current += deltaX * 0.005;
    lastPointerX.current = e.clientX;
    globeRef.current?.update({ phi: phiRef.current });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointerInteracting.current = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab";
    }
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("relative w-full aspect-square flex items-center justify-center", className)}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full h-full opacity-0 transition-opacity duration-700 select-none cursor-grab active:cursor-grabbing"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
});
