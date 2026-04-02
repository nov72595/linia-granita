export type CatalogType = "single" | "double" | "combo" | "complex";

export const catalogMeta: Record<
  CatalogType,
  { title: string; defaultCount: number; description: string; folder: string }
> = {
  single: {
    title: "Одиночные",
    defaultCount: 60,
    description: "Лаконичные формы и чистая архитектура памятника.",
    folder: "single",
  },
  double: {
    title: "Двойные",
    defaultCount: 30,
    description: "Семейные решения с симметричной композицией.",
    folder: "double",
  },
  combo: {
    title: "Портфолио",
    defaultCount: 40,
    description: "Сложные формы, камень и выразительные детали.",
    folder: "combo",
  },
  complex: {
    title: "Комплексы",
    defaultCount: 100,
    description: "Полноценные мемориальные ансамбли под участок.",
    folder: "complex",
  },
};

export function isCatalogType(value: string): value is CatalogType {
  return value in catalogMeta;
}
