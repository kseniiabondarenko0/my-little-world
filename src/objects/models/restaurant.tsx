import { Ball, Box, Cyl, Legs } from './parts';

// Restaurant models. Same rules as index.tsx: front faces +z, floor objects stand on y = 0,
// wall objects are centred on their middle. Sizes match src/data/furniture.ts.

const WOOD = '#b8814f';
const WOOD_DARK = '#7a5232';
const BRICK = '#b5523b';
const DARK = '#2f3440';
const CLOTH = '#fff7ec';

export function TableForTwo() {
  return (
    <group>
      <Box size={[0.8, 0.04, 0.8]} position={[0, 0.74, 0]} color={WOOD} radius={0.012} />
      <Box size={[0.84, 0.01, 0.84]} position={[0, 0.765, 0]} color="#e46a5a" radius={0.004} shadow={false} />
      <Box size={[0.42, 0.012, 0.84]} position={[0, 0.768, 0]} color={CLOTH} radius={0.003} shadow={false} />
      <Legs w={0.8} d={0.8} h={0.72} r={0.02} color={WOOD_DARK} />
      {[-0.55, 0.55].map((z) => (
        <group key={z} position={[0, 0, z]} rotation={[0, z < 0 ? 0 : Math.PI, 0]}>
          <Box size={[0.4, 0.04, 0.38]} position={[0, 0.45, 0]} color={WOOD_DARK} radius={0.012} />
          <Box size={[0.4, 0.4, 0.04]} position={[0, 0.66, -0.18]} color={WOOD_DARK} radius={0.012} />
          <Legs w={0.4} d={0.38} h={0.44} r={0.015} inset={0.04} color={WOOD_DARK} />
        </group>
      ))}
    </group>
  );
}

export function HighChair() {
  return (
    <group>
      {[[-0.2, -0.18], [0.2, -0.18], [-0.2, 0.18], [0.2, 0.18]].map(([x, z], i) => (
        <Cyl key={i} top={0.016} height={0.7} position={[x * 0.8, 0.35, z * 0.8]} rotation={[z * 0.3, 0, -x * 0.3]} color={WOOD} segments={8} />
      ))}
      <Box size={[0.36, 0.04, 0.36]} position={[0, 0.7, 0]} color={WOOD} radius={0.015} />
      <Box size={[0.36, 0.36, 0.04]} position={[0, 0.9, -0.17]} color={WOOD} radius={0.015} />
      <Box size={[0.42, 0.03, 0.22]} position={[0, 0.86, 0.22]} color="#f2c46d" radius={0.012} />
      <Box size={[0.3, 0.05, 0.3]} position={[0, 0.74, 0]} color="#9fd8c2" radius={0.02} />
    </group>
  );
}

export function Counter() {
  return (
    <group>
      <Box size={[1.6, 0.96, 0.6]} position={[0, 0.48, 0]} color={WOOD_DARK} radius={0.02} />
      {[-0.6, -0.2, 0.2, 0.6].map((x) => (
        <Box key={x} size={[0.36, 0.7, 0.02]} position={[x, 0.45, 0.3]} color={WOOD} radius={0.01} shadow={false} />
      ))}
      <Box size={[1.66, 0.05, 0.66]} position={[0, 0.98, 0]} color="#e8e2d4" roughness={0.4} radius={0.015} />
    </group>
  );
}

export function PizzaOven() {
  return (
    <group>
      <Box size={[1.1, 0.8, 0.9]} position={[0, 0.4, 0]} color="#8f99a3" radius={0.02} />
      <mesh position={[0, 0.8, 0]} scale={[1, 0.75, 0.82]} castShadow>
        <sphereGeometry args={[0.55, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={BRICK} roughness={0.9} />
      </mesh>
      <Box size={[0.4, 0.26, 0.1]} position={[0, 0.92, 0.42]} color="#1a1a1a" radius={0.06} />
      <Box size={[0.3, 0.12, 0.05]} position={[0, 0.88, 0.45]} color="#ff9b3d" emissive="#ff7a1a" emissiveIntensity={0.9} radius={0.04} shadow={false} />
      <Cyl top={0.08} height={0.5} position={[0.18, 1.4, -0.12]} color={DARK} segments={12} />
    </group>
  );
}

export function DessertTrolley() {
  return (
    <group>
      {[0.3, 0.78].map((y) => (
        <Box key={y} size={[0.7, 0.03, 0.44]} position={[0, y, 0]} color="#f4f1ea" radius={0.01} />
      ))}
      {[-0.33, 0.33].map((x) => [-0.2, 0.2].map((z) => (
        <group key={`${x}${z}`}>
          <Cyl top={0.012} height={0.78} position={[x, 0.42, z]} color="#c9a227" metalness={0.5} segments={8} />
          <Ball radius={0.03} position={[x, 0.03, z]} color={DARK} />
        </group>
      )))}
      <Cyl top={0.12} height={0.1} position={[-0.15, 0.36, 0]} color="#f7b2d0" segments={18} />
      <Cyl top={0.12} height={0.03} position={[-0.15, 0.42, 0]} color="#ffffff" segments={18} />
      <Ball radius={0.03} position={[-0.15, 0.46, 0]} color="#e04848" />
      <Cyl top={0.1} height={0.12} position={[0.17, 0.37, 0]} color="#7a5232" segments={18} />
    </group>
  );
}

export function Menu() {
  return (
    <group>
      <Box size={[0.22, 0.02, 0.3]} position={[0, 0.01, 0]} color="#7a2f2f" radius={0.006} />
      <Box size={[0.14, 0.003, 0.04]} position={[0, 0.021, -0.08]} color="#c9a227" radius={0.001} shadow={false} />
    </group>
  );
}

export function Pizza() {
  return (
    <group>
      <Cyl top={0.17} height={0.01} position={[0, 0.005, 0]} color="#c9d2d9" segments={24} />
      <Cyl top={0.15} height={0.025} position={[0, 0.02, 0]} color="#e9b46a" segments={24} />
      <Cyl top={0.13} height={0.006} position={[0, 0.034, 0]} color="#d9442f" segments={24} shadow={false} />
      {[[0.05, 0.04], [-0.06, 0.03], [0.02, -0.07], [-0.04, -0.04], [0.08, -0.03]].map(([x, z], i) => (
        <Cyl key={i} top={0.022} height={0.006} position={[x, 0.04, z]} color={i % 2 ? '#fff3d6' : '#8c2f2f'} segments={10} shadow={false} />
      ))}
    </group>
  );
}

export function Bill() {
  return (
    <group>
      <Box size={[0.12, 0.012, 0.2]} position={[0, 0.006, 0]} color={DARK} radius={0.004} />
      <Box size={[0.09, 0.004, 0.15]} position={[0, 0.014, 0]} color="#ffffff" radius={0.001} shadow={false} />
      {[0.04, 0.02, 0, -0.02].map((z) => (
        <Box key={z} size={[0.06, 0.002, 0.006]} position={[0, 0.017, z]} color="#8f99a3" radius={0.001} shadow={false} />
      ))}
    </group>
  );
}

export function TipJar() {
  return (
    <group>
      <Cyl top={0.06} height={0.14} position={[0, 0.07, 0]} color="#dff3ff" roughness={0.1} segments={16} />
      <Cyl top={0.05} height={0.04} position={[0, 0.03, 0]} color="#c9a227" metalness={0.6} segments={16} />
      <Box size={[0.08, 0.04, 0.004]} position={[0, 0.09, 0.061]} color="#fff3a3" radius={0.002} shadow={false} />
    </group>
  );
}

export function SaltAndPepper() {
  return (
    <group>
      {[[-0.035, '#ffffff'], [0.035, DARK]].map(([x, c]) => (
        <group key={x as number}>
          <Cyl top={0.022} bottom={0.028} height={0.09} position={[x as number, 0.045, 0]} color={c as string} segments={12} />
          <Ball radius={0.022} position={[x as number, 0.095, 0]} color="#c9d2d9" />
        </group>
      ))}
    </group>
  );
}

export function SpecialsBoard() {
  return (
    <group>
      <Box size={[0.7, 0.9, 0.04]} position={[0, 0, 0]} color={WOOD_DARK} radius={0.015} />
      <Box size={[0.62, 0.82, 0.01]} position={[0, 0, 0.022]} color="#26302b" radius={0.006} shadow={false} />
      <Box size={[0.36, 0.05, 0.004]} position={[0, 0.32, 0.029]} color="#fff3d6" radius={0.002} shadow={false} />
      {[0.18, 0.08, -0.02, -0.12, -0.22].map((y, i) => (
        <group key={y}>
          <Box size={[0.3, 0.022, 0.004]} position={[-0.1, y, 0.029]} color={['#ffd54f', '#f7b2d0', '#9fd8c2', '#ffffff', '#ffd54f'][i]} radius={0.002} shadow={false} />
          <Box size={[0.08, 0.022, 0.004]} position={[0.2, y, 0.029]} color="#ffffff" radius={0.002} shadow={false} />
        </group>
      ))}
    </group>
  );
}

export function OpenSign() {
  return (
    <group>
      <Box size={[0.6, 0.26, 0.04]} position={[0, 0, 0]} color="#1a1a1a" radius={0.06} />
      <Box size={[0.48, 0.12, 0.02]} position={[0, 0, 0.025]} color="#ff5c8a" emissive="#ff5c8a" emissiveIntensity={1.2} radius={0.05} shadow={false} />
    </group>
  );
}
