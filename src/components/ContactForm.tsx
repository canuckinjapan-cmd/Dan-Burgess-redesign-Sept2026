import { useState, FormEvent } from "react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

export const ContactForm = () => {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: t("Missing details", "入力漏れがあります"),
        description: t("Please fill in your name, email, and message.", "お名前、メールアドレス、メッセージをご入力ください。"),
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      toast({
        variant: "destructive",
        title: t("Invalid email", "無効なメールアドレス"),
        description: t("Please enter a valid email address.", "有効なメールアドレスを入力してください。")
      });
      return;
    }

    setSubmitting(true);
    const envBase = import.meta.env.VITE_API_BASE_URL;
    const appUrl = import.meta.env.VITE_APP_URL;
    const localStored = localStorage.getItem('AIS_API_URL');
    const windowBase = (window as Window & { API_BASE_URL?: string }).API_BASE_URL;
    const currentOrigin = window.location.origin;
    const aisFallback = "https://ais-pre-r6az2fezg2siatxq2zvtqq-343348950519.asia-east1.run.app";
    
    let apiBase = (envBase || windowBase || localStored || "").trim().replace(/\/+$/, "");
    
    if (!apiBase) {
      if (window.location.hostname.includes("run.app") || window.location.hostname === "localhost") {
        apiBase = currentOrigin;
      } else {
        apiBase = (appUrl || aisFallback).trim().replace(/\/+$/, "");
      }
    }
    
    const targetUrl = '/api/contact';
    console.log(`Contact form: Submitting to ${targetUrl} (Base: ${apiBase})`);

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        message: form.message.trim(),
      };

      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Server error: " + response.status);
      }

      setSubmitting(false);
      toast({
        title: t("Message sent", "メッセージを送信しました"),
        description: t("Thanks! Dan will reply within 1–2 business days (JST).", "ありがとうございます。1〜2営業日以内に返信いたします。"),
      });
      setForm({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (error) {
      const err = error as Error;
      console.error("Contact form error:", err);
      setSubmitting(false);
      
      toast({
        variant: "destructive",
        title: t("Error", "エラー"),
        description: err.message || t("Something went wrong. Please try again later.", "送信中にエラーが発生しました。時間をおいて再度お試しください。"),
      });
    }
  };

  const field = "w-full bg-white/40 border rule px-4 py-3 font-sans-body text-base placeholder:text-ink-subtle focus:outline-none focus:border-accent-brand focus:bg-white transition-all";
  const label = "block font-mono text-[12px] uppercase text-ink-muted mb-1.5 font-normal";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate id="contact-custom-form">
      <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label className={label} htmlFor="name">
            {t("Name *", "お名前 *")}
          </label>
          <input
            id="name"
            className={field}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={t("Your full name", "姓名")}
            required
            autoComplete="name"
          />
        </div>

        <div>
          <label className={label} htmlFor="email">
            {t("Email *", "メールアドレス *")}
          </label>
          <input
            id="email"
            type="email"
            className={field}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="company">
          {t("Company / Organization", "会社・団体名")}
        </label>
        <input
          id="company"
          className={field}
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder={t("Optional", "任意")}
          autoComplete="organization"
        />
      </div>

      <div>
        <label className={label} htmlFor="message">
          {t("Message *", "メッセージ *")}
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${field} resize-none`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={t(
            "Share details about your question, opportunity, or goals.",
            "ご質問やお仕事のご相談など、お気軽にご記入ください。"
          )}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="font-mono text-[12px] uppercase text-ink-muted">
          {t("Replies within 1–2 business days · JST", "1〜2営業日以内に返信いたします")}
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-3 bg-ink text-surface px-7 py-3.5 font-mono text-[12px] font-normal uppercase hover:bg-accent-brand transition-colors disabled:opacity-60 whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          {submitting ? t("Sending…", "送信中…") : t("Send Message", "送信する")}
          <span className="text-[20px] transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </button>
      </div>
    </form>
  );
};
