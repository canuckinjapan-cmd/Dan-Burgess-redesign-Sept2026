import { useState, FormEvent, useRef } from "react";
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
    hp_field: "", // Honeypot
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (form.hp_field.trim()) {
      return;
    }

    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!form.name.trim()) {
      newErrors.name = t("Please enter your name.", "お名前を入力してください。");
    }

    if (!form.email.trim()) {
      newErrors.email = t("Please enter your email.", "メールアドレスを入力してください。");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        newErrors.email = t("Please enter a valid email address.", "有効なメールアドレスを入力してください。");
      }
    }

    if (!form.message.trim()) {
      newErrors.message = t("Please enter your message.", "メッセージを入力してください。");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        variant: "destructive",
        title: t("Validation error", "入力エラー"),
        description: t("Please check the highlighted fields below.", "赤字の入力項目をご確認ください。"),
      });

      if (newErrors.name && nameRef.current) {
        nameRef.current.focus();
      } else if (newErrors.email && emailRef.current) {
        emailRef.current.focus();
      } else if (newErrors.message && messageRef.current) {
        messageRef.current.focus();
      }
      return;
    }

    setErrors({});
    setSubmitting(true);
    const targetUrl = '/api/contact';

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
        hp_field: "",
      });
    } catch (error) {
      const err = error as Error;
      setSubmitting(false);
      toast({
        variant: "destructive",
        title: t("Error", "エラー"),
        description: err.message || t("Something went wrong. Please try again later.", "送信中にエラーが発生しました。時間をおいて再度お試しください。"),
      });
    }
  };

  const field = "w-full bg-white/40 border rule px-4 py-3 font-sans-body text-base placeholder:text-ink-placeholder focus:outline-none focus:border-accent-text focus:bg-white transition-all";
  const label = "block font-mono text-[12px] uppercase text-ink-muted mb-1.5 font-normal";

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate id="contact-custom-form">
      {/* Honeypot field (hidden from users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp_field">Website</label>
        <input
          id="hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.hp_field}
          onChange={(e) => setForm({ ...form, hp_field: e.target.value })}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
        <div>
          <label className={label} htmlFor="name">
            {t("Name *", "お名前 *")}
          </label>
          <input
            ref={nameRef}
            id="name"
            maxLength={100}
            className={`${field} ${errors.name ? "border-red-500 bg-red-50/20" : ""}`}
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            placeholder={t("Your full name", "姓名")}
            required
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-600 font-mono">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label className={label} htmlFor="email">
            {t("Email *", "メールアドレス *")}
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            maxLength={254}
            className={`${field} ${errors.email ? "border-red-500 bg-red-50/20" : ""}`}
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            placeholder="you@company.com"
            required
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-600 font-mono">
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <div>
        <label className={label} htmlFor="company">
          {t("Company / Organization", "会社・団体名")}
        </label>
        <input
          id="company"
          maxLength={100}
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
          ref={messageRef}
          id="message"
          rows={5}
          maxLength={2000}
          className={`${field} resize-none ${errors.message ? "border-red-500 bg-red-50/20" : ""}`}
          value={form.message}
          onChange={(e) => {
            setForm({ ...form, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: undefined });
          }}
          placeholder={t(
            "Share details about your question, opportunity, or goals.",
            "ご質問やお仕事のご相談など、お気軽にご記入ください。"
          )}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-600 font-mono">
            {errors.message}
          </p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="font-mono text-[12px] uppercase text-ink-muted">
          {t("Replies within 1–2 business days · JST", "1〜2営業日以内に返信いたします")}
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-3 bg-ink text-surface px-7 py-3.5 font-mono text-[12px] font-normal uppercase hover:bg-accent-text transition-colors disabled:opacity-60 whitespace-nowrap self-start sm:self-auto cursor-pointer"
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
