 "use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ClipboardList, Hammer, ShieldCheck } from "lucide-react";
import { SiteFooter, SiteHeader } from "../components/site/SiteChrome";

const processSteps = [
  {
    title: "Замер и задача",
    text: "Фиксируем размеры участка, текущее состояние основания и ваши пожелания по стилю.",
    icon: ClipboardList,
  },
  {
    title: "Смета и сроки",
    text: "Согласовываем материалы, объем работ и календарный план. Сроки фиксируются в договоре.",
    icon: ShieldCheck,
  },
  {
    title: "Монтаж",
    text: "Выполняем работы по этапам с фотоотчетом: подготовка, укладка, сборка и финальная сдача.",
    icon: Hammer,
  },
] as const;

const coverageVariants = {
  trotuar: {
    label: "Тротуарная плитка 30х30",
    image: "/landscape/trotuar-tiles-new.png",
    alt: "Основание под тротуарную плитку 30х30",
    lead: "Классический и практичный формат покрытия с аккуратной геометрией, высокой износостойкостью и стабильной работой на участке при правильной подготовке основания.",
    points: [
      "Подготовка площадки: полная расчистка участка, снятие дерна и выравнивание грунта.",
      "Установка бордюра: надежная фиксация периметра, которая удерживает основание и придает участку завершенный вид.",
      "Армирование: укладка металлической сетки для максимальной прочности и защиты от трещин и перекосов.",
      "Усиленная стяжка (10 см): заливка бетонного основания оптимальной толщины для устойчивости памятника и плитки даже на сложных почвах.",
      "Укладка плитки 30х30: классический вариант с аккуратным внешним видом и высокой износостойкостью.",
    ],
  },
  keramogranit: {
    label: "Керамогранит",
    image: "/landscape/keramogranit-new.png",
    alt: "Основание под облицовку керамогранитом",
    lead: "Премиальный вариант облицовки с высокой геометрической стабильностью, минимальным водопоглощением и долговечной эксплуатацией в сложных климатических условиях.",
    points: [
      "Сборная опалубка: выставляем точную геометрию участка с помощью профессиональной опалубки. Это позволяет получить ровные торцы и углы без бордюров по периметру.",
      "Усиленное армирование: используем арматуру диаметром 8-10 мм (а не только сетку), формируя жесткий каркас под подвижки грунта.",
      "Монолитная плита 15-20 см: заливаем основание увеличенной толщины. Такая подушка обеспечивает идеальную плоскость и исключает проседание тяжелых памятников.",
      "Облицовка керамогранитом: укладываем плитку на специальный усиленный клей. Керамогранит не впитывает влагу, устойчив к морозам и сохраняет внешний вид годами.",
    ],
  },
} as const;

type CoverageKey = keyof typeof coverageVariants;

export default function LandscapePage() {
  const [coverageType, setCoverageType] = useState<CoverageKey>("keramogranit");
  const coverage = coverageVariants[coverageType];

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
          <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl">
            <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.24em] text-[#9a9a9a]">
              Благоустройство
            </p>
            <h1 className="[font-family:var(--font-display)] mt-4 text-4xl font-light uppercase tracking-[0.12em] md:text-6xl">
              Участок под ключ
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#8f8f8f]">
              Проектируем и выполняем благоустройство участка вокруг памятника: от подготовки основания до финальной
              комплектации. Работаем по договору, сроки соблюдаем строго по согласованному графику.
            </p>

            <div className="mt-7 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-[#101010] px-4 py-3 text-sm text-[#d6d6d6]">
                Рассрочка без переплат.
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#101010] px-4 py-3 text-sm text-[#d6d6d6]">
                Фотоотчет всех этапов работ.
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#101010] px-4 py-3 text-sm text-[#d6d6d6]">
                Гарантия 3 года на выполненные работы.
              </div>
            </div>
          </div>

          <aside className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl">
            <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[#9a9a9a]">
              Этапы
            </p>
            <div className="mt-5 space-y-4">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="rounded-2xl border border-white/10 bg-[#101010] px-4 py-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1">
                      <Icon className="h-3.5 w-3.5 text-[#d4af37]" />
                      <span className="text-[10px] uppercase tracking-[0.14em] text-[#b7b7b7]">Этап {index + 1}</span>
                    </div>
                    <p className="[font-family:var(--font-display)] mt-3 text-sm uppercase tracking-[0.12em] text-white">
                      {step.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#8f8f8f]">{step.text}</p>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-white/10 py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-8">
            <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.22em] text-[#949494]">
              Что входит
            </p>
            <h2 className="[font-family:var(--font-display)] mt-3 text-3xl font-light uppercase tracking-[0.1em] md:text-5xl">
              Что входит в стоимость
            </h2>
            <div className="mt-5 inline-flex rounded-full border border-white/15 bg-white/[0.03] p-1">
              <button
                type="button"
                onClick={() => setCoverageType("trotuar")}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] transition ${
                  coverageType === "trotuar"
                    ? "border border-[#6f8dad]/60 bg-[#6f8dad]/[0.18] text-white"
                    : "text-[#bcbcbc] hover:text-white"
                }`}
              >
                Тротуарная плитка
              </button>
              <button
                type="button"
                onClick={() => setCoverageType("keramogranit")}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] transition ${
                  coverageType === "keramogranit"
                    ? "border border-[#6f8dad]/60 bg-[#6f8dad]/[0.18] text-white"
                    : "text-[#bcbcbc] hover:text-white"
                }`}
              >
                Керамогранит
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-3 backdrop-blur-2xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#111]">
                <Image
                  src={coverage.image}
                  alt={coverage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">
              <p className="[font-family:var(--font-display)] text-sm uppercase tracking-[0.12em] text-white">
                {coverage.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#8f8f8f]">
                {coverage.lead}
              </p>

              <ul className="mt-5 space-y-3">
                {coverage.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-[#8f8f8f]">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-[0.16em] transition hover:bg-white hover:text-black"
            >
              Перейти к расчету
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+375296687665"
              className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/55 bg-[#d4af37]/[0.16] px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[#f1dfb7] transition hover:border-[#d4af37]/80 hover:bg-[#d4af37]/[0.24]"
            >
              +375 29 668 76 65
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
