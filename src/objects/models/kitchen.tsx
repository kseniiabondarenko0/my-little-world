import { Ball, Box, Cyl, Legs } from './parts';

// Kitchen models. Same rules as index.tsx: front faces +z, floor objects stand on y = 0,
// wall objects are centred on their middle. Sizes match src/data/furniture.ts.

const WOOD = '#e4b98f';
const WOOD_DARK = '#cf9f74';
const CREAM = '#fffaf3';
const STEEL = '#d9dee3';
const MINT = '#bfe3d0';
const MINT_DARK = '#a3d2bb';
const WORKTOP = '#f4eee4';
const HANDLE = '#9aa3ab';

export function KitchenTable() {
  return (
    <group>
      <Legs w={1.12} d={0.72} h={0.71} r={0.03} inset={0.08} color={WOOD_DARK} />
      <Box size={[1.2, 0.05, 0.8]} position={[0, 0.725, 0]} color={WOOD} radius={0.02} />
      {/* tablecloth runner and a fruit bowl */}
      <Box size={[0.36, 0.006, 0.8]} position={[0, 0.753, 0]} color="#f6a6a6" radius={0.002} shadow={false} />
      <Cyl top={0.12} bottom={0.07} height={0.06} position={[0, 0.785, 0]} color={CREAM} segments={18} />
      <Ball radius={0.04} position={[-0.03, 0.82, 0.02]} color="#f4a259" />
      <Ball radius={0.04} position={[0.04, 0.82, -0.02]} color="#9fd08f" />
      <Ball radius={0.035} position={[0.01, 0.85, 0.04]} color="#e76f51" />
    </group>
  );
}

export function Fridge() {
  return (
    <group>
      <Box size={[0.7, 1.76, 0.62]} position={[0, 0.9, -0.02]} color="#f2f7fb" radius={0.05} />
      <Box size={[0.66, 0.02, 0.02]} position={[0, 1.22, 0.3]} color="#d5dee6" radius={0.006} />
      <Box size={[0.66, 0.62, 0.03]} position={[0, 1.5, 0.3]} color="#f8fbfd" radius={0.02} />
      <Box size={[0.66, 1.08, 0.03]} position={[0, 0.66, 0.3]} color="#f8fbfd" radius={0.02} />
      <Box size={[0.03, 0.3, 0.04]} position={[0.26, 1.42, 0.33]} color={HANDLE} metalness={0.4} roughness={0.3} radius={0.012} />
      <Box size={[0.03, 0.4, 0.04]} position={[0.26, 0.92, 0.33]} color={HANDLE} metalness={0.4} roughness={0.3} radius={0.012} />
      {/* magnets */}
      <Box size={[0.08, 0.1, 0.01]} position={[-0.15, 1.55, 0.32]} color="#ffd27a" radius={0.004} shadow={false} />
      <Ball radius={0.025} position={[-0.05, 1.62, 0.32]} color="#f6a6a6" />
    </group>
  );
}

/** Lower kitchen unit used by the cooker, sink and dishwasher. */
function Unit({ color = MINT, top = WORKTOP }: { color?: string; top?: string }) {
  return (
    <>
      <Box size={[0.56, 0.08, 0.5]} position={[0, 0.04, -0.03]} color="#7f8c8d" radius={0.01} />
      <Box size={[0.6, 0.8, 0.58]} position={[0, 0.48, -0.01]} color={color} radius={0.02} />
      <Box size={[0.6, 0.04, 0.6]} position={[0, 0.88, 0]} color={top} radius={0.012} />
    </>
  );
}

export function Cooker() {
  return (
    <group>
      <Unit color="#f2f2ef" top="#3e3a40" />
      {[[-0.14, -0.13], [0.14, -0.13], [-0.14, 0.13], [0.14, 0.13]].map(([x, z], i) => (
        <Cyl key={i} top={0.09} height={0.01} position={[x, 0.905, z]} color="#5b5560" segments={20} shadow={false} />
      ))}
      {/* oven door */}
      <Box size={[0.5, 0.44, 0.02]} position={[0, 0.42, 0.29]} color="#4a4550" radius={0.02} />
      <Box size={[0.36, 0.22, 0.01]} position={[0, 0.42, 0.302]} color="#6e6a78" emissive="#ffb36b" emissiveIntensity={0.15} radius={0.01} />
      <Box size={[0.4, 0.025, 0.04]} position={[0, 0.69, 0.31]} color={HANDLE} metalness={0.5} roughness={0.3} radius={0.01} />
      {[-0.18, -0.06, 0.06, 0.18].map((x) => (
        <Cyl key={x} top={0.022} height={0.03} position={[x, 0.79, 0.3]} rotation={[Math.PI / 2, 0, 0]} color="#3e3a40" segments={12} />
      ))}
    </group>
  );
}

export function Sink() {
  return (
    <group>
      <Box size={[0.96, 0.08, 0.5]} position={[0, 0.04, -0.03]} color="#7f8c8d" radius={0.01} />
      <Box size={[1.0, 0.8, 0.58]} position={[0, 0.48, -0.01]} color={MINT} radius={0.02} />
      <Box size={[1.0, 0.04, 0.6]} position={[0, 0.88, 0]} color={WORKTOP} radius={0.012} />
      {/* basin, tap */}
      <Box size={[0.46, 0.02, 0.36]} position={[-0.12, 0.895, 0.02]} color={STEEL} metalness={0.5} roughness={0.25} radius={0.02} />
      <Box size={[0.4, 0.01, 0.3]} position={[-0.12, 0.902, 0.02]} color="#b8c1c9" metalness={0.5} roughness={0.25} radius={0.01} shadow={false} />
      <Cyl top={0.02} height={0.24} position={[-0.12, 1.02, -0.22]} color={STEEL} metalness={0.6} roughness={0.25} segments={10} />
      <Cyl top={0.015} height={0.14} position={[-0.12, 1.13, -0.16]} rotation={[Math.PI / 2, 0, 0]} color={STEEL} metalness={0.6} roughness={0.25} segments={10} />
      {/* two doors */}
      {[-0.25, 0.25].map((x) => (
        <group key={x}>
          <Box size={[0.47, 0.7, 0.02]} position={[x, 0.48, 0.285]} color={MINT_DARK} radius={0.012} />
          <Box size={[0.02, 0.14, 0.03]} position={[x > 0 ? 0.04 : -0.04, 0.68, 0.3]} color={HANDLE} radius={0.008} />
        </group>
      ))}
    </group>
  );
}

export function Dishwasher() {
  return (
    <group>
      <Unit color="#eef1f4" />
      <Box size={[0.56, 0.72, 0.02]} position={[0, 0.48, 0.285]} color="#f7f9fb" radius={0.012} />
      <Box size={[0.4, 0.025, 0.04]} position={[0, 0.8, 0.3]} color={HANDLE} metalness={0.5} roughness={0.3} radius={0.01} />
      <Box size={[0.12, 0.03, 0.01]} position={[0.17, 0.84, 0.298]} color="#7bd389" emissive="#7bd389" emissiveIntensity={0.4} radius={0.004} shadow={false} />
    </group>
  );
}

export function Stool() {
  return (
    <group>
      <Legs w={0.34} d={0.34} h={0.6} r={0.018} inset={0.03} color={WOOD_DARK} />
      <Box size={[0.3, 0.02, 0.02]} position={[0, 0.22, 0.14]} color={WOOD_DARK} radius={0.006} />
      <Cyl top={0.2} height={0.05} position={[0, 0.625, 0]} color="#ffd27a" segments={22} />
    </group>
  );
}

export function Kettle() {
  return (
    <group>
      <Cyl top={0.1} bottom={0.075} height={0.03} position={[0, 0.015, 0]} color="#5b5560" segments={18} />
      <Cyl top={0.065} bottom={0.09} height={0.2} position={[0, 0.13, 0]} color="#f28c8c" segments={18} />
      <Cyl top={0.03} height={0.03} position={[0, 0.245, 0]} color="#5b5560" segments={12} />
      <Cyl top={0.015} bottom={0.025} height={0.1} position={[0.09, 0.15, 0]} rotation={[0, 0, -0.9]} color="#f28c8c" segments={8} />
      <mesh position={[-0.08, 0.16, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.055, 0.012, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#5b5560" />
      </mesh>
    </group>
  );
}

export function Cupboard() {
  return (
    <group>
      <Box size={[1.0, 0.7, 0.34]} color={MINT} radius={0.02} />
      {[-0.25, 0.25].map((x) => (
        <group key={x}>
          <Box size={[0.47, 0.64, 0.02]} position={[x, 0, 0.175]} color={MINT_DARK} radius={0.012} />
          <Box size={[0.02, 0.12, 0.03]} position={[x > 0 ? 0.04 : -0.04, -0.2, 0.19]} color={HANDLE} radius={0.008} />
        </group>
      ))}
    </group>
  );
}

export function Microwave() {
  return (
    <group>
      <Box size={[0.5, 0.3, 0.38]} position={[0, 0.15, 0]} color="#f2f2ef" radius={0.03} />
      <Box size={[0.32, 0.22, 0.01]} position={[-0.06, 0.15, 0.19]} color="#3e3a40" emissive="#ffd98f" emissiveIntensity={0.08} radius={0.01} />
      <Box size={[0.08, 0.16, 0.01]} position={[0.17, 0.17, 0.19]} color="#d5dee6" radius={0.006} />
      <Box size={[0.05, 0.02, 0.006]} position={[0.17, 0.22, 0.197]} color="#7bd389" emissive="#7bd389" emissiveIntensity={0.5} radius={0.002} shadow={false} />
    </group>
  );
}

export function Toaster() {
  return (
    <group>
      <Box size={[0.3, 0.2, 0.2]} position={[0, 0.1, 0]} color="#a9c9f2" radius={0.05} />
      {[-0.05, 0.05].map((x) => (
        <Box key={x} size={[0.03, 0.01, 0.13]} position={[x, 0.2, 0]} color="#3e3a40" radius={0.004} shadow={false} />
      ))}
      <Box size={[0.025, 0.05, 0.11]} position={[-0.05, 0.215, 0]} color="#e7bf86" radius={0.01} />
      <Box size={[0.03, 0.02, 0.03]} position={[0.16, 0.14, 0]} color="#3e3a40" radius={0.008} />
    </group>
  );
}

export function Calendar() {
  return (
    <group>
      <Box size={[0.45, 0.6, 0.02]} color={CREAM} radius={0.008} />
      <Box size={[0.45, 0.22, 0.012]} position={[0, 0.17, 0.014]} color="#9fd8c2" radius={0.006} shadow={false} />
      <Ball radius={0.02} position={[0, 0.31, 0.02]} color="#e76f51" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3, 4].map((col) => (
          <Box key={`${row}-${col}`} size={[0.06, 0.05, 0.004]} position={[-0.16 + col * 0.08, -0.02 - row * 0.065, 0.013]}
            color={row === 2 && col === 3 ? '#f6a6a6' : '#ece4d6'} radius={0.002} shadow={false} />
        )),
      )}
    </group>
  );
}

export function Bin() {
  return (
    <group>
      <Cyl top={0.17} bottom={0.14} height={0.5} position={[0, 0.25, 0]} color={STEEL} metalness={0.4} roughness={0.35} segments={20} />
      <Cyl top={0.175} height={0.04} position={[0, 0.52, 0]} color="#b8c1c9" metalness={0.4} roughness={0.35} segments={20} />
      <Box size={[0.12, 0.02, 0.05]} position={[0, 0.02, 0.16]} color="#5b5560" radius={0.008} />
    </group>
  );
}
