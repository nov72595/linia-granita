import { promises as fs } from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "../../components/site/SiteChrome";
import { catalogMeta, CatalogType, isCatalogType } from "../../lib/catalog";
import CatalogItemCard from "../../components/catalog/CatalogItemCard";

type PageProps = {
  params: Promise<{ type: string }>;
};

function imageToTitle(fileName: string) {
  return fileName
    .replace(/(\.jpe?g|\.png|\.webp)+$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b(jpg|jpeg|png|webp)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractModelNumber(fileName: string) {
  const base = fileName.replace(/\.(png|jpe?g|webp)$/i, "");
  const match = base.match(/\d+/);
  return match ? Number(match[0]) : null;
}

function parseComplexBaseAndVariant(fileName: string) {
  const clean = fileName.replace(/\.(png|jpe?g|webp)$/i, "");
  const match = clean.match(/^(\d+)(?:\.(\d+))?$/);
  if (!match) return null;
  return {
    base: Number(match[1]),
    variant: match[2] ? Number(match[2]) : null,
  };
}

function getTypePrefix(type: CatalogType) {
  if (type === "double") return "D";
  if (type === "complex") return "С";
  return "В";
}

const singleStartPricesByModelNumber: Record<number, number> = {
  1: 1190,
  2: 1290,
  3: 1290,
  5: 1350,
  6: 1290,
  7: 1290,
  9: 1350,
  10: 1290,
  11: 1290,
  13: 1290,
  14: 1290,
  15: 1290,
  17: 1290,
  18: 1290,
  19: 1290,
  21: 1350,
  22: 1350,
  23: 1350,
  25: 1350,
  26: 1390,
  27: 1390,
  29: 1390,
  30: 1390,
  31: 1390,
  33: 1450,
  34: 1390,
  35: 1390,
  37: 1450,
  38: 1450,
  39: 1500,
  41: 1290,
  42: 1350,
};

function makeMockupLabel(type: CatalogType, fileName: string, fallbackIndex: number) {
  const modelNumber = extractModelNumber(fileName);
  return `${getTypePrefix(type)}-${modelNumber ?? fallbackIndex + 1}`;
}

function getStartPrice(type: CatalogType, fileName: string) {
  if (type !== "single") return 1250;
  const modelNumber = extractModelNumber(fileName);
  if (!modelNumber) return 1250;
  return singleStartPricesByModelNumber[modelNumber] ?? 1250;
}

function formatPrice(price: number) {
  return `${price.toLocaleString("ru-RU")} р`;
}

async function getCatalogImages(type: CatalogType) {
  const targetDir = path.join(process.cwd(), "public", "catalog", catalogMeta[type].folder);
  try {
    const all = await fs.readdir(targetDir);
    const imageNames = all.filter((name) => /\.(png|jpe?g|webp)$/i.test(name));

    // Для комплексов: 1.jpg / 1.1.jpg / 1.2.jpg / 1.3.jpg считаем одной формой.
    if (type === "complex") {
      const parsed = imageNames
        .map((name) => {
          const parts = parseComplexBaseAndVariant(name);
          return parts ? { name, ...parts } : null;
        })
        .filter((x): x is { name: string; base: number; variant: number | null } => !!x);

      const repByBase = new Map<number, { repName: string; repVariant: number | null }>();
      for (const p of parsed) {
        const existing = repByBase.get(p.base);
        if (!existing) {
          repByBase.set(p.base, { repName: p.name, repVariant: p.variant });
          continue;
        }

        // Предпочитаем базовый файл base.jpg, если он есть.
        const existingIsBase = existing.repVariant === null;
        const currentIsBase = p.variant === null;
        if (currentIsBase && !existingIsBase) {
          repByBase.set(p.base, { repName: p.name, repVariant: p.variant });
          continue;
        }

        // Если base.jpg нет — берем вариант с минимальным номером.
        if (!currentIsBase && !existingIsBase) {
          const existingVariantNum = existing.repVariant ?? Number.POSITIVE_INFINITY;
          const currentVariantNum = p.variant ?? Number.POSITIVE_INFINITY;
          if (currentVariantNum < existingVariantNum) {
            repByBase.set(p.base, { repName: p.name, repVariant: p.variant });
          }
        }
      }

      return [...repByBase.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([base, entry], index) => ({
          id: entry.repName,
          title: imageToTitle(entry.repName),
          src: `/catalog/${catalogMeta[type].folder}/${entry.repName}`,
          mockupLabel: makeMockupLabel(type, entry.repName, index),
        }));
    }

    return imageNames
      .sort((a, b) => {
        const aNum = extractModelNumber(a);
        const bNum = extractModelNumber(b);
        if (aNum !== null && bNum !== null) return aNum - bNum;
        return a.localeCompare(b, "ru");
      })
      .map((name, index) => ({
        id: name,
        title: imageToTitle(name),
        src: `/catalog/${catalogMeta[type].folder}/${name}`,
        mockupLabel: makeMockupLabel(type, name, index),
      }));
  } catch {
    return [];
  }
}

export default async function CatalogTypePage({ params }: PageProps) {
  const { type } = await params;
  if (!isCatalogType(type)) notFound();

  const meta = catalogMeta[type];
  const items = await getCatalogImages(type);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#8f8f8f] transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад к разделам
            </Link>
            <h1 className="[font-family:var(--font-display)] mt-4 text-3xl font-medium uppercase tracking-[0.05em] leading-[1.06] text-white break-words drop-shadow-[0_12px_34px_rgba(0,0,0,0.6)] sm:text-4xl md:text-6xl md:tracking-[0.08em]">
              {meta.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-light text-white/70">{meta.description}</p>
          </div>
          {(type !== "single" && type !== "double") && (
            <Link
              href="/calculator"
              className="rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.18em] transition hover:bg-white hover:text-black"
            >
              Перейти к расчету
            </Link>
          )}
        </div>

        {items.length === 0 ? (
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-2xl">
            <p className="[font-family:var(--font-display)] text-sm uppercase tracking-[0.2em] text-white">
              Каталог пока пуст
            </p>
            <p className="mt-4 text-sm font-light text-[#8f8f8f]">
              Добавьте изображения в папку <code className="text-[#cfcfcf]">public/catalog/{meta.folder}</code>.
              После загрузки макеты автоматически появятся на этой странице.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => {
              const modelHref = `/catalog/${type}/model/${encodeURIComponent(item.id)}`;
              const startPrice = getStartPrice(type, item.id);
              const showPrice = type === "single";
              return (
                <CatalogItemCard
                  key={item.id}
                  imageSrc={item.src}
                  imageAlt={item.title || `Макет ${index + 1}`}
                  sku={item.mockupLabel}
                  name=""
                  price={showPrice ? formatPrice(startPrice) : ""}
                  priceCaption=""
                  primaryAction={{
                    href: modelHref,
                    label: "Характеристики",
                  }}
                />
              );
            })}
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
