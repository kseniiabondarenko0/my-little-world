import { Ball, Box, Cyl, Legs } from './parts';

// City street models. Same rules as index.tsx: front faces +z, floor objects stand on y = 0,
// wall objects are centred on their middle. Sizes match src/data/furniture.ts.

const METAL = '#3d4a5c';
const GREEN = '#2f6b4f';
const WOOD = '#b8814f';
const RED = '#d8423a';
const STONE = '#cfc8bd';

export function ParkBench() {
  return (
    <group>
      {[0, 1, 2].map((i) => (
        <Box key={i} size={[1.26, 0.035, 0.14]} position={[0, 0.44, -0.18 + i * 0.16]} color={WOOD} radius={0.01} />
      ))}
      {[0, 1].map((i) => (
        <Box key={i} size={[1.26, 0.12, 0.03]} position={[0, 0.62 + i * 0.15, -0.26]} rotation={[-0.15, 0, 0]} color={WOOD} radius={0.01} />
      ))}
      {[-0.55, 0.55].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <Box size={[0.05, 0.42, 0.05]} position={[0, 0.21, 0.18]} color={METAL} radius={0.01} />
          <Box size={[0.05, 0.8, 0.05]} position={[0, 0.4, -0.24]} color={METAL} radius={0.01} />
          <Box size={[0.05, 0.04, 0.5]} position={[0, 0.58, 0]} color={METAL} radius={0.01} />
        </group>
      ))}
    </group>
  );
}

export function BusStop() {
  return (
    <group>
      {[-0.7, 0.7].map((x) => (
        <Cyl key={x} top={0.035} height={2.15} position={[x, 1.075, -0.3]} color={METAL} segments={10} />
      ))}
      <Box size={[1.5, 0.06, 0.8]} position={[0, 2.17, -0.05]} color={METAL} radius={0.02} />
      <Box size={[1.4, 1.7, 0.02]} position={[0, 1.15, -0.34]} color="#bfe0ff" roughness={0.15} radius={0.005} />
      <Box size={[0.5, 0.9, 0.03]} position={[0.42, 1.35, -0.31]} color="#ffd27a" emissive="#ffd27a" emissiveIntensity={0.25} radius={0.01} />
      <Box size={[1.0, 0.04, 0.26]} position={[-0.15, 0.46, -0.18]} color="#9aa7b5" radius={0.01} />
      <Legs w={1.0} d={0.2} h={0.44} r={0.015} inset={0.05} color={METAL} />
      <Cyl top={0.025} height={0.6} position={[0.72, 2.5, 0.25]} color={METAL} segments={8} />
      <Cyl top={0.17} height={0.03} rotation={[Math.PI / 2, 0, 0]} position={[0.72, 2.0, 0.25]} color="#2f8f5b" segments={20} />
    </group>
  );
}

export function StreetLamp() {
  return (
    <group>
      <Cyl top={0.12} bottom={0.16} height={0.3} position={[0, 0.15, 0]} color={METAL} />
      <Cyl top={0.04} bottom={0.06} height={2.2} position={[0, 1.4, 0]} color={METAL} segments={12} />
      <Cyl top={0.08} bottom={0.14} height={0.24} position={[0, 2.5, 0]} color={METAL} />
      <Ball radius={0.11} position={[0, 2.36, 0]} color="#fff3c4" emissive="#ffe08a" emissiveIntensity={1.1} />
    </group>
  );
}

export function TrafficLight() {
  return (
    <group>
      <Cyl top={0.045} height={1.6} position={[0, 0.8, 0]} color={METAL} segments={10} />
      <Box size={[0.28, 0.72, 0.22]} position={[0, 1.92, 0]} color="#2b2f36" radius={0.04} />
      {([['#ff4d4d', 0.22, 1.2], ['#ffc24d', 0, 0.2], ['#4ddc7a', -0.22, 0.2]] as const).map(([c, y, glow]) => (
        <Ball key={c} radius={0.07} position={[0, 1.92 + y, 0.1]} color={c} emissive={c} emissiveIntensity={glow} />
      ))}
      <Box size={[0.16, 0.2, 0.1]} position={[0, 1.05, 0.08]} color="#ffd27a" radius={0.02} />
    </group>
  );
}

export function PostBox() {
  return (
    <group>
      <Cyl top={0.2} height={0.95} position={[0, 0.475, 0]} color={RED} />
      <Ball radius={0.2} position={[0, 0.95, 0]} scale={[1, 0.5, 1]} color={RED} />
      <Box size={[0.2, 0.03, 0.04]} position={[0, 0.78, 0.19]} color="#2b2f36" radius={0.01} />
      <Box size={[0.14, 0.1, 0.02]} position={[0, 0.6, 0.2]} color="#fff7ec" radius={0.005} />
      <Cyl top={0.22} height={0.06} position={[0, 0.03, 0]} color="#2b2f36" />
    </group>
  );
}

export function Fountain() {
  return (
    <group>
      <Cyl top={0.64} bottom={0.66} height={0.48} position={[0, 0.24, 0]} color={STONE} segments={28} />
      <Cyl top={0.56} height={0.02} position={[0, 0.46, 0]} color="#7cc7e8" roughness={0.1} segments={28} />
      <Cyl top={0.1} height={0.6} position={[0, 0.75, 0]} color={STONE} />
      <Cyl top={0.24} bottom={0.1} height={0.1} position={[0, 1.05, 0]} color={STONE} />
      <Ball radius={0.09} position={[0, 1.12, 0]} scale={[1, 0.6, 1]} color="#a8dcf2" emissive="#bfe8ff" emissiveIntensity={0.3} />
    </group>
  );
}

export function IceCreamCart() {
  return (
    <group>
      <Box size={[1.0, 0.7, 0.6]} position={[0, 0.55, 0]} color="#f7b2d0" radius={0.05} />
      <Box size={[1.04, 0.04, 0.64]} position={[0, 0.91, 0]} color="#fff7ec" radius={0.015} />
      {['#ffd27a', '#8fd3b6', '#c98a4e'].map((c, i) => (
        <Ball key={c} radius={0.06} position={[-0.25 + i * 0.25, 0.75, 0.31]} color={c} />
      ))}
      {[-0.4, 0.4].map((x) => (
        <Cyl key={x} top={0.13} height={0.05} rotation={[0, 0, Math.PI / 2]} position={[x, 0.13, 0.28]} color="#2b2f36" />
      ))}
      <Cyl top={0.02} height={0.7} position={[0.42, 1.25, -0.2]} color={METAL} segments={8} />
      <Cyl top={0.04} bottom={0.6} height={0.22} position={[0.42, 1.6, -0.2]} color="#8fd3b6" segments={8} />
    </group>
  );
}

export function BusTicket() {
  return (
    <group>
      <Box size={[0.14, 0.006, 0.08]} position={[0, 0.003, 0]} color="#ffd27a" radius={0.002} />
      <Box size={[0.1, 0.002, 0.012]} position={[0, 0.007, -0.01]} color={GREEN} radius={0.001} shadow={false} />
    </group>
  );
}

export function Skateboard() {
  return (
    <group>
      <Box size={[0.2, 0.025, 0.78]} position={[0, 0.07, 0]} color="#7b5ea7" radius={0.01} />
      {[-0.27, 0.27].map((z) => (
        <group key={z}>
          {[-0.07, 0.07].map((x) => (
            <Cyl key={x} top={0.03} height={0.03} rotation={[0, 0, Math.PI / 2]} position={[x, 0.03, z]} color="#ffd27a" segments={10} />
          ))}
        </group>
      ))}
    </group>
  );
}

export function Pigeon() {
  return (
    <group>
      <Ball radius={0.07} position={[0, 0.09, 0]} scale={[0.9, 0.9, 1.4]} color="#8d94a3" />
      <Ball radius={0.045} position={[0, 0.16, 0.08]} color="#6f7785" />
      <Box size={[0.02, 0.015, 0.03]} position={[0, 0.155, 0.13]} color="#e0b25e" radius={0.004} />
      <Box size={[0.08, 0.015, 0.08]} position={[0, 0.09, -0.11]} rotation={[0.4, 0, 0]} color="#5d6573" radius={0.004} />
      {[-0.025, 0.025].map((x) => (
        <Cyl key={x} top={0.006} height={0.04} position={[x, 0.02, 0]} color="#e0866a" segments={6} />
      ))}
    </group>
  );
}

export function StreetSign() {
  return (
    <group>
      <Box size={[0.8, 0.3, 0.03]} color="#ffffff" radius={0.02} />
      <Box size={[0.74, 0.24, 0.035]} color="#2b5fa8" radius={0.015} />
      {[-0.22, -0.08, 0.06, 0.2].map((x) => (
        <Box key={x} size={[0.1, 0.05, 0.04]} position={[x, 0, 0.002]} color="#ffffff" radius={0.005} shadow={false} />
      ))}
    </group>
  );
}

export function CityMap() {
  return (
    <group>
      <Box size={[1.0, 0.8, 0.04]} color={METAL} radius={0.02} />
      <Box size={[0.9, 0.7, 0.045]} color="#f3ead8" radius={0.01} />
      <Box size={[0.9, 0.04, 0.05]} position={[0, 0.05, 0]} color="#c9c1b3" radius={0.005} shadow={false} />
      <Box size={[0.04, 0.7, 0.05]} position={[-0.15, 0, 0]} color="#c9c1b3" radius={0.005} shadow={false} />
      <Box size={[0.22, 0.18, 0.05]} position={[0.22, 0.2, 0]} color="#8fd3b6" radius={0.01} shadow={false} />
      <Box size={[0.16, 0.14, 0.05]} position={[-0.32, -0.18, 0]} color="#a9c9f2" radius={0.01} shadow={false} />
      <Ball radius={0.035} position={[0.05, -0.12, 0.03]} color={RED} />
    </group>
  );
}
