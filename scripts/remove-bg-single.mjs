import sharp from "sharp";

const inputPath = process.argv[2] ?? "public/monuments/single-reference.png";
const outputPath = process.argv[3] ?? "public/monuments/single-reference-cutout.png";

const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

const pixelCount = width * height;
const visited = new Uint8Array(pixelCount);
const queue = new Int32Array(pixelCount);

function idx(x, y) {
  return y * width + x;
}

function colorAt(pos) {
  const i = pos * channels;
  return [data[i], data[i + 1], data[i + 2]];
}

const corners = [
  colorAt(idx(0, 0)),
  colorAt(idx(width - 1, 0)),
  colorAt(idx(0, height - 1)),
  colorAt(idx(width - 1, height - 1)),
];

const bg = corners.reduce(
  (acc, [r, g, b]) => [acc[0] + r, acc[1] + g, acc[2] + b],
  [0, 0, 0],
).map((v) => v / corners.length);

function isBgLike(pos) {
  const i = pos * channels;
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const dr = r - bg[0];
  const dg = g - bg[1];
  const db = b - bg[2];
  const dist = Math.sqrt(dr * dr + dg * dg + db * db);
  const grayDelta = Math.max(r, g, b) - Math.min(r, g, b);
  return dist < 42 && grayDelta < 30;
}

let head = 0;
let tail = 0;

for (let x = 0; x < width; x++) {
  const top = idx(x, 0);
  const bottom = idx(x, height - 1);
  if (!visited[top] && isBgLike(top)) {
    visited[top] = 1;
    queue[tail++] = top;
  }
  if (!visited[bottom] && isBgLike(bottom)) {
    visited[bottom] = 1;
    queue[tail++] = bottom;
  }
}

for (let y = 1; y < height - 1; y++) {
  const left = idx(0, y);
  const right = idx(width - 1, y);
  if (!visited[left] && isBgLike(left)) {
    visited[left] = 1;
    queue[tail++] = left;
  }
  if (!visited[right] && isBgLike(right)) {
    visited[right] = 1;
    queue[tail++] = right;
  }
}

while (head < tail) {
  const p = queue[head++];
  const x = p % width;
  const y = (p - x) / width;
  const neighbors = [
    x > 0 ? p - 1 : -1,
    x < width - 1 ? p + 1 : -1,
    y > 0 ? p - width : -1,
    y < height - 1 ? p + width : -1,
  ];

  for (const n of neighbors) {
    if (n >= 0 && !visited[n] && isBgLike(n)) {
      visited[n] = 1;
      queue[tail++] = n;
    }
  }
}

for (let p = 0; p < pixelCount; p++) {
  const alphaIndex = p * channels + 3;
  if (visited[p]) {
    data[alphaIndex] = 0;
  } else {
    const x = p % width;
    const y = (p - x) / width;
    const neighbors = [
      x > 0 ? p - 1 : -1,
      x < width - 1 ? p + 1 : -1,
      y > 0 ? p - width : -1,
      y < height - 1 ? p + width : -1,
    ];
    if (neighbors.some((n) => n >= 0 && visited[n])) {
      data[alphaIndex] = Math.min(data[alphaIndex], 150);
    }
  }
}

await sharp(data, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

