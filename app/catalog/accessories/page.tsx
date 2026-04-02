"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
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

type GroupKey = "vazy" | "lampady" | "dekor";

const accessoryGroups: Array<{ key: GroupKey; title: string; description: string }> = [
  {
    key: "vazy",
    title: "Вазы",
    description: "Выберите модель и цвет: в карточке доступно несколько фото одного товара.",
  },
  {
    key: "lampady",
    title: "Лампады",
    description: "Классические и современные форматы с просмотром доступных вариантов по фото.",
  },
  {
    key: "dekor",
    title: "Декор",
    description: "Декоративные элементы для завершенного внешнего вида мемориального комплекса.",
  },
];

const advantages = [
  "Несколько фото в каждой карточке товара",
  "Быстрый выбор нужного цвета и формы",
  "Помощь по телефону для выбора нужной позиции",
] as const;

const rawData = importedCatalog as Record<string, ImportedItem[]>;

const accessoryProducts = [
  ...(rawData.vazy ?? []).map((item, idx) => ({
    ...item,
    code: `VA-${String(idx + 1).padStart(2, "0")}`,
    groupKey: "vazy" as GroupKey,
    group: "Вазы",
  })),
  ...(rawData.lampady ?? []).map((item, idx) => ({
    ...item,
    code: `LA-${String(idx + 1).padStart(2, "0")}`,
    groupKey: "lampady" as GroupKey,
    group: "Лампады",
  })),
  ...(rawData.dekor ?? []).map((item, idx) => ({
    ...item,
    code: `DE-${String(idx + 1).padStart(2, "0")}`,
    groupKey: "dekor" as GroupKey,
    group: "Декор",
  })),
];

export default function AccessoriesCatalogPage() {
  const [selectedGroup, setSelectedGroup] = useState<GroupKey>("vazy");
  const [activeImageBySlug, setActiveImageBySlug] = useState<Record<string, number>>({});

  const selectedGroupMeta = useMemo(
    () => accessoryGroups.find((item) => item.key === selectedGroup) ?? accessoryGroups[0],
    [selectedGroup]
  );
  const visibleAccessoryProducts = useMemo(
    () => accessoryProducts.filter((item) => item.groupKey === selectedGroup),
    [selectedGroup]
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
          Аксессуары
        </p>
        <h1 className="[font-family:var(--font-display)] mt-4 text-4xl font-light uppercase tracking-[0.12em] md:text-6xl">
          Вазы, лампады и декор
        </h1>
        <p className="mt-6 max-w-3xl text-sm font-light leading-relaxed text-[#8f8f8f]">
          Нажмите категорию и увидите только нужные карточки товаров без путаницы.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {accessoryGroups.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setSelectedGroup(item.key)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.14em] transition ${
                item.key === selectedGroup
                  ? "border-[#6f8dad]/70 bg-[#6f8dad]/[0.2] text-[#eef4fb]"
                  : "border-white/15 bg-white/[0.03] text-[#bcbcbc] hover:border-white/30 hover:text-[#eef4fb]"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <article className="mt-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111] px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#b0b0b0]">Категория</span>
          </div>
          <p className="[font-family:var(--font-display)] mt-4 text-base uppercase tracking-[0.12em] text-white">
            {selectedGroupMeta.title}
          </p>
          <p className="mt-3 text-sm font-light leading-relaxed text-[#8f8f8f]">{selectedGroupMeta.description}</p>
        </article>

        <div className="mt-12">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.22em] text-[#8f8f8f]">
            Товары
          </p>
          <h2 className="[font-family:var(--font-display)] mt-3 text-2xl font-light uppercase tracking-[0.12em] md:text-4xl">
            {selectedGroupMeta.title} ({visibleAccessoryProducts.length})
          </h2>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleAccessoryProducts.map((item) => {
              const activeIdx = Math.min(activeImageBySlug[item.slug] ?? 0, Math.max(item.images.length - 1, 0));
              const activeImage = item.images[activeIdx] ?? item.images[0];

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
                      <p className="text-[10px] uppercase tracking-[0.16em] text-white/70">
                        Вариантов фото: {item.images.length}
                      </p>
                    </div>
                  }
                  thumbnails={
                    item.images.length > 1 ? (
                      <div className="flex flex-wrap gap-2">
                        {item.images.slice(0, 6).map((img, idx) => (
                          <button
                            key={img}
                            type="button"
                            onClick={() => setActiveImageBySlug((prev) => ({ ...prev, [item.slug]: idx }))}
                            className={`relative h-12 w-12 overflow-hidden rounded-md border transition ${
                              idx === activeIdx ? "border-[#d4af37]/70" : "border-white/15 hover:border-white/35"
                            }`}
                          >
                            <Image src={img} alt={`${item.title} ${idx + 1}`} fill className="object-cover" sizes="48px" />
                          </button>
                        ))}
                      </div>
                    ) : undefined
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

        <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl md:p-8">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[#b7b7b7]">Почему так удобно</p>
          <ul className="mt-4 space-y-2.5">
            {advantages.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-[#aeb7c0]">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="tel:+375296687665"
            className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-xs uppercase tracking-[0.16em] text-[#dce7f1] transition hover:border-[#6f8dad]/55 hover:bg-[#6f8dad]/[0.16] hover:text-[#f2f6fb]"
          >
            Позвонить
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
