import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, "..", "public", "tiles", "pavers", "30x30");
const albedoPath = path.join(targetDir, "albedo.png");
const heightPath = path.join(targetDir, "height.png");
const roughnessPath = path.join(targetDir, "roughness.png");
const aoPath = path.join(targetDir, "ao.png");
const normalPath = path.join(targetDir, "normal.png");

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

const { info } = await sharp(albedoPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const gray = await sharp(albedoPath).grayscale().blur(1.35).raw().toBuffer();
const { width, height } = info;

const luma = new Float32Array(width * height);
for (let i = 0; i < width * height; i += 1) {
  luma[i] = gray[i] / 255;
}

const heightBuf = Buffer.alloc(width * height);
const roughBuf = Buffer.alloc(width * height);
const aoBuf = Buffer.alloc(width * height);
const normalBuf = Buffer.alloc(width * height * 3);

const k = 3.2;

const sample = (x, y) => {
  const sx = clamp(x, 0, width - 1);
  const sy = clamp(y, 0, height - 1);
  return luma[sy * width + sx];
};

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const i = y * width + x;
    const v = luma[i];
    const groove = clamp((0.78 - v) * 4.8, -1.15, 1.15);

    const hVal = clamp(Math.round(138 - groove * 118), 16, 246);
    const rVal = clamp(Math.round(168 + groove * 64), 82, 242);
    const aVal = clamp(Math.round(236 - groove * 130), 20, 252);
    heightBuf[i] = hVal;
    roughBuf[i] = rVal;
    aoBuf[i] = aVal;

    const left = sample(x - 1, y);
    const right = sample(x + 1, y);
    const up = sample(x, y - 1);
    const down = sample(x, y + 1);
    const dx = (right - left) * k;
    const dy = (down - up) * k;
    let nx = -dx;
    let ny = -dy;
    let nz = 1;
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len;
    ny /= len;
    nz /= len;
    const no = i * 3;
    normalBuf[no] = Math.round((nx * 0.5 + 0.5) * 255);
    normalBuf[no + 1] = Math.round((ny * 0.5 + 0.5) * 255);
    normalBuf[no + 2] = Math.round((nz * 0.5 + 0.5) * 255);
  }
}

await sharp(heightBuf, { raw: { width, height, channels: 1 } }).png().toFile(heightPath);
await sharp(roughBuf, { raw: { width, height, channels: 1 } }).png().toFile(roughnessPath);
await sharp(aoBuf, { raw: { width, height, channels: 1 } }).png().toFile(aoPath);
await sharp(normalBuf, { raw: { width, height, channels: 3 } }).png().toFile(normalPath);

console.log("Generated circle maps:", { heightPath, roughnessPath, aoPath, normalPath });
