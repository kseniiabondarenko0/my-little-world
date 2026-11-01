import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { AvatarConfig } from '../../player/types';
import { useUI } from '../../hooks/useUIStore';

// The player's character standing in their room: a small low-poly figure built from
// simple shapes in the avatar's colours. It idles, and jumps/waves when the student succeeds.

const DARK = '#3b2f45';

function Hair({ avatar }: { avatar: AvatarConfig }) {
  const c = avatar.hairColor;
  const mat = <meshStandardMaterial color={c} roughness={0.8} />;
  switch (avatar.hair) {
    case 'short':
      return <mesh position={[0, 0.05, -0.02]} scale={[1.05, 0.75, 1.05]} castShadow><sphereGeometry args={[0.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 1.8]} />{mat}</mesh>;
    case 'long':
      return (
        <group>
          <mesh position={[0, 0.04, -0.01]} scale={[1.08, 0.85, 1.08]} castShadow><sphereGeometry args={[0.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 1.7]} />{mat}</mesh>
          <mesh position={[0, -0.14, -0.1]} castShadow><boxGeometry args={[0.38, 0.34, 0.14]} />{mat}</mesh>
        </group>
      );
    case 'bun':
      return (
        <group>
          <mesh position={[0, 0.04, -0.02]} scale={[1.05, 0.8, 1.05]} castShadow><sphereGeometry args={[0.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 1.8]} />{mat}</mesh>
          <mesh position={[0, 0.22, -0.06]} castShadow><sphereGeometry args={[0.09, 12, 10]} />{mat}</mesh>
        </group>
      );
    case 'curly':
      return (
        <group>
          {[[-0.13, 0.1, 0], [0.13, 0.1, 0], [0, 0.17, 0], [-0.08, 0.15, -0.1], [0.08, 0.15, -0.1], [0, 0.08, -0.15], [-0.16, 0, -0.06], [0.16, 0, -0.06]].map((p, i) => (
            <mesh key={i} position={p as [number, number, number]} castShadow><icosahedronGeometry args={[0.085, 0]} /><meshStandardMaterial color={c} flatShading /></mesh>
          ))}
        </group>
      );
    case 'spiky':
      return (
        <group>
          <mesh position={[0, 0.04, -0.02]} scale={[1.03, 0.7, 1.03]} castShadow><sphereGeometry args={[0.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 1.9]} />{mat}</mesh>
          {[[-0.1, 0.18, 0.02, -0.4], [0, 0.21, 0, 0], [0.1, 0.18, 0.02, 0.4], [0, 0.17, -0.1, 0]].map(([x, y, z, r], i) => (
            <mesh key={i} position={[x, y, z]} rotation={[0, 0, r]} castShadow><coneGeometry args={[0.05, 0.12, 6]} />{mat}</mesh>
          ))}
        </group>
      );
    case 'bob':
      return (
        <group>
          <mesh position={[0, 0.02, -0.01]} scale={[1.12, 0.95, 1.12]} castShadow><sphereGeometry args={[0.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 1.55]} />{mat}</mesh>
        </group>
      );
  }
}

function Accessory({ avatar }: { avatar: AvatarConfig }) {
  switch (avatar.accessory) {
    case 'glasses':
      return (
        <group position={[0, 0.0, 0.18]}>
          {[-0.07, 0.07].map((x) => (
            <mesh key={x} position={[x, 0, 0]}><torusGeometry args={[0.045, 0.01, 8, 20]} /><meshStandardMaterial color={DARK} /></mesh>
          ))}
        </group>
      );
    case 'cap':
      return (
        <group position={[0, 0.12, 0]}>
          <mesh scale={[1.08, 0.6, 1.08]} castShadow><sphereGeometry args={[0.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color={avatar.outfitColor} /></mesh>
          <mesh position={[0, 0, 0.17]} rotation={[0.15, 0, 0]}><boxGeometry args={[0.24, 0.02, 0.14]} /><meshStandardMaterial color={avatar.outfitColor} /></mesh>
        </group>
      );
    case 'headphones':
      return (
        <group>
          <mesh rotation={[0, 0, 0]} position={[0, 0.02, 0]}><torusGeometry args={[0.22, 0.018, 8, 24, Math.PI]} /><meshStandardMaterial color={DARK} /></mesh>
          {[-0.21, 0.21].map((x) => (
            <mesh key={x} position={[x, -0.02, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.06, 0.06, 0.05, 14]} /><meshStandardMaterial color="#ff8f7a" /></mesh>
          ))}
        </group>
      );
    case 'bow':
      return (
        <group position={[0.12, 0.17, 0.02]} rotation={[0, 0, -0.4]}>
          {[-0.05, 0.05].map((x) => (
            <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, x > 0 ? -Math.PI / 2 : Math.PI / 2]}><coneGeometry args={[0.045, 0.08, 4]} /><meshStandardMaterial color="#ff6f91" /></mesh>
          ))}
        </group>
      );
    case 'flower':
      return (
        <group position={[-0.14, 0.14, 0.06]}>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh key={i} position={[Math.cos((i / 5) * Math.PI * 2) * 0.035, Math.sin((i / 5) * Math.PI * 2) * 0.035, 0]}><sphereGeometry args={[0.025, 8, 6]} /><meshStandardMaterial color="#ffffff" /></mesh>
          ))}
          <mesh><sphereGeometry args={[0.022, 8, 6]} /><meshStandardMaterial color="#ffd27a" /></mesh>
        </group>
      );
    default:
      return null;
  }
}

export function AvatarFigure({ avatar, position }: { avatar: AvatarConfig; position: [number, number] }) {
  const root = useRef<Group>(null);
  const armL = useRef<Group>(null);
  const armR = useRef<Group>(null);
  const cheer = useUI((s) => s.cheer);
  const cheerAt = useRef(-10);

  useEffect(() => {
    if (cheer > 0) cheerAt.current = performance.now() / 1000;
  }, [cheer]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const since = performance.now() / 1000 - cheerAt.current;
    const g = root.current;
    if (!g) return;
    if (since < 1.1) {
      g.position.y = Math.abs(Math.sin(since * Math.PI * 2.7)) * 0.22;
      if (armR.current) armR.current.rotation.z = 2.6 + Math.sin(since * 18) * 0.35;
      if (armL.current) armL.current.rotation.z = -2.6 - Math.sin(since * 18) * 0.35;
    } else {
      g.position.y = Math.sin(t * 2) * 0.012;
      g.rotation.y = Math.PI / 4 + Math.sin(t * 0.6) * 0.15;
      if (armR.current) armR.current.rotation.z = 0.15 + Math.sin(t * 2) * 0.05;
      if (armL.current) armL.current.rotation.z = -0.15 - Math.sin(t * 2) * 0.05;
    }
  });

  const skin = <meshStandardMaterial color={avatar.skin} roughness={0.7} />;
  const cloth = <meshStandardMaterial color={avatar.outfitColor} roughness={0.8} />;
  const dress = avatar.outfit === 'dress';

  return (
    <group position={[position[0], 0, position[1]]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]} raycast={() => null}>
        <circleGeometry args={[0.28, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.1} depthWrite={false} />
      </mesh>
      <group ref={root} rotation={[0, Math.PI / 4, 0]} scale={1.15}>
        {/* legs */}
        {[-0.07, 0.07].map((x) => (
          <mesh key={x} position={[x, 0.13, 0]} castShadow>
            <capsuleGeometry args={[0.045, 0.14, 4, 8]} />
            <meshStandardMaterial color={avatar.outfit === 'overalls' ? avatar.outfitColor : dress ? avatar.skin : '#5b6b8c'} />
          </mesh>
        ))}
        {/* body */}
        {dress ? (
          <mesh position={[0, 0.38, 0]} castShadow><coneGeometry args={[0.2, 0.36, 16]} />{cloth}</mesh>
        ) : (
          <mesh position={[0, 0.4, 0]} castShadow><capsuleGeometry args={[0.13, 0.16, 6, 12]} />{cloth}</mesh>
        )}
        {avatar.outfit === 'hoodie' && (
          <mesh position={[0, 0.53, -0.08]} castShadow><sphereGeometry args={[0.1, 12, 8]} />{cloth}</mesh>
        )}
        {avatar.outfit === 'overalls' && (
          <mesh position={[0, 0.44, 0.115]}><boxGeometry args={[0.14, 0.1, 0.02]} /><meshStandardMaterial color="#ffffff" /></mesh>
        )}
        {/* arms */}
        <group ref={armL} position={[-0.16, 0.5, 0]}>
          <mesh position={[0, -0.1, 0]} castShadow><capsuleGeometry args={[0.04, 0.12, 4, 8]} />{avatar.outfit === 'tshirt' || dress ? skin : cloth}</mesh>
        </group>
        <group ref={armR} position={[0.16, 0.5, 0]}>
          <mesh position={[0, -0.1, 0]} castShadow><capsuleGeometry args={[0.04, 0.12, 4, 8]} />{avatar.outfit === 'tshirt' || dress ? skin : cloth}</mesh>
        </group>
        {/* head */}
        <group position={[0, 0.78, 0]}>
          <mesh castShadow><sphereGeometry args={[0.2, 20, 16]} />{skin}</mesh>
          {[-0.07, 0.07].map((x) => (
            <mesh key={x} position={[x, 0.0, 0.18]}><sphereGeometry args={[0.025, 10, 8]} /><meshStandardMaterial color={DARK} /></mesh>
          ))}
          {[-0.12, 0.12].map((x) => (
            <mesh key={x} position={[x, -0.05, 0.15]}><sphereGeometry args={[0.03, 10, 8]} /><meshStandardMaterial color="#ff9fa8" transparent opacity={0.6} /></mesh>
          ))}
          <mesh position={[0, -0.07, 0.185]} rotation={[0, 0, Math.PI]}><torusGeometry args={[0.035, 0.009, 6, 12, Math.PI]} /><meshStandardMaterial color={DARK} /></mesh>
          <Hair avatar={avatar} />
          <Accessory avatar={avatar} />
        </group>
      </group>
    </group>
  );
}
