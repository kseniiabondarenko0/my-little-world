import type { ComponentType } from 'react';
import { Ball, Box, Cyl, Legs } from './parts';

// Procedural 3D models. Each model:
//  - faces +z (its front),
//  - floor objects stand on y = 0, centred on x/z,
//  - wall objects are centred on their middle, back at z = -depth/2.
// Sizes match `size` in src/data/furniture.ts.
//
// To add a model: write a component below and add it to MODELS at the bottom.

const WOOD = '#e4b98f';
const WOOD_DARK = '#cf9f74';
const CREAM = '#fffaf3';
const GOLD = '#e0b25e';

function Bed() {
  return (
    <group>
      <Legs w={1.4} d={1.96} h={0.12} r={0.045} inset={0.08} color={WOOD_DARK} />
      <Box size={[1.42, 0.22, 1.96]} position={[0, 0.23, 0.02]} color={WOOD} radius={0.05} />
      <Box size={[1.32, 0.2, 1.84]} position={[0, 0.43, 0.04]} color={CREAM} radius={0.08} />
      {/* duvet */}
      <Box size={[1.38, 0.09, 1.28]} position={[0, 0.54, 0.36]} color="#a9c9f2" radius={0.045} />
      <Box size={[1.39, 0.06, 0.22]} position={[0, 0.575, -0.2]} color="#d3e4fa" radius={0.03} />
      {/* pillows */}
      <Box size={[0.52, 0.13, 0.32]} position={[-0.32, 0.6, -0.66]} rotation={[0.18, 0, 0]} color="#fde2e4" radius={0.065} />
      <Box size={[0.52, 0.13, 0.32]} position={[0.32, 0.6, -0.66]} rotation={[0.18, 0, 0]} color="#fde2e4" radius={0.065} />
      {/* headboard */}
      <Box size={[1.46, 1.0, 0.1]} position={[0, 0.5, -0.95]} color={WOOD} radius={0.05} />
      <Box size={[1.16, 0.42, 0.03]} position={[0, 0.72, -0.895]} color="#f3cfc0" radius={0.012} />
    </group>
  );
}

function Wardrobe() {
  return (
    <group>
      <Legs w={1.2} d={0.56} h={0.08} r={0.035} color={WOOD_DARK} />
      <Box size={[1.2, 1.88, 0.58]} position={[0, 1.02, 0]} color="#f3cfc0" radius={0.04} />
      <Box size={[1.26, 0.07, 0.62]} position={[0, 1.965, 0]} color={WOOD} radius={0.03} />
      {[-0.29, 0.29].map((x) => (
        <group key={x}>
          <Box size={[0.555, 1.74, 0.035]} position={[x, 1.02, 0.3]} color="#fbe5da" radius={0.015} />
          <Box size={[0.4, 0.5, 0.01]} position={[x, 1.42, 0.32]} color="#f7d8ca" radius={0.004} />
          <Ball radius={0.028} position={[x > 0 ? 0.06 : -0.06, 1.05, 0.33]} color={GOLD} metalness={0.4} roughness={0.35} />
        </group>
      ))}
    </group>
  );
}

function Desk() {
  return (
    <group>
      <Legs w={1.2} d={0.6} h={0.71} r={0.024} color={CREAM} />
      <Box size={[1.2, 0.05, 0.6]} position={[0, 0.735, 0]} color="#bfe3d0" radius={0.02} />
      <Box size={[0.4, 0.46, 0.52]} position={[0.36, 0.48, 0]} color="#a9d6c0" radius={0.025} />
      {[0.6, 0.38].map((y) => (
        <group key={y}>
          <Box size={[0.34, 0.18, 0.02]} position={[0.36, y, 0.265]} color="#d4eee1" radius={0.008} />
          <Box size={[0.1, 0.02, 0.02]} position={[0.36, y, 0.285]} color={GOLD} radius={0.008} />
        </group>
      ))}
    </group>
  );
}

function Chair() {
  return (
    <group>
      <Legs w={0.44} d={0.44} h={0.44} r={0.022} inset={0.04} color={WOOD_DARK} />
      <Box size={[0.48, 0.06, 0.48]} position={[0, 0.47, 0]} color={WOOD} radius={0.025} />
      <Box size={[0.42, 0.05, 0.42]} position={[0, 0.52, 0.01]} color="#f7b9c4" radius={0.025} />
      <Cyl top={0.02} height={0.45} position={[-0.19, 0.72, -0.21]} color={WOOD_DARK} segments={8} />
      <Cyl top={0.02} height={0.45} position={[0.19, 0.72, -0.21]} color={WOOD_DARK} segments={8} />
      <Box size={[0.48, 0.26, 0.05]} position={[0, 0.8, -0.21]} color={WOOD} radius={0.024} />
    </group>
  );
}

const BOOK_COLORS = ['#f6a6a6', '#a8d0f0', '#ffd27a', '#9fd8c2', '#c9b6e4', '#f7c59f', '#fbe7da'];

function Books({ y, seed, width = 0.78 }: { y: number; seed: number; width?: number }) {
  const books: { x: number; w: number; h: number; c: string; tilt: number }[] = [];
  let x = -width / 2;
  let i = seed;
  while (true) {
    const w = 0.05 + ((i * 37) % 5) * 0.012;
    const h = 0.2 + ((i * 53) % 6) * 0.022;
    if (x + w > width / 2 - 0.12 * ((seed % 3) + 1)) break;
    books.push({ x: x + w / 2, w, h, c: BOOK_COLORS[(i * 3) % BOOK_COLORS.length], tilt: 0 });
    x += w + 0.008;
    i++;
  }
  return (
    <>
      {books.map((b, k) => (
        <Box key={k} size={[b.w, b.h, 0.24]} position={[b.x, y + b.h / 2, 0.01]} color={b.c} radius={0.01} />
      ))}
    </>
  );
}

function Bookshelf() {
  const shelves = [0.5, 0.95, 1.38];
  return (
    <group>
      <Box size={[0.04, 1.8, 0.36]} position={[-0.43, 0.9, 0]} color={WOOD} radius={0.015} />
      <Box size={[0.04, 1.8, 0.36]} position={[0.43, 0.9, 0]} color={WOOD} radius={0.015} />
      <Box size={[0.9, 0.04, 0.36]} position={[0, 1.78, 0]} color={WOOD} radius={0.015} />
      <Box size={[0.86, 0.12, 0.34]} position={[0, 0.06, 0]} color={WOOD_DARK} radius={0.015} />
      <Box size={[0.84, 1.7, 0.02]} position={[0, 0.9, -0.165]} color="#f6dcc7" radius={0.005} />
      {shelves.map((y) => (
        <Box key={y} size={[0.83, 0.03, 0.33]} position={[0, y, 0]} color={WOOD} radius={0.01} />
      ))}
      <Books y={0.12} seed={1} />
      <Books y={0.515} seed={4} />
      <Books y={0.965} seed={8} />
      <Books y={1.395} seed={2} />
    </group>
  );
}

function Lamp() {
  return (
    <group>
      <Cyl top={0.1} bottom={0.12} height={0.04} position={[0, 0.02, 0]} color="#fff1e0" />
      <Cyl top={0.014} height={0.3} position={[0, 0.19, 0]} color={GOLD} metalness={0.5} roughness={0.35} segments={10} />
      <Cyl top={0.085} bottom={0.145} height={0.2} position={[0, 0.43, 0]} color="#fff3d6"
        emissive="#ffd98f" emissiveIntensity={0.7} segments={24} shadow={false} />
      <pointLight position={[0, 0.36, 0]} intensity={1.6} distance={3.5} decay={2} color="#ffd59a" />
    </group>
  );
}

function Carpet() {
  return (
    <group>
      <Cyl top={1} height={0.016} position={[0, 0.008, 0]} scale={[1, 1, 0.7]} color="#c9b6e4" segments={48} shadow={false} />
      <Cyl top={0.82} height={0.018} position={[0, 0.01, 0]} scale={[1, 1, 0.7]} color="#e9defa" segments={48} shadow={false} />
      <Cyl top={0.55} height={0.02} position={[0, 0.012, 0]} scale={[1, 1, 0.7]} color="#d8c7f0" segments={48} shadow={false} />
    </group>
  );
}

function Picture() {
  return (
    <group>
      <Box size={[0.8, 0.6, 0.05]} color={WOOD} radius={0.02} />
      <Box size={[0.68, 0.48, 0.012]} position={[0, 0, 0.026]} color="#cfe8ff" radius={0.004} shadow={false} />
      <Box size={[0.68, 0.14, 0.014]} position={[0, -0.17, 0.028]} color="#a7d9a0" radius={0.004} shadow={false} />
      <mesh position={[-0.13, -0.1, 0.036]}>
        <circleGeometry args={[0.15, 24, 0, Math.PI]} />
        <meshStandardMaterial color="#8cc084" />
      </mesh>
      <mesh position={[0.12, -0.1, 0.037]}>
        <circleGeometry args={[0.1, 24, 0, Math.PI]} />
        <meshStandardMaterial color="#9fd8a0" />
      </mesh>
      <mesh position={[0.18, 0.12, 0.036]}>
        <circleGeometry args={[0.06, 20]} />
        <meshStandardMaterial color="#ffd27a" emissive="#ffd27a" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function Mirror() {
  return (
    <group>
      <Box size={[0.55, 1.1, 0.05]} color="#f6c1c7" radius={0.024} />
      <Box size={[0.45, 1.0, 0.012]} position={[0, 0, 0.026]} color="#e4f1fa" metalness={0.35} roughness={0.08}
        emissive="#d6ebf7" emissiveIntensity={0.35} radius={0.005} shadow={false} />
      <Box size={[0.04, 0.5, 0.004]} position={[-0.1, 0.18, 0.034]} rotation={[0, 0, 0.5]} color="#ffffff"
        emissive="#ffffff" emissiveIntensity={0.6} radius={0.001} shadow={false} />
      <Box size={[0.02, 0.3, 0.004]} position={[0.0, 0.1, 0.034]} rotation={[0, 0, 0.5]} color="#ffffff"
        emissive="#ffffff" emissiveIntensity={0.6} radius={0.001} shadow={false} />
    </group>
  );
}

function Nightstand() {
  return (
    <group>
      <Legs w={0.48} d={0.42} h={0.08} r={0.022} inset={0.05} color={WOOD_DARK} />
      <Box size={[0.5, 0.46, 0.45]} position={[0, 0.31, 0]} color="#cbb7e6" radius={0.03} />
      <Box size={[0.54, 0.04, 0.48]} position={[0, 0.56, 0]} color="#b9a3db" radius={0.015} />
      {[0.42, 0.21].map((y) => (
        <group key={y}>
          <Box size={[0.42, 0.17, 0.02]} position={[0, y, 0.23]} color="#ddd0f2" radius={0.008} />
          <Ball radius={0.022} position={[0, y, 0.25]} color={GOLD} metalness={0.4} roughness={0.35} />
        </group>
      ))}
    </group>
  );
}

function Plant() {
  const leaves: { p: [number, number, number]; r: number; c: string }[] = [
    { p: [0, 0.62, 0], r: 0.16, c: '#7fb877' },
    { p: [0.1, 0.5, 0.06], r: 0.13, c: '#8cc084' },
    { p: [-0.1, 0.52, -0.04], r: 0.13, c: '#6fae6a' },
    { p: [0.03, 0.48, -0.11], r: 0.11, c: '#9fd08f' },
    { p: [-0.05, 0.72, 0.05], r: 0.1, c: '#9fd08f' },
  ];
  return (
    <group>
      <Cyl top={0.15} bottom={0.11} height={0.26} position={[0, 0.13, 0]} color="#e8a87c" segments={14} />
      <Cyl top={0.165} height={0.04} position={[0, 0.26, 0]} color="#efb990" segments={14} />
      <Cyl top={0.14} height={0.01} position={[0, 0.278, 0]} color="#7a5a44" segments={14} />
      <Cyl top={0.012} height={0.25} position={[0, 0.38, 0]} color="#6a9c5f" segments={6} />
      {leaves.map((l, i) => (
        <Ball key={i} radius={l.r} position={l.p} color={l.c} detail={0} flat roughness={0.8} />
      ))}
    </group>
  );
}

function Chest() {
  return (
    <group>
      <Legs w={0.86} d={0.46} h={0.08} r={0.025} inset={0.06} color={WOOD_DARK} />
      <Box size={[0.88, 0.88, 0.48]} position={[0, 0.52, 0]} color="#f7d9a8" radius={0.03} />
      <Box size={[0.92, 0.05, 0.5]} position={[0, 0.975, 0]} color={WOOD} radius={0.02} />
      {[0.78, 0.52, 0.26].map((y) => (
        <group key={y}>
          <Box size={[0.8, 0.22, 0.02]} position={[0, y, 0.245]} color="#fbe8c6" radius={0.008} />
          <Box size={[0.16, 0.025, 0.025]} position={[0, y, 0.265]} color={GOLD} radius={0.01} />
        </group>
      ))}
    </group>
  );
}

export const MODELS: Record<string, ComponentType> = {
  bed: Bed,
  wardrobe: Wardrobe,
  desk: Desk,
  chair: Chair,
  bookshelf: Bookshelf,
  lamp: Lamp,
  carpet: Carpet,
  picture: Picture,
  mirror: Mirror,
  nightstand: Nightstand,
  plant: Plant,
  chest: Chest,
};

export function FurnitureModel({ model }: { model: string }) {
  const Model = MODELS[model];
  return Model ? <Model /> : <Box size={[0.4, 0.4, 0.4]} position={[0, 0.2, 0]} color="#dddddd" />;
}
