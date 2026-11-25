import { Ball, Box, Cyl } from './parts';

// Office models. Same rules as index.tsx: front faces +z, floor objects stand on y = 0,
// wall objects are centred on their middle. Sizes match src/data/furniture.ts.

const WOOD = '#d9c2a3';
const GREY = '#9aa3ad';
const LIGHT = '#e8ebef';
const DARK = '#2f3440';

export function MeetingTable() {
  return (
    <group>
      <Box size={[1.6, 0.05, 0.9]} position={[0, 0.74, 0]} color={WOOD} radius={0.02} />
      {[-0.6, 0.6].map((x) => (
        <Box key={x} size={[0.08, 0.72, 0.7]} position={[x, 0.36, 0]} color={DARK} radius={0.02} />
      ))}
    </group>
  );
}

export function OfficeChair() {
  return (
    <group>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return <Box key={i} size={[0.04, 0.03, 0.28]} position={[Math.sin(a) * 0.13, 0.04, Math.cos(a) * 0.13]} rotation={[0, a, 0]} color={DARK} radius={0.01} />;
      })}
      <Cyl top={0.025} height={0.36} position={[0, 0.22, 0]} color={GREY} metalness={0.5} segments={10} />
      <Box size={[0.5, 0.08, 0.48]} position={[0, 0.44, 0]} color="#3c6fd1" radius={0.035} />
      <Box size={[0.46, 0.55, 0.08]} position={[0, 0.78, -0.22]} rotation={[-0.1, 0, 0]} color="#3c6fd1" radius={0.04} />
      {[-0.26, 0.26].map((x) => (
        <Box key={x} size={[0.05, 0.04, 0.3]} position={[x, 0.6, 0]} color={DARK} radius={0.015} />
      ))}
    </group>
  );
}

export function FilingCabinet() {
  return (
    <group>
      <Box size={[0.48, 1.0, 0.6]} position={[0, 0.5, 0]} color={GREY} radius={0.015} />
      {[0.84, 0.52, 0.2].map((y) => (
        <group key={y}>
          <Box size={[0.42, 0.28, 0.02]} position={[0, y, 0.3]} color="#b3bbc4" radius={0.01} shadow={false} />
          <Box size={[0.14, 0.025, 0.03]} position={[0, y + 0.06, 0.32]} color={DARK} radius={0.008} shadow={false} />
          <Box size={[0.08, 0.04, 0.005]} position={[0, y - 0.04, 0.312]} color="#ffffff" radius={0.002} shadow={false} />
        </group>
      ))}
    </group>
  );
}

export function WaterCooler() {
  return (
    <group>
      <Box size={[0.32, 0.95, 0.32]} position={[0, 0.475, 0]} color={LIGHT} radius={0.03} />
      <Box size={[0.2, 0.12, 0.02]} position={[0, 0.7, 0.16]} color={DARK} radius={0.01} shadow={false} />
      <Box size={[0.03, 0.04, 0.04]} position={[-0.05, 0.66, 0.18]} color="#5aa9e6" radius={0.006} />
      <Box size={[0.03, 0.04, 0.04]} position={[0.05, 0.66, 0.18]} color="#e04848" radius={0.006} />
      <Cyl top={0.13} bottom={0.14} height={0.38} position={[0, 1.15, 0]} color="#9fd8ff" roughness={0.15} segments={20} />
      <Cyl top={0.05} height={0.06} position={[0, 1.36, 0]} color="#5aa9e6" segments={12} />
    </group>
  );
}

export function Shredder() {
  return (
    <group>
      <Box size={[0.36, 0.5, 0.26]} position={[0, 0.25, 0]} color={DARK} radius={0.02} />
      <Box size={[0.38, 0.1, 0.28]} position={[0, 0.55, 0]} color="#4a5160" radius={0.02} />
      <Box size={[0.26, 0.01, 0.02]} position={[0, 0.6, 0]} color="#111111" radius={0.002} shadow={false} />
      <Box size={[0.2, 0.06, 0.004]} position={[0, 0.62, 0]} color="#ffffff" radius={0.002} />
      <Box size={[0.3, 0.3, 0.005]} position={[0, 0.25, 0.131]} color="#4a5160" radius={0.006} shadow={false} />
    </group>
  );
}

export function Printer() {
  return (
    <group>
      <Box size={[0.44, 0.2, 0.36]} position={[0, 0.1, 0]} color={LIGHT} radius={0.02} />
      <Box size={[0.3, 0.02, 0.14]} position={[0, 0.2, -0.12]} rotation={[0.5, 0, 0]} color="#ffffff" radius={0.004} />
      <Box size={[0.3, 0.02, 0.12]} position={[0, 0.05, 0.22]} color={GREY} radius={0.004} />
      <Box size={[0.24, 0.004, 0.1]} position={[0, 0.063, 0.22]} color="#ffffff" radius={0.001} shadow={false} />
      <Box size={[0.08, 0.03, 0.01]} position={[0.14, 0.15, 0.181]} color="#6fae6a" emissive="#6fae6a" emissiveIntensity={0.4} radius={0.004} shadow={false} />
    </group>
  );
}

export function Computer() {
  return (
    <group>
      <Box size={[0.16, 0.02, 0.12]} position={[0, 0.01, -0.02]} color={DARK} radius={0.008} />
      <Box size={[0.04, 0.16, 0.03]} position={[0, 0.1, -0.04]} color={DARK} radius={0.008} />
      <Box size={[0.5, 0.3, 0.03]} position={[0, 0.3, -0.03]} color={DARK} radius={0.012} />
      <Box size={[0.46, 0.26, 0.005]} position={[0, 0.3, -0.013]} color="#9fd8ff" emissive="#9fd8ff" emissiveIntensity={0.35} radius={0.003} shadow={false} />
      <Box size={[0.4, 0.015, 0.12]} position={[0, 0.008, 0.1]} color={LIGHT} radius={0.005} />
    </group>
  );
}

export function Laptop() {
  return (
    <group>
      <Box size={[0.32, 0.015, 0.22]} position={[0, 0.008, 0.02]} color="#c9d2d9" metalness={0.3} radius={0.006} />
      <Box size={[0.32, 0.21, 0.012]} position={[0, 0.11, -0.095]} rotation={[-0.25, 0, 0]} color="#c9d2d9" metalness={0.3} radius={0.006} />
      <Box size={[0.29, 0.18, 0.003]} position={[0, 0.11, -0.088]} rotation={[-0.25, 0, 0]} color="#c9b6e4" emissive="#c9b6e4" emissiveIntensity={0.3} radius={0.002} shadow={false} />
      <Box size={[0.26, 0.003, 0.1]} position={[0, 0.017, 0.0]} color={DARK} radius={0.001} shadow={false} />
    </group>
  );
}

export function Stapler() {
  return (
    <group>
      <Box size={[0.06, 0.02, 0.18]} position={[0, 0.01, 0]} color={DARK} radius={0.008} />
      <Box size={[0.05, 0.035, 0.17]} position={[0, 0.04, -0.005]} rotation={[0.08, 0, 0]} color="#e04848" radius={0.012} />
    </group>
  );
}

export function StickyNotes() {
  return (
    <group>
      {['#ffd54f', '#f7b2d0', '#9fd8c2'].map((c, i) => (
        <Box key={c} size={[0.1, 0.025, 0.1]} position={[i * 0.03 - 0.03, 0.0125 + i * 0.026, 0]} rotation={[0, i * 0.3, 0]} color={c} radius={0.003} />
      ))}
    </group>
  );
}

export function FireExtinguisher() {
  return (
    <group>
      <Box size={[0.2, 0.08, 0.06]} position={[0, -0.12, -0.02]} color={DARK} radius={0.01} />
      <Cyl top={0.075} height={0.42} position={[0, 0, 0.06]} color="#d93636" segments={18} />
      <Ball radius={0.075} position={[0, 0.21, 0.06]} color="#d93636" />
      <Box size={[0.05, 0.06, 0.05]} position={[0, 0.3, 0.06]} color={DARK} radius={0.01} />
      <Box size={[0.14, 0.02, 0.03]} position={[0.04, 0.34, 0.06]} color={DARK} radius={0.006} />
      <Box size={[0.1, 0.07, 0.005]} position={[0, 0.04, 0.136]} color="#ffffff" radius={0.003} shadow={false} />
    </group>
  );
}

export function SalesChart() {
  return (
    <group>
      <Box size={[0.8, 0.6, 0.02]} position={[0, 0, 0]} color="#ffffff" radius={0.01} />
      <Box size={[0.8, 0.02, 0.03]} position={[0, 0.31, 0]} color={DARK} radius={0.005} />
      <Box size={[0.6, 0.012, 0.005]} position={[0.02, -0.2, 0.012]} color={DARK} radius={0.002} shadow={false} />
      {[0.12, 0.2, 0.16, 0.3, 0.38].map((h, i) => (
        <Box key={i} size={[0.08, h, 0.006]} position={[-0.22 + i * 0.12, -0.2 + h / 2, 0.013]}
          color={['#5aa9e6', '#6fae6a', '#ffd54f', '#f28c8c', '#c06bd6'][i]} radius={0.003} shadow={false} />
      ))}
    </group>
  );
}

