import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteFooter, SiteHeader } from "../../../components/site/SiteChrome";
import { CatalogType, catalogMeta, isCatalogType } from "../../../lib/catalog";

type PageProps = {
  params: Promise<{ type: string; model: string }>;
};

function modelTitle(model: string) {
  return decodeURIComponent(model)
    .replace(/(\.jpe?g|\.png|\.webp)+$/i, "")
    .replace(/\b(jpg|jpeg|png|webp)\b/gi, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function makeMockupCodeByType(model: string, type: CatalogType) {
  const clean = decodeURIComponent(model).replace(/(\.jpe?g|\.png|\.webp)+$/i, "");
  const match = clean.match(/\d+/);
  const prefix = type === "double" ? "D" : "В";
  if (match) return `${prefix}-${Number(match[0])}`;
  return `${prefix}-${clean.toUpperCase()}`;
}

function inferSpecs(type: CatalogType, model: string) {
  const base = makeMockupCodeByType(model, type);

  if (type === "single") {
    return {
      type: "Стела одиночная",
      dimensions: "100 x 50 x 5 см",
      material: "Габбро-диабаз",
      base: "50 x 20 x 15 см",
      flowerbed: "100 x 50 x 8/5 см",
      note: `Макет: ${base}. Это базовые размеры одиночного памятника, при необходимости скорректируем.`,
    };
  }
  if (type === "double") {
    return {
      type: "Стела двойная",
      dimensions: "100 x 60 x 5 см",
      material: "Габбро-диабаз",
      base: "60 x 20 x 15 см",
      flowerbed: "100 x 60 x 8/5 см",
      note: `Макет: ${base}. Возможна зеркальная компоновка и изменение пропорций.`,
    };
  }
  if (type === "combo") {
    return {
      type: "Комбинированная стела",
      dimensions: "130 x 65 x 8 см",
      material: "Гранит + декоративные вставки",
      base: "Тумба 90 x 25 x 20 см",
      flowerbed: "Индивидуально",
      note: `Макет: ${base}. Доступны варианты с портретной вставкой и сложной геометрией.`,
    };
  }
  return {
    type: "Мемориальный комплекс",
    dimensions: "Индивидуально под участок",
    material: "Гранит премиум",
    base: "Проектная сборка",
    flowerbed: "По проекту",
    note: `Макет: ${base}. Состав комплекса и размеры формируются по техзаданию.`,
  };
}

export default async function CatalogModelPage({ params }: PageProps) {
  const { type, model } = await params;
  if (!isCatalogType(type)) notFound();

  const meta = catalogMeta[type];
  const imageSrc = `/catalog/${meta.folder}/${decodeURIComponent(model)}`;
  const specs = inferSpecs(type, model);
  const specsRows = [
    { label: "Материал", value: specs.material },
    { label: "Тип", value: specs.type },
    { label: "Размер стелы", value: specs.dimensions },
    { label: "Подставка", value: specs.base },
    { label: "Цветник", value: specs.flowerbed },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <Link
          href={`/catalog/${type}`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#8f8f8f] transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад в {meta.title.toLowerCase()}
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-white/15 bg-white/[0.03] p-3 backdrop-blur-2xl">
            <div className="relative h-[360px] w-full overflow-hidden rounded-2xl bg-[#f1f1f1] min-[420px]:h-[440px] md:h-[560px]">
              <div className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-white/95 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#1f1f1f]">
                Макет {makeMockupCodeByType(model, type)}
              </div>
              <Image
                src={imageSrc}
                alt={modelTitle(model)}
                fill
                className="object-contain p-6 mix-blend-multiply contrast-110 brightness-95"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </div>

          <aside className="rounded-[28px] border border-white/15 bg-[#101010] p-6">
            <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[#8f8f8f]">
              Характеристики
            </p>
            <h1 className="[font-family:var(--font-display)] mt-4 text-3xl uppercase tracking-[0.1em]">
              Макет {makeMockupCodeByType(model, type)}
            </h1>

            <div className="mt-6 overflow-hidden rounded-2xl border border-white/15">
              {specsRows.map((row, idx) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-1 items-start gap-1 px-4 py-3 text-sm min-[420px]:grid-cols-[140px_1fr] min-[420px]:gap-4 ${
                    idx !== specsRows.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <span className="text-[#9f9f9f] leading-5">{row.label}</span>
                  <span className="text-left text-white leading-5 min-[420px]:text-right">{row.value}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm font-light leading-relaxed text-[#8e8e8e]">{specs.note}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/calculator"
                className="rounded-full bg-white px-5 py-2 text-xs uppercase tracking-[0.16em] text-black transition hover:bg-[#f1f1f1]"
              >
                Выбрать в расчет
              </Link>
              <Link
                href={`/catalog/${type}`}
                className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.16em] transition hover:bg-white hover:text-black"
              >
                Другие макеты
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
