import { Ball, Box, Cyl, Legs } from './parts';

// Entrance (front porch) models. Same rules as index.tsx: front faces +z, floor objects stand on y = 0,
// wall objects are centred on their middle. Sizes match src/data/furniture.ts.

const WOOD = '#c99a6b';
const WOOD_DARK = '#8a6446';
const BRASS = '#c9a227';
const DARK = '#2f3440';
const TERRACOTTA = '#d27d56';

export function Doormat() {
  return (
    <group>
      <Box size={[0.9, 0.025, 0.55]} position={[0, 0.0125, 0]} color="#b98a4e" radius={0.008} shadow={false} />
      <Box size={[0.76, 0.027, 0.41]} position={[0, 0.014, 0]} color="#d6ab6e" radius={0.006} shadow={false} />
      <Box size={[0.4, 0.029, 0.06]} position={[0, 0.016, 0]} color="#8a6446" radius={0.004} shadow={false} />
    </group>
  );
}

export function Letterbox() {
  return (
    <group>
      <Box size={[0.36, 0.44, 0.16]} position={[0, 0, 0]} color="#d94848" radius={0.03} />
      <Box size={[0.24, 0.035, 0.02]} position={[0, 0.1, 0.08]} color={DARK} radius={0.008} shadow={false} />
      <Box size={[0.3, 0.05, 0.18]} position={[0, 0.24, 0]} color="#b83232" radius={0.02} />
      <Box size={[0.12, 0.03, 0.01]} position={[0, -0.08, 0.082]} color={BRASS} metalness={0.5} radius={0.004} shadow={false} />
    </group>
  );
}

export function Doorbell() {
  return (
    <group>
      <Box size={[0.1, 0.16, 0.03]} position={[0, 0, 0]} color="#f4f6f8" radius={0.02} />
      <Cyl top={0.028} height={0.02} position={[0, 0.02, 0.02]} rotation={[Math.PI / 2, 0, 0]} color={BRASS} metalness={0.5} roughness={0.3} segments={16} />
      <Box size={[0.05, 0.02, 0.005]} position={[0, -0.05, 0.016]} color="#c9d2d9" radius={0.002} shadow={false} />
    </group>
  );
}

export function PorchLight() {
  return (
    <group>
      <Box size={[0.1, 0.16, 0.04]} position={[0, -0.02, -0.01]} color={DARK} radius={0.01} />
      <Box size={[0.03, 0.03, 0.12]} position={[0, 0.08, 0.05]} color={DARK} radius={0.008} />
      <Box size={[0.16, 0.22, 0.16]} position={[0, -0.02, 0.12]} color="#fff3d6" emissive="#ffe6a8" emissiveIntensity={0.6} radius={0.02} />
      <Box size={[0.2, 0.04, 0.2]} position={[0, 0.11, 0.12]} color={DARK} radius={0.01} />
    </group>
  );
}

export function HouseNumber() {
  return (
    <group>
      <Box size={[0.36, 0.26, 0.03]} position={[0, 0, 0]} color="#2f5d8a" radius={0.02} />
      {/* a simple "7" */}
      <Box size={[0.14, 0.03, 0.01]} position={[0, 0.07, 0.02]} color="#ffffff" radius={0.004} shadow={false} />
      <Box size={[0.03, 0.17, 0.01]} position={[0.02, -0.01, 0.02]} rotation={[0, 0, -0.35]} color="#ffffff" radius={0.004} shadow={false} />
    </group>
  );
}

export function Flowerpot() {
  return (
    <group>
      <Cyl top={0.22} bottom={0.16} height={0.4} position={[0, 0.2, 0]} color={TERRACOTTA} segments={20} />
      <Cyl top={0.2} height={0.02} position={[0, 0.39, 0]} color="#6b4a2f" segments={20} shadow={false} />
      {[[0, 0.55, 0], [-0.1, 0.5, 0.08], [0.1, 0.52, -0.06], [0.06, 0.48, 0.12]].map(([x, y, z], i) => (
        <Ball key={i} radius={0.12} position={[x, y, z]} color="#6fae6a" />
      ))}
      {[[-0.06, 0.66, 0.08, '#f28c8c'], [0.1, 0.62, 0.1, '#ffd54f'], [0.02, 0.68, -0.08, '#c9b6e4'], [-0.14, 0.58, -0.04, '#f28c8c']].map(([x, y, z, c], i) => (
        <Ball key={i} radius={0.04} position={[x as number, y as number, z as number]} color={c as string} />
      ))}
    </group>
  );
}

export function WheelieBin() {
  return (
    <group>
      <Box size={[0.58, 0.95, 0.68]} position={[0, 0.5, 0]} color="#3f7d4e" radius={0.04} />
      <Box size={[0.62, 0.06, 0.74]} position={[0, 1.0, -0.01]} color="#356a42" radius={0.02} />
      <Box size={[0.5, 0.04, 0.05]} position={[0, 0.98, -0.37]} color="#2f5a39" radius={0.015} />
      {[-0.26, 0.26].map((x) => (
        <Cyl key={x} top={0.08} height={0.05} position={[x, 0.08, -0.3]} rotation={[0, 0, Math.PI / 2]} color={DARK} segments={14} />
      ))}
      <Box size={[0.14, 0.1, 0.01]} position={[0, 0.6, 0.345]} color="#ffffff" radius={0.004} shadow={false} />
    </group>
  );
}

export function GardenBench() {
  return (
    <group>
      {[-0.1, 0.02, 0.14].map((z) => (
        <Box key={z} size={[1.2, 0.04, 0.1]} position={[0, 0.44, z]} color={WOOD} radius={0.01} />
      ))}
      {[0.6, 0.72].map((y) => (
        <Box key={y} size={[1.2, 0.08, 0.03]} position={[0, y, -0.18]} rotation={[-0.15, 0, 0]} color={WOOD} radius={0.01} />
      ))}
      {[-0.56, 0.56].map((x) => (
        <group key={x}>
          <Box size={[0.05, 0.44, 0.05]} position={[x, 0.22, 0.12]} color={DARK} radius={0.01} />
          <Box size={[0.05, 0.8, 0.05]} position={[x, 0.4, -0.16]} color={DARK} radius={0.01} />
          <Box size={[0.05, 0.04, 0.36]} position={[x, 0.6, -0.01]} color={DARK} radius={0.01} />
        </group>
      ))}
    </group>
  );
}

export function WateringCan() {
  return (
    <group>
      <Cyl top={0.08} bottom={0.09} height={0.18} position={[0, 0.09, 0]} color="#5aa9e6" segments={16} />
      <Cyl top={0.012} bottom={0.02} height={0.22} position={[0.14, 0.14, 0]} rotation={[0, 0, -0.9]} color="#5aa9e6" segments={8} />
      <Cyl top={0.03} bottom={0.014} height={0.03} position={[0.23, 0.21, 0]} rotation={[0, 0, -0.9]} color="#4a8fc4" segments={10} />
      <mesh position={[-0.02, 0.2, 0]}>
        <torusGeometry args={[0.06, 0.01, 6, 16, Math.PI]} />
        <meshStandardMaterial color="#4a8fc4" />
      </mesh>
    </group>
  );
}

export function Parcel() {
  return (
    <group>
      <Box size={[0.36, 0.24, 0.28]} position={[0, 0.12, 0]} color="#d6b07a" radius={0.01} />
      <Box size={[0.37, 0.245, 0.05]} position={[0, 0.122, 0]} color="#c2a06a" radius={0.004} shadow={false} />
      <Box size={[0.14, 0.004, 0.09]} position={[0.08, 0.243, 0.06]} color="#ffffff" radius={0.002} shadow={false} />
    </group>
  );
}

export function Wellies() {
  return (
    <group>
      {[-0.07, 0.07].map((x) => (
        <group key={x}>
          <Box size={[0.1, 0.3, 0.12]} position={[x, 0.15, -0.03]} color="#f2c46d" radius={0.04} />
          <Box size={[0.1, 0.08, 0.22]} position={[x, 0.04, 0.02]} color="#f2c46d" radius={0.035} />
          <Box size={[0.105, 0.02, 0.225]} position={[x, 0.01, 0.02]} color={DARK} radius={0.008} />
        </group>
      ))}
    </group>
  );
}

export function GardenGnome() {
  return (
    <group>
      <Cyl top={0.09} bottom={0.12} height={0.22} position={[0, 0.11, 0]} color="#5aa9e6" segments={14} />
      <Ball radius={0.08} position={[0, 0.28, 0]} color="#f1c7a5" />
      <Cyl top={0.08} bottom={0.06} height={0.12} position={[0, 0.24, 0.04]} color="#ffffff" segments={12} />
      <Cyl top={0.0} bottom={0.085} height={0.22} position={[0, 0.42, 0]} color="#e04848" segments={14} />
      <Ball radius={0.022} position={[0, 0.29, 0.08]} color="#f28c8c" />
      <Legs w={0.14} d={0.06} h={0.02} r={0.02} color={WOOD_DARK} />
    </group>
  );
}
