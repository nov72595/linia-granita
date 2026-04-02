"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Instagram, Mail, MapPin, MessageCircle, Moon, Phone, ScanSearch, Send, Sun } from "lucide-react";

const MAIN_PHONE_RAW = "+375296687665";
const MAIN_PHONE_LABEL = "+375 29 668 76 65";
const MAIN_ADDRESS = "г. Могилев, ул Калиновского 27А (напротив хозтоваров)";
const MAIN_TELEGRAM = "tg://resolve?phone=375296687665";
const MAIN_VIBER = "viber://chat?number=%2B375296687665";

const socialLinks = [
  { label: "Telegram", icon: Send, href: MAIN_TELEGRAM },
  { label: "Viber", icon: MessageCircle, href: MAIN_VIBER },
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com" },
];

function FloatingContactDock() {
  return (
    <div className="pointer-events-none fixed bottom-4 right-3 z-[45] sm:bottom-5 sm:right-5">
      <div className="pointer-events-auto flex flex-col items-end gap-2">
        <a
          href={`tel:${MAIN_PHONE_RAW}`}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/55 bg-[linear-gradient(180deg,rgba(212,175,55,0.28),rgba(212,175,55,0.14))] text-[#f4e6bf] shadow-[0_10px_20px_rgba(0,0,0,0.24)] transition hover:border-[#d4af37]/80 hover:brightness-105 sm:h-12 sm:w-12"
          aria-label="Позвонить по главному номеру"
          title="Позвонить"
        >
          <Phone className="h-5 w-5" />
        </a>
        <a
          href={MAIN_VIBER}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-[#dce7f1] shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition hover:border-[#6f8dad]/55 hover:bg-[#6f8dad]/[0.16] hover:text-white sm:h-12 sm:w-12"
          aria-label="Написать в Viber"
          title="Viber"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
        <a
          href={MAIN_TELEGRAM}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-[#dce7f1] shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition hover:border-[#6f8dad]/55 hover:bg-[#6f8dad]/[0.16] hover:text-white sm:h-12 sm:w-12"
          aria-label="Написать в Telegram"
          title="Telegram"
        >
          <Send className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

type BrandMarkProps = {
  variant?: "header" | "footer";
};

export function BrandMark({ variant = "footer" }: BrandMarkProps) {
  const isHeader = variant === "header";

  return (
    <div className={`inline-flex items-center ${isHeader ? "gap-3.5" : "gap-4"}`}>
      <div className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-[18px] border border-white/15 bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.2),rgba(255,255,255,0.05)_44%,rgba(7,7,7,0.92)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl sm:h-14 sm:w-14">
        <svg
          viewBox="0 0 52 52"
          aria-hidden="true"
          className="h-9 w-9 sm:h-10 sm:w-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="stoneBase" x1="12" y1="12" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#8B8B8B" />
              <stop offset="0.5" stopColor="#555555" />
              <stop offset="1" stopColor="#2E2E2E" />
            </linearGradient>
            <linearGradient id="stoneShade" x1="12" y1="40" x2="40" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#1D1D1D" stopOpacity="0.65" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.14" />
            </linearGradient>
            <linearGradient id="goldLine" x1="14" y1="38" x2="38" y2="14" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#FFBD55" />
              <stop offset="0.5" stopColor="#FFE7A8" />
              <stop offset="1" stopColor="#F3A62F" />
            </linearGradient>
            <filter id="graniteNoise" x="10" y="10" width="32" height="32" filterUnits="userSpaceOnUse">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="2"
                seed="7"
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix
                in="noise"
                type="matrix"
                values="1.1 0 0 0 0 0 1.1 0 0 0 0 0 1.1 0 0 0 0 0 1 0"
                result="highContrastNoise"
              />
              <feBlend in="SourceGraphic" in2="highContrastNoise" mode="overlay" />
            </filter>
            <filter id="goldGlow" x="9" y="9" width="34" height="34" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="0.9" />
            </filter>
          </defs>

          <rect x="12" y="12" width="28" height="28" rx="2.2" fill="url(#stoneBase)" filter="url(#graniteNoise)" />
          <rect x="12" y="12" width="28" height="28" rx="2.2" fill="url(#stoneShade)" />
          <rect x="12" y="12" width="28" height="28" rx="2.2" stroke="#DADADA" strokeWidth="1.15" opacity="0.9" />

          <path d="M14.2 37.8L37.8 14.2" stroke="url(#goldLine)" strokeWidth="3.2" strokeLinecap="round" filter="url(#goldGlow)" />
          <path d="M14.2 37.8L37.8 14.2" stroke="url(#goldLine)" strokeWidth="1.9" strokeLinecap="round" />
          <path d="M37.8 14.2L39 13" stroke="#FFD58B" strokeWidth="1.1" strokeLinecap="round" opacity="0.95" />
          <path d="M14.2 37.8L13 39" stroke="#FFC166" strokeWidth="1.1" strokeLinecap="round" opacity="0.9" />
        </svg>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      <div className={`whitespace-nowrap ${isHeader ? "hidden min-[431px]:block" : "block"}`}>
        <p className="[font-family:var(--font-display)] text-[13px] uppercase tracking-[0.2em] text-white sm:text-[14px] sm:tracking-[0.22em] whitespace-nowrap">
          Линия Гранита
        </p>
        <p
          className={`uppercase tracking-[0.16em] text-[#9a9a9a] whitespace-nowrap ${
            isHeader ? "text-[10px] sm:text-[11px]" : "text-[10px]"
          }`}
        >
          Память в камне
        </p>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("site_theme");
    const nextTheme = stored === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-site-theme", nextTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-site-theme", nextTheme);
    window.localStorage.setItem("site_theme", nextTheme);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 pt-[calc(1.25rem+env(safe-area-inset-top))] pb-5 md:px-10">
          <Link href="/" className="shrink-0">
            <BrandMark variant="header" />
          </Link>
          <div className="flex items-center">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-[#d7dfe8] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition hover:border-[#6f8dad]/45 hover:bg-[#6f8dad]/[0.12] hover:text-white sm:text-xs sm:tracking-[0.16em]"
              aria-label="Переключить тему сайта"
              title={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
            >
              {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </header>
      <div className="hidden md:block">
        <FloatingContactDock />
      </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer id="contacts" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
      <div className="grid gap-10 rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-5">
          <BrandMark variant="footer" />
          <p className="max-w-md text-sm font-light leading-relaxed text-[#888]">
            Премиальные решения в ритуальной архитектуре: проект, производство, монтаж и
            сопровождение в одном стандарте.
          </p>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs uppercase tracking-[0.12em] text-[#c2c2c2] transition hover:border-white/30 hover:text-white"
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-3 lg:col-span-3">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[#949494]">
            Разделы
          </p>
          <Link href="/catalog" className="block text-sm text-[#bcbcbc] transition hover:text-white">
            Каталог памятников
          </Link>
          <Link href="/landscape" className="block text-sm text-[#bcbcbc] transition hover:text-white">
            Благоустройство
          </Link>
          <Link href="/contacts" className="block text-sm text-[#bcbcbc] transition hover:text-white">
            Контакты и заявка
          </Link>
        </div>

        <div className="space-y-3 lg:col-span-4">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[#949494]">
            Контакты
          </p>
          <div className="space-y-2.5">
            <a
              href={`tel:${MAIN_PHONE_RAW}`}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#101010]/70 px-3 py-2.5 text-sm text-[#bcbcbc] transition hover:border-white/20 hover:text-white"
            >
              <Phone className="h-4 w-4 text-[#888]" />
              {MAIN_PHONE_LABEL}
            </a>
            <a
              href="mailto:liniyagranita@gmail.com"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#101010]/70 px-3 py-2.5 text-sm text-[#bcbcbc] transition hover:border-white/20 hover:text-white"
            >
              <Mail className="h-4 w-4 text-[#888]" />
              liniyagranita@gmail.com
            </a>
            <p className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#101010]/70 px-3 py-2.5 text-sm text-[#bcbcbc]">
              <MessageCircle className="h-4 w-4 text-[#888]" />
              Ежедневно 09:00 - 21:00
            </p>
            <p className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#101010]/70 px-3 py-2.5 text-sm text-[#bcbcbc]">
              <MapPin className="h-4 w-4 text-[#888]" />
              {MAIN_ADDRESS}
            </p>
            <p className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#101010]/70 px-3 py-2.5 text-sm text-[#bcbcbc]">
              <ScanSearch className="h-4 w-4 text-[#888]" />
              Ответ по заявке до 24 часов
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
