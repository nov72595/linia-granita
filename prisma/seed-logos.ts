import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { createClient } from '@supabase/supabase-js';

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});
const prisma = new PrismaClient({ adapter });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const LOGO_BUCKET = 'brand-logos';

const BRAND_DOMAINS: Record<string, string> = {
  'Volkswagen': 'volkswagen.com',
  'BMW': 'bmw.com',
  'Audi': 'audi.com',
  'Mercedes-Benz': 'mercedes-benz.com',
  'Toyota': 'toyota.com',
  'Honda': 'honda.com',
  'Nissan': 'nissan.co.jp',
  'Mazda': 'mazda.com',
  'Mitsubishi': 'mitsubishi-motors.com',
  'Subaru': 'subaru.com',
  'Suzuki': 'globalsuzuki.com',
  'Lexus': 'lexus.com',
  'Infiniti': 'infiniti.com',
  'Acura': 'acura.com',
  'Daihatsu': 'daihatsu.com',
  'Isuzu': 'isuzu.com',
  'Hyundai': 'hyundai.com',
  'Kia': 'kia.com',
  'Genesis': 'genesis.com',
  'SsangYong': 'smotor.com',
  'Daewoo': 'gm-uzbekistan.com',
  'Renault': 'renault.com',
  'Peugeot': 'peugeot.com',
  'Citroën': 'citroen.com',
  'Opel': 'opel.com',
  'Fiat': 'fiat.com',
  'Alfa Romeo': 'alfaromeo.com',
  'Ferrari': 'ferrari.com',
  'Lamborghini': 'lamborghini.com',
  'Maserati': 'maserati.com',
  'Porsche': 'porsche.com',
  'Volvo': 'volvocars.com',
  'Škoda': 'skoda-auto.com',
  'SEAT': 'seat.com',
  'MINI': 'mini.com',
  'Jaguar': 'jaguar.com',
  'Land Rover': 'landrover.com',
  'Bentley': 'bentleymotors.com',
  'Rolls-Royce': 'rolls-roycemotorcars.com',
  'Aston Martin': 'astonmartin.com',
  'McLaren': 'mclaren.com',
  'Smart': 'smart.com',
  'Saab': 'saab.com',
  'Dacia': 'dacia.com',
  'DS': 'dsautomobiles.com',
  'Cupra': 'cupraofficial.com',
  'Alpine': 'alpinecars.com',
  'Lotus': 'lotuscars.com',
  'Polestar': 'polestar.com',
  'Lancia': 'lancia.com',
  'Rover': 'landrover.com',
  'Geely': 'global.geely.com',
  'Chery': 'cheryinternational.com',
  'Haval': 'haval.com.cn',
  'Changan': 'globalchangan.com',
  'BYD': 'byd.com',
  'Zeekr': 'zeekrlife.com',
  'Li Auto': 'lixiang.com',
  'Great Wall': 'gwm.com.cn',
  'GAC': 'gac-motor.com',
  'Dongfeng': 'dongfeng-global.com',
  'JAC': 'jacmotors.com',
  'FAW Bestune': 'faw.com',
  'BAIC': 'baicgroup.com.cn',
  'Hongqi': 'hongqi-auto.com',
  'Tank': 'tanksuv.com',
  'Jetour': 'jetour.com',
  'Exeed': 'exeedauto.com',
  'Omoda': 'omoda.com',
  'Voyah': 'voyah.com',
  'NIO': 'nio.com',
  'XPeng': 'xpeng.com',
  'HiPhi': 'hiphi.com',
  'Avatr': 'avatr.com',
  'MG': 'mgmotor.com',
  'Maxus': 'saicmaxus.com',
  'Foton': 'foton.com.cn',
  'Zotye': 'zotye.com',
  'Lifan': 'lifan.com',
  'Brilliance': 'brilliance-auto.com',
  'Lynk & Co': 'lynkco.com',
  'Ora': 'oraev.com',
  'Wey': 'wey.com',
  'Deepal': 'deepal.com.cn',
  'Leapmotor': 'leapmotor.com',
  'NETA': 'netauto.com',
  'JAECOO': 'jaecoo.com',
  'Denza': 'denza.com',
  'Ford': 'ford.com',
  'Chevrolet': 'chevrolet.com',
  'Jeep': 'jeep.com',
  'Dodge': 'dodge.com',
  'Chrysler': 'chrysler.com',
  'Cadillac': 'cadillac.com',
  'Lincoln': 'lincoln.com',
  'GMC': 'gmc.com',
  'Buick': 'buick.com',
  'Tesla': 'tesla.com',
  'Hummer': 'gmc.com',
  'RAM': 'ramtrucks.com',
  'LADA (ВАЗ)': 'lada.ru',
  'ГАЗ': 'azgaz.ru',
  'УАЗ': 'uaz.ru',
  'KamAZ': 'kamaz.ru',
  'MAZ': 'maz.by',
  'Scania': 'scania.com',
  'MAN': 'man.eu',
  'DAF': 'daf.com',
  'Volvo Trucks': 'volvotrucks.com',
  'Iveco': 'iveco.com',
  'Renault Trucks': 'renault-trucks.com',
  'Setra': 'setra.de',
  'Neoplan': 'neoplan.info',
  'КамАЗ': 'kamaz.ru',
  'МАЗ': 'maz.by',
  'ПАЗ': 'paz-auto.ru',
  'ЛиАЗ': 'liaz.info',
  'Москвич': 'moskvich.com',
  'Seres': 'seresauto.com',
  'Kaiyi': 'kaiyi.com',
  'Soueast': 'soueast-motor.com',
  'Wuling': 'wuling.com',
  'Rising': 'rising-auto.com',
  'AITO': 'aito.com',
  'Skywell': 'skywell.com',
  'Forthing': 'forthing.com.cn',
  'Aiways': 'ai-ways.com',
  'Arcfox': 'arcfox.com',
  'BAW': 'baw.com.cn',
  'Belgee': 'belgee.by',
  'Bugatti': 'bugatti.com',
  'Changhe': 'changhe.com.cn',
  'DFSK': 'dfsk.com',
  'Eagle': 'eaglecars.com',
  'Evolute': 'evolute-car.ru',
  'FIAT': 'fiat.com',
  'Fisker': 'fiskerinc.com',
  'Freightliner': 'freightliner.com',
  'GAC Aion': 'aion.com.cn',
  'GAZ': 'azgaz.ru',
  'Geo': 'chevrolet.com',
  'Hafei': 'hafei.com',
  'Haima': 'haima.com',
  'HUMMER': 'gmc.com',
  'INFINITI': 'infiniti.com',
  'Iran Khodro': 'ikco.ir',
  'Lada': 'lada.ru',
  'Livan': 'livan-auto.com',
  'Lixiang (Li Auto)': 'lixiang.com',
  'Lucid': 'lucidmotors.com',
  'Mahindra': 'mahindra.com',
  'Maybach': 'mercedes-benz.com',
  'MAZDA': 'mazda.com',
  'Mercury': 'ford.com',
  'Moskvich': 'moskvich.com',
  'Oldsmobile': 'gm.com',
  'Panoz': 'panoz.com',
  'PAZ': 'paz-auto.ru',
  'Plymouth': 'chrysler.com',
  'Pontiac': 'gm.com',
  'Proton': 'proton.com',
  'Ram': 'ramtrucks.com',
  'Ravon': 'ravon.com',
  'Rivian': 'rivian.com',
  'Saturn': 'gm.com',
  'Scion': 'toyota.com',
  'smart': 'smart.com',
  'SRT': 'dodge.com',
  'TagAZ': 'tagaz.ru',
  'Tata': 'tatamotors.com',
  'UAZ': 'uaz.ru',
  'VinFast': 'vinfast.com',
  'Vortex': 'cheryinternational.com',
  'ZAZ': 'zaz.com.ua',
  'ЗАЗ': 'zaz.com.ua',
  'DerWays': 'derways.ru',
};

function getClearbitUrl(domain: string): string {
  return `https://logo.clearbit.com/${domain}`;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[àáâãäåа-яё]/g, c => {
      const map: Record<string, string> = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
        'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
      };
      return map[c] ?? c;
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;

    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.startsWith('image/')) return null;

    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

async function ensureBucket() {
  const { data } = await supabase.storage.getBucket(LOGO_BUCKET);
  if (!data) {
    const { error } = await supabase.storage.createBucket(LOGO_BUCKET, {
      public: true,
      fileSizeLimit: 512 * 1024,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'],
    });
    if (error && !error.message.includes('already exists')) {
      console.error('  ⚠ Could not create bucket:', error.message);
      return false;
    }
  }
  return true;
}

async function uploadToSupabase(brandSlug: string, imageBuffer: Buffer, contentType: string): Promise<string | null> {
  const ext = contentType.includes('svg') ? 'svg'
    : contentType.includes('png') ? 'png'
    : contentType.includes('webp') ? 'webp'
    : 'png';
  const filePath = `${brandSlug}.${ext}`;

  const { error } = await supabase.storage
    .from(LOGO_BUCKET)
    .upload(filePath, imageBuffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error(`  ⚠ Upload failed for ${brandSlug}: ${error.message}`);
    return null;
  }

  const { data } = supabase.storage.from(LOGO_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

const DIRECT_MODE = process.argv.includes('--direct');

async function main() {
  console.log('🖼  Car brand logo seeding\n');

  if (DIRECT_MODE) {
    console.log('   Mode: DIRECT (saving CDN URLs without uploading to Supabase)\n');
  } else {
    console.log('   Mode: UPLOAD (downloading → Supabase Storage → DB)\n');
    const ok = await ensureBucket();
    if (!ok) {
      console.log('   Falling back to DIRECT mode.\n');
    }
  }

  const brands = await prisma.carBrand.findMany({ orderBy: { name: 'asc' } });
  console.log(`   Found ${brands.length} brands in DB\n`);

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const brand of brands) {
    const domain = BRAND_DOMAINS[brand.name];
    if (!domain) {
      console.log(`  ⏭  ${brand.name} — no domain mapping, skipped`);
      skipped++;
      continue;
    }

    const sourceUrl = getClearbitUrl(domain);

    if (DIRECT_MODE) {
      await prisma.carBrand.update({
        where: { id: brand.id },
        data: { logoUrl: sourceUrl },
      });
      console.log(`  ✅ ${brand.name} → ${sourceUrl}`);
      updated++;
      continue;
    }

    const imageBuffer = await downloadImage(sourceUrl);
    if (!imageBuffer) {
      console.log(`  ❌ ${brand.name} — download failed (${sourceUrl})`);
      await prisma.carBrand.update({
        where: { id: brand.id },
        data: { logoUrl: sourceUrl },
      });
      failed++;
      continue;
    }

    const slug = slugify(brand.name);
    const publicUrl = await uploadToSupabase(slug, imageBuffer, 'image/png');

    if (publicUrl) {
      await prisma.carBrand.update({
        where: { id: brand.id },
        data: { logoUrl: publicUrl },
      });
      console.log(`  ✅ ${brand.name} → uploaded (${(imageBuffer.length / 1024).toFixed(1)} KB)`);
      updated++;
    } else {
      await prisma.carBrand.update({
        where: { id: brand.id },
        data: { logoUrl: sourceUrl },
      });
      console.log(`  ⚠  ${brand.name} → fallback to CDN URL`);
      updated++;
    }

    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n🏁 Done!`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Failed:  ${failed}`);
}

main()
  .catch((e) => {
    console.error('❌ Logo seeding failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
