"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

type CatalogItemCardProps = {
  imageSrc: string;
  imageAlt: string;
  sku: string;
  name: string;
  price: string;
  priceCaption: string;
  meta?: ReactNode;
  thumbnails?: ReactNode;
  primaryAction?: { href: string; label: string };
  actions?: ReactNode;
};

export default function CatalogItemCard({
  imageSrc,
  imageAlt,
  sku,
  name,
  price,
  priceCaption,
  meta,
  thumbnails,
  primaryAction,
  actions,
}: CatalogItemCardProps) {
  return (
    <article className="group relative flex h-[26rem] flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_10px_30px_rgba(0,0,0,0.22)] transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_16px_44px_rgba(0,0,0,0.32)]">
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.10),transparent_40%)] opacity-70" />
      {primaryAction ? (
        <Link
          href={primaryAction.href}
          aria-label={primaryAction.label}
          className="absolute inset-0 z-[1]"
        />
      ) : null}

      {/* Badge top-left (Apple-like, unobtrusive) */}
      <span className="pointer-events-none absolute left-3 top-3 z-[3] rounded-full border border-white/15 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f1f1f]">
        {sku}
      </span>

      {/* Full render area — "frame in frame" */}
      <div className="relative z-[2] flex-1 p-2">
        <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/15 bg-[#f3f4f6] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain p-1 mix-blend-multiply"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>

      {/* Compact bottom row */}
      <div className="relative z-[2] h-10 px-3 py-2.5">
        {price ? (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-semibold text-white/90">
            {price}
          </div>
        ) : null}

        {primaryAction ? (
          <Link
            href={primaryAction.href}
            className="absolute left-1/2 top-1/2 z-[3] inline-flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80 transition hover:text-white"
            aria-label={primaryAction.label}
            title={primaryAction.label}
          >
            {primaryAction.label}
            <span aria-hidden="true" className="text-white/60 transition group-hover:text-white/85">
              →
            </span>
          </Link>
        ) : null}
      </div>

      {/* Optional extras: only on hover, still not covering image */}
      {(meta || thumbnails || actions) ? (
        <div className="relative z-[2] px-3 pb-3">
          <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
            {meta ? <div className="pt-2">{meta}</div> : null}
            {thumbnails ? <div className="pt-2">{thumbnails}</div> : null}
            {actions ? <div className="pt-2 flex flex-wrap gap-2">{actions}</div> : null}
          </div>
        </div>
      ) : null}
    </article>
  );
}

