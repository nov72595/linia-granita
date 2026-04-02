import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteFooter, SiteHeader } from "../../../../components/site/SiteChrome";
import { CatalogType, catalogMeta, isCatalogType } from "../../../../lib/catalog";

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

function parseComplexBaseAndVariant(model: string) {
  const clean = decodeURIComponent(model).replace(/\.(png|jpe?g|webp)$/i, "");
  const match = clean.match(/^(\d+)(?:\.(\d+))?$/);
  if (!match) return null;
  return {
    base: Number(match[1]),
    variant: match[2] ? Number(match[2]) : null,
  };
}

function makeMockupCodeByType(model: string, type: CatalogType) {
  if (type === "complex") {
    const parts = parseComplexBaseAndVariant(model);
    if (!parts) return "С";
    return parts.variant ? `С-${parts.base}.${parts.variant}` : `С-${parts.base}`;
  }

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

  if (type === "complex") {
    const parts = parseComplexBaseAndVariant(model);
    const formCode = parts ? `С-${parts.base}` : "С-?";
    const variantCode = parts?.variant ? `${formCode}.${parts.variant}` : formCode;
    return {
      type: "Мемориальный комплекс",
      dimensions: "Индивидуально под участок",
      material: `Гранит: ${variantCode}`,
      base: "Проектная сборка",
      flowerbed: "По проекту",
      note: `${formCode}. Гранит: ${variantCode}. Состав комплекса формируется по техзаданию.`,
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

type ComplexVariant = {
  fileName: string;
  variantNum: number | null;
  code: string;
};

async function getComplexVariants(folder: string, base: number): Promise<ComplexVariant[]> {
  const targetDir = path.join(process.cwd(), "public", "catalog", folder);
  const all = await fs.readdir(targetDir);

  const variants = all
    .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
    .map((name) => {
      const parts = parseComplexBaseAndVariant(name);
      if (!parts) return null;
      if (parts.base !== base) return null;
      const formCode = `С-${parts.base}`;
      return {
        fileName: name,
        variantNum: parts.variant,
        code: parts.variant ? `${formCode}.${parts.variant}` : formCode,
      } satisfies ComplexVariant;
    })
    .filter((x): x is ComplexVariant => !!x);

  // base.jpg сначала, потом 1,2,3...
  variants.sort((a, b) => {
    const aKey = a.variantNum === null ? -1 : a.variantNum;
    const bKey = b.variantNum === null ? -1 : b.variantNum;
    if (aKey !== bKey) return aKey - bKey;
    return a.fileName.localeCompare(b.fileName, "ru");
  });

  return variants;
}

export default async function CatalogModelPage({ params }: PageProps) {
  const { type, model } = await params;
  if (!isCatalogType(type)) notFound();

  const meta = catalogMeta[type];
  const selectedModelFileName = decodeURIComponent(model);
  const complexParts = type === "complex" ? parseComplexBaseAndVariant(selectedModelFileName) : null;
  const complexVariants =
    type === "complex" && complexParts ? await getComplexVariants(meta.folder, complexParts.base) : [];

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
            <div className="relative h-[560px] w-full overflow-hidden rounded-2xl bg-[#f1f1f1]">
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
                  className={`grid grid-cols-[140px_1fr] items-start gap-4 px-4 py-3 text-sm ${
                    idx !== specsRows.length - 1 ? "border-b border-white/10" : ""
                  }`}
                >
                  <span className="text-[#9f9f9f] leading-5">{row.label}</span>
                  <span className="text-right text-white leading-5">{row.value}</span>
                </div>
              ))}
            </div>

            {type === "complex" && complexVariants.length > 1 && (
              <div className="mt-6">
                <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.2em] text-[#8f8f8f]">
                  Варианты гранита
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {complexVariants.map((v) => {
                    const isSelected = v.fileName === selectedModelFileName;
                    return (
                      <Link
                        key={v.fileName}
                        href={`/catalog/complex/model/${encodeURIComponent(v.fileName)}`}
                        className={`rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.14em] transition ${
                          isSelected
                            ? "border-[#c7a76a] bg-[#c7a76a]/10 text-[#e8d4aa]"
                            : "border-white/20 bg-[#101010] text-[#d3d3d3] hover:border-white/35 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {v.code}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="mt-6 text-sm font-light leading-relaxed text-[#8e8e8e]">{specs.note}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {type === "combo" ? (
                <Link
                  href="/calculator"
                  className="rounded-full bg-white px-5 py-2 text-xs uppercase tracking-[0.16em] text-black transition hover:bg-[#f1f1f1]"
                >
                  Выбрать в расчет
                </Link>
              ) : null}
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
