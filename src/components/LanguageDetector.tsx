import { useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AUTO_DONE_KEY = "lang_auto_redirect_done";
const BOT_RE = /bot|crawl|spider|slurp|lighthouse|headless|preview|facebookexternalhit|embedly/i;

/**
 * The URL is the source of truth: /en/ is English, / is Japanese.
 *
 * The only automatic redirect is a one-time hop from the bare root to /en/ for a
 * first-time visitor whose browser does not list Japanese. It never fires for
 * crawlers, never fires again after that first visit, and never moves anyone
 * away from a URL they opened on purpose (shared links, /en/, bookmarks).
 * Language is otherwise changed only by the switcher.
 */
export function LanguageDetector({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname.replace(/\/+$/, "") || "/";
    if (currentPath !== "/") return;

    try {
      if (localStorage.getItem(AUTO_DONE_KEY)) return;
      localStorage.setItem(AUTO_DONE_KEY, "1");
    } catch {
      return; // storage blocked: do nothing rather than risk a redirect loop
    }

    if (navigator.webdriver || BOT_RE.test(navigator.userAgent)) return;

    const langs = navigator.languages?.length ? navigator.languages : [navigator.language || "en"];
    const prefersJa = langs.some((l) => l.toLowerCase().startsWith("ja"));
    if (!prefersJa) navigate("/en/", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
