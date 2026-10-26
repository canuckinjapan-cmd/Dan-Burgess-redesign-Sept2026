import { useState, FormEvent } from "react";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

type FieldId = "name" | "email" | "message";

export const ContactForm = () => {
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [invalid, setInvalid] = useState<FieldId[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    hp_field: "",
  });

  // Clear a field's error state as soon as the visitor edits it.
  const clearInvalid = (id: FieldId) =>
    setInvalid((prev) => prev.filter((f) => f !== id));

  // Move focus to the first field with a problem so keyboard and screen-reader
  // users land where the fix is needed (WCAG 3.3.1 / 3.3.3).
  const flagInvalid = (ids: FieldId[]) => {
    setInvalid(ids);
    document.getElementById(ids[0])?.focus();
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const missing: FieldId[] = [];
    if (!form.name.trim()) missing.push("name");
    if (!form.email.trim()) missing.push("email");
    if (!form.message.trim()) missing.push("message");

    if (missing.length > 0) {
      flagInvalid(missing);
      toast({
        title: t("Missing details", "入力漏れがあります"),
        description: t("Please fill in your name, email, and message.", "お名前、メールアドレス、メッセージをご入力ください。"),
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      flagInvalid(["email"]);
      toast({
        variant: "destructive",
        title: t("Invalid email", "無効なメールアドレス"),
        description: t("Please enter a valid email address.", "有効なメールアドレスを入力してください。")
      });
      return;
    }

    setInvalid([]);
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
        hp_field: form.hp_field, // honeypot, must stay empty
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
        throw new Error(`HTTP ${response.status}`);
      }

      toast({
        title: t("Message sent", "メッセージを送信しました"),
        description: t("Thanks! I'll reply within 1–2 business days (JST).", "ありがとうございます。1〜2営業日以内に返信いたします。"),
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
      console.error("Contact form error:", err);

      toast({
        variant: "destructive",
        title: t("Error", "エラー"),
        description: t("Something went wrong. Please try again later.", "送信中にエラーが発生しました。時間をおいて再度お試しください。"),
      });
    } finally {
      window.clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };

  const field =
    "w-full bg-white/40 border rule px-4 py-3 font-sans-body text-base placeholder:text-ink-placeholder focus:outline-none focus:border-accent-text focus:bg-white transition-all aria-invalid:border-red-700";
  const label = "block font-mono text-[12px] uppercase text-ink-muted mb-1.5 font-normal";

  // Visible Required / Optional tag (必須 / 任意 in Japanese). Replaces the "*"
  // asterisk, which screen readers announce as "star", and replaces the
  // "任意" placeholder, which disappears as soon as the visitor types.
  const Tag = ({ kind }: { kind: "required" | "optional" }) => (
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
              clearInvalid("name");
            }}
            placeholder={t("Your full name", "例：山田 太郎")}
            required
            aria-invalid={invalid.includes("name")}
            autoComplete="name"
          />
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
              clearInvalid("email");
            }}
            placeholder={t("you@company.com", "example@company.co.jp")}
            required
            aria-invalid={invalid.includes("email")}
            autoComplete="email"
          />
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
          {t("Message", "メッセージ")}
          <Tag kind="required" />
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${field} resize-none`}
          value={form.message}
          onChange={(e) => {
            setForm({ ...form, message: e.target.value });
            clearInvalid("message");
          }}
          placeholder={t(
            "Share details about your question, opportunity, or goals.",
            "ご用件をご記入ください（例：作品について／採用について／お仕事のご相談）"
          )}
          required
          aria-invalid={invalid.includes("message")}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="font-mono text-[12px] uppercase text-ink-muted">
          {t("Replies within 1–2 business days · JST", "1〜2営業日以内に返信いたします")}
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center justify-center gap-3 bg-ink text-surface px-7 py-3.5 font-mono text-[12px] font-normal uppercase hover:bg-accent-text transition-colors disabled:opacity-60 whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          {submitting ? t("Sending…", "送信中…") : t("Send Message", "送信する")}
          <span className="text-[20px] transition-transform group-hover:translate-x-1" aria-hidden>
            →
          </span>
        </button>
      </div>
      {/* Honeypot: off-screen, not focusable, ignored by assistive tech. Bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="hp-field">Leave this field empty</label>
        <input
          id="hp-field"
          name="hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.hp_field}
          onChange={(e) => setForm({ ...form, hp_field: e.target.value })}
        />
      </div>
    </form>
  );
};
