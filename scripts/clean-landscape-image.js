const sharp = require("sharp");

const SOURCE = "d:/rurs kod/linia-granita/public/landscape/base-annotated.png";
const TARGET = "d:/rurs kod/linia-granita/public/landscape/base-clean-v3.jpg";

function idx(x, y, width) {
  return (y * width + x) * 3;
}

function isDark(r, g, b) {
  return r < 110 && g < 110 && b < 110;
}

function isMostlyNeutral(r, g, b) {
  return Math.abs(r - g) < 18 && Math.abs(r - b) < 18 && Math.abs(g - b) < 18;
}

function sampleNeighborAverage(input, x, y, width, height) {
  let sr = 0;
  let sg = 0;
  let sb = 0;
  let c = 0;

  for (let dy = -3; dy <= 3; dy++) {
    for (let dx = -3; dx <= 3; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const n = idx(nx, ny, width);
      const r = input[n];
      const g = input[n + 1];
      const b = input[n + 2];
      if (isDark(r, g, b)) continue;
      sr += r;
      sg += g;
      sb += b;
      c++;
    }
  }

  if (c === 0) return null;
  return [Math.round(sr / c), Math.round(sg / c), Math.round(sb / c)];
}

async function main() {
  const image = sharp(SOURCE);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.from(data);
  const { width, height, channels } = info;

  if (channels < 3) {
    throw new Error("Unexpected channel count");
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = idx(x, y, width);
      const r = out[i];
      const g = out[i + 1];
      const b = out[i + 2];

      // Remove annotation text and guide lines in upper zones while preserving object body.
      const upperLabelZone = y < 250;
      const midGuideZone = y >= 160 && y < 330 && x > 240 && x < 980;
      const shouldClean =
        (upperLabelZone && isDark(r, g, b) && isMostlyNeutral(r, g, b)) ||
        (midGuideZone && isDark(r, g, b) && isMostlyNeutral(r, g, b) && r < 80);

      if (!shouldClean) continue;

      const avg = sampleNeighborAverage(out, x, y, width, height);
      if (!avg) continue;

      out[i] = avg[0];
      out[i + 1] = avg[1];
      out[i + 2] = avg[2];
    }
  }

  await sharp(out, { raw: { width, height, channels: 3 } })
    .blur(0.5)
    .jpeg({ quality: 94 })
    .toFile(TARGET);

  console.log(`Saved: ${TARGET}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
