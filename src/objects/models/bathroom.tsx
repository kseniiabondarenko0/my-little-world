import { Ball, Box, Cyl } from './parts';

// Bathroom models. Same rules as index.tsx: front faces +z, floor objects stand on y = 0,
// wall objects are centred on their middle. Sizes match src/data/furniture.ts.

const PORCELAIN = '#fbfdff';
const PORCELAIN_SHADE = '#e7eef3';
const CHROME = '#c9d2d9';
const AQUA = '#9fd3e6';
const AQUA_DARK = '#7fc0d8';
const WOOD = '#e4b98f';

export function Bath() {
  return (
    <group>
      {/* tub */}
      <Box size={[1.6, 0.5, 0.76]} position={[0, 0.29, 0]} color={PORCELAIN} radius={0.12} />
      <Box size={[1.42, 0.06, 0.58]} position={[0, 0.52, 0]} color="#bfe4f2" radius={0.06} shadow={false} />
      {/* feet */}
      {[[-0.65, -0.26], [0.65, -0.26], [-0.65, 0.26], [0.65, 0.26]].map(([x, z], i) => (
        <Ball key={i} radius={0.05} position={[x, 0.04, z]} color="#d8c48a" metalness={0.5} roughness={0.3} />
      ))}
      {/* tap */}
      <Cyl top={0.018} height={0.16} position={[-0.72, 0.62, 0]} color={CHROME} metalness={0.6} roughness={0.25} segments={10} />
      <Box size={[0.14, 0.03, 0.03]} position={[-0.66, 0.69, 0]} color={CHROME} metalness={0.6} roughness={0.25} radius={0.01} />
      {/* rubber duck */}
      <Ball radius={0.045} position={[0.35, 0.58, 0.08]} color="#ffd54f" />
      <Ball radius={0.03} position={[0.38, 0.63, 0.08]} color="#ffd54f" />
    </group>
  );
}

export function Washbasin() {
  return (
    <group>
      {/* vanity unit */}
      <Box size={[0.6, 0.7, 0.42]} position={[0, 0.39, -0.02]} color={AQUA} radius={0.02} />
      <Box size={[0.27, 0.6, 0.02]} position={[-0.145, 0.39, 0.2]} color={AQUA_DARK} radius={0.01} />
      <Box size={[0.27, 0.6, 0.02]} position={[0.145, 0.39, 0.2]} color={AQUA_DARK} radius={0.01} />
      <Box size={[0.08, 0.04, 0.4]} position={[0, 0.02, -0.02]} color="#7f8c8d" radius={0.01} />
      {/* basin top */}
      <Box size={[0.62, 0.11, 0.46]} position={[0, 0.795, 0]} color={PORCELAIN} radius={0.04} />
      <Cyl top={0.16} bottom={0.12} height={0.02} position={[0, 0.85, 0.03]} scale={[1, 1, 0.75]} color={PORCELAIN_SHADE} segments={24} shadow={false} />
      <Cyl top={0.016} height={0.12} position={[0, 0.91, -0.16]} color={CHROME} metalness={0.6} roughness={0.25} segments={10} />
      <Box size={[0.025, 0.025, 0.1]} position={[0, 0.96, -0.12]} color={CHROME} metalness={0.6} roughness={0.25} radius={0.01} />
    </group>
  );
}

export function Toilet() {
  return (
    <group>
      {/* cistern */}
      <Box size={[0.4, 0.4, 0.18]} position={[0, 0.6, -0.24]} color={PORCELAIN} radius={0.04} />
      <Box size={[0.08, 0.02, 0.04]} position={[0, 0.81, -0.24]} color={CHROME} metalness={0.6} radius={0.008} />
      {/* bowl */}
      <Cyl top={0.17} bottom={0.13} height={0.38} position={[0, 0.19, 0.04]} scale={[1, 1, 1.25]} color={PORCELAIN} segments={22} />
      <Cyl top={0.19} height={0.04} position={[0, 0.4, 0.04]} scale={[1, 1, 1.25]} color="#e3f2fa" segments={22} />
    </group>
  );
}

export function Shower() {
  return (
    <group>
      {/* tray */}
      <Box size={[0.9, 0.08, 0.9]} position={[0, 0.04, 0]} color={PORCELAIN} radius={0.03} />
      {/* glass walls */}
      <Box size={[0.02, 1.9, 0.86]} position={[0.43, 1.03, 0]} color="#d6eef7" roughness={0.1} radius={0.005} />
      <Box size={[0.6, 1.9, 0.02]} position={[0.12, 1.03, 0.43]} color="#d6eef7" roughness={0.1} radius={0.005} />
      <Box size={[0.02, 1.9, 0.03]} position={[-0.18, 1.03, 0.43]} color={CHROME} metalness={0.5} radius={0.005} />
      {/* pipe and head */}
      <Cyl top={0.015} height={1.5} position={[-0.3, 1.2, -0.42]} color={CHROME} metalness={0.6} roughness={0.25} segments={10} />
      <Cyl top={0.09} bottom={0.07} height={0.03} position={[-0.3, 1.95, -0.32]} rotation={[0.5, 0, 0]} color={CHROME} metalness={0.6} roughness={0.25} segments={18} />
      <Box size={[0.02, 0.02, 0.1]} position={[-0.3, 1.96, -0.38]} color={CHROME} metalness={0.6} radius={0.006} />
      <Cyl top={0.03} height={0.04} position={[-0.3, 1.1, -0.4]} rotation={[Math.PI / 2, 0, 0]} color="#e76f51" segments={12} />
    </group>
  );
}

export function TowelRail() {
  return (
    <group>
      <Cyl top={0.014} height={0.6} position={[0, 0.2, 0.03]} rotation={[0, 0, Math.PI / 2]} color={CHROME} metalness={0.6} roughness={0.25} segments={10} />
      {[-0.3, 0.3].map((x) => (
        <Box key={x} size={[0.03, 0.06, 0.06]} position={[x, 0.2, 0.0]} color={CHROME} metalness={0.6} radius={0.01} />
      ))}
      {/* folded towel hanging over the rail */}
      <Box size={[0.44, 0.46, 0.03]} position={[0, -0.02, 0.05]} color="#f6a6a6" radius={0.012} />
      <Box size={[0.44, 0.04, 0.032]} position={[0, -0.16, 0.052]} color="#ffffff" radius={0.008} shadow={false} />
    </group>
  );
}

export function BathCabinet() {
  return (
    <group>
      <Box size={[0.6, 0.62, 0.16]} position={[0, 0, -0.01]} color={PORCELAIN} radius={0.02} />
      {/* mirror door */}
      <Box size={[0.54, 0.52, 0.02]} position={[0, 0.02, 0.08]} color="#d8eef8" metalness={0.6} roughness={0.08} radius={0.01} />
      <Box size={[0.02, 0.1, 0.03]} position={[0.22, 0.02, 0.095]} color={CHROME} radius={0.008} />
      {/* little shelf underneath */}
      <Box size={[0.6, 0.03, 0.18]} position={[0, -0.3, 0]} color={WOOD} radius={0.01} />
    </group>
  );
}

export function WashingMachine() {
  return (
    <group>
      <Box size={[0.6, 0.85, 0.58]} position={[0, 0.425, -0.01]} color="#f4f6f8" radius={0.03} />
      <Box size={[0.56, 0.12, 0.02]} position={[0, 0.76, 0.28]} color="#e3e8ec" radius={0.01} />
      <Cyl top={0.03} height={0.03} position={[0.18, 0.76, 0.29]} rotation={[Math.PI / 2, 0, 0]} color={AQUA_DARK} segments={14} />
      {/* round door */}
      <Cyl top={0.2} height={0.03} position={[0, 0.38, 0.29]} rotation={[Math.PI / 2, 0, 0]} color={CHROME} metalness={0.4} segments={28} />
      <Cyl top={0.15} height={0.032} position={[0, 0.38, 0.295]} rotation={[Math.PI / 2, 0, 0]} color="#a9d6ea" roughness={0.1} segments={28} />
    </group>
  );
}

export function BathMat() {
  return (
    <group>
      <Box size={[0.8, 0.018, 0.5]} position={[0, 0.009, 0]} color={AQUA} radius={0.008} shadow={false} />
      <Box size={[0.66, 0.02, 0.36]} position={[0, 0.011, 0]} color="#c6e8f3" radius={0.008} shadow={false} />
    </group>
  );
}

export function Toothbrush() {
  return (
    <group>
      <Cyl top={0.04} bottom={0.035} height={0.1} position={[0, 0.05, 0]} color="#bfe3d0" segments={14} />
      <Box size={[0.012, 0.16, 0.012]} position={[-0.012, 0.13, 0]} rotation={[0, 0, 0.15]} color="#5aa9e6" radius={0.004} />
      <Box size={[0.012, 0.16, 0.012]} position={[0.014, 0.125, 0.008]} rotation={[0, 0, -0.18]} color="#f28c8c" radius={0.004} />
      <Box size={[0.018, 0.03, 0.02]} position={[-0.024, 0.205, 0.006]} color="#ffffff" radius={0.004} />
    </group>
  );
}

export function Soap() {
  return (
    <group>
      <Box size={[0.14, 0.02, 0.1]} position={[0, 0.01, 0]} color={PORCELAIN_SHADE} radius={0.008} />
      <Box size={[0.1, 0.04, 0.065]} position={[0, 0.04, 0]} color="#f7b2d0" radius={0.018} />
    </group>
  );
}

export function Hairdryer() {
  return (
    <group rotation={[0, 0, 0]}>
      <Cyl top={0.05} bottom={0.055} height={0.2} position={[0, 0.16, 0]} rotation={[0, 0, Math.PI / 2]} color="#c9b6e4" segments={16} />
      <Cyl top={0.035} bottom={0.045} height={0.04} position={[0.12, 0.16, 0]} rotation={[0, 0, Math.PI / 2]} color="#5b5560" segments={14} />
      <Box size={[0.04, 0.12, 0.04]} position={[-0.04, 0.06, 0]} rotation={[0, 0, -0.2]} color="#a993cf" radius={0.015} />
    </group>
  );
}

export function Scales() {
  return (
    <group>
      <Box size={[0.32, 0.05, 0.32]} position={[0, 0.025, 0]} color="#f4f6f8" radius={0.02} />
      <Box size={[0.12, 0.004, 0.05]} position={[0, 0.052, -0.08]} color="#3e3a40" radius={0.002} shadow={false} />
      <Box size={[0.07, 0.003, 0.025]} position={[0, 0.055, -0.08]} color="#9fe0a6" emissive="#9fe0a6" emissiveIntensity={0.3} radius={0.001} shadow={false} />
    </group>
  );
}
