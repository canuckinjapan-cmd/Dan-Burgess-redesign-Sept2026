import { useState, FormEvent } from "react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown } from "lucide-react";

export const ContactForm = () => {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    projectType: "",
    timeline: "",
    message: "",
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: t("Missing details", "入力漏れがあります"),
        description: t("Please add your name, email, and a short brief.", "お名前、メールアドレス、プロジェクトの概要をご入力ください。"),
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
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
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(form),
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
        budget: "",
        projectType: "",
        timeline: "",
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

  const field = "w-full bg-white/40 border rule px-4 py-2.5 font-sans-body text-base placeholder:text-ink-subtle focus:outline-none focus:border-accent-brand transition-all";
  const label = "block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-1";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate id="contact-custom-form">
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
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

        <div>
          <label className={label} htmlFor="company">
            {t("Company / Org", "企業・団体名")}
          </label>
          <input
            id="company"
            className={field}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder={t("Optional", "任意")}
          />
        </div>

        <div>
          <label className={label} htmlFor="budget">
            {t("Budget Range", "ご予算")}
          </label>
          <div className="relative">
            <select
              id="budget"
              className={`${field} appearance-none cursor-pointer pr-10`}
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
            >
              <option value="">{t("Select a range", "選択してください")}</option>
              <option value="Under ¥250k">{t("Under ¥250k", "25万円未満")}</option>
              <option value="¥250k – ¥500k">¥250k – ¥500k</option>
              <option value="¥500k – ¥1M">¥500k – ¥1M</option>
              <option value="¥1M+">¥1M+</option>
              <option value="Not sure yet">{t("Not sure yet", "未定")}</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" size={16} />
          </div>
        </div>

        <div>
          <label className={label} htmlFor="projectType">
            {t("Project Type", "プロジェクトの種類")}
          </label>
          <div className="relative">
            <select
              id="projectType"
              className={`${field} appearance-none cursor-pointer pr-10`}
              value={form.projectType}
              onChange={(e) => setForm({ ...form, projectType: e.target.value })}
            >
              <option value="">{t("Select a type", "選択してください")}</option>
              <option value="New Website">{t("New Website", "新しいウェブサイト")}</option>
              <option value="Website Redesign">{t("Website Redesign", "ウェブサイトのリニューアル")}</option>
              <option value="Bilingual Website">{t("Bilingual Website", "日・英ウェブサイト")}</option>
              <option value="Localization / Translation">{t("Localization / Translation", "ローカライズ／翻訳")}</option>
              <option value="UI / Product Design">{t("UI / Product Design", "UI・プロダクトデザイン")}</option>
              <option value="Not Sure Yet">{t("Not Sure Yet", "まだ決めていない")}</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" size={16} />
          </div>
        </div>

        <div>
          <label className={label} htmlFor="timeline">
            {t("Timeline", "希望時期")}
          </label>
          <div className="relative">
            <select
              id="timeline"
              className={`${field} appearance-none cursor-pointer pr-10`}
              value={form.timeline}
              onChange={(e) => setForm({ ...form, timeline: e.target.value })}
            >
              <option value="">{t("Select timeline", "選択してください")}</option>
              <option value="ASAP">{t("ASAP", "できるだけ早く")}</option>
              <option value="Within 1 Month">{t("Within 1 Month", "1か月以内")}</option>
              <option value="1–3 Months">{t("1–3 Months", "1〜3か月")}</option>
              <option value="3–6 Months">{t("3–6 Months", "3〜6か月")}</option>
              <option value="Flexible">{t("Flexible", "未定")}</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="message">
          {t("Project Brief *", "プロジェクト概要 *")}
        </label>
        <textarea
          id="message"
          rows={4}
          className={`${field} resize-none`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={t(
            "Briefly describe your project, target audience, goals, and desired launch timeframe.",
            "プロジェクトの内容、ターゲット、目的、ご希望の公開時期をご記入ください。"
          )}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
          {t("Replies within 1–2 business days · JST", "1〜2営業日以内に返信いたします")}
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-3 bg-ink text-surface px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-accent-brand transition-colors disabled:opacity-60"
        >
          {submitting ? t("Sending…", "送信中…") : t("Send Brief", "概要を送信する")}
          <span className="text-[22px]" aria-hidden>
            →
          </span>
        </button>
      </div>
    </form>
  );
};
