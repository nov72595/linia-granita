import { promises as fs } from "fs";
import path from "path";
import { catalogMeta, CatalogType } from "./catalog";

const IMAGE_EXT = /\.(png|jpe?g|webp|avif)$/i;

export type CatalogCounts = Record<CatalogType, number>;

export async function getCatalogCounts(): Promise<CatalogCounts> {
  const entries = await Promise.all(
    (Object.keys(catalogMeta) as CatalogType[]).map(async (type) => {
      const folder = catalogMeta[type].folder;
      const dir = path.join(process.cwd(), "public", "catalog", folder);

      try {
        const files = await fs.readdir(dir);
        const imageNames = files.filter((name) => IMAGE_EXT.test(name));
        let count: number;

        // Для комплексов считаем уникальные формы (1.jpg, 1.1.jpg, 1.2.jpg относятся к одной форме `1`).
        if (type === "complex") {
          const bases = new Set<number>();
          for (const name of imageNames) {
            const clean = name.replace(/\.(png|jpe?g|webp|avif)$/i, "");
            const match = clean.match(/^(\d+)(?:\.(\d+))?$/);
            if (match) bases.add(Number(match[1]));
          }
          count = bases.size;
        } else {
          count = imageNames.length;
        }
        return [type, count] as const;
      } catch {
        return [type, catalogMeta[type].defaultCount] as const;
      }
    }),
  );

  return Object.fromEntries(entries) as CatalogCounts;
}

