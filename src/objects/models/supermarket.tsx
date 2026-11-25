import { Ball, Box, Cyl } from './parts';

// Supermarket models. Same rules as index.tsx: front faces +z, floor objects stand on y = 0,
// wall objects are centred on their middle. Sizes match src/data/furniture.ts.

const STEEL = '#b9c2cc';
const DARK = '#2f3440';
const RED = '#e04848';
const WOOD = '#c99a6b';

export function ShoppingTrolley() {
  return (
    <group>
      <Box size={[0.5, 0.36, 0.7]} position={[0, 0.72, 0]} color={STEEL} metalness={0.4} roughness={0.4} radius={0.02} />
      <Box size={[0.46, 0.32, 0.66]} position={[0, 0.74, 0]} color="#dfe5ea" radius={0.02} />
      <Box size={[0.5, 0.04, 0.04]} position={[0, 1.0, -0.4]} color={RED} radius={0.015} />
      {[-0.22, 0.22].map((x) => (
        <group key={x}>
          <Box size={[0.025, 0.5, 0.025]} position={[x, 0.3, -0.25]} color={STEEL} radius={0.008} />
          <Box size={[0.025, 0.5, 0.025]} position={[x, 0.3, 0.28]} color={STEEL} radius={0.008} />
          <Box size={[0.025, 0.3, 0.025]} position={[x, 0.88, -0.38]} rotation={[0.4, 0, 0]} color={STEEL} radius={0.008} />
          {[-0.25, 0.28].map((z) => (
            <Cyl key={z} top={0.04} height={0.025} position={[x, 0.04, z]} rotation={[0, 0, Math.PI / 2]} color={DARK} segments={12} />
          ))}
        </group>
      ))}
      <Box size={[0.44, 0.02, 0.6]} position={[0, 0.12, 0]} color={STEEL} radius={0.006} />
    </group>
  );
}

export function Checkout() {
  return (
    <group>
      <Box size={[1.5, 0.86, 0.6]} position={[0, 0.43, 0]} color="#f1f3f5" radius={0.03} />
      <Box size={[1.5, 0.04, 0.62]} position={[0, 0.88, 0]} color={DARK} radius={0.015} />
      <Box size={[0.9, 0.012, 0.5]} position={[0.25, 0.905, 0]} color="#4a5160" radius={0.004} shadow={false} />
      <Box size={[1.5, 0.12, 0.02]} position={[0, 0.7, 0.305]} color={RED} radius={0.006} shadow={false} />
    </group>
  );
}

export function CashRegister() {
  return (
    <group>
      <Box size={[0.34, 0.1, 0.32]} position={[0, 0.05, 0]} color={DARK} radius={0.02} />
      <Box size={[0.28, 0.06, 0.16]} position={[0, 0.12, 0.04]} rotation={[-0.4, 0, 0]} color="#4a5160" radius={0.01} />
      {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => (
        <Box key={`${r}${c}`} size={[0.04, 0.012, 0.03]} position={[-0.09 + c * 0.06, 0.16 - r * 0.014, 0.08 - r * 0.035]} rotation={[-0.4, 0, 0]} color="#e8ebef" radius={0.004} shadow={false} />
      )))}
      <Box size={[0.03, 0.16, 0.03]} position={[0, 0.18, -0.1]} color={DARK} radius={0.008} />
      <Box size={[0.24, 0.12, 0.03]} position={[0, 0.3, -0.1]} color={DARK} radius={0.01} />
      <Box size={[0.2, 0.08, 0.004]} position={[0, 0.3, -0.083]} color="#6fe08a" emissive="#6fe08a" emissiveIntensity={0.4} radius={0.002} shadow={false} />
    </group>
  );
}

export function FruitStand() {
  const fruit: [string, number][] = [['#e04848', 0.06], ['#f2a33a', 0.06], ['#ffd54f', 0.05], ['#6fae6a', 0.055]];
  return (
    <group>
      <Box size={[1.1, 0.5, 0.6]} position={[0, 0.25, 0]} color={WOOD} radius={0.02} />
      <Box size={[1.1, 0.06, 0.6]} position={[0, 0.53, 0]} color="#8a6446" radius={0.015} />
      {fruit.map(([color, r], i) => (
        <group key={color}>
          <Box size={[0.24, 0.06, 0.48]} position={[-0.39 + i * 0.26, 0.59, 0]} color="#d6b07a" radius={0.01} />
          {[-0.15, 0, 0.15].map((z) => [-0.06, 0.06].map((dx) => (
            <Ball key={`${z}${dx}`} radius={r} position={[-0.39 + i * 0.26 + dx, 0.66, z]} color={color} />
          )))}
        </group>
      ))}
    </group>
  );
}

export function BreadRack() {
  return (
    <group>
      {[-0.4, 0.4].map((x) => (
        <Box key={x} size={[0.04, 1.4, 0.4]} position={[x, 0.7, 0]} color={WOOD} radius={0.01} />
      ))}
      {[0.3, 0.75, 1.2].map((y, i) => (
        <group key={y}>
          <Box size={[0.8, 0.03, 0.4]} position={[0, y, 0]} color={WOOD} radius={0.008} />
          {[-0.24, 0, 0.24].map((x) => (
            i === 1
              ? <Ball key={x} radius={0.09} position={[x, y + 0.08, 0]} scale={[1, 0.7, 1]} color="#c98a4e" />
              : <Box key={x} size={[0.2, 0.1, 0.12]} position={[x, y + 0.065, 0]} color={i ? '#e0b070' : '#b8743a'} radius={0.05} />
          ))}
        </group>
      ))}
    </group>
  );
}

export function DrinksFridge() {
  return (
    <group>
      <Box size={[0.7, 1.8, 0.6]} position={[0, 0.9, 0]} color="#f1f3f5" radius={0.03} />
      <Box size={[0.62, 1.5, 0.02]} position={[0, 0.9, 0.3]} color="#cfeaff" roughness={0.1} radius={0.01} />
      {[0.4, 0.8, 1.2].map((y, r) => [-0.22, -0.11, 0, 0.11, 0.22].map((x, c) => (
        <Cyl key={`${y}${x}`} top={0.03} height={0.2} position={[x, y + 0.1, 0.15]} color={['#e04848', '#6fae6a', '#f2a33a', '#5aa9e6'][(r + c) % 4]} segments={10} />
      )))}
      <Box size={[0.7, 0.16, 0.61]} position={[0, 1.72, 0]} color="#5aa9e6" radius={0.02} />
      <Box size={[0.03, 0.4, 0.04]} position={[0.28, 0.95, 0.33]} color={STEEL} radius={0.01} />
    </group>
  );
}

export function ShoppingBasket() {
  return (
    <group>
      <Box size={[0.4, 0.2, 0.28]} position={[0, 0.1, 0]} color={RED} radius={0.02} />
      <Box size={[0.36, 0.18, 0.24]} position={[0, 0.12, 0]} color="#c23a3a" radius={0.02} />
      {[-0.1, 0.1].map((x) => (
        <mesh key={x} position={[x, 0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.12, 0.01, 6, 16, Math.PI]} />
          <meshStandardMaterial color={DARK} />
        </mesh>
      ))}
    </group>
  );
}

export function BarcodeScanner() {
  return (
    <group>
      <Box size={[0.08, 0.14, 0.06]} position={[0, 0.07, 0]} rotation={[0.25, 0, 0]} color={DARK} radius={0.02} />
      <Box size={[0.1, 0.06, 0.12]} position={[0, 0.17, 0.04]} color={DARK} radius={0.02} />
      <Box size={[0.08, 0.04, 0.005]} position={[0, 0.17, 0.1]} color={RED} emissive={RED} emissiveIntensity={0.6} radius={0.002} shadow={false} />
    </group>
  );
}

export function Watermelon() {
  return (
    <group>
      <Ball radius={0.16} position={[0, 0.13, 0]} scale={[1.2, 0.85, 1]} color="#7cc46f" detail={2} />
      {[-0.12, -0.04, 0.04, 0.12].map((x) => (
        <Ball key={x} radius={0.1605} position={[x, 0.13, 0]} scale={[0.1, 0.852, 1.003]} color="#2c6b35" detail={2} />
      ))}
      <Cyl top={0.008} height={0.04} position={[0.19, 0.14, 0]} rotation={[0, 0, Math.PI / 2]} color="#6b4a2f" segments={6} />
    </group>
  );
}

export function ShoppingBag() {
  return (
    <group>
      <Box size={[0.3, 0.32, 0.16]} position={[0, 0.16, 0]} color="#d6b07a" radius={0.01} />
      <Ball radius={0.06} position={[-0.06, 0.34, 0]} color="#6fae6a" />
      <Box size={[0.06, 0.16, 0.06]} position={[0.07, 0.38, 0]} color="#ffffff" radius={0.015} />
      <Box size={[0.06, 0.03, 0.06]} position={[0.07, 0.47, 0]} color="#5aa9e6" radius={0.01} />
    </group>
  );
}

export function SpecialOffer() {
  return (
    <group>
      <Box size={[0.7, 0.45, 0.03]} position={[0, 0, 0]} color="#ffd54f" radius={0.02} />
      <Box size={[0.6, 0.1, 0.005]} position={[0, 0.1, 0.018]} color={RED} radius={0.004} shadow={false} />
      <Box size={[0.36, 0.12, 0.005]} position={[0, -0.08, 0.018]} color={DARK} radius={0.004} shadow={false} />
      <Ball radius={0.05} position={[0.28, 0.15, 0.03]} scale={[1, 1, 0.3]} color={RED} />
    </group>
  );
}

export function OpeningHours() {
  return (
    <group>
      <Box size={[0.4, 0.5, 0.02]} position={[0, 0, 0]} color="#ffffff" radius={0.01} />
      <Box size={[0.4, 0.09, 0.022]} position={[0, 0.205, 0]} color="#3f7d4e" radius={0.006} shadow={false} />
      {[0.08, 0.02, -0.04, -0.1, -0.16].map((y) => (
        <group key={y}>
          <Box size={[0.12, 0.022, 0.004]} position={[-0.09, y, 0.012]} color={DARK} radius={0.002} shadow={false} />
          <Box size={[0.14, 0.022, 0.004]} position={[0.08, y, 0.012]} color="#3f7d4e" radius={0.002} shadow={false} />
        </group>
      ))}
    </group>
  );
}
