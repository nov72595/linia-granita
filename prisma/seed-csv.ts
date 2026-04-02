import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

const CHUNK_SIZE = 500;

// ─── Types ───────────────────────────────────────────────

interface ModelInfo {
  yearFrom: number;
  yearTo: number;
  bodyTypes: Set<string>;
}

type BrandMap = Map<string, Map<string, ModelInfo>>;

// ─── CSV URLs ────────────────────────────────────────────

const ARCHIVE_URLS = [
  'https://raw.githubusercontent.com/abhionlyone/us-car-models-data/master/models-data.csv',
  'https://raw.githubusercontent.com/abhionlyone/us-car-models-data/master/2020-2023.csv',
];

const YEAR_FILE_TEMPLATE =
  'https://raw.githubusercontent.com/abhionlyone/us-car-models-data/master/{YEAR}.csv';

// ─── CSV Parsing ─────────────────────────────────────────

function parseCsvLine(line: string) {
  const i1 = line.indexOf(',');
  if (i1 === -1) return null;
  const i2 = line.indexOf(',', i1 + 1);
  if (i2 === -1) return null;
  const i3 = line.indexOf(',', i2 + 1);

  const year = parseInt(line.slice(0, i1));
  if (isNaN(year)) return null;
  const make = line.slice(i1 + 1, i2).trim();
  const model = i3 === -1 ? line.slice(i2 + 1).trim() : line.slice(i2 + 1, i3).trim();

  let bodyTypes: string[] = [];
  if (i3 !== -1) {
    let raw = line.slice(i3 + 1).trim();
    if (raw.startsWith('"') && raw.endsWith('"')) raw = raw.slice(1, -1);
    raw = raw.replace(/""/g, '"');
    try {
      bodyTypes = JSON.parse(raw);
    } catch {
      /* malformed body_styles — skip */
    }
  }

  return { year, make, model, bodyTypes };
}

function mergeEntry(
  brands: BrandMap,
  make: string,
  model: string,
  year: number,
  bodyTypes: string[],
) {
  if (!brands.has(make)) brands.set(make, new Map());
  const models = brands.get(make)!;

  if (!models.has(model)) {
    models.set(model, {
      yearFrom: year,
      yearTo: year,
      bodyTypes: new Set(bodyTypes),
    });
  } else {
    const info = models.get(model)!;
    info.yearFrom = Math.min(info.yearFrom, year);
    info.yearTo = Math.max(info.yearTo, year);
    bodyTypes.forEach((bt) => info.bodyTypes.add(bt));
  }
}

async function fetchCsv(url: string, brands: BrandMap): Promise<number> {
  const filename = url.split('/').pop()!;
  process.stdout.write(`  ${filename} ... `);

  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    console.log('NETWORK ERROR');
    return 0;
  }
  if (!res.ok) {
    console.log(`SKIP (${res.status})`);
    return 0;
  }

  const text = await res.text();
  const lines = text.trim().split('\n');
  let count = 0;

  for (let i = 1; i < lines.length; i++) {
    const p = parseCsvLine(lines[i]);
    if (!p || !p.make || !p.model) continue;
    mergeEntry(brands, p.make, p.model, p.year, p.bodyTypes);
    count++;
  }

  console.log(`${count} rows`);
  return count;
}

// ─── Fetch all CSV sources ───────────────────────────────

async function fetchAllCsvData(): Promise<BrandMap> {
  const brands: BrandMap = new Map();

  console.log('Phase 1: Full archive CSVs');
  for (const url of ARCHIVE_URLS) {
    await fetchCsv(url, brands);
  }

  const beforeCount = [...brands.values()].reduce((s, m) => s + m.size, 0);
  console.log(`  -> ${brands.size} brands, ${beforeCount} models after archives\n`);

  console.log('Phase 2: Year-by-year CSVs (1990–2023)');
  for (let year = 1990; year <= 2023; year++) {
    const url = YEAR_FILE_TEMPLATE.replace('{YEAR}', String(year));
    await fetchCsv(url, brands);
  }

  const afterCount = [...brands.values()].reduce((s, m) => s + m.size, 0);
  console.log(`  -> ${brands.size} brands, ${afterCount} models after year files\n`);

  return brands;
}

// ─── Manual Patches ──────────────────────────────────────

const MANUAL_PATCHES: Record<
  string,
  { model: string; yearFrom: number; yearTo: number; bodyType: string }[]
> = {
  // ── Chinese ──
  Zeekr: [
    { model: '001', yearFrom: 2021, yearTo: 2026, bodyType: 'Liftback' },
    { model: 'X', yearFrom: 2023, yearTo: 2026, bodyType: 'Crossover' },
    { model: '009', yearFrom: 2022, yearTo: 2026, bodyType: 'Minivan' },
  ],
  'Lixiang (Li Auto)': [
    { model: 'L7', yearFrom: 2023, yearTo: 2026, bodyType: 'Crossover' },
    { model: 'L8', yearFrom: 2022, yearTo: 2026, bodyType: 'Crossover' },
    { model: 'L9', yearFrom: 2022, yearTo: 2026, bodyType: 'Crossover' },
  ],
  Voyah: [
    { model: 'Free', yearFrom: 2021, yearTo: 2026, bodyType: 'Crossover' },
    { model: 'Dreamer', yearFrom: 2022, yearTo: 2026, bodyType: 'Minivan' },
  ],
  Geely: [
    { model: 'Monjaro', yearFrom: 2022, yearTo: 2026, bodyType: 'Crossover' },
    { model: 'Tugella', yearFrom: 2020, yearTo: 2026, bodyType: 'Crossover' },
    { model: 'Emgrand', yearFrom: 2009, yearTo: 2026, bodyType: 'Sedan' },
    { model: 'Coolray', yearFrom: 2019, yearTo: 2026, bodyType: 'Crossover' },
    { model: 'Atlas', yearFrom: 2018, yearTo: 2026, bodyType: 'Crossover' },
  ],
  BYD: [
    { model: 'Han', yearFrom: 2020, yearTo: 2026, bodyType: 'Sedan' },
    { model: 'Tang', yearFrom: 2018, yearTo: 2026, bodyType: 'Crossover' },
    { model: 'Song Plus', yearFrom: 2020, yearTo: 2026, bodyType: 'Crossover' },
    { model: 'Dolphin', yearFrom: 2021, yearTo: 2026, bodyType: 'Hatchback' },
    { model: 'Seal', yearFrom: 2022, yearTo: 2026, bodyType: 'Sedan' },
  ],
  Chery: [
    { model: 'Tiggo 4', yearFrom: 2017, yearTo: 2026, bodyType: 'Crossover' },
    { model: 'Tiggo 7 Pro', yearFrom: 2020, yearTo: 2026, bodyType: 'Crossover' },
    { model: 'Tiggo 8 Pro', yearFrom: 2020, yearTo: 2026, bodyType: 'Crossover' },
    { model: 'Arrizo 8', yearFrom: 2022, yearTo: 2026, bodyType: 'Sedan' },
  ],
  Haval: [
    { model: 'Jolion', yearFrom: 2020, yearTo: 2026, bodyType: 'Crossover' },
    { model: 'F7', yearFrom: 2018, yearTo: 2026, bodyType: 'Crossover' },
    { model: 'Dargo', yearFrom: 2021, yearTo: 2026, bodyType: 'Crossover' },
  ],
  Changan: [
    { model: 'UNI-V', yearFrom: 2022, yearTo: 2026, bodyType: 'Liftback' },
    { model: 'CS75 Plus', yearFrom: 2019, yearTo: 2026, bodyType: 'Crossover' },
    { model: 'UNI-K', yearFrom: 2021, yearTo: 2026, bodyType: 'Crossover' },
  ],

  // ── CIS / Отечественный автопром ──
  'LADA (ВАЗ)': [
    { model: '2101', yearFrom: 1970, yearTo: 1988, bodyType: 'Sedan' },
    { model: '2102', yearFrom: 1971, yearTo: 1985, bodyType: 'Wagon' },
    { model: '2103', yearFrom: 1972, yearTo: 1984, bodyType: 'Sedan' },
    { model: '2104', yearFrom: 1984, yearTo: 2012, bodyType: 'Wagon' },
    { model: '2105', yearFrom: 1979, yearTo: 2010, bodyType: 'Sedan' },
    { model: '2106', yearFrom: 1976, yearTo: 2006, bodyType: 'Sedan' },
    { model: '2107', yearFrom: 1982, yearTo: 2012, bodyType: 'Sedan' },
    { model: '2108', yearFrom: 1984, yearTo: 2003, bodyType: 'Hatchback' },
    { model: '2109', yearFrom: 1987, yearTo: 2004, bodyType: 'Hatchback' },
    { model: '21099', yearFrom: 1990, yearTo: 2004, bodyType: 'Sedan' },
    { model: '2110', yearFrom: 1996, yearTo: 2007, bodyType: 'Sedan' },
    { model: '2111', yearFrom: 1998, yearTo: 2009, bodyType: 'Wagon' },
    { model: '2112', yearFrom: 1999, yearTo: 2008, bodyType: 'Hatchback' },
    { model: '2113', yearFrom: 2004, yearTo: 2013, bodyType: 'Hatchback' },
    { model: '2114', yearFrom: 2003, yearTo: 2013, bodyType: 'Hatchback' },
    { model: '2115', yearFrom: 1997, yearTo: 2012, bodyType: 'Sedan' },
    { model: 'Niva (4x4)', yearFrom: 1977, yearTo: 2026, bodyType: 'SUV' },
    { model: 'Granta', yearFrom: 2011, yearTo: 2026, bodyType: 'Sedan' },
    { model: 'Vesta', yearFrom: 2015, yearTo: 2026, bodyType: 'Sedan' },
    { model: 'Largus', yearFrom: 2012, yearTo: 2026, bodyType: 'Wagon' },
    { model: 'Kalina', yearFrom: 2004, yearTo: 2018, bodyType: 'Hatchback' },
    { model: 'Priora', yearFrom: 2007, yearTo: 2018, bodyType: 'Sedan' },
  ],
  'ГАЗ': [
    { model: '24 (Волга)', yearFrom: 1970, yearTo: 1992, bodyType: 'Sedan' },
    { model: '3102', yearFrom: 1981, yearTo: 2008, bodyType: 'Sedan' },
    { model: '3110', yearFrom: 1997, yearTo: 2004, bodyType: 'Sedan' },
    { model: '31105', yearFrom: 2004, yearTo: 2009, bodyType: 'Sedan' },
    { model: 'Газель', yearFrom: 1994, yearTo: 2010, bodyType: 'Van' },
    { model: 'Газель Бизнес', yearFrom: 2010, yearTo: 2026, bodyType: 'Van' },
    { model: 'Газель Next', yearFrom: 2013, yearTo: 2026, bodyType: 'Van' },
    { model: 'Газель NN', yearFrom: 2021, yearTo: 2026, bodyType: 'Van' },
    { model: 'Соболь', yearFrom: 1998, yearTo: 2026, bodyType: 'Van' },
  ],
  'УАЗ': [
    { model: 'Patriot', yearFrom: 2005, yearTo: 2026, bodyType: 'SUV' },
    { model: 'Hunter', yearFrom: 2003, yearTo: 2024, bodyType: 'SUV' },
    { model: '452 (Буханка)', yearFrom: 1970, yearTo: 2026, bodyType: 'Van' },
  ],
  'ЗАЗ': [
    { model: '968 (Запорожец)', yearFrom: 1971, yearTo: 1994, bodyType: 'Sedan' },
    { model: 'Таврия', yearFrom: 1988, yearTo: 2007, bodyType: 'Hatchback' },
    { model: 'Chance', yearFrom: 2009, yearTo: 2014, bodyType: 'Sedan' },
  ],
  'Москвич': [
    { model: '412', yearFrom: 1970, yearTo: 1994, bodyType: 'Sedan' },
    { model: '2140', yearFrom: 1976, yearTo: 1988, bodyType: 'Sedan' },
    { model: '2141', yearFrom: 1986, yearTo: 2003, bodyType: 'Sedan' },
    { model: 'Москвич 3', yearFrom: 2022, yearTo: 2026, bodyType: 'Crossover' },
  ],

  // ── Trucks (Грузовые) ──
  Scania: [
    { model: 'R-series', yearFrom: 2004, yearTo: 2026, bodyType: 'Truck' },
    { model: 'S-series', yearFrom: 2016, yearTo: 2026, bodyType: 'Truck' },
    { model: 'G-series', yearFrom: 2009, yearTo: 2026, bodyType: 'Truck' },
    { model: 'P-series', yearFrom: 2004, yearTo: 2026, bodyType: 'Truck' },
  ],
  MAN: [
    { model: 'TGX', yearFrom: 2007, yearTo: 2026, bodyType: 'Truck' },
    { model: 'TGS', yearFrom: 2007, yearTo: 2026, bodyType: 'Truck' },
    { model: 'TGL', yearFrom: 2005, yearTo: 2026, bodyType: 'Truck' },
    { model: 'TGM', yearFrom: 2005, yearTo: 2026, bodyType: 'Truck' },
  ],
  DAF: [
    { model: 'XF', yearFrom: 1997, yearTo: 2026, bodyType: 'Truck' },
    { model: 'CF', yearFrom: 2001, yearTo: 2026, bodyType: 'Truck' },
    { model: 'LF', yearFrom: 2001, yearTo: 2026, bodyType: 'Truck' },
    { model: 'XG', yearFrom: 2021, yearTo: 2026, bodyType: 'Truck' },
  ],
  'Volvo Trucks': [
    { model: 'FH', yearFrom: 1993, yearTo: 2026, bodyType: 'Truck' },
    { model: 'FM', yearFrom: 1998, yearTo: 2026, bodyType: 'Truck' },
    { model: 'FMX', yearFrom: 2010, yearTo: 2026, bodyType: 'Truck' },
    { model: 'FE', yearFrom: 2006, yearTo: 2026, bodyType: 'Truck' },
  ],
  KamAZ: [
    { model: '5490', yearFrom: 2013, yearTo: 2026, bodyType: 'Truck' },
    { model: '65115', yearFrom: 1998, yearTo: 2026, bodyType: 'Truck' },
    { model: '6520', yearFrom: 2003, yearTo: 2026, bodyType: 'Truck' },
    { model: '43118', yearFrom: 2010, yearTo: 2026, bodyType: 'Truck' },
  ],
  MAZ: [
    { model: '5440', yearFrom: 2008, yearTo: 2026, bodyType: 'Truck' },
    { model: '6430', yearFrom: 2008, yearTo: 2026, bodyType: 'Truck' },
    { model: '4371', yearFrom: 2005, yearTo: 2026, bodyType: 'Truck' },
    { model: '6501', yearFrom: 2012, yearTo: 2026, bodyType: 'Truck' },
  ],

  // ── Buses (Автобусы) ──
  Setra: [
    { model: 'S 515 HD', yearFrom: 2012, yearTo: 2026, bodyType: 'Bus' },
    { model: 'S 516 HD', yearFrom: 2017, yearTo: 2026, bodyType: 'Bus' },
    { model: 'S 431 DT', yearFrom: 2004, yearTo: 2026, bodyType: 'Bus' },
    { model: 'MultiClass', yearFrom: 2005, yearTo: 2026, bodyType: 'Bus' },
  ],
  Neoplan: [
    { model: 'Cityliner', yearFrom: 2006, yearTo: 2026, bodyType: 'Bus' },
    { model: 'Skyliner', yearFrom: 2004, yearTo: 2026, bodyType: 'Bus' },
    { model: 'Tourliner', yearFrom: 2016, yearTo: 2026, bodyType: 'Bus' },
  ],
  PAZ: [
    { model: '3205', yearFrom: 1989, yearTo: 2026, bodyType: 'Bus' },
    { model: '4234', yearFrom: 2003, yearTo: 2026, bodyType: 'Bus' },
    { model: 'Vector Next', yearFrom: 2017, yearTo: 2026, bodyType: 'Bus' },
  ],
};

function buildManualPatchMap(): BrandMap {
  const map: BrandMap = new Map();
  for (const [brandName, models] of Object.entries(MANUAL_PATCHES)) {
    const modelMap = new Map<string, ModelInfo>();
    for (const m of models) {
      modelMap.set(m.model, {
        yearFrom: m.yearFrom,
        yearTo: m.yearTo,
        bodyTypes: new Set([m.bodyType]),
      });
    }
    map.set(brandName, modelMap);
  }
  return map;
}

// ─── Chunked DB seeding ──────────────────────────────────

interface SeedEntry {
  brand: string;
  model: string;
  info: ModelInfo;
}

function flattenBrandMap(data: BrandMap): SeedEntry[] {
  const entries: SeedEntry[] = [];
  for (const [brandName, models] of data) {
    for (const [modelName, info] of models) {
      entries.push({ brand: brandName, model: modelName, info });
    }
  }
  return entries;
}

async function seedChunked(entries: SeedEntry[], label: string) {
  const seenBrands = new Set<string>();
  let modelCount = 0;
  let genCount = 0;
  const totalChunks = Math.ceil(entries.length / CHUNK_SIZE);

  for (let i = 0; i < entries.length; i += CHUNK_SIZE) {
    const chunk = entries.slice(i, i + CHUNK_SIZE);
    const chunkIdx = Math.floor(i / CHUNK_SIZE) + 1;

    for (const entry of chunk) {
      const brand = await prisma.carBrand.upsert({
        where: { name: entry.brand },
        update: {},
        create: { name: entry.brand },
      });
      seenBrands.add(entry.brand);

      const model = await prisma.carModel.upsert({
        where: { brandId_name: { brandId: brand.id, name: entry.model } },
        update: {},
        create: { name: entry.model, brandId: brand.id },
      });
      modelCount++;

      const bodyType = [...entry.info.bodyTypes][0] || null;
      const existing = await prisma.carGeneration.findFirst({
        where: { modelId: model.id },
      });

      if (existing) {
        await prisma.carGeneration.update({
          where: { id: existing.id },
          data: {
            yearFrom: Math.min(existing.yearFrom, entry.info.yearFrom),
            yearTo: Math.max(existing.yearTo ?? entry.info.yearTo, entry.info.yearTo),
            bodyType: bodyType ?? existing.bodyType,
          },
        });
      } else {
        await prisma.carGeneration.create({
          data: {
            name: `${entry.info.yearFrom}–${entry.info.yearTo}`,
            yearFrom: entry.info.yearFrom,
            yearTo: entry.info.yearTo,
            bodyType,
            modelId: model.id,
          },
        });
      }
      genCount++;
    }

    console.log(
      `  [${label}] chunk ${chunkIdx}/${totalChunks}  (${Math.min(i + CHUNK_SIZE, entries.length)}/${entries.length})`,
    );
  }

  return { brandCount: seenBrands.size, modelCount, genCount };
}

// ─── Main ────────────────────────────────────────────────

async function main() {
  console.log('=== Shukai Car Database Seeder ===\n');

  // Phase 1+2: CSV data
  const csvData = await fetchAllCsvData();

  console.log('Seeding CSV data into DB...');
  const csvEntries = flattenBrandMap(csvData);
  const csv = await seedChunked(csvEntries, 'CSV');

  // Phase 3: Rename legacy brands before patching
  const BRAND_RENAMES: [string, string][] = [
    ['Lada', 'LADA (ВАЗ)'],
    ['GAZ', 'ГАЗ'],
  ];
  console.log('\nRenaming legacy brands...');
  for (const [oldName, newName] of BRAND_RENAMES) {
    const old = await prisma.carBrand.findUnique({ where: { name: oldName } });
    if (!old) continue;
    try {
      await prisma.carBrand.update({ where: { id: old.id }, data: { name: newName } });
      console.log(`  "${oldName}" → "${newName}"`);
    } catch {
      console.log(`  Skip "${oldName}" → "${newName}" (already exists)`);
    }
  }

  // Phase 4: Manual patches (Chinese, CIS, Trucks, Buses)
  console.log('\nSeeding manual patches (Chinese, CIS, Trucks, Buses)...');
  const patchData = buildManualPatchMap();
  const patchEntries = flattenBrandMap(patchData);
  const patch = await seedChunked(patchEntries, 'Patch');

  // Final tally from DB
  const totalBrands = await prisma.carBrand.count();
  const totalModels = await prisma.carModel.count();
  const totalGens = await prisma.carGeneration.count();

  console.log('\n=== Seeding complete! ===');
  console.log(
    `  CSV   -> Brands: ${csv.brandCount}, Models: ${csv.modelCount}, Gens: ${csv.genCount}`,
  );
  console.log(
    `  Patch -> Brands: ${patch.brandCount}, Models: ${patch.modelCount}, Gens: ${patch.genCount}`,
  );
  console.log(`\n  Итого в базе: ${totalModels} моделей (${totalBrands} брендов, ${totalGens} поколений)`);
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
