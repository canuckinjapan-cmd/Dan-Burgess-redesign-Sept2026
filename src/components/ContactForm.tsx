import { useState, useEffect, useRef, useCallback, FormEvent } from "react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

type FieldId = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldId, string>>;

interface TurnstileApi {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      theme?: "light" | "dark" | "auto";
      language?: string;
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    }
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const DEV_TEST_SITE_KEY = "1x00000000000000000000AA";

// Visible Required / Optional tag (必須 / 任意 in Japanese). Replaces the "*"
// asterisk, which screen readers announce as "star", and replaces the
// "任意" placeholder, which disappears as soon as the visitor types.
const Tag = ({ kind }: { kind: "required" | "optional" }) => {
  const { t } = useLanguage();
  return (
    <span
      className={`ml-2 inline-block align-middle border px-1.5 py-[3px] text-[10px] leading-none ${
        kind === "required"
          ? "border-accent-text text-accent-text"
          : "border-ink/30 text-ink-muted"
      }`}
    >
      {kind === "required" ? t("Required", "必須") : t("Optional", "任意")}
    </span>
  );
};

export const ContactForm = () => {
  const { lang, t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "",
  });

  const turnstileLang = lang === "JP" ? "ja" : "en";
  const siteKey =
    import.meta.env.VITE_TURNSTILE_SITE_KEY ||
    (import.meta.env.DEV ? DEV_TEST_SITE_KEY : "");

  const resetTurnstile = useCallback(() => {
    setTurnstileToken("");
    if (widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch {
        // Widget may have unmounted during navigation
      }
    }
  }, []);

  useEffect(() => {
    if (!siteKey) return;

    let cancelled = false;

    const mountWidget = () => {
      if (cancelled || !turnstileRef.current || !window.turnstile) return;
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Ignore cleanup errors if already removed
        }
        widgetIdRef.current = null;
      }
      setTurnstileToken("");
      setTurnstileError("");
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: siteKey,
        theme: "light",
        language: turnstileLang,
        callback: (token: string) => {
          if (cancelled) return;
          setTurnstileToken(token);
          setTurnstileError("");
        },
        "expired-callback": () => {
          if (cancelled) return;
          setTurnstileToken("");
          setTurnstileError(
            t(
              "Verification expired. Please complete the check again.",
              "認証の有効期限が切れました。もう一度確認を行ってください。"
            )
          );
        },
        "error-callback": () => {
          if (cancelled) return;
          setTurnstileToken("");
          setTurnstileError(
            t(
              "Verification could not be completed. Please try again.",
              "認証チェックを完了できませんでした。もう一度お試しください。"
            )
          );
        },
      });
    };

    if (window.turnstile) {
      mountWidget();
    } else {
      let script = document.querySelector<HTMLScriptElement>(
        `script[src="${TURNSTILE_SCRIPT_SRC}"]`
      );
      if (!script) {
        script = document.createElement("script");
        script.src = TURNSTILE_SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      const onLoad = () => mountWidget();
      const onError = () => {
        if (!cancelled) {
          setTurnstileError(
            t(
              "Failed to load verification check. Please refresh and try again.",
              "認証チェックの読み込みに失敗しました。ページを再読み込みして再度お試しください。"
            )
          );
        }
      };
      script.addEventListener("load", onLoad);
      script.addEventListener("error", onError);
      return () => {
        cancelled = true;
        script?.removeEventListener("load", onLoad);
        script?.removeEventListener("error", onError);
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // Ignore cleanup errors
          }
          widgetIdRef.current = null;
        }
      };
    }

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Ignore cleanup errors
        }
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, turnstileLang, t]);

  // Clear a field's error as soon as the visitor edits it.
  const clearError = (id: FieldId) =>
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });

  // Show an error under each bad field and move focus to the first one, so
  // keyboard and screen-reader users land where the fix is needed
  // (WCAG 3.3.1 / 3.3.3). Each field points at its message via aria-describedby.
  const flagErrors = (next: FieldErrors) => {
    setErrors(next);
    const first = (["name", "email", "message"] as FieldId[]).find((id) => next[id]);
    if (first) document.getElementById(first)?.focus();
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const found: FieldErrors = {};
    if (!form.name.trim()) {
      found.name = t("Please enter your name.", "お名前をご入力ください。");
    }
    if (!form.email.trim()) {
      found.email = t("Please enter your email address.", "メールアドレスをご入力ください。");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      found.email = t(
        "Please check the email address format, e.g. name@example.com.",
        "メールアドレスの形式をご確認ください（例：example@company.co.jp）。"
      );
    }
    if (!form.message.trim()) {
      found.message = t("Please enter a message.", "お問い合わせ内容をご入力ください。");
    }

    if (Object.keys(found).length > 0) {
      flagErrors(found);
      toast({
        variant: "destructive",
        title: t("Please check the form", "入力内容をご確認ください"),
        description: t("Some fields need your attention.", "ご確認が必要な項目があります。"),
      });
      return;
    }

    if (!turnstileToken) {
      setTurnstileError(
        t(
          "Please complete the verification check before sending.",
          "送信前に認証チェックを完了してください。"
        )
      );
      return;
    }

    setErrors({});
    setTurnstileError("");
    setSubmitting(true);
    const targetUrl = "/api/contact";

    // Don't leave the button stuck on "Sending…" if the network hangs.
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        message: form.message.trim(),
        website: form.website, // honeypot, must stay empty
        turnstileToken,
      };

      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as {
          field?: string;
          message?: string;
        } | null;
        if (errorBody?.field === "turnstile") {
          setTurnstileError(
            t(
              "Verification failed. Please complete the check again.",
              "認証チェックに失敗しました。もう一度お試しください。"
            )
          );
        }
        throw new Error(`HTTP ${response.status}`);
      }

      toast({
        title: t("Message sent", "メッセージを送信しました"),
        description: t(
          "Thanks! I'll reply within 1–2 business days (JST).",
          "ありがとうございます。1〜2営業日以内に返信いたします。"
        ),
      });
      setForm({
        name: "",
        email: "",
        company: "",
        message: "",
        website: "",
      });
    } catch (error) {
      const err = error as Error;
      console.error("Contact form error:", err);

      toast({
        variant: "destructive",
        title: t("Error", "エラー"),
        description: t(
          "Something went wrong. Please try again later.",
          "送信中にエラーが発生しました。時間をおいて再度お試しください。"
        ),
      });
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
      resetTurnstile();
    }
  };

  const field =
    "contact-input w-full bg-white/40 border rule px-4 py-3 font-sans-body text-base placeholder:text-ink-placeholder aria-invalid:border-red-700";
  const errorText = "fade-in-fast mt-1.5 text-[13px] leading-snug text-red-700";
  const label = "block font-mono text-[12px] uppercase text-ink-muted mb-1.5 font-normal";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate id="contact-custom-form">
      <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label className={label} htmlFor="name">
            {t("Name", "お名前")}
            <Tag kind="required" />
          </label>
          <input
            id="name"
            className={field}
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              clearError("name");
            }}
            placeholder={t("Your full name", "例：山田 太郎")}
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            autoComplete="name"
          />
          {errors.name && <p id="name-error" className={errorText}>{errors.name}</p>}
        </div>

        <div>
          <label className={label} htmlFor="email">
            {t("Email", "メールアドレス")}
            <Tag kind="required" />
          </label>
          <input
            id="email"
            type="email"
            className={field}
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              clearError("email");
            }}
            placeholder={t("you@company.com", "例：example@company.co.jp")}
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            autoComplete="email"
          />
          {errors.email && <p id="email-error" className={errorText}>{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className={label} htmlFor="company">
          {t("Company / Organization", "会社・団体名")}
          <Tag kind="optional" />
        </label>
        <input
          id="company"
          className={field}
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder={t("e.g. Acme Inc.", "例：株式会社〇〇")}
          autoComplete="organization"
        />
      </div>

      <div>
        <label className={label} htmlFor="message">
          {t("Message", "お問い合わせ内容")}
          <Tag kind="required" />
        </label>
        <textarea
          id="message"
          rows={4}
          className={`${field} resize-none`}
          value={form.message}
          onChange={(e) => {
            setForm({ ...form, message: e.target.value });
            clearError("message");
          }}
          placeholder={t(
            "Please tell me a little about your enquiry or opportunity.",
            "お問い合わせ内容をご記入ください。"
          )}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && <p id="message-error" className={errorText}>{errors.message}</p>}
      </div>

      {/* Cloudflare Turnstile widget (Managed mode, light theme) */}
      <div className="space-y-1.5">
        <div
          ref={turnstileRef}
          data-theme="light"
          data-language={turnstileLang}
          className="min-h-[65px]"
        />
        <p
          role="status"
          aria-live="polite"
          className={turnstileError ? errorText : "sr-only"}
        >
          {turnstileError}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="font-mono text-[12px] uppercase text-ink-muted">
          {t("Replies within 1–2 business days · JST", "通常1〜2営業日以内に返信いたします。")}
        </p>
        <button
          type="submit"
          disabled={submitting || !turnstileToken}
          className="group inline-flex items-center justify-center gap-3 bg-ink text-surface px-7 py-3.5 font-mono text-[12px] font-normal uppercase hover:bg-accent-text transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          {submitting ? t("Sending…", "送信中…") : t("Send Message", "送信する")}
          <span className="text-[20px] transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </button>
      </div>

      {/* Honeypot: positioned off-screen & clipped, excluded from tab order and assistive tech. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
        }}
      >
        <label htmlFor="website" aria-hidden="true">
          Website
        </label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />
      </div>
    </form>
  );
};
