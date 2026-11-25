import { Ball, Box, Cyl } from './parts';

// Hospital (ward) models. Same rules as index.tsx: front faces +z, floor objects stand on y = 0,
// wall objects are centred on their middle. Sizes match src/data/furniture.ts.

const STEEL = '#b9c2cc';
const WHITE = '#f6f8fa';
const DARK = '#2f3440';
const MINT = '#8fd3c1';

export function HospitalBed() {
  return (
    <group>
      <Box size={[0.95, 0.12, 2.0]} position={[0, 0.5, 0]} color={STEEL} radius={0.02} />
      <Box size={[0.9, 0.14, 1.94]} position={[0, 0.62, 0]} color={WHITE} radius={0.05} />
      <Box size={[0.92, 0.06, 1.2]} position={[0, 0.71, 0.32]} color={MINT} radius={0.03} />
      <Box size={[0.55, 0.1, 0.32]} position={[0, 0.74, -0.74]} color="#ffffff" radius={0.05} />
      <Box size={[0.95, 0.55, 0.05]} position={[0, 0.75, -1.0]} color={STEEL} radius={0.02} />
      <Box size={[0.95, 0.35, 0.05]} position={[0, 0.65, 1.0]} color={STEEL} radius={0.02} />
      {[-0.4, 0.4].map((x) => [-0.85, 0.85].map((z) => (
        <group key={`${x}${z}`}>
          <Cyl top={0.02} height={0.4} position={[x, 0.24, z]} color={STEEL} segments={8} />
          <Cyl top={0.045} height={0.03} position={[x, 0.045, z]} rotation={[0, 0, Math.PI / 2]} color={DARK} segments={12} />
        </group>
      )))}
      <Box size={[0.03, 0.12, 0.8]} position={[0.47, 0.8, 0.1]} color={STEEL} radius={0.01} />
    </group>
  );
}

export function Wheelchair() {
  return (
    <group>
      {[-0.29, 0.29].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.3, -0.05]} rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.28, 0.02, 8, 28]} />
            <meshStandardMaterial color={DARK} />
          </mesh>
          <Cyl top={0.07} height={0.025} position={[x * 0.8, 0.07, 0.25]} rotation={[0, 0, Math.PI / 2]} color={DARK} segments={12} />
          <Box size={[0.03, 0.42, 0.03]} position={[x * 0.85, 0.7, -0.2]} color={STEEL} radius={0.01} />
          <Box size={[0.03, 0.03, 0.4]} position={[x * 0.85, 0.66, 0.0]} color={DARK} radius={0.01} />
        </group>
      ))}
      <Box size={[0.48, 0.05, 0.44]} position={[0, 0.48, 0.02]} color="#3c6fd1" radius={0.02} />
      <Box size={[0.48, 0.4, 0.04]} position={[0, 0.72, -0.2]} color="#3c6fd1" radius={0.02} />
      <Box size={[0.4, 0.03, 0.12]} position={[0, 0.1, 0.32]} color={STEEL} radius={0.01} />
    </group>
  );
}

export function DripStand() {
  return (
    <group>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return <Box key={i} size={[0.03, 0.03, 0.22]} position={[Math.sin(a) * 0.1, 0.03, Math.cos(a) * 0.1]} rotation={[0, a, 0]} color={STEEL} radius={0.01} />;
      })}
      <Cyl top={0.015} height={1.75} position={[0, 0.9, 0]} color={STEEL} metalness={0.5} segments={8} />
      <Box size={[0.3, 0.02, 0.02]} position={[0, 1.76, 0]} color={STEEL} radius={0.006} />
      <Box size={[0.14, 0.22, 0.05]} position={[0.1, 1.6, 0]} color="#dff3ff" roughness={0.2} radius={0.03} />
      <Cyl top={0.004} height={0.6} position={[0.1, 1.2, 0]} color="#dff3ff" segments={6} />
    </group>
  );
}

export function MedicalTrolley() {
  return (
    <group>
      <Box size={[0.7, 0.04, 0.46]} position={[0, 0.85, 0]} color={WHITE} radius={0.015} />
      <Box size={[0.7, 0.04, 0.46]} position={[0, 0.45, 0]} color={WHITE} radius={0.015} />
      <Box size={[0.66, 0.16, 0.42]} position={[0, 0.7, 0]} color={MINT} radius={0.02} />
      <Box size={[0.66, 0.02, 0.02]} position={[0, 0.7, 0.215]} color={DARK} radius={0.006} shadow={false} />
      {[-0.32, 0.32].map((x) => [-0.2, 0.2].map((z) => (
        <group key={`${x}${z}`}>
          <Cyl top={0.014} height={0.8} position={[x, 0.45, z]} color={STEEL} segments={8} />
          <Ball radius={0.035} position={[x, 0.035, z]} color={DARK} />
        </group>
      )))}
    </group>
  );
}

export function Crutches() {
  return (
    <group>
      {[-0.06, 0.06].map((x) => (
        <group key={x} rotation={[0, 0, x * 0.6]}>
          <Cyl top={0.014} height={1.1} position={[x, 0.58, 0]} color={STEEL} segments={8} />
          <Box size={[0.04, 0.03, 0.14]} position={[x, 1.15, 0]} color={DARK} radius={0.012} />
          <Box size={[0.035, 0.03, 0.1]} position={[x, 0.8, 0]} color={DARK} radius={0.01} />
          <Cyl top={0.02} height={0.04} position={[x, 0.02, 0]} color={DARK} segments={8} />
        </group>
      ))}
    </group>
  );
}

export function Stethoscope() {
  return (
    <group>
      <mesh position={[0, 0.012, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.08, 0.008, 6, 24, Math.PI * 1.6]} />
        <meshStandardMaterial color={DARK} />
      </mesh>
      <Cyl top={0.03} height={0.015} position={[0.02, 0.008, 0.12]} color={STEEL} metalness={0.6} segments={16} />
      <Box size={[0.01, 0.01, 0.06]} position={[0.02, 0.01, 0.08]} color={DARK} radius={0.003} shadow={false} />
    </group>
  );
}

export function Thermometer() {
  return (
    <group>
      <Box size={[0.04, 0.025, 0.15]} position={[0, 0.0125, 0]} color={WHITE} radius={0.01} />
      <Box size={[0.026, 0.004, 0.04]} position={[0, 0.026, -0.02]} color="#9fd8c2" emissive="#9fd8c2" emissiveIntensity={0.3} radius={0.002} shadow={false} />
      <Cyl top={0.008} height={0.04} position={[0, 0.0125, 0.085]} rotation={[Math.PI / 2, 0, 0]} color={STEEL} segments={8} />
    </group>
  );
}

export function Bandage() {
  return (
    <group>
      <Cyl top={0.05} height={0.07} position={[0, 0.05, 0]} rotation={[0, 0, Math.PI / 2]} color="#f3ead8" segments={18} />
      <Box size={[0.07, 0.003, 0.1]} position={[0, 0.002, 0.08]} color="#f3ead8" radius={0.001} shadow={false} />
    </group>
  );
}

export function Syringe() {
  return (
    <group>
      <Cyl top={0.014} height={0.12} position={[0, 0.016, 0]} rotation={[Math.PI / 2, 0, 0]} color="#e8f6ff" roughness={0.2} segments={10} />
      <Cyl top={0.003} height={0.05} position={[0, 0.016, 0.085]} rotation={[Math.PI / 2, 0, 0]} color={STEEL} segments={6} />
      <Cyl top={0.006} height={0.05} position={[0, 0.016, -0.08]} rotation={[Math.PI / 2, 0, 0]} color={STEEL} segments={6} />
      <Box size={[0.05, 0.01, 0.01]} position={[0, 0.016, -0.06]} color={STEEL} radius={0.003} />
    </group>
  );
}

export function HeartMonitor() {
  return (
    <group>
      <Box size={[0.36, 0.26, 0.16]} position={[0, 0.13, 0]} color={WHITE} radius={0.02} />
      <Box size={[0.28, 0.18, 0.01]} position={[-0.02, 0.14, 0.08]} color="#16324a" radius={0.008} shadow={false} />
      {[[-0.12, 0.13, 0.04], [-0.07, 0.13, 0.03], [-0.04, 0.17, 0.02], [-0.01, 0.1, 0.02], [0.03, 0.13, 0.06], [0.08, 0.13, 0.04]].map(([x, y, w], i) => (
        <Box key={i} size={[w, 0.008, 0.004]} position={[x, y, 0.087]} color="#6fe08a" emissive="#6fe08a" emissiveIntensity={0.8} radius={0.001} shadow={false} />
      ))}
      <Ball radius={0.015} position={[0.15, 0.2, 0.08]} color="#e04848" />
    </group>
  );
}

export function XRay() {
  return (
    <group>
      <Box size={[0.6, 0.7, 0.04]} position={[0, 0, 0]} color={WHITE} radius={0.015} />
      <Box size={[0.52, 0.6, 0.01]} position={[0, 0, 0.022]} color="#1c2733" emissive="#9fd8ff" emissiveIntensity={0.08} radius={0.005} shadow={false} />
      {/* a simple rib cage */}
      <Box size={[0.03, 0.42, 0.004]} position={[0, 0.0, 0.03]} color="#e8f6ff" radius={0.002} shadow={false} />
      {[0.15, 0.08, 0.01, -0.06, -0.13].map((y) => (
        <group key={y}>
          <Box size={[0.17, 0.02, 0.004]} position={[-0.09, y, 0.03]} rotation={[0, 0, -0.25]} color="#e8f6ff" radius={0.002} shadow={false} />
          <Box size={[0.17, 0.02, 0.004]} position={[0.09, y, 0.03]} rotation={[0, 0, 0.25]} color="#e8f6ff" radius={0.002} shadow={false} />
        </group>
      ))}
    </group>
  );
}

export function EyeChart() {
  const rows: [number, number, number][] = [[0.17, 1, 0.07], [0.07, 2, 0.05], [-0.02, 3, 0.035], [-0.1, 4, 0.025], [-0.17, 5, 0.018]];
  return (
    <group>
      <Box size={[0.4, 0.6, 0.02]} position={[0, 0, 0]} color="#ffffff" radius={0.01} />
      {rows.map(([y, n, s]) =>
        Array.from({ length: n }, (_, i) => (
          <Box key={`${y}-${i}`} size={[s, s, 0.004]} position={[(i - (n - 1) / 2) * s * 1.6, y, 0.012]} color={DARK} radius={0.002} shadow={false} />
        )),
      )}
    </group>
  );
}
