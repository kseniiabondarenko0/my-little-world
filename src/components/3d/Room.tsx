import { RoundedBox } from '@react-three/drei';
import type { ReactNode } from 'react';
import type { RoomDefinition, WallOpening } from '../../types/game';
import { Box, Cyl } from '../../objects/models/parts';

// The room shell: platform, floor, two walls (cut-away dollhouse view), window and door.

const T = 0.14; // wall thickness

function Floor({ room }: { room: RoomDefinition }) {
  const { width: W, depth: D } = room.size;
  const style = room.theme.floorStyle ?? 'planks';
  const [c1, c2] = room.theme.floor;
  const base = (
    <mesh position={[0, -0.025, 0]}>
      <boxGeometry args={[W, 0.03, D]} />
      <meshStandardMaterial color={style === 'planks' ? '#c9a57f' : c2} />
    </mesh>
  );
  if (style === 'planks') {
    const plank = 0.5;
    const count = Math.round(D / plank);
    return (
      <group>
        {Array.from({ length: count }, (_, i) => (
          <mesh key={i} position={[0, -0.02, -D / 2 + plank / 2 + i * plank]} receiveShadow>
            <boxGeometry args={[W, 0.04, plank - 0.012]} />
            <meshStandardMaterial color={room.theme.floor[i % 2]} roughness={0.85} />
          </mesh>
        ))}
        {base}
      </group>
    );
  }
  // Tiles: a checkerboard of squares with thin grout lines. Concrete: big slabs, one colour.
  const tile = style === 'tiles' ? 0.4 : 1.0;
  const nx = Math.round(W / tile);
  const nz = Math.round(D / tile);
  const tw = W / nx;
  const td = D / nz;
  const gap = style === 'tiles' ? 0.014 : 0.008;
  return (
    <group>
      {Array.from({ length: nx * nz }, (_, k) => {
        const i = k % nx;
        const j = Math.floor(k / nx);
        const color = style === 'tiles' ? ((i + j) % 2 ? c2 : c1) : c1;
        return (
          <mesh key={k} position={[-W / 2 + tw / 2 + i * tw, -0.02, -D / 2 + td / 2 + j * td]} receiveShadow>
            <boxGeometry args={[tw - gap, 0.04, td - gap]} />
            <meshStandardMaterial color={color} roughness={style === 'tiles' ? 0.45 : 0.95} />
          </mesh>
        );
      })}
      {base}
    </group>
  );
}

/** Puts children on a wall: local +z points into the room, x runs along the wall. */
function OnWall({ room, wall, along, children }: { room: RoomDefinition; wall: 'back' | 'left'; along: number; children: ReactNode }) {
  const { width: W, depth: D } = room.size;
  return wall === 'back'
    ? <group position={[along, 0, -D / 2]}>{children}</group>
    : <group position={[-W / 2, 0, along]} rotation={[0, Math.PI / 2, 0]}>{children}</group>;
}

function Window({ room, opening }: { room: RoomDefinition; opening: WallOpening }) {
  const { width: w, height: h, bottom } = opening;
  const cy = bottom + h / 2;
  const f = 0.07;
  const frame = room.theme.trim;
  return (
    <OnWall room={room} wall={opening.wall} along={opening.center}>
      <mesh position={[0, cy, 0.005]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial color="#bfe0ff" emissive="#cfe8ff" emissiveIntensity={0.85} />
      </mesh>
      {/* little clouds */}
      <mesh position={[-w * 0.2, cy + h * 0.18, 0.01]} scale={[1.8, 0.7, 1]}>
        <circleGeometry args={[0.09, 20]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh position={[w * 0.22, cy + h * 0.05, 0.01]} scale={[1.6, 0.6, 1]}>
        <circleGeometry args={[0.07, 20]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <Box size={[w + f * 2, f, 0.08]} position={[0, bottom + h + f / 2, 0.04]} color={frame} radius={0.02} />
      <Box size={[w + f * 2, f, 0.08]} position={[0, bottom - f / 2, 0.04]} color={frame} radius={0.02} />
      <Box size={[f, h, 0.08]} position={[-w / 2 - f / 2, cy, 0.04]} color={frame} radius={0.02} />
      <Box size={[f, h, 0.08]} position={[w / 2 + f / 2, cy, 0.04]} color={frame} radius={0.02} />
      <Box size={[0.04, h, 0.04]} position={[0, cy, 0.03]} color={frame} radius={0.01} />
      <Box size={[w, 0.04, 0.04]} position={[0, cy, 0.03]} color={frame} radius={0.01} />
      <Box size={[w + 0.3, 0.05, 0.18]} position={[0, bottom - f - 0.02, 0.09]} color={frame} radius={0.02} />
      {/* curtains and rod */}
      <Cyl top={0.018} height={w + 0.9} rotation={[0, 0, Math.PI / 2]} position={[0, bottom + h + 0.2, 0.14]} color="#e0b25e" segments={10} />
      {[-1, 1].map((s) => (
        <Box key={s} size={[0.34, h + 0.5, 0.06]} position={[s * (w / 2 + 0.24), bottom + h / 2 - 0.08, 0.14]}
          color={room.theme.curtain} radius={0.03} />
      ))}
    </OnWall>
  );
}

function Door({ room, opening }: { room: RoomDefinition; opening: WallOpening }) {
  const { width: w, height: h } = opening;
  const frame = room.theme.trim;
  return (
    <OnWall room={room} wall={opening.wall} along={opening.center}>
      <Box size={[w, h, 0.05]} position={[0, h / 2, 0.03]} color="#f2d4b8" radius={0.02} />
      <Box size={[w - 0.26, h * 0.36, 0.02]} position={[0, h * 0.72, 0.065]} color="#ebc6a6" radius={0.01} />
      <Box size={[w - 0.26, h * 0.36, 0.02]} position={[0, h * 0.28, 0.065]} color="#ebc6a6" radius={0.01} />
      <mesh position={[w / 2 - 0.12, h * 0.48, 0.09]} castShadow>
        <sphereGeometry args={[0.035, 16, 12]} />
        <meshStandardMaterial color="#e0b25e" metalness={0.5} roughness={0.3} />
      </mesh>
      <Box size={[w + 0.16, 0.08, 0.08]} position={[0, h + 0.04, 0.04]} color={frame} radius={0.02} />
      <Box size={[0.08, h, 0.08]} position={[-w / 2 - 0.04, h / 2, 0.04]} color={frame} radius={0.02} />
      <Box size={[0.08, h, 0.08]} position={[w / 2 + 0.04, h / 2, 0.04]} color={frame} radius={0.02} />
    </OnWall>
  );
}

function Wall({ room, wall }: { room: RoomDefinition; wall: 'back' | 'left' }) {
  const { width: W, depth: D, height: H } = room.size;
  const length = wall === 'back' ? W + T : D;
  const along = wall === 'back' ? -T / 2 : 0;
  const lower = 0.95;
  return (
    <OnWall room={room} wall={wall} along={along}>
      <mesh position={[0, H / 2, -T / 2]} receiveShadow>
        <boxGeometry args={[length, H, T]} />
        <meshStandardMaterial color={room.theme.wall} roughness={0.95} />
      </mesh>
      {/* two-tone lower wall, rail and skirting board */}
      <mesh position={[0, lower / 2, 0.006]} receiveShadow>
        <boxGeometry args={[length, lower, 0.012]} />
        <meshStandardMaterial color={room.theme.wallLower} roughness={0.95} />
      </mesh>
      <Box size={[length, 0.05, 0.035]} position={[0, lower, 0.016]} color={room.theme.trim} radius={0.012} shadow={false} />
      <Box size={[length, 0.11, 0.03]} position={[0, 0.055, 0.015]} color={room.theme.trim} radius={0.01} shadow={false} />
      <Box size={[length, 0.06, T + 0.02]} position={[0, H + 0.03, -T / 2]} color={room.theme.trim} radius={0.02} shadow={false} />
    </OnWall>
  );
}

export function Room({ room }: { room: RoomDefinition }) {
  const { width: W, depth: D } = room.size;
  return (
    <group>
      <RoundedBox args={[W + 0.9, 0.36, D + 0.9]} radius={0.14} smoothness={4} position={[-0.1, -0.22, -0.1]} receiveShadow>
        <meshStandardMaterial color={room.theme.base} roughness={0.9} />
      </RoundedBox>
      <Floor room={room} />
      <Wall room={room} wall="back" />
      <Wall room={room} wall="left" />
      {room.window && <Window room={room} opening={room.window} />}
      {room.door && <Door room={room} opening={room.door} />}
    </group>
  );
}

// ── Shop decorations ───────────────────────────────────────────────────────
// Bought with coins (src/data/shop.ts) and switched on per room in the shop.

const LIGHT_COLORS = ['#ffd27a', '#ff8fa3', '#8fd3b6', '#a9c9f2'];
const FLAG_COLORS = ['#ff8f7a', '#ffd27a', '#8fd3b6', '#a9c9f2', '#c3b0e6'];

function FairyLights({ room }: { room: RoomDefinition }) {
  const { width: W, height: H, depth: D } = room.size;
  const n = 22;
  return (
    <group position={[0, 0, -D / 2 + 0.03]}>
      {Array.from({ length: n }, (_, i) => {
        const u = i / (n - 1);
        const x = -W / 2 + 0.2 + u * (W - 0.4);
        const y = H - 0.18 - Math.sin(u * Math.PI * 3) ** 2 * 0.22;
        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[0.035, 10, 8]} />
            <meshStandardMaterial color={LIGHT_COLORS[i % 4]} emissive={LIGHT_COLORS[i % 4]} emissiveIntensity={1.4} />
          </mesh>
        );
      })}
    </group>
  );
}

function Bunting({ room }: { room: RoomDefinition }) {
  const { depth: D, height: H, width: W } = room.size;
  const n = 14;
  return (
    <group position={[-W / 2 + 0.03, 0, 0]}>
      {Array.from({ length: n }, (_, i) => {
        const u = i / (n - 1);
        const z = -D / 2 + 0.25 + u * (D - 0.5);
        const y = H - 0.2 - Math.sin(u * Math.PI) * 0.25;
        return (
          <mesh key={i} position={[0.01, y - 0.09, z]} rotation={[0, Math.PI / 2, Math.PI]}>
            <circleGeometry args={[0.12, 3]} />
            <meshStandardMaterial color={FLAG_COLORS[i % FLAG_COLORS.length]} side={2} />
          </mesh>
        );
      })}
    </group>
  );
}

function WallStars({ room }: { room: RoomDefinition }) {
  const { width: W, height: H, depth: D } = room.size;
  const spots: [number, number, number][] = [[-0.38, 0.82, 0.12], [-0.25, 0.9, 0.08], [-0.12, 0.78, 0.1], [0.3, 0.88, 0.09], [0.4, 0.76, 0.13], [0.18, 0.93, 0.07]];
  return (
    <group position={[0, 0, -D / 2 + 0.02]}>
      {spots.map(([u, v, r], i) => (
        <mesh key={i} position={[u * W, v * H, 0]} rotation={[0, 0, i]} scale={[1, 1, 0.25]}>
          <octahedronGeometry args={[r, 0]} />
          <meshStandardMaterial color="#fff2a8" emissive="#ffe27a" emissiveIntensity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function Balloons({ room }: { room: RoomDefinition }) {
  const { width: W, depth: D, height: H } = room.size;
  const balloons: [number, number, number, string][] = [[0, 0.1, 0, '#ff8fa3'], [0.22, 0, 0.08, '#a9c9f2'], [0.08, -0.12, 0.2, '#ffd27a']];
  return (
    <group position={[-W / 2 + 0.45, H - 0.75, -D / 2 + 0.45]}>
      {balloons.map(([x, y, z, c], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh scale={[1, 1.18, 1]} castShadow><sphereGeometry args={[0.15, 16, 12]} /><meshStandardMaterial color={c} roughness={0.35} /></mesh>
          <mesh position={[0, -0.45, 0]}><cylinderGeometry args={[0.004, 0.004, 0.6, 4]} /><meshStandardMaterial color="#ffffff" /></mesh>
        </group>
      ))}
    </group>
  );
}

export function RoomDecor({ room, decor }: { room: RoomDefinition; decor: string[] }) {
  return (
    <group>
      {decor.includes('decor-fairy-lights') && <FairyLights room={room} />}
      {decor.includes('decor-bunting') && <Bunting room={room} />}
      {decor.includes('decor-stars') && <WallStars room={room} />}
      {decor.includes('decor-balloons') && <Balloons room={room} />}
    </group>
  );
}
