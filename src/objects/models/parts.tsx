import { RoundedBox } from '@react-three/drei';

// Small building blocks for the procedural low-poly models.

export type V3 = [number, number, number];

interface MaterialProps {
  color: string;
  roughness?: number;
  metalness?: number;
  emissive?: string;
  emissiveIntensity?: number;
  flat?: boolean;
}

function Mat({ color, roughness = 0.75, metalness = 0, emissive, emissiveIntensity = 0, flat }: MaterialProps) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={roughness}
      metalness={metalness}
      emissive={emissive ?? '#000000'}
      emissiveIntensity={emissiveIntensity}
      flatShading={flat}
    />
  );
}

interface BoxProps extends MaterialProps {
  size: V3;
  position?: V3;
  rotation?: V3;
  radius?: number;
  shadow?: boolean;
}

/** A box with soft rounded edges. */
export function Box({ size, position, rotation, radius = 0.03, shadow = true, ...mat }: BoxProps) {
  const r = Math.min(radius, Math.min(...size) / 2 - 0.001);
  if (r <= 0.003) {
    return (
      <mesh position={position} rotation={rotation} castShadow={shadow} receiveShadow>
        <boxGeometry args={size} />
        <Mat {...mat} />
      </mesh>
    );
  }
  return (
    <RoundedBox args={size} radius={r} smoothness={3} position={position} rotation={rotation} castShadow={shadow} receiveShadow>
      <Mat {...mat} />
    </RoundedBox>
  );
}

interface CylProps extends MaterialProps {
  top: number;
  bottom?: number;
  height: number;
  position?: V3;
  rotation?: V3;
  scale?: V3;
  segments?: number;
  shadow?: boolean;
}

export function Cyl({ top, bottom, height, position, rotation, scale, segments = 20, shadow = true, ...mat }: CylProps) {
  return (
    <mesh position={position} rotation={rotation} scale={scale} castShadow={shadow} receiveShadow>
      <cylinderGeometry args={[top, bottom ?? top, height, segments]} />
      <Mat {...mat} />
    </mesh>
  );
}

export function Ball({ radius, position, scale, detail = 1, ...mat }: MaterialProps & { radius: number; position?: V3; scale?: V3; detail?: number }) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <icosahedronGeometry args={[radius, detail]} />
      <Mat {...mat} />
    </mesh>
  );
}

/** Four round legs under a rectangle. */
export function Legs({ w, d, h, r = 0.025, inset = 0.06, color }: { w: number; d: number; h: number; r?: number; inset?: number; color: string }) {
  const x = w / 2 - inset;
  const z = d / 2 - inset;
  const spots: [number, number][] = [[-x, -z], [x, -z], [-x, z], [x, z]];
  return (
    <>
      {spots.map(([lx, lz], i) => (
        <Cyl key={i} top={r} bottom={r * 0.8} height={h} position={[lx, h / 2, lz]} color={color} segments={10} />
      ))}
    </>
  );
}
