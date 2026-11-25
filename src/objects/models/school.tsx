import { Ball, Box, Cyl, Legs } from './parts';

// School (classroom) models. Same rules as index.tsx: front faces +z, floor objects stand on y = 0,
// wall objects are centred on their middle. Sizes match src/data/furniture.ts.

const WOOD = '#d8b48a';
const WOOD_DARK = '#9a6e4a';
const METAL = '#8f99a3';
const DARK = '#2f3440';

export function Whiteboard() {
  return (
    <group>
      <Box size={[1.6, 0.9, 0.04]} position={[0, 0, 0]} color="#c9d2d9" radius={0.015} />
      <Box size={[1.52, 0.82, 0.02]} position={[0, 0, 0.02]} color="#ffffff" roughness={0.3} radius={0.006} shadow={false} />
      <Box size={[1.6, 0.04, 0.08]} position={[0, -0.47, 0.04]} color="#b0bac3" radius={0.01} />
      <Box size={[0.12, 0.025, 0.025]} position={[-0.4, -0.44, 0.05]} color="#e04848" radius={0.008} shadow={false} />
      <Box size={[0.12, 0.025, 0.025]} position={[-0.22, -0.44, 0.05]} color="#3c6fd1" radius={0.008} shadow={false} />
      {/* a little sum on the board */}
      <Box size={[0.3, 0.025, 0.004]} position={[-0.4, 0.2, 0.032]} color="#3c6fd1" radius={0.002} shadow={false} />
      <Box size={[0.5, 0.025, 0.004]} position={[0.2, 0.05, 0.032]} color="#3c6fd1" radius={0.002} shadow={false} />
      <Box size={[0.36, 0.025, 0.004]} position={[0.1, -0.1, 0.032]} color="#e04848" radius={0.002} shadow={false} />
    </group>
  );
}

export function TeachersDesk() {
  return (
    <group>
      <Box size={[1.3, 0.05, 0.65]} position={[0, 0.74, 0]} color={WOOD} radius={0.015} />
      <Box size={[0.42, 0.7, 0.6]} position={[0.42, 0.36, 0]} color={WOOD_DARK} radius={0.02} />
      <Box size={[0.04, 0.7, 0.6]} position={[-0.62, 0.36, 0]} color={WOOD_DARK} radius={0.01} />
      <Box size={[1.2, 0.4, 0.03]} position={[0, 0.5, -0.29]} color={WOOD_DARK} radius={0.01} />
      {[0.2, 0.5].map((y) => (
        <Box key={y} size={[0.12, 0.02, 0.02]} position={[0.42, y, 0.31]} color={METAL} metalness={0.4} radius={0.006} shadow={false} />
      ))}
    </group>
  );
}

export function SchoolDesk() {
  return (
    <group>
      <Box size={[0.7, 0.04, 0.5]} position={[0, 0.7, 0]} color={WOOD} radius={0.012} />
      <Box size={[0.66, 0.12, 0.44]} position={[0, 0.62, -0.01]} color="#7fb3d5" radius={0.012} />
      <Legs w={0.7} d={0.5} h={0.6} r={0.018} color={METAL} />
    </group>
  );
}

export function Locker() {
  return (
    <group>
      {[-0.2, 0.2].map((x, i) => (
        <group key={x}>
          <Box size={[0.38, 1.6, 0.44]} position={[x, 0.8, 0]} color={i ? '#e9a23b' : '#4f86c6'} radius={0.015} />
          {[1.35, 1.3, 1.25].map((y) => (
            <Box key={y} size={[0.2, 0.015, 0.005]} position={[x, y, 0.222]} color={DARK} radius={0.002} shadow={false} />
          ))}
          <Box size={[0.03, 0.12, 0.02]} position={[x + 0.13, 0.85, 0.23]} color={METAL} metalness={0.5} radius={0.006} shadow={false} />
        </group>
      ))}
    </group>
  );
}

export function Globe() {
  return (
    <group>
      <Cyl top={0.06} bottom={0.09} height={0.04} position={[0, 0.02, 0]} color={WOOD_DARK} segments={16} />
      <Cyl top={0.012} height={0.12} position={[0, 0.09, 0]} color={WOOD_DARK} segments={8} />
      <Ball radius={0.13} position={[0, 0.27, 0]} color="#5aa9e6" detail={2} />
      <Ball radius={0.06} position={[0.05, 0.31, 0.09]} color="#6fae6a" />
      <Ball radius={0.05} position={[-0.08, 0.22, 0.07]} color="#6fae6a" />
      <mesh position={[0, 0.27, 0]} rotation={[0, 0, 0.4]}>
        <torusGeometry args={[0.15, 0.008, 6, 24, Math.PI]} />
        <meshStandardMaterial color={WOOD_DARK} />
      </mesh>
    </group>
  );
}

export function WorldMap() {
  return (
    <group>
      <Box size={[1.1, 0.7, 0.03]} position={[0, 0, 0]} color="#bfe0f3" radius={0.01} />
      <Box size={[0.3, 0.3, 0.01]} position={[-0.3, 0.08, 0.02]} color="#8cc084" radius={0.03} shadow={false} />
      <Box size={[0.16, 0.24, 0.01]} position={[-0.22, -0.18, 0.02]} color="#8cc084" radius={0.03} shadow={false} />
      <Box size={[0.38, 0.22, 0.01]} position={[0.18, 0.14, 0.02]} color="#e9c97a" radius={0.03} shadow={false} />
      <Box size={[0.14, 0.22, 0.01]} position={[0.06, -0.12, 0.02]} color="#e9c97a" radius={0.03} shadow={false} />
      <Box size={[0.16, 0.1, 0.01]} position={[0.38, -0.2, 0.02]} color="#d9a77a" radius={0.02} shadow={false} />
      <Box size={[1.14, 0.03, 0.04]} position={[0, 0.36, 0]} color={WOOD_DARK} radius={0.01} />
      <Box size={[1.14, 0.03, 0.04]} position={[0, -0.36, 0]} color={WOOD_DARK} radius={0.01} />
    </group>
  );
}

export function Timetable() {
  return (
    <group>
      <Box size={[0.5, 0.6, 0.02]} position={[0, 0, 0]} color="#fffdf5" radius={0.01} />
      <Box size={[0.5, 0.09, 0.022]} position={[0, 0.255, 0]} color="#e04848" radius={0.006} shadow={false} />
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <Box key={`${r}-${c}`} size={[0.09, 0.07, 0.004]} position={[-0.17 + c * 0.113, 0.15 - r * 0.09, 0.012]}
            color={['#ffd54f', '#9fd8c2', '#c9b6e4', '#f7b2d0'][(r + c) % 4]} radius={0.002} shadow={false} />
        )),
      )}
    </group>
  );
}

export function PencilCase() {
  return (
    <group>
      <Box size={[0.22, 0.06, 0.08]} position={[0, 0.03, 0]} color="#c06bd6" radius={0.025} />
      <Box size={[0.2, 0.008, 0.01]} position={[0, 0.06, 0]} color="#f1f3f5" radius={0.002} shadow={false} />
      <Cyl top={0.006} height={0.16} position={[0.02, 0.07, 0.02]} rotation={[0, 0, Math.PI / 2]} color="#ffd54f" segments={6} />
    </group>
  );
}

export function SchoolBag() {
  return (
    <group>
      <Box size={[0.3, 0.38, 0.16]} position={[0, 0.19, 0]} color="#e04848" radius={0.06} />
      <Box size={[0.24, 0.16, 0.05]} position={[0, 0.12, 0.09]} color="#c23a3a" radius={0.03} />
      <Box size={[0.28, 0.12, 0.17]} position={[0, 0.33, 0.005]} color="#c23a3a" radius={0.05} />
      <mesh position={[0, 0.4, -0.02]}>
        <torusGeometry args={[0.05, 0.012, 6, 14, Math.PI]} />
        <meshStandardMaterial color={DARK} />
      </mesh>
    </group>
  );
}

export function Projector() {
  return (
    <group>
      <Box size={[0.3, 0.1, 0.24]} position={[0, 0.06, 0]} color="#e8ebef" radius={0.02} />
      <Cyl top={0.04} height={0.04} position={[0.08, 0.06, 0.13]} rotation={[Math.PI / 2, 0, 0]} color={DARK} segments={16} />
      <Cyl top={0.03} height={0.01} position={[0.08, 0.06, 0.152]} rotation={[Math.PI / 2, 0, 0]} color="#9fd8ff" emissive="#9fd8ff" emissiveIntensity={0.5} segments={16} shadow={false} />
      {[[-0.11, -0.08], [0.11, -0.08], [-0.11, 0.08], [0.11, 0.08]].map(([x, z], i) => (
        <Cyl key={i} top={0.012} height={0.012} position={[x, 0.006, z]} color={DARK} segments={8} />
      ))}
    </group>
  );
}

export function Textbooks() {
  return (
    <group>
      {[['#3c6fd1', 0, 0], ['#6fae6a', 0.035, 0.15], ['#e9a23b', 0.07, -0.1]].map(([c, y, r], i) => (
        <Box key={i} size={[0.24, 0.035, 0.18]} position={[0, (y as number) + 0.018, 0]} rotation={[0, r as number, 0]} color={c as string} radius={0.006} />
      ))}
    </group>
  );
}

export function Microscope() {
  return (
    <group>
      <Box size={[0.14, 0.03, 0.18]} position={[0, 0.015, 0]} color={DARK} radius={0.01} />
      <Box size={[0.05, 0.22, 0.05]} position={[0, 0.13, -0.06]} rotation={[0.2, 0, 0]} color="#f1f3f5" radius={0.015} />
      <Box size={[0.1, 0.015, 0.1]} position={[0, 0.1, 0.02]} color={DARK} radius={0.004} />
      <Cyl top={0.022} height={0.16} position={[0, 0.22, 0.0]} rotation={[-0.35, 0, 0]} color="#f1f3f5" segments={12} />
      <Cyl top={0.014} height={0.04} position={[0, 0.31, -0.035]} rotation={[-0.35, 0, 0]} color={DARK} segments={10} />
    </group>
  );
}
