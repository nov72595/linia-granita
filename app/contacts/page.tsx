"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { SiteFooter, SiteHeader } from "../components/site/SiteChrome";

const CONTACT = {
  phones: [
    { raw: "+375296687665", label: "+375 29 668 76 65" },
    { raw: "+375292686024", label: "+375 29 268 60 24" },
    { raw: "+375333326318", label: "+375 33 332 63 18" },
  ],
  email: "liniyagranita@gmail.com",
  address: "г. Могилев, ул Калиновского 27А (напротив хозтоваров)",
  workHours: "Ежедневно 09:00 - 21:00",
  telegram: "tg://resolve?phone=375296687665",
  viber: "viber://chat?number=%2B375296687665",
  whatsapp: "https://wa.me/375296687665",
};

type Channel = "phone" | "telegram" | "viber" | "whatsapp";

export default function ContactsPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState<Channel>("phone");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const channelLabel = useMemo(() => {
    if (channel === "telegram") return "Telegram";
    if (channel === "viber") return "Viber";
    if (channel === "whatsapp") return "WhatsApp";
    return "Звонок";
  }, [channel]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) {
      setError("Укажите имя.");
      return;
    }
    if (!phone.trim()) {
      setError("Укажите номер телефона.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/contact-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          channel: channelLabel,
          comment: comment.trim(),
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error || "Не удалось отправить заявку. Попробуйте позже.");
        return;
      }

      setSuccess("Заявка отправлена. Мы скоро свяжемся с вами.");
      setName("");
      setPhone("");
      setComment("");
      setChannel("phone");
    } catch {
      setError("Ошибка сети. Проверьте подключение и попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#8f8f8f] transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          На главную
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl md:p-8">
            <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.22em] text-[#9a9a9a]">
              Контакты
            </p>
            <h1 className="[font-family:var(--font-display)] mt-4 text-4xl font-light uppercase tracking-[0.1em] md:text-6xl">
              Отправить заявку
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#8f8f8f]">
              Оставьте контакты и задачу. Менеджер свяжется с вами, уточнит детали и предложит оптимальное решение по
              памятнику, комплексу или благоустройству участка.
            </p>

            <div className="mt-8 grid gap-3">
              {CONTACT.phones.map((item) => (
                <a
                  key={item.raw}
                  href={`tel:${item.raw}`}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#101010] px-4 py-3 text-sm text-[#d6d6d6] transition hover:border-white/20 hover:text-white"
                >
                  <Phone className="h-4 w-4 text-[#b8c7d8]" />
                  {item.label}
                </a>
              ))}
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#101010] px-4 py-3 text-sm text-[#d6d6d6] transition hover:border-white/20 hover:text-white"
              >
                <Mail className="h-4 w-4 text-[#b8c7d8]" />
                {CONTACT.email}
              </a>
              <p className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#101010] px-4 py-3 text-sm text-[#bcbcbc]">
                <MapPin className="h-4 w-4 text-[#888]" />
                {CONTACT.address}
              </p>
              <p className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#101010] px-4 py-3 text-sm text-[#bcbcbc]">
                <MessageCircle className="h-4 w-4 text-[#888]" />
                {CONTACT.workHours}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl md:p-8"
          >
            <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.22em] text-[#9a9a9a]">
              Форма заявки
            </p>
            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-xs uppercase tracking-[0.14em] text-[#9a9a9a]">Имя</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#70859a] focus:border-[#6f8dad]/55 focus:shadow-[0_0_0_3px_rgba(111,141,173,0.16)]"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.14em] text-[#9a9a9a]">Телефон</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+375 ..."
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#70859a] focus:border-[#6f8dad]/55 focus:shadow-[0_0_0_3px_rgba(111,141,173,0.16)]"
                />
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.14em] text-[#9a9a9a]">Как с вами связаться</span>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as Channel)}
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white outline-none transition focus:border-[#6f8dad]/55 focus:shadow-[0_0_0_3px_rgba(111,141,173,0.16)]"
                >
                  <option value="phone">Звонок</option>
                  <option value="telegram">Telegram</option>
                  <option value="viber">Viber</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </label>

              <label className="block">
                <span className="text-xs uppercase tracking-[0.14em] text-[#9a9a9a]">Комментарий</span>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                  placeholder="Опишите задачу: тип памятника, размеры участка, пожелания по срокам."
                  className="mt-2 w-full resize-y rounded-2xl border border-white/15 bg-[#121212] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#70859a] focus:border-[#6f8dad]/55 focus:shadow-[0_0_0_3px_rgba(111,141,173,0.16)]"
                />
              </label>
            </div>

            {error ? <p className="mt-4 text-sm text-[#f0b4b4]">{error}</p> : null}
            {success ? <p className="mt-4 text-sm text-[#bfe9c8]">{success}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/55 bg-[#d4af37]/[0.2] px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[#f4e6bf] transition hover:border-[#d4af37]/80 hover:bg-[#d4af37]/[0.3]"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Отправка..." : "Отправить заявку"}
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
