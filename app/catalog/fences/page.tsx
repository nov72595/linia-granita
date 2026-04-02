"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import importedCatalog from "../../lib/blagostandartImport.json";
import { SiteFooter, SiteHeader } from "../../components/site/SiteChrome";
import CatalogItemCard from "../../components/catalog/CatalogItemCard";

type ImportedItem = {
  slug: string;
  title: string;
  sourceUrl: string;
  images: string[];
};

type FenceTypeKey = "granit" | "metal" | "kovka" | "bench-set";

const rawData = importedCatalog as Record<string, ImportedItem[]>;

const fenceTypes: Array<{
  key: FenceTypeKey;
  label: string;
  title: string;
  description: string;
  points: string[];
}> = [
  {
    key: "granit",
    label: "Гранитные",
    title: "Гранитные ограды",
    description: "Монументальная геометрия, долговечность и цельный премиальный внешний вид участка.",
    points: ["Максимальная стойкость к климату", "Единый стиль с памятником", "Аккуратная архитектура периметра"],
  },
  {
    key: "metal",
    label: "Металлические",
    title: "Металлические ограды",
    description: "Сдержанное практичное решение с чистыми линиями и аккуратным монтажом.",
    points: ["Оптимальный баланс цены и эстетики", "Разные варианты заполнения секций", "Надежная фиксация по периметру"],
  },
  {
    key: "kovka",
    label: "Кованые",
    title: "Кованые ограды",
    description: "Выразительная художественная пластика для статуса и индивидуального характера проекта.",
    points: ["Индивидуальные элементы и узоры", "Ручная доработка деталей", "Эффектная подача в комплексе"],
  },
  {
    key: "bench-set",
    label: "Лавка + стол",
    title: "Лавка и стол",
    description: "Функциональный комплект рядом с оградой в единой архитектуре участка.",
    points: ["Удобство для посещения", "Согласованный стиль с оградой", "Надежная и долговечная конструкция"],
  },
];

const fenceProducts = [
  ...(rawData.granit ?? []).map((item, idx) => ({
    ...item,
    code: `OG-GR-${String(idx + 1).padStart(2, "0")}`,
    typeKey: "granit" as FenceTypeKey,
    group: "Гранитные",
  })),
  ...(rawData.metal ?? []).map((item, idx) => ({
    ...item,
    code: `OG-MT-${String(idx + 1).padStart(2, "0")}`,
    typeKey: "metal" as FenceTypeKey,
    group: "Металлические",
  })),
  ...(rawData.kovka ?? []).map((item, idx) => ({
    ...item,
    code: `OG-KV-${String(idx + 1).padStart(2, "0")}`,
    typeKey: "kovka" as FenceTypeKey,
    group: "Кованые",
  })),
  ...(rawData["bench-set"] ?? []).map((item, idx) => ({
    ...item,
    code: `OG-BS-${String(idx + 1).padStart(2, "0")}`,
    typeKey: "bench-set" as FenceTypeKey,
    group: "Лавка + стол",
  })),
];

export default function FencesCatalogPage() {
  const [selectedType, setSelectedType] = useState<FenceTypeKey>("granit");

  const selectedFenceType = useMemo(
    () => fenceTypes.find((item) => item.key === selectedType) ?? fenceTypes[0],
    [selectedType]
  );
  const visibleFenceProducts = useMemo(
    () => fenceProducts.filter((item) => item.typeKey === selectedType),
    [selectedType]
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20 md:px-10">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#9bb4cd] transition hover:text-[#f2f6fb]"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад в каталог
        </Link>

        <p className="[font-family:var(--font-display)] mt-8 text-xs uppercase tracking-[0.22em] text-[#8f8f8f]">
          Ограды
        </p>
        <h1 className="[font-family:var(--font-display)] mt-4 text-4xl font-light uppercase tracking-[0.12em] md:text-6xl">
          Типы оград
        </h1>
        <p className="mt-6 max-w-3xl text-sm font-light leading-relaxed text-[#8f8f8f]">
          Выберите категорию: гранитные, металлические, кованые ограды или комплект лавка + стол. Отображаются только
          карточки выбранной категории.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {fenceTypes.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setSelectedType(item.key)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.14em] transition ${
                item.key === selectedType
                  ? "border-[#6f8dad]/70 bg-[#6f8dad]/[0.2] text-[#eef4fb]"
                  : "border-white/15 bg-white/[0.03] text-[#bcbcbc] hover:border-white/30 hover:text-[#eef4fb]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <article className="mt-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">
          <p className="[font-family:var(--font-display)] text-base uppercase tracking-[0.12em] text-white">
            {selectedFenceType.title}
          </p>
          <p className="mt-3 text-sm font-light leading-relaxed text-[#8f8f8f]">{selectedFenceType.description}</p>
          <ul className="mt-5 space-y-2.5">
            {selectedFenceType.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-[#aeb7c0]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>

        <div className="mt-14">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.22em] text-[#8f8f8f]">Модели оград</p>
          <h2 className="[font-family:var(--font-display)] mt-3 text-2xl font-light uppercase tracking-[0.12em] md:text-4xl">
            {selectedFenceType.label} ({visibleFenceProducts.length})
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleFenceProducts.map((item) => {
              const activeImage = item.images[0];

              return (
                <CatalogItemCard
                  key={item.slug}
                  imageSrc={activeImage}
                  imageAlt={item.title}
                  sku={item.code}
                  name={item.title}
                  price=""
                  priceCaption=""
                  meta={
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                        <span className="text-[10px] uppercase tracking-[0.16em] text-white/80">{item.group}</span>
                      </div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/70">Фото товара</p>
                    </div>
                  }
                  actions={
                    <a
                      href="tel:+375296687665"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[#d0dae4] transition hover:bg-white/10 hover:border-white/20"
                    >
                      Звонок
                    </a>
                  }
                />
              );
            })}
          </div>
        </div>

        <div className="mt-10 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(111,141,173,0.14),rgba(255,255,255,0.03))] p-6 backdrop-blur-2xl md:p-8">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[#b7c9dc]">Следующий шаг</p>
          <h2 className="[font-family:var(--font-display)] mt-3 text-2xl font-light uppercase tracking-[0.12em] md:text-3xl">
            Получить подбор под участок
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="tel:+375296687665"
              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[#dce7f1] transition hover:border-[#6f8dad]/55 hover:bg-[#6f8dad]/[0.16] hover:text-[#f2f6fb]"
            >
              Позвонить
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
