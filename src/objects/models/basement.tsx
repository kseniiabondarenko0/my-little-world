import { Ball, Box, Cyl, Legs } from './parts';

// Basement models. Same rules as index.tsx: front faces +z, floor objects stand on y = 0,
// wall objects are centred on their middle. Sizes match src/data/furniture.ts.

const WOOD = '#c99a6b';
const WOOD_DARK = '#8a6446';
const METAL = '#8f99a3';
const METAL_DARK = '#5b5560';
const CARDBOARD = '#d6b07a';

export function Boiler() {
  return (
    <group>
      <Box size={[0.6, 1.2, 0.45]} position={[0, 0.6, 0]} color="#f4f6f8" radius={0.03} />
      <Box size={[0.4, 0.14, 0.02]} position={[0, 0.98, 0.23]} color="#3e3a40" radius={0.01} />
      <Box size={[0.12, 0.05, 0.01]} position={[-0.08, 0.98, 0.242]} color="#9fe0a6" emissive="#9fe0a6" emissiveIntensity={0.4} radius={0.004} shadow={false} />
      <Ball radius={0.03} position={[0.12, 0.98, 0.24]} color="#f25c5c" />
      {[-0.18, -0.06, 0.06, 0.18].map((x) => (
        <Cyl key={x} top={0.025} height={0.5} position={[x, 1.42, -0.05]} color="#c27b4a" metalness={0.5} roughness={0.35} segments={10} />
      ))}
    </group>
  );
}

export function Workbench() {
  return (
    <group>
      <Box size={[1.4, 0.07, 0.62]} position={[0, 0.865, 0]} color={WOOD} radius={0.015} />
      <Box size={[1.3, 0.04, 0.52]} position={[0, 0.25, 0]} color={WOOD_DARK} radius={0.01} />
      <Legs w={1.36} d={0.58} h={0.83} r={0.035} color={WOOD_DARK} />
      {/* vice */}
      <Box size={[0.14, 0.1, 0.12]} position={[0.55, 0.95, 0.26]} color={METAL_DARK} radius={0.01} />
      {/* planks on the shelf */}
      <Box size={[0.9, 0.04, 0.12]} position={[0, 0.29, -0.1]} color="#e4b98f" radius={0.006} />
      <Box size={[0.9, 0.04, 0.12]} position={[0.05, 0.33, -0.08]} color="#d6ab7c" radius={0.006} />
    </group>
  );
}

export function Toolbox() {
  return (
    <group>
      <Box size={[0.4, 0.18, 0.2]} position={[0, 0.09, 0]} color="#e04848" radius={0.02} />
      <Box size={[0.4, 0.02, 0.2]} position={[0, 0.17, 0]} color="#b83232" radius={0.006} />
      <Box size={[0.22, 0.03, 0.03]} position={[0, 0.24, 0]} color={METAL_DARK} radius={0.012} />
      {[-0.1, 0.1].map((x) => <Box key={x} size={[0.02, 0.07, 0.02]} position={[x, 0.2, 0]} color={METAL_DARK} radius={0.005} />)}
    </group>
  );
}

export function Ladder() {
  return (
    <group rotation={[-0.12, 0, 0]}>
      {[-0.22, 0.22].map((x) => <Box key={x} size={[0.05, 1.9, 0.07]} position={[x, 0.95, 0]} color={METAL} metalness={0.5} roughness={0.35} radius={0.01} />)}
      {Array.from({ length: 6 }, (_, i) => (
        <Box key={i} size={[0.42, 0.035, 0.08]} position={[0, 0.25 + i * 0.3, 0]} color="#c9d2d9" metalness={0.5} roughness={0.35} radius={0.008} />
      ))}
    </group>
  );
}

export function Shelving() {
  const things = ['#f2c46d', '#7fc0d8', '#9fd08f', '#f28c8c', '#c9b6e4', CARDBOARD];
  return (
    <group>
      {[-0.48, 0.48].map((x) => [-0.17, 0.17].map((z) => (
        <Box key={`${x}${z}`} size={[0.04, 1.8, 0.04]} position={[x, 0.9, z]} color={METAL_DARK} radius={0.008} />
      )))}
      {[0.1, 0.55, 1.0, 1.45].map((y, row) => (
        <group key={y}>
          <Box size={[1.0, 0.03, 0.38]} position={[0, y, 0]} color={METAL} metalness={0.3} radius={0.006} />
          {[-0.28, 0.02, 0.3].map((x, i) => (
            <Box key={x} size={[0.24, 0.18 + ((i + row) % 2) * 0.08, 0.28]} position={[x, y + 0.11 + ((i + row) % 2) * 0.04, 0]}
              color={things[(i + row * 2) % things.length]} radius={0.02} />
          ))}
        </group>
      ))}
    </group>
  );
}

export function ChestFreezer() {
  return (
    <group>
      <Box size={[1.1, 0.8, 0.65]} position={[0, 0.4, 0]} color="#f4f6f8" radius={0.04} />
      <Box size={[1.1, 0.06, 0.65]} position={[0, 0.82, 0]} color="#e3e8ec" radius={0.03} />
      <Box size={[0.3, 0.04, 0.04]} position={[0, 0.75, 0.33]} color="#7fc0d8" radius={0.015} />
      <Box size={[0.08, 0.04, 0.01]} position={[0.4, 0.6, 0.326]} color="#9fe0a6" emissive="#9fe0a6" emissiveIntensity={0.4} radius={0.004} shadow={false} />
    </group>
  );
}

export function Bicycle() {
  return (
    <group>
      {[-0.42, 0.42].map((z) => (
        <group key={z}>
          <mesh position={[0, 0.33, z]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <torusGeometry args={[0.3, 0.03, 8, 28]} />
            <meshStandardMaterial color="#2f3440" roughness={0.8} />
          </mesh>
          <Cyl top={0.03} height={0.08} position={[0, 0.33, z]} rotation={[0, 0, Math.PI / 2]} color={METAL} segments={10} />
        </group>
      ))}
      {/* frame */}
      <Box size={[0.04, 0.04, 0.6]} position={[0, 0.62, 0]} color="#4aa3a2" radius={0.015} />
      <Box size={[0.04, 0.42, 0.04]} position={[0, 0.48, -0.16]} rotation={[0.3, 0, 0]} color="#4aa3a2" radius={0.015} />
      <Box size={[0.04, 0.55, 0.04]} position={[0, 0.5, 0.15]} rotation={[-0.55, 0, 0]} color="#4aa3a2" radius={0.015} />
      <Box size={[0.04, 0.45, 0.04]} position={[0, 0.55, 0.38]} rotation={[0.2, 0, 0]} color="#4aa3a2" radius={0.015} />
      <Box size={[0.1, 0.04, 0.22]} position={[0, 0.78, -0.24]} color="#2f3440" radius={0.02} />
      <Box size={[0.46, 0.03, 0.03]} position={[0, 0.84, 0.42]} color="#2f3440" radius={0.012} />
    </group>
  );
}

export function Broom() {
  return (
    <group rotation={[0, 0, 0.12]}>
      <Cyl top={0.018} height={1.25} position={[0, 0.8, 0]} color={WOOD} segments={8} />
      <Box size={[0.3, 0.08, 0.07]} position={[0, 0.17, 0]} color="#c2575b" radius={0.015} />
      <Box size={[0.32, 0.14, 0.06]} position={[0, 0.07, 0]} color="#e9c46a" radius={0.01} />
    </group>
  );
}

export function Bucket() {
  return (
    <group>
      <Cyl top={0.15} bottom={0.12} height={0.28} position={[0, 0.14, 0]} color="#5aa9e6" segments={20} />
      <Cyl top={0.135} height={0.01} position={[0, 0.25, 0]} color="#a9d6ea" segments={20} shadow={false} />
      <mesh position={[0, 0.28, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.14, 0.008, 6, 20, Math.PI]} />
        <meshStandardMaterial color={METAL_DARK} />
      </mesh>
    </group>
  );
}

export function PaintTin() {
  return (
    <group>
      <Cyl top={0.09} height={0.17} position={[0, 0.085, 0]} color="#d9dde1" metalness={0.4} roughness={0.4} segments={18} />
      <Cyl top={0.092} height={0.08} position={[0, 0.09, 0]} color="#f28c8c" segments={18} />
      <Cyl top={0.085} height={0.012} position={[0, 0.176, 0]} color="#f28c8c" segments={18} />
      <Box size={[0.02, 0.2, 0.02]} position={[0.03, 0.2, 0]} rotation={[0, 0, -0.3]} color={WOOD} radius={0.005} />
    </group>
  );
}

export function CardboardBox() {
  return (
    <group>
      <Box size={[0.6, 0.45, 0.45]} position={[0, 0.225, 0]} color={CARDBOARD} radius={0.01} />
      <Box size={[0.61, 0.02, 0.08]} position={[0, 0.45, 0]} color="#c9a26b" radius={0.004} shadow={false} />
      <Box size={[0.2, 0.1, 0.005]} position={[0.12, 0.3, 0.227]} color="#fffdf6" radius={0.002} shadow={false} />
      <Box size={[0.45, 0.32, 0.36]} position={[-0.04, 0.61, 0.0]} rotation={[0, 0.2, 0]} color="#c9a26b" radius={0.01} />
    </group>
  );
}

export function FuseBox() {
  return (
    <group>
      <Box size={[0.4, 0.5, 0.12]} position={[0, 0, 0]} color="#e3e8ec" radius={0.015} />
      <Box size={[0.34, 0.44, 0.01]} position={[0, 0, 0.062]} color="#cfd6dc" radius={0.006} shadow={false} />
      {[-0.12, -0.04, 0.04, 0.12].map((x) => (
        <Box key={x} size={[0.04, 0.08, 0.02]} position={[x, 0.06, 0.07]} color="#2f3440" radius={0.004} shadow={false} />
      ))}
      <Box size={[0.08, 0.08, 0.005]} position={[0, -0.13, 0.068]} color="#f2c46d" radius={0.002} shadow={false} />
    </group>
  );
}
