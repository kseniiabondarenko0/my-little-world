import { Ball, Box, Cyl, Legs } from './parts';

// Hallway models. Same rules as index.tsx: front faces +z, floor objects stand on y = 0,
// wall objects are centred on their middle. Sizes match src/data/furniture.ts.

const WOOD = '#c99a6b';
const WOOD_DARK = '#9c7150';
const WHITE = '#f7f3ec';
const METAL = '#5b5560';

export function CoatStand() {
  return (
    <group>
      <Cyl top={0.2} bottom={0.22} height={0.04} position={[0, 0.02, 0]} color={WOOD_DARK} segments={20} />
      <Cyl top={0.022} height={1.75} position={[0, 0.9, 0]} color={WOOD} segments={10} />
      {[0, 1, 2, 3].map((i) => (
        <Box key={i} size={[0.2, 0.025, 0.025]} position={[Math.cos(i * 1.57) * 0.09, 1.7, Math.sin(i * 1.57) * 0.09]}
          rotation={[0, -i * 1.57, 0.5]} color={WOOD_DARK} radius={0.008} />
      ))}
      {/* a coat and a scarf */}
      <Box size={[0.36, 0.7, 0.14]} position={[0, 1.3, 0.1]} color="#7fa7d8" radius={0.06} />
      <Box size={[0.06, 0.5, 0.03]} position={[-0.12, 1.3, -0.1]} color="#f28c8c" radius={0.01} />
    </group>
  );
}

export function ShoeRack() {
  const shoes = ['#f28c8c', '#2f3440', '#ffffff', '#f2c46d', '#7fc0d8', '#9c7150'];
  return (
    <group>
      <Box size={[0.9, 0.04, 0.34]} position={[0, 0.48, 0]} color={WOOD} radius={0.01} />
      <Box size={[0.9, 0.03, 0.34]} position={[0, 0.24, 0]} color={WOOD} radius={0.01} />
      <Box size={[0.9, 0.03, 0.34]} position={[0, 0.03, 0]} color={WOOD} radius={0.01} />
      {[-0.43, 0.43].map((x) => <Box key={x} size={[0.04, 0.5, 0.34]} position={[x, 0.25, 0]} color={WOOD_DARK} radius={0.01} />)}
      {shoes.map((c, i) => (
        <Box key={i} size={[0.1, 0.07, 0.24]} position={[-0.3 + (i % 3) * 0.3 + (i < 3 ? -0.06 : 0.06), i < 3 ? 0.08 : 0.29, 0.02]} color={c} radius={0.03} />
      ))}
    </group>
  );
}

export function UmbrellaStand() {
  return (
    <group>
      <Cyl top={0.13} bottom={0.12} height={0.5} position={[0, 0.25, 0]} color="#7fb08a" segments={20} />
      <Cyl top={0.012} height={0.75} position={[-0.04, 0.6, 0]} rotation={[0, 0, 0.12]} color="#f25c5c" segments={8} />
      <Cyl top={0.012} height={0.7} position={[0.05, 0.58, 0.03]} rotation={[0.1, 0, -0.1]} color="#2f3440" segments={8} />
      <Cyl top={0.03} bottom={0.004} height={0.3} position={[-0.08, 0.86, 0]} rotation={[0, 0, 0.12]} color="#f25c5c" segments={8} />
    </group>
  );
}

export function KeyHook() {
  return (
    <group>
      <Box size={[0.4, 0.14, 0.03]} position={[0, 0, 0]} color={WOOD} radius={0.01} />
      {[-0.13, 0, 0.13].map((x, i) => (
        <group key={x}>
          <Cyl top={0.008} height={0.05} position={[x, 0.01, 0.035]} rotation={[Math.PI / 2, 0, 0]} color={METAL} segments={6} />
          <Cyl top={0.025} height={0.01} position={[x, -0.06, 0.05]} rotation={[Math.PI / 2, 0, 0]} color={['#f2c46d', '#c9d2d9', '#f28c8c'][i]} metalness={0.5} segments={10} />
          <Box size={[0.012, 0.06, 0.006]} position={[x, -0.11, 0.05]} color="#c9d2d9" metalness={0.5} radius={0.002} />
        </group>
      ))}
    </group>
  );
}

export function Stairs() {
  const steps = 9;
  return (
    <group>
      {Array.from({ length: steps }, (_, i) => (
        <Box key={i} size={[0.9, 0.22 * (i + 1), 0.22]} position={[0, 0.11 * (i + 1), 0.99 - 0.22 * i - 0.11]} color={i % 2 ? WOOD : '#d6ab7c'} radius={0.008} />
      ))}
      {/* banister */}
      <Box size={[0.05, 0.05, 2.55]} position={[0.43, 1.8, 0]} rotation={[Math.PI / 4, 0, 0]} color={WOOD_DARK} radius={0.015} />
      {Array.from({ length: 5 }, (_, i) => (
        <Cyl key={i} top={0.015} height={0.7} position={[0.43, 0.22 * (i * 2 + 1) + 0.35, 0.88 - 0.44 * i]} color={WHITE} segments={8} />
      ))}
    </group>
  );
}

export function HallTable() {
  return (
    <group>
      <Box size={[0.9, 0.05, 0.34]} position={[0, 0.78, 0]} color={WOOD} radius={0.015} />
      <Box size={[0.84, 0.12, 0.3]} position={[0, 0.69, 0]} color={WOOD_DARK} radius={0.01} />
      <Box size={[0.1, 0.03, 0.02]} position={[0, 0.69, 0.155]} color="#c9a227" metalness={0.5} radius={0.005} />
      <Legs w={0.86} d={0.3} h={0.68} r={0.02} color={WOOD_DARK} />
    </group>
  );
}

export function Bench() {
  return (
    <group>
      <Box size={[1.1, 0.06, 0.38]} position={[0, 0.44, 0]} color={WOOD} radius={0.015} />
      <Box size={[1.0, 0.08, 0.32]} position={[0, 0.5, 0.01]} color="#c9b6e4" radius={0.035} />
      <Box size={[1.0, 0.03, 0.32]} position={[0, 0.12, 0]} color={WOOD_DARK} radius={0.01} />
      <Legs w={1.06} d={0.34} h={0.42} r={0.025} color={WOOD_DARK} />
    </group>
  );
}

export function Noticeboard() {
  const notes = ['#fff3a3', '#f7b2d0', '#a9c9f2', '#b8e0b0'];
  return (
    <group>
      <Box size={[0.7, 0.5, 0.03]} position={[0, 0, 0]} color={WOOD_DARK} radius={0.01} />
      <Box size={[0.64, 0.44, 0.02]} position={[0, 0, 0.01]} color="#d9b27c" radius={0.005} />
      {notes.map((c, i) => (
        <group key={i}>
          <Box size={[0.13, 0.13, 0.005]} position={[-0.21 + i * 0.14, (i % 2 ? -0.07 : 0.08), 0.024]} rotation={[0, 0, (i - 1.5) * 0.08]} color={c} radius={0.002} shadow={false} />
          <Ball radius={0.012} position={[-0.21 + i * 0.14, (i % 2 ? -0.07 : 0.08) + 0.05, 0.03]} color="#f25c5c" />
        </group>
      ))}
    </group>
  );
}

export function Runner() {
  return (
    <group>
      <Box size={[2.0, 0.016, 0.7]} position={[0, 0.008, 0]} color="#c2575b" radius={0.006} shadow={false} />
      <Box size={[1.8, 0.018, 0.5]} position={[0, 0.01, 0]} color="#e9b872" radius={0.006} shadow={false} />
      <Box size={[1.6, 0.02, 0.3]} position={[0, 0.012, 0]} color="#c2575b" radius={0.006} shadow={false} />
    </group>
  );
}

export function Telephone() {
  return (
    <group>
      <Box size={[0.2, 0.06, 0.16]} position={[0, 0.03, 0]} color="#f25c5c" radius={0.025} />
      <Box size={[0.22, 0.04, 0.05]} position={[0, 0.085, -0.02]} color="#d94848" radius={0.02} />
      <Cyl top={0.035} height={0.01} position={[0, 0.062, 0.04]} rotation={[0.3, 0, 0]} color={WHITE} segments={14} />
    </group>
  );
}

export function Torch() {
  return (
    <group>
      <Cyl top={0.025} height={0.18} position={[0, 0.025, 0]} rotation={[0, 0, Math.PI / 2]} color="#f2c46d" segments={12} />
      <Cyl top={0.04} bottom={0.028} height={0.06} position={[0.11, 0.035, 0]} rotation={[0, 0, Math.PI / 2]} color={METAL} segments={14} />
      <Cyl top={0.034} height={0.01} position={[0.145, 0.035, 0]} rotation={[0, 0, Math.PI / 2]} color="#fffbe0" emissive="#fff3b0" emissiveIntensity={0.6} segments={14} />
    </group>
  );
}

export function Scooter() {
  return (
    <group>
      <Box size={[0.12, 0.04, 0.6]} position={[0, 0.08, 0]} color="#7fc0d8" radius={0.015} />
      {[-0.27, 0.27].map((z) => (
        <Cyl key={z} top={0.06} height={0.035} position={[0, 0.06, z]} rotation={[0, 0, Math.PI / 2]} color="#2f3440" segments={16} />
      ))}
      <Cyl top={0.016} height={0.8} position={[0, 0.48, 0.27]} rotation={[-0.1, 0, 0]} color={METAL} segments={8} />
      <Cyl top={0.016} height={0.36} position={[0, 0.87, 0.31]} rotation={[0, 0, Math.PI / 2]} color="#2f3440" segments={8} />
    </group>
  );
}
