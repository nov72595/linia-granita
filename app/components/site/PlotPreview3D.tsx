"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

type PlotPreview3DProps = {
  lengthM: number;
  widthM: number;
  freeLengthM: number;
  freeWidthM: number;
  isPorcelain: boolean;
  isCurbWithoutCladding?: boolean;
  porcelainVariant?: "barrone" | "g640" | "g610";
  paverPattern?: "circle" | "square" | "california";
};

type TileMaterialMaps = {
  color: THREE.Texture | null;
  normal: THREE.Texture | null;
  roughness: THREE.Texture | null;
  bump: THREE.Texture | null;
  ao: THREE.Texture | null;
};

type TileMaterialClass = "porcelain" | "paver";

const TILE_SIZE_M = 0.3;
const PORCELAIN_TILE_SIZE_M = 0.6;
const JOINT_MM = 2.5;
const JOINT_M = JOINT_MM / 1000;
const PORCELAIN_JOINT_M = 0.003;
const PAVER_CHAMFER_M = 0;
const PORCELAIN_THICKNESS_M = 0.01;
const PORCELAIN_60X60_G640_ALBEDO = "/tiles/porcelain/60x60-g640/albedo.png";
const PORCELAIN_60X60_G610_ALBEDO = "/tiles/porcelain/60x60-g610/albedo.png";
const PAVER_30X30_MAPS = {
  color: "/tiles/pavers/30x30/albedo.png",
  normal: "/tiles/pavers/30x30/normal.png",
  roughness: "/tiles/pavers/30x30/roughness.png",
  bump: "/tiles/pavers/30x30/height.png",
  ao: "/tiles/pavers/30x30/ao.png",
} as const;
const PAVER_30X30_SQUARE_MAPS = {
  color: "/tiles/pavers/30x30-square/albedo.png",
  normal: "/tiles/pavers/30x30-square/normal.png",
  roughness: "/tiles/pavers/30x30-square/roughness.png",
  bump: "/tiles/pavers/30x30-square/height.png",
  ao: "/tiles/pavers/30x30-square/ao.png",
} as const;
const PAVER_30X30_CALIFORNIA_MAPS = {
  color: "/tiles/pavers/30x30-california/albedo.png",
  normal: "/tiles/pavers/30x30-california/normal.png",
  roughness: "/tiles/pavers/30x30-california/roughness.png",
  bump: "/tiles/pavers/30x30-california/height.png",
  ao: "/tiles/pavers/30x30-california/ao.png",
} as const;
const REQUIRED_PAVER_30X30_FILE = "/public/tiles/pavers/30x30/albedo.png";
const EXPECTED_PAVER_30X30_FILES = [
  "/public/tiles/pavers/30x30/albedo.png",
  "/public/tiles/pavers/30x30/normal.png",
  "/public/tiles/pavers/30x30/roughness.png",
  "/public/tiles/pavers/30x30/height.png",
] as const;
const REQUIRED_PAVER_30X30_SQUARE_FILE = "/public/tiles/pavers/30x30-square/albedo.png";
const EXPECTED_PAVER_30X30_SQUARE_FILES = [
  "/public/tiles/pavers/30x30-square/albedo.png",
  "/public/tiles/pavers/30x30-square/normal.png",
  "/public/tiles/pavers/30x30-square/roughness.png",
  "/public/tiles/pavers/30x30-square/height.png",
] as const;
const REQUIRED_PAVER_30X30_CALIFORNIA_FILE = "/public/tiles/pavers/30x30-california/albedo.png";
const EXPECTED_PAVER_30X30_CALIFORNIA_FILES = [
  "/public/tiles/pavers/30x30-california/albedo.png",
  "/public/tiles/pavers/30x30-california/normal.png",
  "/public/tiles/pavers/30x30-california/roughness.png",
  "/public/tiles/pavers/30x30-california/height.png",
] as const;

type CameraPresetId = "overview" | "top" | "detail";

type CameraPreset = {
  id: CameraPresetId;
  label: string;
  offset: [number, number, number];
  distanceFactor: number;
};

const CAMERA_PRESETS: CameraPreset[] = [
  {
    id: "overview",
    label: "Общий",
    offset: [1, 0.76, 1.1],
    distanceFactor: 0.98,
  },
  {
    id: "top",
    label: "Сверху",
    offset: [0.02, 1.22, 0.02],
    distanceFactor: 1.08,
  },
  {
    id: "detail",
    label: "Детально",
    offset: [0.84, 0.38, 0.9],
    distanceFactor: 0.47,
  },
];

type SceneBounds = {
  radius: number;
  targetY: number;
};

type AxisSegment = {
  size: number;
  uvMin: number;
  uvMax: number;
};

type CurbSegment = {
  sizeM: number;
  sizeWorld: number;
  center: number;
  isCut: boolean;
};

type GrassStrip = {
  key: string;
  size: [number, number];
  position: [number, number, number];
  bladeCount: number;
};

const TILE_THICKNESS_Y = 0.022;
const TILE_CENTER_Y = 0.0435;
const TILE_TOP_Y = TILE_CENTER_Y + TILE_THICKNESS_Y * 0.5;
const TILE_GROUT_COLOR = "#5b636d";
const PORCELAIN_GROUT_COLOR = "#a9afb7";
const CURB_JOINT_FILL_COLOR = "#68717c";
const CURB_STD_M = 1.0;
const BORDER_OFFSET_M = 0.16;
const CURB_THICKNESS_M = 0.08;
const CURB_HEIGHT_M = 0.2;
const CURB_CHAMFER_M = 0.02;
const CURB_JOINT_M = 0.004;
const GRASS_HEIGHT_M = 0.03;
const GRASS_RING_WIDTH_M = 0.22;
const GRASS_LEVEL_FROM_CURB_BOTTOM_M = 0.012;
const GRASS_BLADE_TARGET_COUNT = 14000;

function buildAxisSegmentsFromCorner({
  axisSize,
  tileSize,
  seamSize,
  fullTilesOnly,
}: {
  axisSize: number;
  tileSize: number;
  seamSize: number;
  fullTilesOnly: boolean;
}): { segments: AxisSegment[]; centers: number[] } {
  if (axisSize <= 0 || tileSize <= 0) {
    return { segments: [], centers: [] };
  }

  const segments: AxisSegment[] = [];
  const centers: number[] = [];

  if (fullTilesOnly) {
    const fullCount = Math.max(1, Math.round(axisSize / tileSize));
    // Anchor from one corner: no artificial border seams on both sides.
    // Seams exist only between tiles, so edge tiles stay visually "full".
    const fullTileSize = Math.max(
      (axisSize - Math.max(0, fullCount - 1) * seamSize) / fullCount,
      tileSize * 0.9,
    );
    for (let i = 0; i < fullCount; i += 1) {
      segments.push({ size: fullTileSize, uvMin: 0, uvMax: 1 });
      centers.push(-axisSize / 2 + fullTileSize * 0.5 + i * (fullTileSize + seamSize));
    }
  } else {
    const tileModule = tileSize + seamSize;
    const fullCount = Math.max(1, Math.floor((axisSize + seamSize) / tileModule));
    const filledByFull = fullCount * tileSize + Math.max(0, fullCount - 1) * seamSize;
    const remainder = Math.max(0, axisSize - filledByFull);

    for (let i = 0; i < fullCount; i += 1) {
      segments.push({ size: tileSize, uvMin: 0, uvMax: 1 });
    }

    // Predictable non-multiple behavior: cut only on far edge.
    // Reserve one seam before the cut segment so total length still fits the axis.
    if (remainder > seamSize + 1e-6) {
      const cut = remainder - seamSize;
      const cutUv = cut / tileSize;
      segments.push({ size: cut, uvMin: 0, uvMax: cutUv });
    }

    let cursorStart = -axisSize / 2;
    for (let i = 0; i < segments.length; i += 1) {
      const segment = segments[i];
      const center = cursorStart + segment.size * 0.5;
      centers.push(center);
      cursorStart += segment.size;
      if (i < segments.length - 1) {
        cursorStart += seamSize;
      }
    }
  }

  return { segments, centers };
}

function buildCurbSegmentsByRun(runLengthM: number): Array<{ sizeM: number; isCut: boolean }> {
  const eps = 1e-6;
  const fullCount = Math.floor(runLengthM / CURB_STD_M);
  const remainderRaw = runLengthM - fullCount * CURB_STD_M;
  const remainder = Math.abs(remainderRaw) < eps ? 0 : remainderRaw;

  if (remainder <= 0) {
    return Array.from({ length: Math.max(1, fullCount) }, () => ({ sizeM: CURB_STD_M, isCut: false }));
  }

  if (fullCount <= 1) {
    if (fullCount === 0) {
      return [{ sizeM: runLengthM, isCut: true }];
    }
    return [{ sizeM: CURB_STD_M, isCut: false }, { sizeM: remainder, isCut: true }];
  }

  const leftCount = Math.floor(fullCount / 2);
  const rightCount = fullCount - leftCount;
  const segments: Array<{ sizeM: number; isCut: boolean }> = [];
  for (let i = 0; i < leftCount; i += 1) segments.push({ sizeM: CURB_STD_M, isCut: false });
  segments.push({ sizeM: remainder, isCut: true });
  for (let i = 0; i < rightCount; i += 1) segments.push({ sizeM: CURB_STD_M, isCut: false });
  return segments;
}

function calcRemainderM(runLengthM: number): number {
  const fullCount = Math.floor(runLengthM / CURB_STD_M);
  const rem = runLengthM - fullCount * CURB_STD_M;
  return rem < 1e-6 ? 0 : rem;
}

function placeCurbSegments(
  segmentsM: Array<{ sizeM: number; isCut: boolean }>,
  sideWorldLength: number,
  scale: number,
): CurbSegment[] {
  const result: CurbSegment[] = [];
  if (segmentsM.length === 0) return result;

  const jointWorld = CURB_JOINT_M * scale;
  const totalJoint = segmentsM.length > 1 ? jointWorld * (segmentsM.length - 1) : 0;
  const rawSizes = segmentsM.map((item) => item.sizeM * scale);
  const totalWithJoint = rawSizes.reduce((sum, v) => sum + v, 0) + totalJoint;
  let overflow = Math.max(0, totalWithJoint - sideWorldLength);

  const cutIndices = segmentsM
    .map((segment, index) => ({ segment, index }))
    .filter(({ segment }) => segment.isCut)
    .map(({ index }) => index);

  const adjustedSizes = [...rawSizes];
  if (overflow > 1e-6 && cutIndices.length > 0) {
    // Keep full 1m curbs unchanged, absorb fit correction only in cut pieces.
    let cutCapacity = cutIndices.reduce((sum, index) => sum + Math.max(0, adjustedSizes[index] - 0.01), 0);
    for (const index of cutIndices) {
      if (overflow <= 1e-6 || cutCapacity <= 1e-6) break;
      const current = adjustedSizes[index];
      const maxReduce = Math.max(0, current - 0.01);
      const reduce = Math.min(maxReduce, (maxReduce / cutCapacity) * overflow);
      adjustedSizes[index] = current - reduce;
      overflow -= reduce;
      cutCapacity -= maxReduce;
    }
  }

  if (overflow > 1e-6) {
    // Safety fallback: distribute tiny remaining overflow across all segments.
    const perSegment = overflow / adjustedSizes.length;
    for (let i = 0; i < adjustedSizes.length; i += 1) {
      adjustedSizes[i] = Math.max(0.01, adjustedSizes[i] - perSegment);
    }
  }

  let cursor = -sideWorldLength / 2;
  for (let i = 0; i < segmentsM.length; i += 1) {
    const sizeWorld = adjustedSizes[i];
    result.push({
      sizeM: segmentsM[i].sizeM,
      sizeWorld,
      center: cursor + sizeWorld * 0.5,
      isCut: segmentsM[i].isCut,
    });
    cursor += sizeWorld;
    if (i < segmentsM.length - 1) {
      cursor += jointWorld;
    }
  }
  return result;
}

function createCurbGeometry({
  length,
  height,
  thickness,
  chamfer,
  bevelOnPositiveThicknessSide,
}: {
  length: number;
  height: number;
  thickness: number;
  chamfer: number;
  bevelOnPositiveThicknessSide: boolean;
}): THREE.BufferGeometry {
  const halfH = height * 0.5;
  const halfT = thickness * 0.5;
  const c = Math.max(0, Math.min(chamfer, halfH * 0.95, halfT * 0.95));

  const basePoints = [
    new THREE.Vector2(-halfT, -halfH),
    new THREE.Vector2(halfT, -halfH),
    new THREE.Vector2(halfT, halfH - c),
    new THREE.Vector2(halfT - c, halfH),
    new THREE.Vector2(-halfT, halfH),
  ];
  const points = bevelOnPositiveThicknessSide ? basePoints : basePoints.map((p) => new THREE.Vector2(-p.x, p.y));
  const shape = new THREE.Shape(points);
  const extruded = new THREE.ExtrudeGeometry(shape, {
    depth: length,
    steps: 1,
    bevelEnabled: false,
    curveSegments: 1,
  });
  extruded.translate(0, 0, -length * 0.5);
  extruded.rotateY(-Math.PI / 2);

  const geometry = extruded.index ? extruded.toNonIndexed() : extruded.clone();
  extruded.dispose();

  // Continue chamfer along segment ends so the bevel reads as continuous.
  const pos = geometry.getAttribute("position") as THREE.BufferAttribute;
  const halfL = length * 0.5;
  const eps = 1e-6;
  for (let i = 0; i < pos.count; i += 1) {
    const y = pos.getY(i);
    const z = pos.getZ(i);
    if (y > halfH - eps && Math.abs(z) > halfL - eps) {
      pos.setY(i, y - c);
    }
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

function createCornerCapGeometry({
  thickness,
  height,
  chamfer,
  outerXSign,
  outerZSign,
}: {
  thickness: number;
  height: number;
  chamfer: number;
  outerXSign: -1 | 1;
  outerZSign: -1 | 1;
}): THREE.BufferGeometry {
  const base = new THREE.BoxGeometry(thickness, height, thickness);
  const geometry = base.index ? base.toNonIndexed() : base.clone();
  base.dispose();
  const pos = geometry.getAttribute("position") as THREE.BufferAttribute;
  const halfT = thickness * 0.5;
  const halfH = height * 0.5;
  const c = Math.max(0, Math.min(chamfer, halfT * 0.95, halfH * 0.95));
  const eps = 1e-6;

  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    if (y < halfH - eps) continue;

    let lowerBy = 0;
    const isOuterX = outerXSign > 0 ? x > halfT - eps : x < -halfT + eps;
    const isOuterZ = outerZSign > 0 ? z > halfT - eps : z < -halfT + eps;
    if (isOuterX) lowerBy = Math.max(lowerBy, c);
    if (isOuterZ) lowerBy = Math.max(lowerBy, c);
    if (lowerBy > 0) {
      pos.setY(i, y - lowerBy);
    }
  }

  pos.needsUpdate = true;
  geometry.computeVertexNormals();
  return geometry;
}

function getPresetPosition(bounds: SceneBounds, fitDistance: number, presetId: CameraPresetId): THREE.Vector3 {
  const preset = CAMERA_PRESETS.find((item) => item.id === presetId) ?? CAMERA_PRESETS[0];
  const offset = new THREE.Vector3(...preset.offset).normalize();
  const dist = fitDistance * preset.distanceFactor;
  return new THREE.Vector3(0, bounds.targetY, 0).add(offset.multiplyScalar(dist));
}

function SceneViewerControls({ presetId, bounds }: { presetId: CameraPresetId; bounds: SceneBounds }) {
  const camera = useThree((state) => state.camera as THREE.PerspectiveCamera);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const targetPositionRef = useRef(new THREE.Vector3(3.45, 2.85, 3.65));
  const targetLookAtRef = useRef(new THREE.Vector3(0, bounds.targetY, 0));
  const isAnimatingRef = useRef(true);

  const fitDistance = useMemo(() => {
    const verticalFov = THREE.MathUtils.degToRad(camera.fov);
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * Math.max(camera.aspect, 0.1));
    const distForHeight = bounds.radius / Math.sin(verticalFov / 2);
    const distForWidth = bounds.radius / Math.sin(horizontalFov / 2);
    return Math.max(distForHeight, distForWidth) * 1.12;
  }, [bounds.radius, camera.aspect, camera.fov]);

  useEffect(() => {
    const nextTarget = new THREE.Vector3(0, bounds.targetY, 0);
    targetLookAtRef.current.copy(nextTarget);
    targetPositionRef.current.copy(getPresetPosition(bounds, fitDistance, presetId));
    isAnimatingRef.current = true;
  }, [presetId, bounds, fitDistance]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleStart = () => {
      isAnimatingRef.current = false;
    };
    const handleChange = () => {
      if (isAnimatingRef.current) return;
      targetPositionRef.current.copy(camera.position);
      targetLookAtRef.current.copy(controls.target);
    };

    controls.addEventListener("start", handleStart);
    controls.addEventListener("change", handleChange);
    return () => {
      controls.removeEventListener("start", handleStart);
      controls.removeEventListener("change", handleChange);
    };
  }, [camera]);

  useFrame((_, delta) => {
    const orbit = controlsRef.current;
    if (!orbit) return;

    if (!isAnimatingRef.current) {
      orbit.update();
      return;
    }

    const lerpFactor = 1 - Math.exp(-delta * 7.2);
    camera.position.lerp(targetPositionRef.current, lerpFactor);
    orbit.target.lerp(targetLookAtRef.current, lerpFactor);
    if (
      camera.position.distanceToSquared(targetPositionRef.current) < 0.0002 &&
      orbit.target.distanceToSquared(targetLookAtRef.current) < 0.0002
    ) {
      isAnimatingRef.current = false;
    }
    orbit.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.09}
      enablePan={false}
      autoRotate={false}
      target={[0, bounds.targetY, 0]}
      minDistance={Math.max(0.9, fitDistance * 0.3)}
      maxDistance={fitDistance * 2.8}
      minPolarAngle={0.12}
      maxPolarAngle={Math.PI / 2 - 0.03}
      zoomSpeed={0.95}
      rotateSpeed={0.82}
      touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
    />
  );
}

function GrassBladeStrip({
  strip,
  bladeHeight,
}: {
  strip: GrassStrip;
  bladeHeight: number;
}) {
  const instancedRefA = useRef<THREE.InstancedMesh>(null);
  const instancedRefB = useRef<THREE.InstancedMesh>(null);
  const shaderARef = useRef<THREE.Shader | null>(null);
  const shaderBRef = useRef<THREE.Shader | null>(null);
  const { matricesA, matricesB } = useMemo(() => {
    const [width, depth] = strip.size;
    const count = Math.max(100, strip.bladeCount);
    const transformsA: THREE.Matrix4[] = [];
    const transformsB: THREE.Matrix4[] = [];
    const dummy = new THREE.Object3D();
    const baseY = strip.position[1] + bladeHeight * 0.52;
    const seedBase = strip.key.length * 97.13;

    for (let i = 0; i < count; i += 1) {
      const n = i + 1;
      const r1 = ((Math.sin((n + seedBase) * 12.9898) * 43758.5453) % 1 + 1) % 1;
      const r2 = ((Math.sin((n + seedBase) * 78.233) * 19642.349) % 1 + 1) % 1;
      const r3 = ((Math.sin((n + seedBase) * 37.719) * 9631.517) % 1 + 1) % 1;
      const r4 = ((Math.sin((n + seedBase) * 18.143) * 24537.631) % 1 + 1) % 1;
      const x = strip.position[0] + (r1 - 0.5) * width;
      const z = strip.position[2] + (r2 - 0.5) * depth;
      const h = bladeHeight * (0.7 + r3 * 0.55);
      const tiltX = (r2 - 0.5) * 0.22;
      const tiltZ = (r1 - 0.5) * 0.18;
      const yaw = r3 * Math.PI * 2;
      dummy.position.set(x, baseY, z);
      dummy.rotation.set(tiltX, yaw, tiltZ);
      dummy.scale.set(1, h / bladeHeight, 1);
      dummy.updateMatrix();
      transformsA.push(dummy.matrix.clone());
      dummy.rotation.set(tiltX * 0.9, yaw + Math.PI * 0.5 + (r4 - 0.5) * 0.16, tiltZ * 0.9);
      dummy.updateMatrix();
      transformsB.push(dummy.matrix.clone());
    }
    return { matricesA: transformsA, matricesB: transformsB };
  }, [strip, bladeHeight]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (shaderARef.current) shaderARef.current.uniforms.uTime.value = t;
    if (shaderBRef.current) shaderBRef.current.uniforms.uTime.value = t + 0.27;
  });

  const injectGrassWind = (shader: THREE.Shader) => {
    shader.uniforms.uTime = { value: 0 };
    shader.vertexShader =
      `
uniform float uTime;
float grassHash31(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}
` + shader.vertexShader;

    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
#ifdef USE_INSTANCING
  vec3 iPos = vec3(instanceMatrix[3].x, instanceMatrix[3].y, instanceMatrix[3].z);
#else
  vec3 iPos = vec3(0.0);
#endif
  float phase = grassHash31(iPos * 0.37) * 6.2831853;
  float stiffness = mix(0.75, 1.25, grassHash31(iPos * 1.91 + vec3(4.2, 1.7, 2.9)));
  float bend = pow(clamp(uv.y, 0.0, 1.0), 2.15);
  float sway = sin(uTime * 0.82 + phase + iPos.x * 0.42 + iPos.z * 0.38);
  float gust = sin(uTime * 0.36 + (iPos.x + iPos.z) * 0.24 + phase * 0.55);
  float flutter = sin(uTime * 1.85 + phase * 1.35 + uv.y * 3.2);
  float amp = (0.032 * sway + 0.021 * gust + 0.0035 * flutter) * stiffness;
  transformed.x += amp * bend;
  transformed.z += (amp * 0.55 + 0.015 * gust * stiffness) * bend;`,
    );
  };

  useEffect(() => {
    const meshA = instancedRefA.current;
    const meshB = instancedRefB.current;
    if (!meshA || !meshB) return;
    for (let i = 0; i < matricesA.length; i += 1) {
      meshA.setMatrixAt(i, matricesA[i]);
      meshB.setMatrixAt(i, matricesB[i]);
    }
    meshA.instanceMatrix.needsUpdate = true;
    meshB.instanceMatrix.needsUpdate = true;
  }, [matricesA, matricesB]);

  return (
    <>
      <instancedMesh ref={instancedRefA} args={[undefined, undefined, matricesA.length]}>
        <planeGeometry args={[bladeHeight * 0.15, bladeHeight]} />
        <meshStandardMaterial
          color="#5f9148"
          roughness={0.96}
          metalness={0}
          side={THREE.DoubleSide}
          onBeforeCompile={(shader) => {
            injectGrassWind(shader);
            shaderARef.current = shader;
          }}
        />
      </instancedMesh>
      <instancedMesh ref={instancedRefB} args={[undefined, undefined, matricesB.length]}>
        <planeGeometry args={[bladeHeight * 0.15, bladeHeight]} />
        <meshStandardMaterial
          color="#5a8b45"
          roughness={0.96}
          metalness={0}
          side={THREE.DoubleSide}
          onBeforeCompile={(shader) => {
            injectGrassWind(shader);
            shaderBRef.current = shader;
          }}
        />
      </instancedMesh>
    </>
  );
}

function applyTextureQualitySettings(
  texture: THREE.Texture,
  {
    anisotropy,
    repeatX,
    repeatY,
    isColor = false,
    clampToEdge = false,
  }: { anisotropy: number; repeatX: number; repeatY: number; isColor?: boolean; clampToEdge?: boolean },
) {
  texture.wrapS = clampToEdge ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
  texture.wrapT = clampToEdge ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
  texture.colorSpace = isColor ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  texture.anisotropy = anisotropy;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;
}

function makeFallbackTileMaps(size: number): TileMaterialMaps {
  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = size;
  colorCanvas.height = size;
  const colorCtx = colorCanvas.getContext("2d");
  if (!colorCtx) return { color: null, normal: null, roughness: null, bump: null, ao: null };

  colorCtx.fillStyle = "#d6dbe2";
  colorCtx.fillRect(0, 0, size, size);
  colorCtx.strokeStyle = "#a9b1bb";
  colorCtx.lineWidth = Math.max(1, Math.round(size * 0.02));
  colorCtx.strokeRect(0, 0, size, size);

  const roughnessCanvas = document.createElement("canvas");
  roughnessCanvas.width = size;
  roughnessCanvas.height = size;
  const roughnessCtx = roughnessCanvas.getContext("2d");
  if (!roughnessCtx) return { color: null, normal: null, roughness: null, bump: null, ao: null };
  roughnessCtx.fillStyle = "#b6b6b6";
  roughnessCtx.fillRect(0, 0, size, size);

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext("2d");
  if (!bumpCtx) return { color: null, normal: null, roughness: null, bump: null, ao: null };
  bumpCtx.fillStyle = "#7f7f7f";
  bumpCtx.fillRect(0, 0, size, size);

  return {
    color: new THREE.CanvasTexture(colorCanvas),
    normal: null,
    roughness: new THREE.CanvasTexture(roughnessCanvas),
    bump: new THREE.CanvasTexture(bumpCanvas),
    ao: null,
  };
}

function buildNormalMapFromHeight(heightCanvas: HTMLCanvasElement): HTMLCanvasElement {
  const size = heightCanvas.width;
  const normalCanvas = document.createElement("canvas");
  normalCanvas.width = size;
  normalCanvas.height = size;
  const srcCtx = heightCanvas.getContext("2d");
  const dstCtx = normalCanvas.getContext("2d");
  if (!srcCtx || !dstCtx) return normalCanvas;

  const src = srcCtx.getImageData(0, 0, size, size);
  const dst = dstCtx.createImageData(size, size);
  const strength = 2.4;
  const data = src.data;
  const out = dst.data;

  const h = (x: number, y: number) => {
    const ix = (Math.max(0, Math.min(size - 1, y)) * size + Math.max(0, Math.min(size - 1, x))) * 4;
    return data[ix] / 255;
  };

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = h(x + 1, y) - h(x - 1, y);
      const dy = h(x, y + 1) - h(x, y - 1);
      const nx = -dx * strength;
      const ny = -dy * strength;
      const nz = 1;
      const invLen = 1 / Math.hypot(nx, ny, nz);
      const idx = (y * size + x) * 4;
      out[idx] = ((nx * invLen) * 0.5 + 0.5) * 255;
      out[idx + 1] = ((ny * invLen) * 0.5 + 0.5) * 255;
      out[idx + 2] = ((nz * invLen) * 0.5 + 0.5) * 255;
      out[idx + 3] = 255;
    }
  }

  dstCtx.putImageData(dst, 0, 0);
  return normalCanvas;
}

function buildClassicPaverMaps(size: number): TileMaterialMaps {
  const albedoCanvas = document.createElement("canvas");
  albedoCanvas.width = size;
  albedoCanvas.height = size;
  const albedoCtx = albedoCanvas.getContext("2d");
  if (!albedoCtx) return makeFallbackTileMaps(size);

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext("2d");
  if (!bumpCtx) return makeFallbackTileMaps(size);

  const roughnessCanvas = document.createElement("canvas");
  roughnessCanvas.width = size;
  roughnessCanvas.height = size;
  const roughnessCtx = roughnessCanvas.getContext("2d");
  if (!roughnessCtx) return makeFallbackTileMaps(size);

  const aoCanvas = document.createElement("canvas");
  aoCanvas.width = size;
  aoCanvas.height = size;
  const aoCtx = aoCanvas.getContext("2d");
  if (!aoCtx) return makeFallbackTileMaps(size);

  // Keep ornament close to real 30x30 sample (full motif visible on each edge).
  const margin = Math.round(size * 0.018);
  const tileSize = size - margin * 2;
  const cx = size / 2;
  const cy = size / 2;
  const ringOuter = tileSize * 0.488;
  const ringInner = tileSize * 0.442;
  const cornerR = tileSize * 0.228;
  const motifLen = tileSize * 0.305;
  const centerR = tileSize * 0.074;

  const drawSurfaceNoise = (ctx: CanvasRenderingContext2D, alpha: number, tone: number) => {
    const count = Math.round(size * 0.8);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = `rgb(${tone},${tone},${tone})`;
    // Deterministic micro-noise avoids visual drift between tiles.
    for (let i = 0; i < count; i += 1) {
      const x = ((i * 73) % size) + ((i * 17) % 11) * 0.05;
      const y = ((i * 41) % size) + ((i * 29) % 13) * 0.05;
      const r = i % 5 === 0 ? 1.1 : 0.75;
      ctx.fillRect(x, y, r, r);
    }
    ctx.globalAlpha = 1;
  };

  const drawCenterFlower = (ctx: CanvasRenderingContext2D, stroke: string, lineWidth: number) => {
    const r = centerR;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(cx, cy - r * 1.06);
    ctx.bezierCurveTo(cx + r * 0.75, cy - r * 1.22, cx + r * 1.05, cy - r * 0.46, cx + r * 0.92, cy);
    ctx.bezierCurveTo(cx + r * 1.05, cy + r * 0.46, cx + r * 0.75, cy + r * 1.22, cx, cy + r * 1.06);
    ctx.bezierCurveTo(cx - r * 0.75, cy + r * 1.22, cx - r * 1.05, cy + r * 0.46, cx - r * 0.92, cy);
    ctx.bezierCurveTo(cx - r * 1.05, cy - r * 0.46, cx - r * 0.75, cy - r * 1.22, cx, cy - r * 1.06);
    ctx.closePath();
    ctx.stroke();
  };

  const drawFleurArm = (ctx: CanvasRenderingContext2D, angle: number, stroke: string, lineWidth: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;

    ctx.beginPath();
    ctx.moveTo(0, -centerR * 0.74);
    ctx.bezierCurveTo(motifLen * 0.2, -motifLen * 0.52, motifLen * 0.17, -motifLen * 0.94, 0, -motifLen);
    ctx.bezierCurveTo(-motifLen * 0.17, -motifLen * 0.94, -motifLen * 0.2, -motifLen * 0.52, 0, -centerR * 0.74);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -centerR * 0.56);
    ctx.bezierCurveTo(motifLen * 0.44, -motifLen * 0.42, motifLen * 0.46, -motifLen * 0.07, motifLen * 0.2, motifLen * 0.02);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -centerR * 0.56);
    ctx.bezierCurveTo(-motifLen * 0.44, -motifLen * 0.42, -motifLen * 0.46, -motifLen * 0.07, -motifLen * 0.2, motifLen * 0.02);
    ctx.stroke();

    ctx.restore();
  };

  const drawOrnamentSet = (
    ctx: CanvasRenderingContext2D,
    {
      ringMain,
      ringSoft,
      ornamentMain,
      ornamentAccent,
      ringMainW,
      ringSoftW,
      ornamentW,
      accentW,
      addMicroDash,
    }: {
      ringMain: string;
      ringSoft: string;
      ornamentMain: string;
      ornamentAccent: string;
      ringMainW: number;
      ringSoftW: number;
      ornamentW: number;
      accentW: number;
      addMicroDash: boolean;
    },
  ) => {
    ctx.strokeStyle = ringMain;
    ctx.lineWidth = ringMainW;
    ctx.beginPath();
    ctx.arc(cx, cy, ringOuter, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = ringSoft;
    ctx.lineWidth = ringSoftW;
    ctx.beginPath();
    ctx.arc(cx, cy, ringInner, 0, Math.PI * 2);
    ctx.stroke();

    if (addMicroDash) {
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.setLineDash([2, 3]);
      ctx.strokeStyle = ornamentAccent;
      ctx.lineWidth = Math.max(1, Math.round(size * 0.0017));
      ctx.beginPath();
      ctx.arc(cx, cy, ringOuter - ringMainW * 0.35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    ctx.strokeStyle = ringSoft;
    ctx.lineWidth = ringSoftW;
    ctx.beginPath();
    ctx.arc(margin, margin, cornerR, 0, Math.PI / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(size - margin, margin, cornerR, Math.PI / 2, Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(size - margin, size - margin, cornerR, Math.PI, (Math.PI * 3) / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(margin, size - margin, cornerR, (Math.PI * 3) / 2, Math.PI * 2);
    ctx.stroke();

    drawCenterFlower(ctx, ornamentMain, ornamentW);
    drawFleurArm(ctx, 0, ornamentMain, ornamentW);
    drawFleurArm(ctx, Math.PI / 2, ornamentMain, ornamentW);
    drawFleurArm(ctx, Math.PI, ornamentMain, ornamentW);
    drawFleurArm(ctx, (Math.PI * 3) / 2, ornamentMain, ornamentW);

    ctx.globalAlpha = 0.6;
    drawFleurArm(ctx, Math.PI / 4, ornamentAccent, accentW);
    drawFleurArm(ctx, (Math.PI * 3) / 4, ornamentAccent, accentW);
    drawFleurArm(ctx, (Math.PI * 5) / 4, ornamentAccent, accentW);
    drawFleurArm(ctx, (Math.PI * 7) / 4, ornamentAccent, accentW);
    ctx.globalAlpha = 1;
  };

  // Albedo aligned to reference: light base, soft embossed lines, visible ornament.
  albedoCtx.fillStyle = "#f0f0f1";
  albedoCtx.fillRect(0, 0, size, size);
  albedoCtx.fillStyle = "#e8e9eb";
  albedoCtx.fillRect(margin, margin, tileSize, tileSize);
  drawSurfaceNoise(albedoCtx, 0.07, 212);
  drawOrnamentSet(albedoCtx, {
    ringMain: "#c4c8cd",
    ringSoft: "#d3d7dc",
    ornamentMain: "#bcc2c9",
    ornamentAccent: "#aeb5be",
      ringMainW: Math.round(size * 0.0077),
      ringSoftW: Math.round(size * 0.0054),
      ornamentW: Math.round(size * 0.0065),
      accentW: Math.round(size * 0.004),
    addMicroDash: true,
  });

  // Height/bump with beveled relief similar to etched concrete tile.
  bumpCtx.fillStyle = "#7f7f7f";
  bumpCtx.fillRect(0, 0, size, size);
  bumpCtx.fillStyle = "#888888";
  bumpCtx.fillRect(margin, margin, tileSize, tileSize);
  drawOrnamentSet(bumpCtx, {
    ringMain: "#bdbdbd",
    ringSoft: "#a8a8a8",
    ornamentMain: "#cccccc",
    ornamentAccent: "#b3b3b3",
      ringMainW: Math.round(size * 0.0089),
      ringSoftW: Math.round(size * 0.0062),
      ornamentW: Math.round(size * 0.0079),
      accentW: Math.round(size * 0.0046),
    addMicroDash: true,
  });

  // Roughness map: matte base, slight polish on raised ornament.
  roughnessCtx.fillStyle = "#a9a9a9";
  roughnessCtx.fillRect(0, 0, size, size);
  roughnessCtx.fillStyle = "#b0b0b0";
  roughnessCtx.fillRect(margin, margin, tileSize, tileSize);
  drawOrnamentSet(roughnessCtx, {
    ringMain: "#8f8f8f",
    ringSoft: "#a0a0a0",
    ornamentMain: "#868686",
    ornamentAccent: "#7b7b7b",
    ringMainW: Math.round(size * 0.0078),
    ringSoftW: Math.round(size * 0.0056),
    ornamentW: Math.round(size * 0.0063),
    accentW: Math.round(size * 0.0037),
    addMicroDash: false,
  });

  // AO: soft shadow in grooves, improves recognition at normal scale.
  aoCtx.fillStyle = "#f2f2f2";
  aoCtx.fillRect(0, 0, size, size);
  aoCtx.fillStyle = "#f6f6f6";
  aoCtx.fillRect(margin, margin, tileSize, tileSize);
  drawOrnamentSet(aoCtx, {
    ringMain: "#c2c2c2",
    ringSoft: "#d0d0d0",
    ornamentMain: "#bebebe",
    ornamentAccent: "#b4b4b4",
    ringMainW: Math.round(size * 0.011),
    ringSoftW: Math.round(size * 0.0076),
    ornamentW: Math.round(size * 0.0088),
    accentW: Math.round(size * 0.0052),
    addMicroDash: false,
  });

  const normalCanvas = buildNormalMapFromHeight(bumpCanvas);

  return {
    color: new THREE.CanvasTexture(albedoCanvas),
    normal: new THREE.CanvasTexture(normalCanvas),
    roughness: new THREE.CanvasTexture(roughnessCanvas),
    bump: new THREE.CanvasTexture(bumpCanvas),
    ao: new THREE.CanvasTexture(aoCanvas),
  };
}

function buildSquarePaverMaps(size: number): TileMaterialMaps {
  const albedoCanvas = document.createElement("canvas");
  albedoCanvas.width = size;
  albedoCanvas.height = size;
  const albedoCtx = albedoCanvas.getContext("2d");
  if (!albedoCtx) return makeFallbackTileMaps(size);

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext("2d");
  if (!bumpCtx) return makeFallbackTileMaps(size);

  const roughnessCanvas = document.createElement("canvas");
  roughnessCanvas.width = size;
  roughnessCanvas.height = size;
  const roughnessCtx = roughnessCanvas.getContext("2d");
  if (!roughnessCtx) return makeFallbackTileMaps(size);

  const aoCanvas = document.createElement("canvas");
  aoCanvas.width = size;
  aoCanvas.height = size;
  const aoCtx = aoCanvas.getContext("2d");
  if (!aoCtx) return makeFallbackTileMaps(size);

  const margin = Math.round(size * 0.032);
  const innerInset = Math.round(size * 0.11);
  const centerBox = Math.round(size * 0.28);

  const drawFineNoise = (ctx: CanvasRenderingContext2D, alpha: number, baseTone: number) => {
    const points = Math.round(size * 1.2);
    ctx.globalAlpha = alpha;
    for (let i = 0; i < points; i += 1) {
      const x = (i * 53) % size;
      const y = (i * 97) % size;
      const tone = baseTone + ((i * 7) % 12) - 6;
      ctx.fillStyle = `rgb(${tone},${tone},${tone})`;
      ctx.fillRect(x, y, 1.1, 1.1);
    }
    ctx.globalAlpha = 1;
  };

  const drawSquareOrnament = (
    ctx: CanvasRenderingContext2D,
    {
      frameMain,
      frameSoft,
      motif,
      mainW,
      softW,
      motifW,
    }: {
      frameMain: string;
      frameSoft: string;
      motif: string;
      mainW: number;
      softW: number;
      motifW: number;
    },
  ) => {
    ctx.strokeStyle = frameMain;
    ctx.lineWidth = mainW;
    ctx.strokeRect(margin, margin, size - margin * 2, size - margin * 2);

    ctx.strokeStyle = frameSoft;
    ctx.lineWidth = softW;
    ctx.strokeRect(innerInset, innerInset, size - innerInset * 2, size - innerInset * 2);

    const c = size / 2;
    const hs = centerBox / 2;
    ctx.strokeStyle = motif;
    ctx.lineWidth = motifW;
    ctx.strokeRect(c - hs, c - hs, centerBox, centerBox);

    const petal = centerBox * 0.17;
    ctx.beginPath();
    ctx.arc(c, c - centerBox * 0.24, petal, 0, Math.PI * 2);
    ctx.arc(c + centerBox * 0.24, c, petal, 0, Math.PI * 2);
    ctx.arc(c, c + centerBox * 0.24, petal, 0, Math.PI * 2);
    ctx.arc(c - centerBox * 0.24, c, petal, 0, Math.PI * 2);
    ctx.stroke();
  };

  albedoCtx.fillStyle = "#efeff1";
  albedoCtx.fillRect(0, 0, size, size);
  albedoCtx.fillStyle = "#e8e9eb";
  albedoCtx.fillRect(margin, margin, size - margin * 2, size - margin * 2);
  drawFineNoise(albedoCtx, 0.11, 223);
  drawSquareOrnament(albedoCtx, {
    frameMain: "#c8ccd1",
    frameSoft: "#d9dde2",
    motif: "#c1c7ce",
    mainW: Math.max(1, Math.round(size * 0.0072)),
    softW: Math.max(1, Math.round(size * 0.0044)),
    motifW: Math.max(1, Math.round(size * 0.0064)),
  });

  bumpCtx.fillStyle = "#7f7f7f";
  bumpCtx.fillRect(0, 0, size, size);
  bumpCtx.fillStyle = "#888888";
  bumpCtx.fillRect(margin, margin, size - margin * 2, size - margin * 2);
  drawSquareOrnament(bumpCtx, {
    frameMain: "#bdbdbd",
    frameSoft: "#adadad",
    motif: "#cccccc",
    mainW: Math.max(1, Math.round(size * 0.0082)),
    softW: Math.max(1, Math.round(size * 0.0053)),
    motifW: Math.max(1, Math.round(size * 0.0073)),
  });

  roughnessCtx.fillStyle = "#aaaaaa";
  roughnessCtx.fillRect(0, 0, size, size);
  roughnessCtx.fillStyle = "#b2b2b2";
  roughnessCtx.fillRect(margin, margin, size - margin * 2, size - margin * 2);
  drawSquareOrnament(roughnessCtx, {
    frameMain: "#8a8a8a",
    frameSoft: "#9a9a9a",
    motif: "#848484",
    mainW: Math.max(1, Math.round(size * 0.007)),
    softW: Math.max(1, Math.round(size * 0.0046)),
    motifW: Math.max(1, Math.round(size * 0.006)),
  });

  aoCtx.fillStyle = "#f2f2f2";
  aoCtx.fillRect(0, 0, size, size);
  aoCtx.fillStyle = "#f6f6f6";
  aoCtx.fillRect(margin, margin, size - margin * 2, size - margin * 2);
  drawSquareOrnament(aoCtx, {
    frameMain: "#c3c3c3",
    frameSoft: "#d2d2d2",
    motif: "#bebebe",
    mainW: Math.max(1, Math.round(size * 0.0104)),
    softW: Math.max(1, Math.round(size * 0.0068)),
    motifW: Math.max(1, Math.round(size * 0.0088)),
  });

  const normalCanvas = buildNormalMapFromHeight(bumpCanvas);

  return {
    color: new THREE.CanvasTexture(albedoCanvas),
    normal: new THREE.CanvasTexture(normalCanvas),
    roughness: new THREE.CanvasTexture(roughnessCanvas),
    bump: new THREE.CanvasTexture(bumpCanvas),
    ao: new THREE.CanvasTexture(aoCanvas),
  };
}

function buildCaliforniaPaverMaps(size: number): TileMaterialMaps {
  const albedoCanvas = document.createElement("canvas");
  albedoCanvas.width = size;
  albedoCanvas.height = size;
  const albedoCtx = albedoCanvas.getContext("2d");
  if (!albedoCtx) return makeFallbackTileMaps(size);

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext("2d");
  if (!bumpCtx) return makeFallbackTileMaps(size);

  const roughnessCanvas = document.createElement("canvas");
  roughnessCanvas.width = size;
  roughnessCanvas.height = size;
  const roughnessCtx = roughnessCanvas.getContext("2d");
  if (!roughnessCtx) return makeFallbackTileMaps(size);

  const aoCanvas = document.createElement("canvas");
  aoCanvas.width = size;
  aoCanvas.height = size;
  const aoCtx = aoCanvas.getContext("2d");
  if (!aoCtx) return makeFallbackTileMaps(size);

  const joints = Math.max(2, Math.round(size * 0.01));
  const blocks = [
    { x: 0, y: 0, w: 0.34, h: 0.5 },
    { x: 0.34, y: 0, w: 0.66, h: 0.34 },
    { x: 0.34, y: 0.34, w: 0.33, h: 0.33 },
    { x: 0.67, y: 0.34, w: 0.33, h: 0.66 },
    { x: 0, y: 0.5, w: 0.67, h: 0.5 },
  ] as const;

  albedoCtx.fillStyle = "#ededee";
  albedoCtx.fillRect(0, 0, size, size);
  for (let i = 0; i < blocks.length; i += 1) {
    const b = blocks[i];
    const x = Math.round(b.x * size) + joints;
    const y = Math.round(b.y * size) + joints;
    const w = Math.round(b.w * size) - joints * 2;
    const h = Math.round(b.h * size) - joints * 2;
    const tone = 228 - (i % 2 === 0 ? 0 : 5);
    albedoCtx.fillStyle = `rgb(${tone},${tone},${tone})`;
    albedoCtx.fillRect(x, y, w, h);
  }
  albedoCtx.fillStyle = "rgba(207,207,210,0.9)";
  for (let i = 0; i < size * 1.15; i += 1) {
    const x = (i * 61) % size;
    const y = (i * 47) % size;
    albedoCtx.fillRect(x, y, 1.1, 1.1);
  }

  bumpCtx.fillStyle = "#8a8a8a";
  bumpCtx.fillRect(0, 0, size, size);
  for (const b of blocks) {
    const x = Math.round(b.x * size) + joints;
    const y = Math.round(b.y * size) + joints;
    const w = Math.round(b.w * size) - joints * 2;
    const h = Math.round(b.h * size) - joints * 2;
    bumpCtx.fillStyle = "#b6b6b6";
    bumpCtx.fillRect(x, y, w, h);
  }

  roughnessCtx.fillStyle = "#aaaaaa";
  roughnessCtx.fillRect(0, 0, size, size);
  for (const b of blocks) {
    const x = Math.round(b.x * size) + joints;
    const y = Math.round(b.y * size) + joints;
    const w = Math.round(b.w * size) - joints * 2;
    const h = Math.round(b.h * size) - joints * 2;
    roughnessCtx.fillStyle = "#b2b2b2";
    roughnessCtx.fillRect(x, y, w, h);
  }

  aoCtx.fillStyle = "#f0f0f0";
  aoCtx.fillRect(0, 0, size, size);
  aoCtx.fillStyle = "#f7f7f7";
  for (const b of blocks) {
    const x = Math.round(b.x * size) + joints;
    const y = Math.round(b.y * size) + joints;
    const w = Math.round(b.w * size) - joints * 2;
    const h = Math.round(b.h * size) - joints * 2;
    aoCtx.fillRect(x, y, w, h);
  }

  const normalCanvas = buildNormalMapFromHeight(bumpCanvas);
  return {
    color: new THREE.CanvasTexture(albedoCanvas),
    normal: new THREE.CanvasTexture(normalCanvas),
    roughness: new THREE.CanvasTexture(roughnessCanvas),
    bump: new THREE.CanvasTexture(bumpCanvas),
    ao: new THREE.CanvasTexture(aoCanvas),
  };
}

function buildPorcelainTileMaps(size: number): TileMaterialMaps {
  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = size;
  colorCanvas.height = size;
  const colorCtx = colorCanvas.getContext("2d");
  if (!colorCtx) return makeFallbackTileMaps(size);

  const roughnessCanvas = document.createElement("canvas");
  roughnessCanvas.width = size;
  roughnessCanvas.height = size;
  const roughnessCtx = roughnessCanvas.getContext("2d");
  if (!roughnessCtx) return makeFallbackTileMaps(size);

  colorCtx.fillStyle = "#7d7268";
  colorCtx.fillRect(0, 0, size, size);

  // Dedicated porcelain grain: subtle and uniform, no paver ornaments.
  for (let i = 0; i < size * 2.1; i += 1) {
    const x = (i * 67) % size;
    const y = (i * 109) % size;
    const delta = ((i * 11) % 24) - 12;
    const base = 124;
    const v = THREE.MathUtils.clamp(base + delta, 82, 176);
    const r = Math.round(v * 1.06);
    const g = Math.round(v * 0.98);
    const b = Math.round(v * 0.9);
    colorCtx.fillStyle = `rgb(${r},${g},${b})`;
    colorCtx.fillRect(x, y, 2, 2);
  }

  roughnessCtx.fillStyle = "#898989";
  roughnessCtx.fillRect(0, 0, size, size);
  for (let i = 0; i < size * 1.6; i += 1) {
    const x = (i * 71) % size;
    const y = (i * 59) % size;
    const rough = 136 + ((i * 7) % 18);
    roughnessCtx.fillStyle = `rgb(${rough},${rough},${rough})`;
    roughnessCtx.fillRect(x, y, 2, 2);
  }

  return {
    color: new THREE.CanvasTexture(colorCanvas),
    normal: null,
    roughness: new THREE.CanvasTexture(roughnessCanvas),
    bump: null,
    ao: null,
  };
}

function buildPorcelainMapsFromAlbedo(colorTexture: THREE.Texture): TileMaterialMaps {
  const colorCanvas = textureToCanvas(colorTexture);
  if (!colorCanvas) {
    return {
      color: colorTexture,
      normal: null,
      roughness: null,
      bump: null,
      ao: null,
    };
  }

  const width = colorCanvas.width;
  const height = colorCanvas.height;
  const colorCtx = colorCanvas.getContext("2d");
  if (!colorCtx) {
    return {
      color: colorTexture,
      normal: null,
      roughness: null,
      bump: null,
      ao: null,
    };
  }

  const colorData = colorCtx.getImageData(0, 0, width, height).data;
  const roughCanvas = document.createElement("canvas");
  roughCanvas.width = width;
  roughCanvas.height = height;
  const roughCtx = roughCanvas.getContext("2d");
  if (!roughCtx) {
    return {
      color: colorTexture,
      normal: null,
      roughness: null,
      bump: null,
      ao: null,
    };
  }

  const roughData = roughCtx.createImageData(width, height);
  const out = roughData.data;
  for (let i = 0; i < colorData.length; i += 4) {
    const luma = (colorData[i] * 0.2126 + colorData[i + 1] * 0.7152 + colorData[i + 2] * 0.0722) / 255;
    const rough = THREE.MathUtils.clamp(0.34 + (1 - luma) * 0.13, 0.3, 0.62);
    const px = Math.round(rough * 255);
    out[i] = px;
    out[i + 1] = px;
    out[i + 2] = px;
    out[i + 3] = 255;
  }
  roughCtx.putImageData(roughData, 0, 0);

  return {
    color: colorTexture,
    normal: null,
    roughness: new THREE.CanvasTexture(roughCanvas),
    bump: null,
    ao: null,
  };
}

function buildGrassMaps(size: number): TileMaterialMaps {
  const colorCanvas = document.createElement("canvas");
  colorCanvas.width = size;
  colorCanvas.height = size;
  const colorCtx = colorCanvas.getContext("2d");
  if (!colorCtx) return makeFallbackTileMaps(size);

  const roughnessCanvas = document.createElement("canvas");
  roughnessCanvas.width = size;
  roughnessCanvas.height = size;
  const roughnessCtx = roughnessCanvas.getContext("2d");
  if (!roughnessCtx) return makeFallbackTileMaps(size);

  const bumpCanvas = document.createElement("canvas");
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext("2d");
  if (!bumpCtx) return makeFallbackTileMaps(size);

  colorCtx.fillStyle = "#4b7838";
  colorCtx.fillRect(0, 0, size, size);

  for (let i = 0; i < size * 2.2; i += 1) {
    const x = (i * 37) % size;
    const y = (i * 91) % size;
    const tone = 88 + ((i * 19) % 36);
    colorCtx.fillStyle = `rgb(${Math.floor(tone * 0.58)},${tone},${Math.floor(tone * 0.42)})`;
    colorCtx.fillRect(x, y, 2, 2);
  }

  for (let i = 0; i < size * 1.6; i += 1) {
    const x = (i * 71) % size;
    const y = (i * 43) % size;
    const h = 4 + ((i * 13) % 8);
    colorCtx.strokeStyle = i % 3 === 0 ? "#6ea557" : "#5a8e47";
    colorCtx.lineWidth = 1;
    colorCtx.beginPath();
    colorCtx.moveTo(x, y);
    colorCtx.lineTo(x + ((i % 2 === 0 ? 1 : -1) * (1 + (i % 3))), Math.max(0, y - h));
    colorCtx.stroke();
  }

  roughnessCtx.fillStyle = "#9c9c9c";
  roughnessCtx.fillRect(0, 0, size, size);
  for (let i = 0; i < size * 1.5; i += 1) {
    const x = (i * 59) % size;
    const y = (i * 83) % size;
    const v = 118 + ((i * 7) % 34);
    roughnessCtx.fillStyle = `rgb(${v},${v},${v})`;
    roughnessCtx.fillRect(x, y, 2, 2);
  }

  bumpCtx.fillStyle = "#7f7f7f";
  bumpCtx.fillRect(0, 0, size, size);
  for (let i = 0; i < size * 1.8; i += 1) {
    const x = (i * 47) % size;
    const y = (i * 67) % size;
    const v = 140 + ((i * 11) % 70);
    bumpCtx.fillStyle = `rgb(${v},${v},${v})`;
    bumpCtx.fillRect(x, y, 2, 3);
  }

  const normalCanvas = buildNormalMapFromHeight(bumpCanvas);

  return {
    color: new THREE.CanvasTexture(colorCanvas),
    normal: new THREE.CanvasTexture(normalCanvas),
    roughness: new THREE.CanvasTexture(roughnessCanvas),
    bump: new THREE.CanvasTexture(bumpCanvas),
    ao: null,
  };
}

function textureToCanvas(texture: THREE.Texture): HTMLCanvasElement | null {
  const image = texture.image as { width?: number; height?: number } & CanvasImageSource;
  const width = image?.width;
  const height = image?.height;
  if (!width || !height) return null;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(image, 0, 0, width, height);
  return canvas;
}


function enhanceSquareDepthMaps(maps: TileMaterialMaps): TileMaterialMaps {
  if (!maps.color || !maps.bump) return maps;

  const colorCanvas = textureToCanvas(maps.color);
  const bumpCanvas = textureToCanvas(maps.bump);
  if (!colorCanvas || !bumpCanvas) return maps;

  const width = colorCanvas.width;
  const height = colorCanvas.height;
  const colorCtx = colorCanvas.getContext("2d");
  const bumpCtx = bumpCanvas.getContext("2d");
  if (!colorCtx || !bumpCtx) return maps;

  const colorData = colorCtx.getImageData(0, 0, width, height);
  const bumpData = bumpCtx.getImageData(0, 0, width, height);
  const outColor = colorData.data;
  const outBump = bumpData.data;

  const aoCanvas = maps.ao ? textureToCanvas(maps.ao) : null;
  const aoCtx = aoCanvas?.getContext("2d") ?? null;
  const aoData = aoCtx ? aoCtx.getImageData(0, 0, width, height) : null;
  const outAo = aoData?.data ?? null;

  const roughCanvas = maps.roughness ? textureToCanvas(maps.roughness) : null;
  const roughCtx = roughCanvas?.getContext("2d") ?? null;
  const roughData = roughCtx ? roughCtx.getImageData(0, 0, width, height) : null;
  const outRough = roughData?.data ?? null;

  for (let i = 0; i < outColor.length; i += 4) {
    const h = outBump[i] / 255;
    const groove = THREE.MathUtils.clamp((0.635 - h) * 3.25, 0, 1);

    // Darken groove zones on albedo so recesses read clearly.
    const shade = 1 - groove * 0.4;
    outColor[i] = Math.max(0, Math.round(outColor[i] * shade));
    outColor[i + 1] = Math.max(0, Math.round(outColor[i + 1] * shade));
    outColor[i + 2] = Math.max(0, Math.round(outColor[i + 2] * shade));

    // Expand height contrast for stronger bump/displacement impression.
    const hBoost = THREE.MathUtils.clamp((h - 0.5) * 2.25 + 0.5, 0, 1);
    const hPx = Math.round(hBoost * 255);
    outBump[i] = hPx;
    outBump[i + 1] = hPx;
    outBump[i + 2] = hPx;

    if (outAo) {
      const aoBase = outAo[i] / 255;
      const ao = THREE.MathUtils.clamp(aoBase - groove * 0.38, 0, 1);
      const aoPx = Math.round(ao * 255);
      outAo[i] = aoPx;
      outAo[i + 1] = aoPx;
      outAo[i + 2] = aoPx;
    }

    if (outRough) {
      const rBase = outRough[i] / 255;
      const r = THREE.MathUtils.clamp(rBase + groove * 0.12, 0, 1);
      const rPx = Math.round(r * 255);
      outRough[i] = rPx;
      outRough[i + 1] = rPx;
      outRough[i + 2] = rPx;
    }
  }

  colorCtx.putImageData(colorData, 0, 0);
  bumpCtx.putImageData(bumpData, 0, 0);
  if (aoCtx && aoData) aoCtx.putImageData(aoData, 0, 0);
  if (roughCtx && roughData) roughCtx.putImageData(roughData, 0, 0);

  const nextColor = new THREE.CanvasTexture(colorCanvas);
  const nextBump = new THREE.CanvasTexture(bumpCanvas);
  const nextAo = aoCanvas ? new THREE.CanvasTexture(aoCanvas) : maps.ao;
  const nextRough = roughCanvas ? new THREE.CanvasTexture(roughCanvas) : maps.roughness;

  maps.color.dispose();
  maps.bump.dispose();
  if (nextAo !== maps.ao) maps.ao?.dispose();
  if (nextRough !== maps.roughness) maps.roughness?.dispose();

  return {
    color: nextColor,
    normal: maps.normal,
    roughness: nextRough,
    bump: nextBump,
    ao: nextAo,
  };
}

async function assetExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "GET", cache: "no-store" });
    return response.ok;
  } catch {
    return false;
  }
}

async function loadTextureOptional(loader: THREE.TextureLoader, url: string): Promise<THREE.Texture | null> {
  const exists = await assetExists(url);
  if (!exists) return null;
  return loader.loadAsync(url);
}

async function loadPaverMapsStrict({
  mapsSet,
  requiredFile,
  expectedFiles,
}: {
  mapsSet: typeof PAVER_30X30_MAPS;
  requiredFile: string;
  expectedFiles: readonly string[];
}): Promise<TileMaterialMaps> {
  const hasAlbedo = await assetExists(mapsSet.color);
  if (!hasAlbedo) {
    throw new Error(
      [
        `[PlotPreview3D] Missing required tile texture: ${requiredFile}`,
        "[PlotPreview3D] Expected files:",
        ...expectedFiles.map((item) => `- ${item}`),
      ].join("\n"),
    );
  }

  const loader = new THREE.TextureLoader();
  const [color, normal, roughness, bump, ao] = await Promise.all([
    loader.loadAsync(mapsSet.color),
    loadTextureOptional(loader, mapsSet.normal),
    loadTextureOptional(loader, mapsSet.roughness),
    loadTextureOptional(loader, mapsSet.bump),
    loadTextureOptional(loader, mapsSet.ao),
  ]);

  return {
    color,
    normal,
    roughness,
    bump,
    ao,
  };
}

async function loadPaver30x30MapsStrict(): Promise<TileMaterialMaps> {
  return loadPaverMapsStrict({
    mapsSet: PAVER_30X30_MAPS,
    requiredFile: REQUIRED_PAVER_30X30_FILE,
    expectedFiles: EXPECTED_PAVER_30X30_FILES,
  });
}

async function loadPaver30x30SquareMapsStrict(): Promise<TileMaterialMaps> {
  return loadPaverMapsStrict({
    mapsSet: PAVER_30X30_SQUARE_MAPS,
    requiredFile: REQUIRED_PAVER_30X30_SQUARE_FILE,
    expectedFiles: EXPECTED_PAVER_30X30_SQUARE_FILES,
  });
}

async function loadPaver30x30CaliforniaMapsStrict(): Promise<TileMaterialMaps> {
  return loadPaverMapsStrict({
    mapsSet: PAVER_30X30_CALIFORNIA_MAPS,
    requiredFile: REQUIRED_PAVER_30X30_CALIFORNIA_FILE,
    expectedFiles: EXPECTED_PAVER_30X30_CALIFORNIA_FILES,
  });
}

async function loadPorcelain60x60MapsStrict(variant: "barrone" | "g640" | "g610"): Promise<TileMaterialMaps> {
  if (variant === "g640" || variant === "g610") {
    try {
      const loader = new THREE.TextureLoader();
      const color = await loader.loadAsync(variant === "g640" ? PORCELAIN_60X60_G640_ALBEDO : PORCELAIN_60X60_G610_ALBEDO);
      return buildPorcelainMapsFromAlbedo(color);
    } catch {
      return buildPorcelainTileMaps(1024);
    }
  }
  return buildPorcelainTileMaps(1024);
}

async function loadTextureOptionalDirect(loader: THREE.TextureLoader, url: string): Promise<THREE.Texture | null> {
  try {
    return await loader.loadAsync(url);
  } catch {
    return null;
  }
}

async function loadPaverMapsFromFiles(
  mapsSet: typeof PAVER_30X30_MAPS,
): Promise<TileMaterialMaps> {
  const loader = new THREE.TextureLoader();
  const color = await loader.loadAsync(mapsSet.color);
  const [normal, roughness, bump, ao] = await Promise.all([
    loadTextureOptionalDirect(loader, mapsSet.normal),
    loadTextureOptionalDirect(loader, mapsSet.roughness),
    loadTextureOptionalDirect(loader, mapsSet.bump),
    loadTextureOptionalDirect(loader, mapsSet.ao),
  ]);
  return { color, normal, roughness, bump, ao };
}

async function loadPaverMapsByPatternWithFallback(
  pattern: "circle" | "square" | "california",
): Promise<TileMaterialMaps> {
  const mapsSet =
    pattern === "square"
      ? PAVER_30X30_SQUARE_MAPS
      : pattern === "california"
        ? PAVER_30X30_CALIFORNIA_MAPS
        : PAVER_30X30_MAPS;
  try {
    return await loadPaverMapsFromFiles(mapsSet);
  } catch {
    // If static files fail for any reason, keep renderer functional.
  }

  if (pattern === "square") return buildSquarePaverMaps(1024);
  if (pattern === "california") return buildCaliforniaPaverMaps(1024);
  return buildClassicPaverMaps(1024);
}

async function loadTileMapsByClass(
  materialClass: TileMaterialClass,
  paverPattern: "circle" | "square" | "california",
  porcelainVariant: "barrone" | "g640" | "g610",
): Promise<TileMaterialMaps> {
  if (materialClass === "porcelain") {
    return loadPorcelain60x60MapsStrict(porcelainVariant);
  }
  return loadPaverMapsByPatternWithFallback(paverPattern);
}

function TileField({
  plotW,
  plotD,
  tileSize,
  seam,
  tileThickness,
  edgeChamfer,
  fullTilesOnlyX,
  fullTilesOnlyZ,
  maps,
  isPorcelain,
  porcelainVariant,
  paverPattern,
}: {
  plotW: number;
  plotD: number;
  tileSize: number;
  seam: number;
  tileThickness: number;
  edgeChamfer: number;
  fullTilesOnlyX: boolean;
  fullTilesOnlyZ: boolean;
  maps: TileMaterialMaps;
  isPorcelain: boolean;
  porcelainVariant: "barrone" | "g640" | "g610";
  paverPattern: "circle" | "square" | "california";
}) {
  const layout = useMemo(() => {
    const useSquareDisplacement = false;
    const xAxis = buildAxisSegmentsFromCorner({
      axisSize: plotW,
      tileSize,
      seamSize: seam,
      fullTilesOnly: fullTilesOnlyX,
    });
    const zAxis = buildAxisSegmentsFromCorner({
      axisSize: plotD,
      tileSize,
      seamSize: seam,
      fullTilesOnly: fullTilesOnlyZ,
    });
    const thickness = tileThickness;
    const topY = TILE_CENTER_Y + thickness * 0.5;
    const meshes: Array<{
      key: string;
      geometry: THREE.BufferGeometry;
      topGeometry: THREE.BufferGeometry | null;
      position: [number, number, number];
      topPosition: [number, number, number] | null;
    }> = [];

    const remapUv = (geometry: THREE.BufferGeometry, uMin: number, uMax: number, vMin: number, vMax: number) => {
      const uv = geometry.getAttribute("uv") as THREE.BufferAttribute;
      for (let i = 0; i < uv.count; i += 1) {
        const u = uv.getX(i);
        const v = uv.getY(i);
        uv.setXY(i, uMin + u * (uMax - uMin), vMin + v * (vMax - vMin));
      }
      uv.needsUpdate = true;
      geometry.setAttribute("uv2", new THREE.BufferAttribute(new Float32Array(uv.array), 2));
    };

    const makeTileGeometry = (width: number, depth: number, uMin: number, uMax: number, vMin: number, vMax: number) => {
      const geometry = new THREE.BoxGeometry(width, thickness, depth).toNonIndexed();
      const pos = geometry.getAttribute("position") as THREE.BufferAttribute;
      const uv = geometry.getAttribute("uv") as THREE.BufferAttribute;
      const halfW = width * 0.5;
      const halfD = depth * 0.5;
      const insetX = Math.min(edgeChamfer, Math.max(0, halfW - 0.0005));
      const insetZ = Math.min(edgeChamfer, Math.max(0, halfD - 0.0005));
      for (let i = 0; i < pos.count; i += 1) {
        if (pos.getY(i) > thickness * 0.45) {
          // Apply 3mm top chamfer for all paver types.
          const x = pos.getX(i);
          const z = pos.getZ(i);
          if (x > 0) pos.setX(i, Math.max(0, x - insetX));
          if (x < 0) pos.setX(i, Math.min(0, x + insetX));
          if (z > 0) pos.setZ(i, Math.max(0, z - insetZ));
          if (z < 0) pos.setZ(i, Math.min(0, z + insetZ));

          const u = uv.getX(i);
          const v = uv.getY(i);
          uv.setXY(i, uMin + u * (uMax - uMin), vMin + v * (vMax - vMin));
        }
      }
      uv.needsUpdate = true;
      geometry.setAttribute("uv2", new THREE.BufferAttribute(new Float32Array(uv.array), 2));
      geometry.computeVertexNormals();
      return geometry;
    };

    const makeTopGeometry = (width: number, depth: number, uMin: number, uMax: number, vMin: number, vMax: number) => {
      const segX = Math.max(22, Math.round((width / 0.3) * 64));
      const segZ = Math.max(22, Math.round((depth / 0.3) * 64));
      const geometry = new THREE.PlaneGeometry(width, depth, segX, segZ);
      geometry.rotateX(-Math.PI / 2);
      remapUv(geometry, uMin, uMax, vMin, vMax);
      geometry.computeVertexNormals();
      return geometry;
    };

    for (let zi = 0; zi < zAxis.segments.length; zi += 1) {
      for (let xi = 0; xi < xAxis.segments.length; xi += 1) {
        const xSeg = xAxis.segments[xi];
        const zSeg = zAxis.segments[zi];
        const geometry = makeTileGeometry(xSeg.size, zSeg.size, xSeg.uvMin, xSeg.uvMax, zSeg.uvMin, zSeg.uvMax);
        const topGeometry = useSquareDisplacement
          ? makeTopGeometry(xSeg.size, zSeg.size, xSeg.uvMin, xSeg.uvMax, zSeg.uvMin, zSeg.uvMax)
          : null;
        meshes.push({
          key: `${xi}-${zi}`,
          geometry,
          topGeometry,
          position: [xAxis.centers[xi], TILE_CENTER_Y, zAxis.centers[zi]],
          topPosition: topGeometry ? [xAxis.centers[xi], topY + 0.0007, zAxis.centers[zi]] : null,
        });
      }
    }

    return meshes;
  }, [plotW, plotD, seam, tileSize, tileThickness, edgeChamfer, fullTilesOnlyX, fullTilesOnlyZ, isPorcelain, paverPattern]);

  useEffect(() => {
    return () => {
      for (const mesh of layout) {
        mesh.geometry.dispose();
        mesh.topGeometry?.dispose();
      }
    };
  }, [layout]);

  const materialClass: TileMaterialClass = isPorcelain ? "porcelain" : "paver";
  const isEmbossedPaver =
    materialClass === "paver" && (paverPattern === "circle" || paverPattern === "square" || paverPattern === "california");
  // Force material re-creation when switching material modes to prevent map leakage.
  const tileMaterialModeKey = isPorcelain ? `porcelain-${porcelainVariant}` : `paver-${paverPattern}`;
  const tileTopY = TILE_CENTER_Y + tileThickness * 0.5;

  return (
    <>
      {/* Grout base creates physically thin and clean seams */}
      {isPorcelain ? (
        <mesh receiveShadow position={[0, tileTopY - 0.00018, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[plotW, plotD]} />
          <meshStandardMaterial color={PORCELAIN_GROUT_COLOR} roughness={0.72} metalness={0} />
        </mesh>
      ) : (
        <mesh receiveShadow position={[0, 0.0408, 0]}>
          <boxGeometry args={[plotW, 0.005, plotD]} />
          <meshStandardMaterial color={TILE_GROUT_COLOR} roughness={0.95} metalness={0} />
        </mesh>
      )}
      {layout.map((tile) => (
        <group key={tile.key}>
          <mesh geometry={tile.geometry} position={tile.position} castShadow receiveShadow>
            {materialClass === "porcelain" ? (
              <meshStandardMaterial
                key={`tile-main-${tileMaterialModeKey}`}
                map={maps.color ?? undefined}
                roughnessMap={maps.roughness ?? undefined}
                color="#ffffff"
                roughness={0.4}
                metalness={0}
                envMapIntensity={0.34}
              />
            ) : (
              <meshStandardMaterial
                key={`tile-main-${tileMaterialModeKey}`}
                map={maps.color ?? undefined}
                normalMap={maps.normal ?? undefined}
                roughnessMap={maps.roughness ?? undefined}
                bumpMap={maps.bump ?? undefined}
                aoMap={maps.ao ?? undefined}
                color="#ffffff"
                roughness={isEmbossedPaver ? 0.68 : 0.74}
                metalness={0}
                normalScale={isEmbossedPaver ? new THREE.Vector2(3.6, 3.6) : new THREE.Vector2(0.6, 0.6)}
                bumpScale={isEmbossedPaver ? 0.19 : 0.03}
                aoMapIntensity={isEmbossedPaver ? 3.6 : 1.1}
                envMapIntensity={isEmbossedPaver ? 0.84 : 1}
              />
            )}
          </mesh>
          {tile.topGeometry && tile.topPosition ? (
            <mesh geometry={tile.topGeometry} position={tile.topPosition} castShadow receiveShadow>
              <meshStandardMaterial
                map={maps.color ?? undefined}
                normalMap={maps.normal ?? undefined}
                bumpMap={maps.bump ?? undefined}
                displacementMap={maps.bump ?? undefined}
                aoMap={maps.ao ?? undefined}
                color="#ffffff"
                roughness={0.8}
                metalness={0}
                normalScale={new THREE.Vector2(1.45, 1.45)}
                bumpScale={0.02}
                displacementScale={-0.0028}
                displacementBias={0.0012}
                aoMapIntensity={1.9}
                envMapIntensity={0.82}
              />
            </mesh>
          ) : null}
        </group>
      ))}
    </>
  );
}

export default function PlotPreview3D({
  lengthM,
  widthM,
  freeLengthM,
  freeWidthM,
  isPorcelain,
  isCurbWithoutCladding = false,
  porcelainVariant = "barrone",
  paverPattern = "circle",
}: PlotPreview3DProps) {
  const materialClass: TileMaterialClass = isPorcelain ? "porcelain" : "paver";
  const [activePreset, setActivePreset] = useState<CameraPresetId>("overview");
  const mapsLoadSeqRef = useRef(0);
  const [tileMaps, setTileMaps] = useState<TileMaterialMaps>({
    color: null,
    normal: null,
    roughness: null,
    bump: null,
    ao: null,
  });
  const [tileMapsError, setTileMapsError] = useState<string | null>(null);
  const [grassMaps, setGrassMaps] = useState<TileMaterialMaps>({
    color: null,
    normal: null,
    roughness: null,
    bump: null,
    ao: null,
  });
  const maxDim = Math.max(lengthM, widthM, 1);
  const s = 3.55 / maxDim;
  const plotW = lengthM * s;
  const plotD = widthM * s;
  const slabW = plotW + 0.28;
  const slabD = plotD + 0.28;

  const freeW = Math.min(Math.max(0, freeLengthM * s), plotW);
  const freeD = Math.min(Math.max(0, freeWidthM * s), plotD);
  const sceneBgColor = "#e7ebf0";
  const ambientIntensity = 0.52;
  const keyLightIntensity = 1.2;
  const fillLightIntensity = 0.27;
  const watermarkPatternStyle = useMemo(() => {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='280' height='180' viewBox='0 0 280 180'><g transform='rotate(-24 140 90)'><text x='18' y='98' fill='rgba(42,56,73,0.22)' font-size='18' font-family='Arial, sans-serif' letter-spacing='2'>ЛИНИЯ ГРАНИТА</text></g></svg>`;
    return {
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
      backgroundRepeat: "repeat",
      backgroundSize: "280px 180px",
      opacity: 0.62,
    };
  }, []);

  useEffect(() => {
    let isDisposed = false;
    const loadSeq = ++mapsLoadSeqRef.current;

    const disposeMaps = (maps: TileMaterialMaps) => {
      maps.color?.dispose();
      maps.normal?.dispose();
      maps.roughness?.dispose();
      maps.bump?.dispose();
      maps.ao?.dispose();
    };

    const loadMaps = async () => {
      setTileMapsError(null);
      try {
        const loaded = await loadTileMapsByClass(materialClass, paverPattern, porcelainVariant);
        const nextMaps =
          materialClass === "paver" && (paverPattern === "circle" || paverPattern === "square" || paverPattern === "california")
            ? enhanceSquareDepthMaps(loaded)
            : loaded;
        if (isDisposed || loadSeq !== mapsLoadSeqRef.current) {
          disposeMaps(nextMaps);
          return;
        }
        setTileMaps(() => nextMaps);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (isDisposed || loadSeq !== mapsLoadSeqRef.current) return;
        setTileMapsError(message);
      }
    };

    loadMaps();

    return () => {
      isDisposed = true;
    };
  }, [materialClass, paverPattern, porcelainVariant]);

  useEffect(() => {
    return () => {
      tileMaps.color?.dispose();
      tileMaps.normal?.dispose();
      tileMaps.roughness?.dispose();
      tileMaps.bump?.dispose();
      tileMaps.ao?.dispose();
    };
  }, [tileMaps]);

  useEffect(() => {
    // Canvas-based map generation is browser-only.
    if (typeof document === "undefined") return;
    const maps = buildGrassMaps(512);
    setGrassMaps(maps);
    return () => {
      maps.color?.dispose();
      maps.normal?.dispose();
      maps.roughness?.dispose();
      maps.bump?.dispose();
      maps.ao?.dispose();
    };
  }, []);

  useEffect(() => {
    const anisotropy = 16;
    const mapsToApply = [
      { texture: tileMaps.color, isColor: true },
      { texture: tileMaps.normal, isColor: false },
      { texture: tileMaps.roughness, isColor: false },
      { texture: tileMaps.bump, isColor: false },
      { texture: tileMaps.ao, isColor: false },
    ];

    for (const mapData of mapsToApply) {
      if (!mapData.texture) continue;
      applyTextureQualitySettings(mapData.texture, {
        anisotropy,
        repeatX: 1,
        repeatY: 1,
        isColor: mapData.isColor,
        clampToEdge: true,
      });
    }
  }, [tileMaps, isPorcelain]);

  useEffect(() => {
    const mapsToApply = [
      { texture: grassMaps.color, isColor: true },
      { texture: grassMaps.normal, isColor: false },
      { texture: grassMaps.roughness, isColor: false },
      { texture: grassMaps.bump, isColor: false },
    ];
    for (const mapData of mapsToApply) {
      if (!mapData.texture) continue;
      applyTextureQualitySettings(mapData.texture, {
        anisotropy: 8,
        repeatX: 5.5,
        repeatY: 5.5,
        isColor: mapData.isColor,
        clampToEdge: false,
      });
    }
  }, [grassMaps]);

  const tileLayout = useMemo(() => {
    const tileSizeWorld = (isPorcelain ? PORCELAIN_TILE_SIZE_M : TILE_SIZE_M) * s;
    const seamWorld = isPorcelain ? s * PORCELAIN_JOINT_M : s * JOINT_M;
    const tileThicknessWorld = isPorcelain ? s * PORCELAIN_THICKNESS_M : TILE_THICKNESS_Y;
    const chamferWorld = isPorcelain ? 0 : s * PAVER_CHAMFER_M;
    const baseTileM = isPorcelain ? PORCELAIN_TILE_SIZE_M : TILE_SIZE_M;
    // Required explicit math for no-cut mode.
    const cols = Math.max(1, Math.round(lengthM / baseTileM));
    const rows = Math.max(1, Math.round(widthM / baseTileM));
    const isLengthMultiple = Math.abs(lengthM - cols * baseTileM) < 1e-6;
    const isWidthMultiple = Math.abs(widthM - rows * baseTileM) < 1e-6;
    const fullTilesOnly = isLengthMultiple && isWidthMultiple;
    return {
      tileSizeWorld,
      seamWorld,
      tileThicknessWorld,
      chamferWorld,
      cols,
      rows,
      isLengthMultiple,
      isWidthMultiple,
      fullTilesOnly,
    };
  }, [isPorcelain, s, lengthM, widthM]);
  const tileTopY = TILE_CENTER_Y + tileLayout.tileThicknessWorld * 0.5;

  const sceneBounds = useMemo<SceneBounds>(() => {
    const horizontalRadius = Math.hypot(slabW, slabD) * 0.5;
    const verticalRadius = 0.23;
    return {
      radius: Math.hypot(horizontalRadius, verticalRadius) * 1.03,
      targetY: 0.015,
    };
  }, [slabW, slabD]);

  const curbLayout = useMemo(() => {
    const isPorcelainBaseSupport = isPorcelain && isCurbWithoutCladding;
    const curbThickness = CURB_THICKNESS_M * s;
    const curbHeight = CURB_HEIGHT_M * s;
    const curbChamfer = isPorcelainBaseSupport ? 0 : CURB_CHAMFER_M * s;
    const porcelainTileBottomY = tileTopY - tileLayout.tileThicknessWorld;
    // In porcelain + curb-without-cladding mode, curb supports tile from below.
    const curbTopY = isPorcelainBaseSupport ? porcelainTileBottomY : TILE_TOP_Y;
    const curbCenterY = curbTopY - curbHeight * 0.5;
    const outerW = isPorcelainBaseSupport ? plotW : plotW + BORDER_OFFSET_M * s;
    const outerD = isPorcelainBaseSupport ? plotD : plotD + BORDER_OFFSET_M * s;

    const xOuterRunM = lengthM + BORDER_OFFSET_M;
    const xInnerRunM = Math.max(0.01, lengthM);
    const zOuterRunM = widthM + BORDER_OFFSET_M;
    const zInnerRunM = Math.max(0.01, widthM);

    // For hidden support mode (porcelain + no cladding) curbs stay fully under tile footprint.
    // Otherwise keep existing outer/inner optimization to avoid tiny cut pieces.
    const xRunM = (() => {
      if (isPorcelainBaseSupport) return xInnerRunM;
      const optionXOuterMinCut = Math.min(
        calcRemainderM(xOuterRunM) || CURB_STD_M,
        calcRemainderM(zInnerRunM) || CURB_STD_M,
      );
      const optionZOuterMinCut = Math.min(
        calcRemainderM(xInnerRunM) || CURB_STD_M,
        calcRemainderM(zOuterRunM) || CURB_STD_M,
      );
      const xIsOuter = optionXOuterMinCut >= optionZOuterMinCut;
      return xIsOuter ? xOuterRunM : xInnerRunM;
    })();
    const zRunM = (() => {
      if (isPorcelainBaseSupport) return zInnerRunM;
      const optionXOuterMinCut = Math.min(
        calcRemainderM(xOuterRunM) || CURB_STD_M,
        calcRemainderM(zInnerRunM) || CURB_STD_M,
      );
      const optionZOuterMinCut = Math.min(
        calcRemainderM(xInnerRunM) || CURB_STD_M,
        calcRemainderM(zOuterRunM) || CURB_STD_M,
      );
      const xIsOuter = optionXOuterMinCut >= optionZOuterMinCut;
      return xIsOuter ? zInnerRunM : zOuterRunM;
    })();
    const xRunWorld = xRunM * s;
    const zRunWorld = zRunM * s;

    const xSegments = placeCurbSegments(buildCurbSegmentsByRun(xRunM), xRunWorld, s);
    const zSegments = placeCurbSegments(buildCurbSegmentsByRun(zRunM), zRunWorld, s);

    const meshes: Array<{
      key: string;
      geometry: THREE.BufferGeometry;
      position: [number, number, number];
      isCut: boolean;
      materialKind: "curb" | "joint";
    }> = [];
    const jointWorld = CURB_JOINT_M * s;
    const jointLength = jointWorld * 1.08;

    for (let i = 0; i < xSegments.length; i += 1) {
      const segment = xSegments[i];
      const topGeometry = createCurbGeometry({
        length: segment.sizeWorld,
        height: curbHeight,
        thickness: curbThickness,
        chamfer: curbChamfer,
        bevelOnPositiveThicknessSide: true,
      });
      const bottomGeometry = createCurbGeometry({
        length: segment.sizeWorld,
        height: curbHeight,
        thickness: curbThickness,
        chamfer: curbChamfer,
        bevelOnPositiveThicknessSide: false,
      });
      meshes.push({
        key: `curb-top-${i}`,
        geometry: topGeometry,
        position: [segment.center, curbCenterY, outerD * 0.5 - curbThickness * 0.5],
        isCut: segment.isCut,
        materialKind: "curb",
      });
      meshes.push({
        key: `curb-bottom-${i}`,
        geometry: bottomGeometry,
        position: [segment.center, curbCenterY, -outerD * 0.5 + curbThickness * 0.5],
        isCut: segment.isCut,
        materialKind: "curb",
      });
      if (i < xSegments.length - 1) {
        const next = xSegments[i + 1];
        const currentEnd = segment.center + segment.sizeWorld * 0.5;
        const nextStart = next.center - next.sizeWorld * 0.5;
        const seamCenter = (currentEnd + nextStart) * 0.5;
        const topJointGeometry = createCurbGeometry({
          length: jointLength,
          height: curbHeight,
          thickness: curbThickness,
          chamfer: curbChamfer,
          bevelOnPositiveThicknessSide: true,
        });
        const bottomJointGeometry = createCurbGeometry({
          length: jointLength,
          height: curbHeight,
          thickness: curbThickness,
          chamfer: curbChamfer,
          bevelOnPositiveThicknessSide: false,
        });
        meshes.push({
          key: `curb-top-joint-${i}`,
          geometry: topJointGeometry,
          position: [seamCenter, curbCenterY, outerD * 0.5 - curbThickness * 0.5],
          isCut: false,
          materialKind: "joint",
        });
        meshes.push({
          key: `curb-bottom-joint-${i}`,
          geometry: bottomJointGeometry,
          position: [seamCenter, curbCenterY, -outerD * 0.5 + curbThickness * 0.5],
          isCut: false,
          materialKind: "joint",
        });
      }
    }

    for (let i = 0; i < zSegments.length; i += 1) {
      const segment = zSegments[i];
      const rightGeometry = createCurbGeometry({
        length: segment.sizeWorld,
        height: curbHeight,
        thickness: curbThickness,
        chamfer: curbChamfer,
        bevelOnPositiveThicknessSide: true,
      });
      rightGeometry.rotateY(Math.PI / 2);
      rightGeometry.computeVertexNormals();

      const leftGeometry = createCurbGeometry({
        length: segment.sizeWorld,
        height: curbHeight,
        thickness: curbThickness,
        chamfer: curbChamfer,
        bevelOnPositiveThicknessSide: false,
      });
      leftGeometry.rotateY(Math.PI / 2);
      leftGeometry.computeVertexNormals();

      meshes.push({
        key: `curb-right-${i}`,
        geometry: rightGeometry,
        position: [outerW * 0.5 - curbThickness * 0.5, curbCenterY, segment.center],
        isCut: segment.isCut,
        materialKind: "curb",
      });
      meshes.push({
        key: `curb-left-${i}`,
        geometry: leftGeometry,
        position: [-outerW * 0.5 + curbThickness * 0.5, curbCenterY, segment.center],
        isCut: segment.isCut,
        materialKind: "curb",
      });
      if (i < zSegments.length - 1) {
        const next = zSegments[i + 1];
        const currentEnd = segment.center + segment.sizeWorld * 0.5;
        const nextStart = next.center - next.sizeWorld * 0.5;
        const seamCenter = (currentEnd + nextStart) * 0.5;
        const rightJointGeometry = createCurbGeometry({
          length: jointLength,
          height: curbHeight,
          thickness: curbThickness,
          chamfer: curbChamfer,
          bevelOnPositiveThicknessSide: true,
        });
        rightJointGeometry.rotateY(Math.PI / 2);
        rightJointGeometry.computeVertexNormals();
        const leftJointGeometry = createCurbGeometry({
          length: jointLength,
          height: curbHeight,
          thickness: curbThickness,
          chamfer: curbChamfer,
          bevelOnPositiveThicknessSide: false,
        });
        leftJointGeometry.rotateY(Math.PI / 2);
        leftJointGeometry.computeVertexNormals();
        meshes.push({
          key: `curb-right-joint-${i}`,
          geometry: rightJointGeometry,
          position: [outerW * 0.5 - curbThickness * 0.5, curbCenterY, seamCenter],
          isCut: false,
          materialKind: "joint",
        });
        meshes.push({
          key: `curb-left-joint-${i}`,
          geometry: leftJointGeometry,
          position: [-outerW * 0.5 + curbThickness * 0.5, curbCenterY, seamCenter],
          isCut: false,
          materialKind: "joint",
        });
      }
    }

    // Corner caps close end artifacts ("fangs") where side curbs meet.
    const cornerPositions: Array<{ x: number; z: number; outerXSign: -1 | 1; outerZSign: -1 | 1 }> = [
      { x: outerW * 0.5 - curbThickness * 0.5, z: outerD * 0.5 - curbThickness * 0.5, outerXSign: 1, outerZSign: 1 },
      {
        x: outerW * 0.5 - curbThickness * 0.5,
        z: -outerD * 0.5 + curbThickness * 0.5,
        outerXSign: 1,
        outerZSign: -1,
      },
      {
        x: -outerW * 0.5 + curbThickness * 0.5,
        z: outerD * 0.5 - curbThickness * 0.5,
        outerXSign: -1,
        outerZSign: 1,
      },
      {
        x: -outerW * 0.5 + curbThickness * 0.5,
        z: -outerD * 0.5 + curbThickness * 0.5,
        outerXSign: -1,
        outerZSign: -1,
      },
    ];

    for (let i = 0; i < cornerPositions.length; i += 1) {
      const { x, z, outerXSign, outerZSign } = cornerPositions[i];
      meshes.push({
        key: `curb-corner-${i}`,
        geometry: createCornerCapGeometry({
          thickness: curbThickness,
          height: curbHeight,
          chamfer: curbChamfer,
          outerXSign,
          outerZSign,
        }),
        position: [x, curbCenterY, z],
        isCut: false,
        materialKind: "curb",
      });
    }

    return meshes;
  }, [plotW, plotD, s, lengthM, widthM, isPorcelain, isCurbWithoutCladding, tileTopY, tileLayout.tileThicknessWorld]);

  const grassLayout = useMemo(() => {
    const isPorcelainBaseSupport = isPorcelain && isCurbWithoutCladding;
    const grassInsetOffset = isPorcelainBaseSupport ? 0 : BORDER_OFFSET_M * s;
    const outerW = plotW + grassInsetOffset;
    const outerD = plotD + grassInsetOffset;
    const grassBand = GRASS_RING_WIDTH_M * s;
    const curbHeight = CURB_HEIGHT_M * s;
    const grassHeight = GRASS_HEIGHT_M * s;
    const grassTopY = TILE_TOP_Y - curbHeight + GRASS_LEVEL_FROM_CURB_BOTTOM_M * s;
    const grassCenterY = grassTopY - grassHeight * 0.5;
    const outerGrassW = outerW + grassBand * 2;
    const outerGrassD = outerD + grassBand * 2;

    const stripsBase: Omit<GrassStrip, "bladeCount">[] = [
        {
          key: "grass-top",
          size: [outerGrassW, grassBand] as [number, number],
          position: [0, grassTopY, outerD * 0.5 + grassBand * 0.5] as [number, number, number],
        },
        {
          key: "grass-bottom",
          size: [outerGrassW, grassBand] as [number, number],
          position: [0, grassTopY, -outerD * 0.5 - grassBand * 0.5] as [number, number, number],
        },
        {
          key: "grass-right",
          size: [grassBand, outerD] as [number, number],
          position: [outerW * 0.5 + grassBand * 0.5, grassTopY, 0] as [number, number, number],
        },
        {
          key: "grass-left",
          size: [grassBand, outerD] as [number, number],
          position: [-outerW * 0.5 - grassBand * 0.5, grassTopY, 0] as [number, number, number],
        },
      ];
    const totalArea = stripsBase.reduce((sum, strip) => sum + strip.size[0] * strip.size[1], 0);
    let assigned = 0;
    const strips: GrassStrip[] = stripsBase.map((strip, index) => {
      const isLast = index === stripsBase.length - 1;
      const proportional =
        totalArea > 0 ? Math.round((strip.size[0] * strip.size[1] / totalArea) * GRASS_BLADE_TARGET_COUNT) : 0;
      const bladeCount = isLast ? Math.max(0, GRASS_BLADE_TARGET_COUNT - assigned) : proportional;
      assigned += bladeCount;
      return { ...strip, bladeCount: Math.max(1200, bladeCount) };
    });

    return { bladeHeight: 0.02 * s, strips };
  }, [plotW, plotD, s, isPorcelain, isCurbWithoutCladding]);

  useEffect(() => {
    return () => {
      for (const curbMesh of curbLayout) {
        curbMesh.geometry.dispose();
      }
    };
  }, [curbLayout]);

  if (!isPorcelain && tileMapsError) {
    return (
      <div className="relative flex h-[360px] w-full items-center justify-center overflow-hidden rounded-2xl border border-red-300 bg-red-50 p-4 text-left">
        <pre className="max-h-full overflow-auto whitespace-pre-wrap break-words text-xs leading-5 text-red-700">
          {tileMapsError}
        </pre>
      </div>
    );
  }

  return (
    <div
      className="relative h-[360px] w-full overflow-hidden rounded-2xl border border-white/10"
      style={{ backgroundColor: sceneBgColor }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [3.45, 2.85, 3.65], fov: 27 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[sceneBgColor]} />
        <ambientLight intensity={ambientIntensity} />
        <directionalLight
          castShadow
          intensity={keyLightIntensity}
          position={[4.5, 7, 3.4]}
          shadow-mapSize-width={1536}
          shadow-mapSize-height={1536}
          shadow-camera-near={0.5}
          shadow-camera-far={24}
        />
        <directionalLight intensity={fillLightIntensity} position={[-2, 3, -3]} />
        <SceneViewerControls presetId={activePreset} bounds={sceneBounds} />

        <group rotation={[-0.02, -0.56, 0]}>
          {/* Grass ring around curb */}
          {grassLayout.strips.map((strip) => (
            <group key={strip.key}>
              <mesh position={strip.position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={strip.size} />
                <meshStandardMaterial
                  map={grassMaps.color ?? undefined}
                  normalMap={grassMaps.normal ?? undefined}
                  roughnessMap={grassMaps.roughness ?? undefined}
                  bumpMap={grassMaps.bump ?? undefined}
                  color="#6a8f57"
                  roughness={0.95}
                  metalness={0}
                  normalScale={new THREE.Vector2(0.35, 0.35)}
                  bumpScale={0.012}
                />
              </mesh>
              <GrassBladeStrip strip={strip} bladeHeight={grassLayout.bladeHeight} />
            </group>
          ))}

          {/* Curb ring (100x8x20 cm modules, center cut if needed) */}
          {curbLayout.map((curb) => (
            <mesh key={curb.key} geometry={curb.geometry} position={curb.position} castShadow receiveShadow>
              <meshStandardMaterial
                color={curb.materialKind === "joint" ? CURB_JOINT_FILL_COLOR : "#aeb5bd"}
                roughness={curb.materialKind === "joint" ? 0.92 : 0.9}
                metalness={0}
              />
            </mesh>
          ))}

          {/* Tiled surface */}
          <TileField
            key={`${isPorcelain ? `porcelain-${porcelainVariant}` : "paver"}-${paverPattern}`}
            plotW={plotW}
            plotD={plotD}
            tileSize={tileLayout.tileSizeWorld}
            tileThickness={tileLayout.tileThicknessWorld}
            seam={tileLayout.seamWorld}
            edgeChamfer={tileLayout.chamferWorld}
            fullTilesOnlyX={tileLayout.isLengthMultiple}
            fullTilesOnlyZ={tileLayout.isWidthMultiple}
            maps={tileMaps}
            isPorcelain={isPorcelain}
            porcelainVariant={porcelainVariant}
            paverPattern={paverPattern}
          />

          {/* Optional free area highlight */}
          {freeW > 0 && freeD > 0 ? (
            <mesh receiveShadow position={[0, 0.06, 0]}>
              <boxGeometry args={[freeW, 0.028, freeD]} />
              <meshStandardMaterial color="#3f7f3b" roughness={0.92} />
            </mesh>
          ) : null}
        </group>
      </Canvas>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[5]" style={watermarkPatternStyle} />
      <div className="pointer-events-none absolute bottom-2.5 left-2.5 z-[11] rounded-lg border border-white/35 bg-black/30 px-2 py-1 text-[10px] font-semibold tracking-[0.18em] text-white/90 backdrop-blur-sm">
        ЛИНИЯ ГРАНИТА
      </div>
      <div className="pointer-events-none absolute right-2.5 top-2.5 z-10">
        <div className="pointer-events-auto flex gap-1 rounded-xl border border-white/40 bg-white/75 p-1 backdrop-blur-md">
          {CAMERA_PRESETS.map((preset) => {
            const isActive = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setActivePreset(preset.id)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                  isActive ? "bg-[#6f8dad] text-white shadow-sm" : "bg-white/70 text-[#3f4d5b] hover:bg-white"
                }`}
                aria-pressed={isActive}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

