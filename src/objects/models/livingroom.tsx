import { Ball, Box, Cyl, Legs } from './parts';

// Living room models. Same rules as index.tsx: front faces +z, floor objects stand on y = 0,
// wall objects are centred on their middle. Sizes match src/data/furniture.ts.

const SAGE = '#9cc7a4';
const SAGE_DARK = '#7fb08a';
const MUSTARD = '#f2c46d';
const WOOD = '#c99a6b';
const WOOD_DARK = '#9c7150';
const BRICK = '#d98a6c';
const DARK = '#2f3440';

export function Sofa() {
  return (
    <group>
      <Box size={[2.0, 0.24, 0.86]} position={[0, 0.2, 0]} color={SAGE} radius={0.06} />
      {[-0.49, 0.49].map((x) => (
        <Box key={x} size={[0.96, 0.14, 0.66]} position={[x, 0.38, 0.08]} color="#b0d6b6" radius={0.06} />
      ))}
      <Box size={[2.0, 0.5, 0.22]} position={[0, 0.6, -0.32]} color={SAGE} radius={0.08} />
      {[-0.93, 0.93].map((x) => (
        <Box key={x} size={[0.16, 0.36, 0.86]} position={[x, 0.46, 0]} color={SAGE_DARK} radius={0.07} />
      ))}
      <Legs w={1.9} d={0.76} h={0.08} r={0.03} color={WOOD_DARK} />
    </group>
  );
}

export function Armchair() {
  return (
    <group>
      <Box size={[0.9, 0.24, 0.82]} position={[0, 0.2, 0]} color={MUSTARD} radius={0.06} />
      <Box size={[0.6, 0.14, 0.6]} position={[0, 0.38, 0.07]} color="#f7d58f" radius={0.06} />
      <Box size={[0.9, 0.55, 0.2]} position={[0, 0.62, -0.31]} color={MUSTARD} radius={0.08} />
      {[-0.37, 0.37].map((x) => (
        <Box key={x} size={[0.16, 0.34, 0.82]} position={[x, 0.45, 0]} color="#e3b257" radius={0.07} />
      ))}
      <Legs w={0.8} d={0.72} h={0.08} r={0.025} color={WOOD_DARK} />
    </group>
  );
}

export function CoffeeTable() {
  return (
    <group>
      <Box size={[1.1, 0.05, 0.6]} position={[0, 0.395, 0]} color={WOOD} radius={0.02} />
      <Box size={[1.0, 0.03, 0.5]} position={[0, 0.12, 0]} color={WOOD_DARK} radius={0.01} />
      <Legs w={1.1} d={0.6} h={0.37} r={0.025} color={WOOD_DARK} />
      {/* magazine on the lower shelf */}
      <Box size={[0.26, 0.012, 0.2]} position={[-0.25, 0.142, 0]} rotation={[0, 0.2, 0]} color="#f28c8c" radius={0.004} shadow={false} />
    </group>
  );
}

export function Television() {
  return (
    <group>
      {/* low TV unit */}
      <Box size={[1.3, 0.42, 0.42]} position={[0, 0.25, 0]} color="#f4efe6" radius={0.02} />
      <Box size={[0.6, 0.3, 0.02]} position={[-0.3, 0.25, 0.21]} color="#e6ddcf" radius={0.01} />
      <Box size={[0.6, 0.3, 0.02]} position={[0.3, 0.25, 0.21]} color="#e6ddcf" radius={0.01} />
      <Legs w={1.2} d={0.36} h={0.04} r={0.02} color={WOOD_DARK} />
      {/* the TV */}
      <Box size={[0.12, 0.08, 0.12]} position={[0, 0.5, -0.05]} color={DARK} radius={0.01} />
      <Box size={[1.1, 0.6, 0.05]} position={[0, 0.84, -0.05]} color={DARK} radius={0.015} />
      <Box size={[1.02, 0.52, 0.01]} position={[0, 0.84, -0.022]} color="#4a6fa5" emissive="#6f9ad6" emissiveIntensity={0.25} radius={0.004} shadow={false} />
    </group>
  );
}

export function Fireplace() {
  return (
    <group>
      <Box size={[1.3, 1.05, 0.36]} position={[0, 0.525, -0.02]} color={BRICK} radius={0.02} />
      <Box size={[0.66, 0.6, 0.06]} position={[0, 0.34, 0.15]} color="#2b2124" radius={0.02} />
      {/* logs and flames */}
      <Cyl top={0.05} height={0.45} position={[0, 0.1, 0.12]} rotation={[0, 0, Math.PI / 2]} color={WOOD_DARK} segments={10} />
      <Cyl top={0.0} bottom={0.1} height={0.24} position={[-0.08, 0.26, 0.13]} color="#ffb347" emissive="#ff9a3c" emissiveIntensity={0.8} segments={10} />
      <Cyl top={0.0} bottom={0.08} height={0.18} position={[0.1, 0.23, 0.13]} color="#ffd36b" emissive="#ffc04d" emissiveIntensity={0.8} segments={10} />
      {/* mantelpiece */}
      <Box size={[1.46, 0.08, 0.42]} position={[0, 1.09, 0]} color="#f4efe6" radius={0.02} />
      <Box size={[1.4, 0.04, 0.4]} position={[0, 0.02, 0.02]} color="#8a8f98" radius={0.01} />
    </group>
  );
}

export function Bookcase() {
  const books = ['#f28c8c', '#5aa9e6', '#9fd08f', '#f2c46d', '#c9b6e4', '#f6a6a6', '#7fc0d8'];
  return (
    <group>
      <Box size={[0.9, 1.8, 0.33]} position={[0, 0.9, -0.01]} color={WOOD} radius={0.02} />
      <Box size={[0.82, 1.7, 0.02]} position={[0, 0.9, -0.15]} color={WOOD_DARK} radius={0.005} shadow={false} />
      {[0.08, 0.5, 0.92, 1.34].map((y, row) => (
        <group key={y}>
          <Box size={[0.84, 0.03, 0.3]} position={[0, y, 0]} color={WOOD_DARK} radius={0.005} />
          {Array.from({ length: 6 }, (_, i) => (
            <Box key={i} size={[0.07, 0.26 + ((i + row) % 3) * 0.03, 0.22]} position={[-0.33 + i * 0.11 + (row % 2) * 0.04, y + 0.15, 0.01]}
              color={books[(i + row * 2) % books.length]} radius={0.008} />
          ))}
        </group>
      ))}
    </group>
  );
}

export function FloorLamp() {
  return (
    <group>
      <Cyl top={0.16} bottom={0.18} height={0.04} position={[0, 0.02, 0]} color="#5b5560" segments={20} />
      <Cyl top={0.015} height={1.35} position={[0, 0.7, 0]} color="#c9a227" metalness={0.5} roughness={0.35} segments={10} />
      <Cyl top={0.12} bottom={0.2} height={0.28} position={[0, 1.48, 0]} color="#fff3d6" emissive="#ffe6a8" emissiveIntensity={0.35} segments={20} />
    </group>
  );
}

export function Cushion() {
  return (
    <group>
      <Box size={[0.34, 0.3, 0.12]} position={[0, 0.15, 0]} rotation={[-0.15, 0, 0]} color="#f28c8c" radius={0.055} />
      <Box size={[0.1, 0.1, 0.01]} position={[0, 0.16, 0.06]} rotation={[-0.15, 0, 0.78]} color="#ffd6d6" radius={0.004} shadow={false} />
    </group>
  );
}

export function RemoteControl() {
  return (
    <group>
      <Box size={[0.06, 0.025, 0.18]} position={[0, 0.0125, 0]} color={DARK} radius={0.01} />
      <Ball radius={0.009} position={[0, 0.027, -0.06]} color="#f25c5c" />
      {[-0.015, 0.015].map((x) => [0, 0.03].map((z) => (
        <Box key={`${x}${z}`} size={[0.014, 0.006, 0.014]} position={[x, 0.027, z]} color="#9aa3ad" radius={0.002} shadow={false} />
      )))}
    </group>
  );
}

export function WallClock() {
  return (
    <group>
      <Cyl top={0.2} height={0.05} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} color={WOOD} segments={32} />
      <Cyl top={0.17} height={0.02} position={[0, 0, 0.022]} rotation={[Math.PI / 2, 0, 0]} color="#fffdf6" segments={32} />
      <Box size={[0.015, 0.11, 0.008]} position={[0, 0.045, 0.036]} color={DARK} radius={0.003} shadow={false} />
      <Box size={[0.08, 0.012, 0.008]} position={[0.035, 0, 0.038]} color={DARK} radius={0.003} shadow={false} />
      <Ball radius={0.012} position={[0, 0, 0.04]} color="#c9a227" />
    </group>
  );
}

export function Piano() {
  return (
    <group>
      <Box size={[1.4, 1.2, 0.36]} position={[0, 0.6, -0.09]} color="#3b2f35" roughness={0.35} radius={0.02} />
      {/* keyboard shelf */}
      <Box size={[1.3, 0.06, 0.2]} position={[0, 0.72, 0.17]} color="#3b2f35" roughness={0.35} radius={0.01} />
      <Box size={[1.22, 0.02, 0.14]} position={[0, 0.76, 0.18]} color="#fbfbf7" radius={0.004} />
      {Array.from({ length: 14 }, (_, i) => (
        i % 7 === 2 || i % 7 === 6 ? null : (
          <Box key={i} size={[0.035, 0.022, 0.08]} position={[-0.5 + i * 0.075, 0.775, 0.15]} color="#1d1a1f" radius={0.003} shadow={false} />
        )
      ))}
      {[-0.6, 0.6].map((x) => (
        <Box key={x} size={[0.06, 0.66, 0.06]} position={[x, 0.33, 0.24]} color="#3b2f35" radius={0.01} />
      ))}
      {/* sheet music */}
      <Box size={[0.36, 0.24, 0.01]} position={[0, 0.95, 0.1]} rotation={[-0.25, 0, 0]} color="#fffdf6" radius={0.004} />
    </group>
  );
}

export function Beanbag() {
  return (
    <group>
      <Ball radius={0.38} position={[0, 0.3, 0]} scale={[1, 0.72, 1]} color="#7fc0d8" detail={2} />
      <Ball radius={0.24} position={[0, 0.42, -0.18]} scale={[1.2, 1, 0.7]} color="#6fb3cc" detail={2} />
    </group>
  );
}
