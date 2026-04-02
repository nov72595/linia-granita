import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteHeader } from "../components/site/SiteChrome";
import { catalogMeta } from "../lib/catalog";
import { getCatalogCounts } from "../lib/catalogCounts";

const order: Array<keyof typeof catalogMeta> = ["single", "double", "combo", "complex"];

export default async function CatalogPage() {
  const counts = await getCatalogCounts();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20 md:px-10">
        <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.22em] text-[#8f8f8f]">
          Каталог макетов
        </p>
        <h1 className="[font-family:var(--font-display)] mt-4 text-4xl font-light uppercase tracking-[0.12em] md:text-6xl">
          Выберите раздел
        </h1>
        <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-[#888]">
          Откройте категорию, просмотрите макеты и выберите модель для расчета.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-2">
          {order.map((key) => {
            const item = catalogMeta[key];
            return (
              <Link
                key={key}
                href={`/catalog/${key}`}
                className={`group relative flex min-h-[232px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-5 min-[420px]:min-h-[248px] min-[420px]:p-6 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] ${
                  key === "single" ? "md:pr-[196px]" : key === "double" ? "md:pr-[214px]" : key === "combo" ? "md:pr-[188px]" : ""
                }`}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111] px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#b0b0b0]">Тип памятника</span>
                </div>
                <p className="[font-family:var(--font-display)] mt-4 text-lg uppercase tracking-[0.12em] text-white">
                  {item.title}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#8f8f8f]">
                  {counts[key]} макетов
                </p>
                <p className="mt-4 hidden text-sm font-light text-[#9a9a9a] min-[420px]:block">{item.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[11px] uppercase tracking-[0.14em] text-white/90 min-[420px]:pt-6 min-[420px]:text-xs min-[420px]:tracking-[0.18em]">
                  Открыть каталог
                  <ArrowRight className="h-4 w-4" />
                </span>

                {key === "single" && (
                  <div className="pointer-events-none absolute right-1 top-4 bottom-4 hidden w-[186px] md:block">
                    <div className="absolute bottom-2 left-7 h-6 w-[126px] -rotate-[7deg] rounded-[999px] bg-black/52 blur-[11px]" />
                    <div className="absolute bottom-3 left-11 h-4 w-[95px] -rotate-[8deg] rounded-[999px] bg-white/12 blur-[9px]" />
                    <Image
                      src="/monuments/single-reference-cutout.png"
                      alt={item.title}
                      fill
                      className="object-contain object-center [filter:contrast(1.08)_brightness(0.93)_saturate(0.86)_drop-shadow(0_0_1.2px_rgba(244,244,244,0.34))_drop-shadow(0_0_2px_rgba(212,175,55,0.15))_drop-shadow(0_14px_28px_rgba(0,0,0,0.56))]"
                      sizes="186px"
                    />
                  </div>
                )}

                {key === "double" && (
                  <div className="pointer-events-none absolute right-0 top-4 bottom-4 hidden w-[204px] md:block">
                    <div className="absolute bottom-2 left-8 h-6 w-[142px] -rotate-[6deg] rounded-[999px] bg-black/55 blur-[11px]" />
                    <div className="absolute bottom-3 left-12 h-4 w-[110px] -rotate-[7deg] rounded-[999px] bg-white/10 blur-[9px]" />
                    <Image
                      src="/monuments/double-reference-cutout.png"
                      alt={item.title}
                      fill
                      className="object-contain object-center [filter:contrast(1.07)_brightness(0.92)_saturate(0.82)_drop-shadow(0_0_1.2px_rgba(244,244,244,0.34))_drop-shadow(0_0_2px_rgba(212,175,55,0.14))_drop-shadow(0_14px_28px_rgba(0,0,0,0.56))]"
                      sizes="204px"
                    />
                  </div>
                )}

                {key === "combo" && (
                  <div className="pointer-events-none absolute right-1 top-4 bottom-4 hidden w-[178px] md:block">
                    <Image
                      src="/monuments/combo-reference-cutout.png"
                      alt={item.title}
                      fill
                      className="object-contain object-center [filter:contrast(1.08)_brightness(0.92)_saturate(0.84)_drop-shadow(0_0_1.2px_rgba(244,244,244,0.34))_drop-shadow(0_0_2px_rgba(212,175,55,0.14))_drop-shadow(0_14px_24px_rgba(0,0,0,0.52))]"
                      sizes="178px"
                    />
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-14">
          <p className="[font-family:var(--font-display)] text-xs uppercase tracking-[0.22em] text-[#8f8f8f]">
            Дополнительные разделы
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3">
            <Link
              href="/catalog/fences"
              className="group rounded-[24px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <p className="[font-family:var(--font-display)] text-sm uppercase tracking-[0.12em] text-white">Ограды</p>
              <p className="mt-2 text-sm text-[#8f8f8f]">Гранитные, металлические, кованые и комплект лавка + стол.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/90">
                Открыть раздел
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/catalog/accessories"
              className="group rounded-[24px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <p className="[font-family:var(--font-display)] text-sm uppercase tracking-[0.12em] text-white">Аксессуары</p>
              <p className="mt-2 text-sm text-[#8f8f8f]">Вазы, лампады и декор.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/90">
                Открыть раздел
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            <Link
              href="/landscape"
              className="group rounded-[24px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <p className="[font-family:var(--font-display)] text-sm uppercase tracking-[0.12em] text-white">
                Благоустройство
              </p>
              <p className="mt-2 text-sm text-[#8f8f8f]">Технологии покрытия и этапы работ по договору.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/90">
                Открыть раздел
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
