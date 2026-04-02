"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, RoundedBox, useTexture } from "@react-three/drei";

type MonumentType = "single" | "double" | "combo";
type MaterialKey = "gabbro" | "pokost";
type PlatformKey = "tile" | "granite" | "keramogranit" | "ground";

type ConstructorSceneProps = {
  plotLength: number;
  plotWidth: number;
  monumentType: MonumentType;
  singleModel: string;
  steleMaterial: MaterialKey;
  platformMaterial: PlatformKey;
  hasCurb: boolean;
};

function materialColor(material: MaterialKey) {
  if (material === "pokost") return "#7d8187";
  return "#1a1a1a";
}

function platformColor(material: PlatformKey) {
  if (material === "ground") return "#6e8f62";
  if (material === "granite") return "#202124";
  if (material === "keramogranit") return "#7f8388";
  return "#8b8f95";
}

function makeSoilGrassTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#638459";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 9000; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const g = 90 + Math.floor(Math.random() * 55);
    ctx.fillStyle = `rgba(${55 + (g % 20)},${g},${55 + (g % 15)},0.22)`;
    ctx.fillRect(x, y, 2, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  return texture;
}

function monumentScale(type: MonumentType) {
  if (type === "double") return 1.14;
  if (type === "combo") return 1.22;
  return 1;
}

function makeTileTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#8c9299";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const size = 128;
  ctx.strokeStyle = "#707780";
  ctx.lineWidth = 6;
  for (let y = 0; y <= canvas.height; y += size) {
    for (let x = 0; x <= canvas.width; x += size) {
      const offset = (y / size) % 2 === 0 ? 0 : size / 2;
      ctx.strokeRect(x + offset, y, size, size);
    }
  }

  // Slight stone noise for less "flat" look.
  for (let i = 0; i < 40000; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const v = 128 + Math.floor(Math.random() * 45);
    ctx.fillStyle = `rgba(${v},${v},${v + 8},0.09)`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  return texture;
}

function makeGraniteMaps() {
  const size = 1024;

  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = size;
  colorCanvas.height = size;
  const colorCtx = colorCanvas.getContext("2d");
  if (!colorCtx) return null;

  // Gabbro-diabase look: very dark base + visible light crystals.
  colorCtx.fillStyle = "#0e1116";
  colorCtx.fillRect(0, 0, size, size);

  // Medium dark grains
  for (let i = 0; i < 90000; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const g = 30 + Math.floor(Math.random() * 35);
    colorCtx.fillStyle = `rgba(${g},${g + 2},${g + 8},0.3)`;
    colorCtx.fillRect(x, y, 1.2, 1.2);
  }

  // Brighter crystalline inclusions (visible texture)
  for (let i = 0; i < 24000; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const s = 1.2 + Math.random() * 2.4;
    const c = 150 + Math.floor(Math.random() * 70);
    colorCtx.fillStyle = `rgba(${c},${c + 3},${c + 10},0.36)`;
    colorCtx.fillRect(x, y, s, s);
  }

  // A few larger flakes
  for (let i = 0; i < 2600; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const s = 2.5 + Math.random() * 4;
    const c = 165 + Math.floor(Math.random() * 65);
    colorCtx.fillStyle = `rgba(${c},${c + 5},${c + 14},0.28)`;
    colorCtx.fillRect(x, y, s, s);
  }

  const roughCanvas = document.createElement("canvas");
  roughCanvas.width = size;
  roughCanvas.height = size;
  const roughCtx = roughCanvas.getContext("2d");
  if (!roughCtx) return null;
  roughCtx.fillStyle = "#383838";
  roughCtx.fillRect(0, 0, size, size);
  for (let i = 0; i < 50000; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const v = 35 + Math.floor(Math.random() * 85);
    roughCtx.fillStyle = `rgb(${v},${v},${v})`;
    roughCtx.fillRect(x, y, 2.4, 2.4);
  }

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext("2d");
  if (!bumpCtx) return null;
  bumpCtx.fillStyle = "#7f7f7f";
  bumpCtx.fillRect(0, 0, size, size);
  for (let i = 0; i < 75000; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const v = 70 + Math.floor(Math.random() * 120);
    bumpCtx.fillStyle = `rgb(${v},${v},${v})`;
    bumpCtx.fillRect(x, y, 1.6, 1.6);
  }

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  [colorMap, roughnessMap, bumpMap].forEach((t) => {
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 16;
  });
  colorMap.colorSpace = THREE.SRGBColorSpace;
  return { colorMap, roughnessMap, bumpMap };
}

function makePokostMaps() {
  const size = 1024;

  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = size;
  colorCanvas.height = size;
  const colorCtx = colorCanvas.getContext("2d");
  if (!colorCtx) return null;

  colorCtx.fillStyle = "#7f868f";
  colorCtx.fillRect(0, 0, size, size);
  for (let i = 0; i < 52000; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const c = 105 + Math.floor(Math.random() * 65);
    colorCtx.fillStyle = `rgba(${c},${c + 2},${c + 5},0.28)`;
    colorCtx.fillRect(x, y, 2, 2);
  }

  const roughCanvas = document.createElement("canvas");
  roughCanvas.width = size;
  roughCanvas.height = size;
  const roughCtx = roughCanvas.getContext("2d");
  if (!roughCtx) return null;
  roughCtx.fillStyle = "#8f8f8f";
  roughCtx.fillRect(0, 0, size, size);
  for (let i = 0; i < 42000; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const v = 80 + Math.floor(Math.random() * 80);
    roughCtx.fillStyle = `rgb(${v},${v},${v})`;
    roughCtx.fillRect(x, y, 2.2, 2.2);
  }

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext("2d");
  if (!bumpCtx) return null;
  bumpCtx.fillStyle = "#808080";
  bumpCtx.fillRect(0, 0, size, size);
  for (let i = 0; i < 45000; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const v = 85 + Math.floor(Math.random() * 90);
    bumpCtx.fillStyle = `rgb(${v},${v},${v})`;
    bumpCtx.fillRect(x, y, 1.8, 1.8);
  }

  const colorMap = new THREE.CanvasTexture(colorCanvas);
  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  [colorMap, roughnessMap, bumpMap].forEach((t) => {
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 16;
  });
  colorMap.colorSpace = THREE.SRGBColorSpace;

  return { colorMap, roughnessMap, bumpMap };
}

function buildNeutralGabbroMap(source: THREE.Texture) {
  const image = source.image as CanvasImageSource | undefined;
  if (!image) return null;

  const srcSize = 512;
  const src = document.createElement("canvas");
  src.width = srcSize;
  src.height = srcSize;
  const srcCtx = src.getContext("2d");
  if (!srcCtx) return null;
  srcCtx.drawImage(image, 0, 0, srcSize, srcSize);

  // Build a larger synthesized texture from random mirrored patches
  // to remove obvious repetition from a single source tile.
  const outSize = 2048;
  const canvas = document.createElement("canvas");
  canvas.width = outSize;
  canvas.height = outSize;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.fillStyle = "#12161a";
  ctx.fillRect(0, 0, outSize, outSize);

  const patch = 128;
  for (let y = 0; y < outSize; y += patch) {
    for (let x = 0; x < outSize; x += patch) {
      const sx = Math.floor(Math.random() * (srcSize - patch));
      const sy = Math.floor(Math.random() * (srcSize - patch));
      const flipX = Math.random() > 0.5 ? -1 : 1;
      const flipY = Math.random() > 0.5 ? -1 : 1;

      ctx.save();
      ctx.translate(x + patch / 2, y + patch / 2);
      ctx.scale(flipX, flipY);
      ctx.drawImage(src, sx, sy, patch, patch, -patch / 2, -patch / 2, patch, patch);
      ctx.restore();
    }
  }

  // Mild grain overlay to break seam perception.
  for (let i = 0; i < 120000; i += 1) {
    const x = Math.random() * outSize;
    const y = Math.random() * outSize;
    const v = 90 + Math.floor(Math.random() * 95);
    ctx.fillStyle = `rgba(${v},${v + 1},${v + 4},0.045)`;
    ctx.fillRect(x, y, 2.2, 2.2);
  }

  const imageData = ctx.getImageData(0, 0, outSize, outSize);
  const d = imageData.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    const boosted = Math.max(10, Math.min(240, (gray - 128) * 1.18 + 116));
    d[i] = Math.min(255, boosted * 1.03);
    d[i + 1] = boosted;
    d[i + 2] = boosted * 0.91;
  }
  ctx.putImageData(imageData, 0, 0);

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;
  return tex;
}

function makeSingleSteleShape(width: number, height: number, modelNumber: number) {
  const left = -width / 2;
  const right = width / 2;
  const bottom = -height / 2;
  const top = height / 2;
  const r = Math.min(width * 0.24, height * 0.2);
  const s = new THREE.Shape();
  s.moveTo(left, bottom);

  // Hand-tuned silhouettes for the first key models.
  if (modelNumber === 1) {
    // V-1: strict straight rectangular stele (no rounded crown).
    s.lineTo(left, top);
    s.lineTo(right, top);
  } else if (modelNumber === 2) {
    // V-2: straight left edge, smooth crowned top, rounded right shoulder.
    const leftTopY = top - r * 0.62;
    const rightTopY = top - r * 0.08;
    const rightShoulderY = top - r * 0.95;
    s.lineTo(left, leftTopY);
    s.quadraticCurveTo(
      left + width * 0.42,
      top - r * 0.36,
      right - r * 0.48,
      rightTopY
    );
    s.quadraticCurveTo(right, top - r * 0.15, right, rightShoulderY);
  } else if (modelNumber === 4) {
    // V-4: softer crown with slight left rounding.
    const lr = r * 0.55;
    s.lineTo(left, top - lr);
    s.quadraticCurveTo(left, top, left + lr, top);
    s.lineTo(right - r * 0.9, top);
    s.quadraticCurveTo(right, top, right, top - r * 0.9);
  } else if (modelNumber === 10) {
    // V-10: stepped/slanted top profile.
    s.lineTo(left, top - r * 0.3);
    s.quadraticCurveTo(left, top, left + r * 0.5, top);
    s.lineTo(right - r * 0.2, top - r * 0.08);
    s.lineTo(right, top - r * 1.05);
  } else {
    // Fallback family profiles by buckets (temporary until per-model pass).
    const bucket = modelNumber % 5;
    if (bucket === 0) {
      s.lineTo(left, top);
      s.lineTo(right - r, top);
      s.quadraticCurveTo(right, top, right, top - r);
    } else if (bucket === 1) {
      s.lineTo(left, top - r * 0.45);
      s.quadraticCurveTo(left, top, left + r * 0.65, top);
      s.lineTo(right - r, top);
      s.quadraticCurveTo(right, top, right, top - r);
    } else if (bucket === 2) {
      s.lineTo(left, top - r * 0.7);
      s.quadraticCurveTo(left, top, left + r, top);
      s.lineTo(right, top);
    } else if (bucket === 3) {
      s.lineTo(left, top);
      s.lineTo(right - r * 0.45, top);
      s.quadraticCurveTo(right, top - r * 0.08, right, top - r);
    } else {
      s.lineTo(left, top - r * 0.25);
      s.quadraticCurveTo(left, top, left + r * 0.45, top);
      s.lineTo(right - r * 0.6, top - r * 0.05);
      s.quadraticCurveTo(right, top - r * 0.2, right, top - r * 0.85);
    }
  }

  s.lineTo(right, bottom);
  s.closePath();
  return s;
}

function makeDoubleSteleShape(width: number, height: number) {
  const r = Math.min(width * 0.22, height * 0.14);
  const s = new THREE.Shape();
  s.moveTo(-width / 2, -height / 2);
  s.lineTo(-width / 2, height / 2 - r);
  s.quadraticCurveTo(-width / 2, height / 2, -width / 2 + r, height / 2);
  s.lineTo(width / 2 - r, height / 2);
  s.quadraticCurveTo(width / 2, height / 2, width / 2, height / 2 - r);
  s.lineTo(width / 2, -height / 2);
  s.closePath();
  return s;
}


function SceneContent({
  plotLength,
  plotWidth,
  monumentType,
  singleModel,
  steleMaterial,
  platformMaterial,
  hasCurb,
}: ConstructorSceneProps) {
  const safeLength = Math.max(1.9, plotLength);
  const safeWidth = Math.max(1.4, plotWidth);
  const scale = monumentScale(monumentType);
  const tileTexture = useMemo(() => makeTileTexture(), []);
  const graniteMaps = useMemo(() => makeGraniteMaps(), []);
  const pokostMaps = useMemo(() => makePokostMaps(), []);
  const gabbroColorMap = useTexture("/generated/gabbro-diabase-ref.png");
  const gabbroNeutralMap = useMemo(
    () => buildNeutralGabbroMap(gabbroColorMap),
    [gabbroColorMap, gabbroColorMap.image]
  );
  const grassGroundTexture = useMemo(() => makeSoilGrassTexture(), []);
  const groundOnly = platformMaterial === "ground";

  const slabHeight = groundOnly ? 0 : 0.14;
  const tileTopHeight = groundOnly ? 0 : 0.02;
  const edgeInset = 0.18;
  const tileLen = Math.max(0.95, safeLength - edgeInset * 2);
  const tileWid = Math.max(0.8, safeWidth - edgeInset * 2);

  const borderWidth = 0.08; // 8 cm
  const borderHeight = 0.2; // 20 cm

  // Single monument dimensions provided by user (cm -> m):
  // stele: 100x50x5, base (tumba): 50x20x15 (H=20, W=15), flowerbed bars: 100x8x5 and 50x8x5.
  const SINGLE_STELE_H = 1.0;
  const SINGLE_STELE_W = 0.5;
  const SINGLE_STELE_D = 0.05;
  const SINGLE_BASE_L = 0.5;
  const SINGLE_BASE_H = 0.2;
  const SINGLE_BASE_W = 0.15;
  const FLOWER_LONG_L = 1.0;
  const FLOWER_SHORT_L = 0.5;
  const FLOWER_BAR_H = 0.08;
  const FLOWER_BAR_W = 0.05;

  const monumentBaseWidth = monumentType === "double" ? 0.98 : SINGLE_BASE_L;
  const monumentBaseDepth = monumentType === "double" ? 0.24 : SINGLE_BASE_W;
  const monumentBaseHeight = monumentType === "double" ? 0.085 : SINGLE_BASE_H;
  const podiumHeight = monumentType === "single" ? 0 : 0.035;
  const podiumDepth = 0.32;
  const podiumWidth = monumentBaseWidth + 0.08;

  const steleHeight = monumentType === "double" ? 0.9 * scale : SINGLE_STELE_H;
  const steleWidth = monumentType === "double" ? 0.68 * scale : SINGLE_STELE_W;
  const steleDepth = monumentType === "double" ? 0.07 : SINGLE_STELE_D;

  const singleModelNumber = Number(singleModel.replace(/[^\d]/g, "")) || 1;
  const singleShape = useMemo(
    () => makeSingleSteleShape(steleWidth, steleHeight, Math.max(1, singleModelNumber)),
    [singleModelNumber, steleHeight, steleWidth]
  );
  const doubleShape = useMemo(() => makeDoubleSteleShape(steleWidth, steleHeight), [steleHeight, steleWidth]);

  if (tileTexture) {
    tileTexture.repeat.set(Math.max(2, tileLen / 0.3), Math.max(2, tileWid / 0.3)); // 30x30 cm
  }
  if (graniteMaps) {
    graniteMaps.roughnessMap.repeat.set(1.15, 2.2);
    graniteMaps.bumpMap.repeat.set(1.15, 2.2);
  }
  if (pokostMaps) {
    pokostMaps.colorMap.repeat.set(2.2, 4.4);
    pokostMaps.roughnessMap.repeat.set(2.2, 4.4);
    pokostMaps.bumpMap.repeat.set(2.2, 4.4);
  }
  if (gabbroNeutralMap) {
    gabbroNeutralMap.repeat.set(1.35, 2.6);
  }
  if (grassGroundTexture) {
    grassGroundTexture.repeat.set(Math.max(2, safeLength * 1.8), Math.max(2, safeWidth * 1.8));
  }

  const isGabbro = steleMaterial === "gabbro";
  const stoneMap = isGabbro ? gabbroNeutralMap : pokostMaps?.colorMap;
  const stoneRoughnessMap = isGabbro ? graniteMaps?.roughnessMap : pokostMaps?.roughnessMap;
  const stoneBumpMap = isGabbro ? gabbroNeutralMap : pokostMaps?.bumpMap;
  const stoneBumpScale = isGabbro ? 0.032 : 0.016;
  const stoneRoughness = isGabbro ? 0.22 : 0.3;
  const stoneClearcoat = isGabbro ? 0.3 : 0.3;
  const stoneClearcoatRoughness = isGabbro ? 0.24 : 0.24;
  const stoneEnvIntensity = isGabbro ? 1.05 : 1.1;

  return (
    <>
      <color attach="background" args={["#a6acb5"]} />
      <hemisphereLight intensity={0.45} color="#c5cad2" groundColor="#6d737c" />
      <directionalLight
        position={[3.6, 5.2, 3.2]}
        intensity={0.66}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-2.4, 3.6, -1.6]} intensity={0.08} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.003, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={groundOnly ? "#5f7b55" : "#c7cdd5"} roughness={0.98} metalness={0} />
      </mesh>

      <group position={[0, 0, 0]}>
        {groundOnly ? (
          <mesh castShadow receiveShadow position={[0, 0.005, 0]}>
            <boxGeometry args={[safeLength, 0.01, safeWidth]} />
            <meshStandardMaterial color="#6d8a61" map={grassGroundTexture} roughness={0.96} metalness={0} />
          </mesh>
        ) : null}

        {/* Base */}
        {slabHeight > 0 ? (
          <mesh castShadow receiveShadow position={[0, slabHeight / 2, 0]}>
            <boxGeometry args={[safeLength, slabHeight, safeWidth]} />
            <meshStandardMaterial color="#b8bfc7" roughness={0.78} metalness={0.02} />
          </mesh>
        ) : null}

        {/* 30x30 tile layer */}
        {tileTopHeight > 0 ? (
          <mesh castShadow receiveShadow position={[0, slabHeight + tileTopHeight / 2, 0]}>
            <boxGeometry args={[tileLen, tileTopHeight, tileWid]} />
            <meshStandardMaterial
              color={platformColor(platformMaterial)}
              map={tileTexture}
              roughness={0.7}
              metalness={platformMaterial === "granite" ? 0.18 : 0.08}
            />
          </mesh>
        ) : null}

        {hasCurb && !groundOnly ? (
          <>
            {/* Border 8x20 cm */}
            <mesh
              castShadow
              receiveShadow
              position={[0, slabHeight + borderHeight / 2, safeWidth / 2 - borderWidth / 2]}
            >
              <boxGeometry args={[safeLength, borderHeight, borderWidth]} />
              <meshStandardMaterial color="#959ca4" roughness={0.72} metalness={0.03} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              position={[0, slabHeight + borderHeight / 2, -safeWidth / 2 + borderWidth / 2]}
            >
              <boxGeometry args={[safeLength, borderHeight, borderWidth]} />
              <meshStandardMaterial color="#959ca4" roughness={0.72} metalness={0.03} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              position={[safeLength / 2 - borderWidth / 2, slabHeight + borderHeight / 2, 0]}
            >
              <boxGeometry args={[borderWidth, borderHeight, safeWidth - borderWidth * 2]} />
              <meshStandardMaterial color="#959ca4" roughness={0.72} metalness={0.03} />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              position={[-safeLength / 2 + borderWidth / 2, slabHeight + borderHeight / 2, 0]}
            >
              <boxGeometry args={[borderWidth, borderHeight, safeWidth - borderWidth * 2]} />
              <meshStandardMaterial color="#959ca4" roughness={0.72} metalness={0.03} />
            </mesh>

            {/* Segment seams every 1 meter */}
            {Array.from({ length: Math.max(1, Math.floor(safeLength)) - 1 }).map((_, i) => {
              const x = -safeLength / 2 + (i + 1) * 1.0;
              return (
                <group key={`curb-x-${i}`}>
                  <mesh position={[x, slabHeight + borderHeight + 0.003, safeWidth / 2 - borderWidth / 2]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.004, borderWidth]} />
                    <meshBasicMaterial color="#737a83" />
                  </mesh>
                  <mesh position={[x, slabHeight + borderHeight + 0.003, -safeWidth / 2 + borderWidth / 2]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.004, borderWidth]} />
                    <meshBasicMaterial color="#737a83" />
                  </mesh>
                </group>
              );
            })}
            {Array.from({ length: Math.max(1, Math.floor(safeWidth)) - 1 }).map((_, i) => {
              const z = -safeWidth / 2 + (i + 1) * 1.0;
              return (
                <group key={`curb-z-${i}`}>
                  <mesh position={[safeLength / 2 - borderWidth / 2, slabHeight + borderHeight + 0.003, z]} rotation={[-Math.PI / 2, Math.PI / 2, 0]}>
                    <planeGeometry args={[0.004, borderWidth]} />
                    <meshBasicMaterial color="#737a83" />
                  </mesh>
                  <mesh position={[-safeLength / 2 + borderWidth / 2, slabHeight + borderHeight + 0.003, z]} rotation={[-Math.PI / 2, Math.PI / 2, 0]}>
                    <planeGeometry args={[0.004, borderWidth]} />
                    <meshBasicMaterial color="#737a83" />
                  </mesh>
                </group>
              );
            })}

            <mesh position={[0, slabHeight + borderHeight + 0.002, safeWidth / 2 - borderWidth / 2]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[safeLength, borderWidth]} />
              <meshBasicMaterial color="#8f969e" />
            </mesh>
            <mesh position={[0, slabHeight + borderHeight + 0.002, -safeWidth / 2 + borderWidth / 2]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[safeLength, borderWidth]} />
              <meshBasicMaterial color="#8f969e" />
            </mesh>
            <mesh position={[safeLength / 2 - borderWidth / 2, slabHeight + borderHeight + 0.002, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]}>
              <planeGeometry args={[safeWidth - borderWidth * 2, borderWidth]} />
              <meshBasicMaterial color="#8f969e" />
            </mesh>
            <mesh position={[-safeLength / 2 + borderWidth / 2, slabHeight + borderHeight + 0.002, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]}>
              <planeGeometry args={[safeWidth - borderWidth * 2, borderWidth]} />
              <meshBasicMaterial color="#8f969e" />
            </mesh>
          </>
        ) : null}

        {/* Podium under base (not used for single) */}
        {podiumHeight > 0 ? (
          <RoundedBox
            args={[podiumWidth, podiumHeight, podiumDepth]}
            radius={0.006}
            smoothness={6}
            castShadow
            receiveShadow
            position={[0, slabHeight + tileTopHeight + podiumHeight / 2, 0.19]}
          >
            <meshPhysicalMaterial
              color="#ffffff"
              map={stoneMap}
              roughnessMap={stoneRoughnessMap}
              bumpMap={stoneBumpMap}
              bumpScale={stoneBumpScale * 0.75}
              roughness={stoneRoughness + 0.04}
              metalness={0.02}
              clearcoat={stoneClearcoat}
              clearcoatRoughness={stoneClearcoatRoughness}
              envMapIntensity={stoneEnvIntensity}
            />
          </RoundedBox>
        ) : null}

        <RoundedBox
          args={[monumentBaseWidth, monumentBaseHeight, monumentBaseDepth]}
          radius={0.007}
          smoothness={6}
          castShadow
          receiveShadow
          position={[0, slabHeight + tileTopHeight + podiumHeight + monumentBaseHeight / 2, 0.2]}
        >
          <meshPhysicalMaterial
            color="#ffffff"
            map={stoneMap}
            roughnessMap={stoneRoughnessMap}
            bumpMap={stoneBumpMap}
            bumpScale={stoneBumpScale * 0.8}
            roughness={stoneRoughness + 0.02}
            metalness={0.02}
            clearcoat={stoneClearcoat}
            clearcoatRoughness={stoneClearcoatRoughness}
            envMapIntensity={stoneEnvIntensity}
          />
        </RoundedBox>

        {monumentType === "double" ? (
          <>
            <mesh
              castShadow
              receiveShadow
              position={[
                -0.22,
                slabHeight + tileTopHeight + podiumHeight + monumentBaseHeight + steleHeight / 2,
                0.16,
              ]}
            >
              <extrudeGeometry
                args={[
                  doubleShape,
                  {
                    depth: steleDepth,
                    bevelEnabled: true,
                    bevelThickness: 0.0025,
                    bevelSize: 0.0025,
                    bevelSegments: 2,
                  },
                ]}
              />
              <meshPhysicalMaterial
                color={isGabbro ? "#ffffff" : "#f4f7fa"}
                map={stoneMap}
                roughnessMap={stoneRoughnessMap}
                bumpMap={stoneBumpMap}
                bumpScale={stoneBumpScale}
                roughness={stoneRoughness}
                metalness={0.01}
                clearcoat={stoneClearcoat}
                clearcoatRoughness={stoneClearcoatRoughness}
                envMapIntensity={stoneEnvIntensity}
              />
            </mesh>
            <mesh
              castShadow
              receiveShadow
              position={[
                0.22,
                slabHeight + tileTopHeight + podiumHeight + monumentBaseHeight + steleHeight / 2,
                0.16,
              ]}
            >
              <extrudeGeometry
                args={[
                  doubleShape,
                  {
                    depth: steleDepth,
                    bevelEnabled: true,
                    bevelThickness: 0.0025,
                    bevelSize: 0.0025,
                    bevelSegments: 2,
                  },
                ]}
              />
              <meshPhysicalMaterial
                color={isGabbro ? "#ffffff" : "#f4f7fa"}
                map={stoneMap}
                roughnessMap={stoneRoughnessMap}
                bumpMap={stoneBumpMap}
                bumpScale={stoneBumpScale}
                roughness={stoneRoughness}
                metalness={0.01}
                clearcoat={stoneClearcoat}
                clearcoatRoughness={stoneClearcoatRoughness}
                envMapIntensity={stoneEnvIntensity}
              />
            </mesh>
          </>
        ) : (
          <mesh
            castShadow
            receiveShadow
            position={[
              0,
              slabHeight + tileTopHeight + podiumHeight + monumentBaseHeight + steleHeight / 2,
              0.16,
            ]}
          >
            <extrudeGeometry
              args={[
                singleShape,
                {
                  depth: steleDepth,
                  bevelEnabled: true,
                  bevelThickness: 0.0025,
                  bevelSize: 0.0025,
                  bevelSegments: 2,
                },
              ]}
            />
            <meshPhysicalMaterial
              color={isGabbro ? "#ffffff" : "#f4f7fa"}
              map={stoneMap}
              roughnessMap={stoneRoughnessMap}
              bumpMap={stoneBumpMap}
              bumpScale={stoneBumpScale}
              roughness={stoneRoughness}
              metalness={0.01}
              clearcoat={stoneClearcoat}
              clearcoatRoughness={stoneClearcoatRoughness}
              envMapIntensity={stoneEnvIntensity}
            />
          </mesh>
        )}

        {monumentType !== "double" ? (
          <>
            {/* Flowerbed frame by exact bars: 2x(100x8x5) + 1x(50x8x5) */}
            <RoundedBox
              args={[FLOWER_BAR_W, FLOWER_BAR_H, FLOWER_LONG_L]}
              radius={0.004}
              smoothness={5}
              castShadow
              receiveShadow
              position={[
                -FLOWER_SHORT_L / 2 + FLOWER_BAR_W / 2,
                slabHeight + tileTopHeight + FLOWER_BAR_H / 2,
                -0.375,
              ]}
            >
              <meshPhysicalMaterial
                color={isGabbro ? "#ffffff" : "#f4f7fa"}
                map={stoneMap}
                roughnessMap={stoneRoughnessMap}
                bumpMap={stoneBumpMap}
                bumpScale={stoneBumpScale * 0.65}
                roughness={stoneRoughness + 0.02}
                metalness={0.02}
                clearcoat={stoneClearcoat}
                clearcoatRoughness={stoneClearcoatRoughness}
                envMapIntensity={stoneEnvIntensity * 0.92}
              />
            </RoundedBox>
            <RoundedBox
              args={[FLOWER_BAR_W, FLOWER_BAR_H, FLOWER_LONG_L]}
              radius={0.004}
              smoothness={5}
              castShadow
              receiveShadow
              position={[
                FLOWER_SHORT_L / 2 - FLOWER_BAR_W / 2,
                slabHeight + tileTopHeight + FLOWER_BAR_H / 2,
                -0.375,
              ]}
            >
              <meshPhysicalMaterial
                color={isGabbro ? "#ffffff" : "#f4f7fa"}
                map={stoneMap}
                roughnessMap={stoneRoughnessMap}
                bumpMap={stoneBumpMap}
                bumpScale={stoneBumpScale * 0.65}
                roughness={stoneRoughness + 0.02}
                metalness={0.02}
                clearcoat={stoneClearcoat}
                clearcoatRoughness={stoneClearcoatRoughness}
                envMapIntensity={stoneEnvIntensity * 0.92}
              />
            </RoundedBox>
            <RoundedBox
              args={[FLOWER_SHORT_L, FLOWER_BAR_H, FLOWER_BAR_W]}
              radius={0.004}
              smoothness={5}
              castShadow
              receiveShadow
              position={[0, slabHeight + tileTopHeight + FLOWER_BAR_H / 2, -0.85]}
            >
              <meshPhysicalMaterial
                color={isGabbro ? "#ffffff" : "#f4f7fa"}
                map={stoneMap}
                roughnessMap={stoneRoughnessMap}
                bumpMap={stoneBumpMap}
                bumpScale={stoneBumpScale * 0.65}
                roughness={stoneRoughness + 0.02}
                metalness={0.02}
                clearcoat={stoneClearcoat}
                clearcoatRoughness={stoneClearcoatRoughness}
                envMapIntensity={stoneEnvIntensity * 0.92}
              />
            </RoundedBox>
          </>
        ) : null}

        {/* Stage 1: only monument modeling, no landscaping */}

      </group>

      <ContactShadows position={[0, 0, 0]} opacity={0.42} width={5} height={5} blur={1.8} far={2.2} />
    </>
  );
}

export default function ConstructorScene(props: ConstructorSceneProps) {
  return (
    <Canvas
      camera={{ position: [2.05, 1.32, 2.12], fov: 31 }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      className="h-full w-full"
    >
      <SceneContent {...props} />
      <Environment preset="studio" />
      <OrbitControls
        enablePan
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.95}
        zoomSpeed={0.9}
        panSpeed={0.7}
        minDistance={1.4}
        maxDistance={5}
        minPolarAngle={0.08}
        maxPolarAngle={Math.PI / 1.65}
        target={[0, 0.62, 0.03]}
      />
    </Canvas>
  );
}
