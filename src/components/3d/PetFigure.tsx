import { useEffect, useRef, type ReactNode, type RefObject } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import type { PetAccessory, PetConfig } from '../../data/shop';
import { useUI } from '../../hooks/useUIStore';

// The player's pet, next to their avatar in every room. Built from simple shapes
// like the avatar. It breathes, looks around, wags its tail, wanders a little,
// and hops when the student gets something right. The parrot flies around the avatar.

const DARK = '#2f2838';
const PINK = '#ffb3c1';

const mat = (color: string, rough = 0.85) => <meshStandardMaterial color={color} roughness={rough} />;

/** Slightly lighter version of a colour, for bellies and muzzles. */
function lighter(hex: string, amount = 0.45) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => mix(c).toString(16).padStart(2, '0')).join('')}`;
}

function Eyes({ y, z, gap, r = 0.022 }: { y: number; z: number; gap: number; r?: number }) {
  return (
    <>
      {[-gap, gap].map((x) => (
        <group key={x} position={[x, y, z]}>
          <mesh><sphereGeometry args={[r, 10, 8]} />{mat(DARK, 0.3)}</mesh>
          <mesh position={[r * 0.35, r * 0.35, r * 0.75]}><sphereGeometry args={[r * 0.3, 6, 4]} /><meshBasicMaterial color="#ffffff" /></mesh>
        </group>
      ))}
    </>
  );
}

/** Hat, bow or glasses on the pet's head; `head` is the head's centre and radius. */
function PetAccessoryModel({ kind, head, neck }: { kind: PetAccessory; head: [number, number, number, number]; neck: [number, number, number, number] }) {
  const [hx, hy, hz, hr] = head;
  const [nx, ny, nz, nr] = neck;
  switch (kind) {
    case 'collar':
      return (
        <group position={[nx, ny, nz]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[nr, 0.012, 6, 20]} />{mat('#e0503a', 0.5)}</mesh>
          <mesh position={[0, -0.02, nr]}><sphereGeometry args={[0.018, 8, 6]} /><meshStandardMaterial color="#f2c94c" metalness={0.6} roughness={0.3} /></mesh>
        </group>
      );
    case 'bandana':
      return (
        <group position={[nx, ny, nz]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[nr, 0.018, 6, 20]} />{mat('#4a8fe0')}</mesh>
          <mesh position={[0, -0.04, nr * 0.9]} rotation={[0.3, 0, Math.PI]}><coneGeometry args={[nr * 0.7, 0.08, 3]} />{mat('#4a8fe0')}</mesh>
        </group>
      );
    case 'bow':
      return (
        <group position={[hx + hr * 0.55, hy + hr * 0.7, hz]} rotation={[0, 0, -0.4]}>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.03, 0, 0]} rotation={[0, 0, s > 0 ? -Math.PI / 2 : Math.PI / 2]}><coneGeometry args={[0.028, 0.05, 4]} />{mat('#ff6f91')}</mesh>
          ))}
        </group>
      );
    case 'partyhat':
      return (
        <group position={[hx, hy + hr * 0.95, hz]} rotation={[0, 0, 0.2]}>
          <mesh position={[0, 0.06, 0]}><coneGeometry args={[0.05, 0.13, 14]} />{mat('#8fd3b6')}</mesh>
          <mesh position={[0, 0.13, 0]}><sphereGeometry args={[0.018, 8, 6]} />{mat('#ff6f91')}</mesh>
        </group>
      );
    case 'crown':
      return (
        <group position={[hx, hy + hr * 0.9, hz]}>
          <mesh><cylinderGeometry args={[0.055, 0.055, 0.04, 14, 1, true]} /><meshStandardMaterial color="#f2c94c" metalness={0.5} roughness={0.3} side={2} /></mesh>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh key={i} position={[Math.cos((i / 5) * Math.PI * 2) * 0.055, 0.035, Math.sin((i / 5) * Math.PI * 2) * 0.055]}><coneGeometry args={[0.012, 0.035, 4]} /><meshStandardMaterial color="#f2c94c" metalness={0.5} roughness={0.3} /></mesh>
          ))}
        </group>
      );
    case 'glasses':
      return (
        <group position={[hx, hy + hr * 0.15, hz + hr * 0.9]}>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * hr * 0.38, 0, 0]}><torusGeometry args={[hr * 0.26, 0.006, 6, 16]} />{mat(DARK, 0.4)}</mesh>
          ))}
        </group>
      );
    default:
      return null;
  }
}

type Parts = { body: ReactNode; tail?: ReactNode; head: [number, number, number, number]; neck: [number, number, number, number] };

function catOrDog(pet: PetConfig, tail: RefObject<Group>): Parts {
  const c = pet.color;
  const light = lighter(c);
  const dog = pet.species === 'dog';
  const head: [number, number, number, number] = [0, 0.3, 0.13, 0.11];
  return {
    head,
    neck: [0, 0.22, 0.08, 0.07],
    body: (
      <group>
        <mesh position={[0, 0.16, 0]} scale={[1, 0.9, 1.35]} castShadow><sphereGeometry args={[0.1, 16, 12]} />{mat(c)}</mesh>
        <mesh position={[0, 0.13, 0.04]} scale={[0.75, 0.7, 1]}><sphereGeometry args={[0.09, 12, 10]} />{mat(light)}</mesh>
        {[[-0.05, 0.08], [0.05, 0.08], [-0.05, -0.08], [0.05, -0.08]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0.04, z]} castShadow><capsuleGeometry args={[0.026, 0.05, 4, 8]} />{mat(c)}</mesh>
        ))}
        <group position={[head[0], head[1], head[2]]}>
          <mesh castShadow><sphereGeometry args={[head[3], 18, 14]} />{mat(c)}</mesh>
          <mesh position={[0, -0.035, 0.08]} scale={[1, 0.75, dog ? 1.2 : 0.8]}><sphereGeometry args={[0.05, 12, 10]} />{mat(light)}</mesh>
          <mesh position={[0, -0.02, dog ? 0.135 : 0.115]}><sphereGeometry args={[dog ? 0.02 : 0.013, 8, 6]} />{mat(dog ? DARK : '#ff8fa3', 0.4)}</mesh>
          <Eyes y={0.025} z={0.09} gap={0.042} />
          {dog
            ? [-1, 1].map((s) => (
                <mesh key={s} position={[s * 0.095, 0.0, -0.01]} rotation={[0, 0, s * 0.25]} scale={[0.5, 1.1, 0.8]} castShadow><sphereGeometry args={[0.06, 10, 8]} />{mat(c)}</mesh>
              ))
            : [-1, 1].map((s) => (
                <group key={s} position={[s * 0.065, 0.085, -0.01]} rotation={[0, 0, -s * 0.25]}>
                  <mesh castShadow><coneGeometry args={[0.04, 0.075, 4]} />{mat(c)}</mesh>
                  <mesh position={[0, -0.005, 0.015]} scale={0.6}><coneGeometry args={[0.04, 0.075, 4]} />{mat(PINK)}</mesh>
                </group>
              ))}
        </group>
      </group>
    ),
    tail: (
      <group ref={tail} position={[0, 0.2, -0.13]}>
        <mesh position={[0, 0.07, -0.03]} rotation={[-0.5, 0, 0]} castShadow>
          <capsuleGeometry args={[dog ? 0.022 : 0.018, dog ? 0.09 : 0.15, 4, 8]} />{mat(c)}
        </mesh>
      </group>
    ),
  };
}

function hamster(pet: PetConfig): Parts {
  const c = pet.color;
  const light = lighter(c, 0.6);
  const head: [number, number, number, number] = [0, 0.17, 0.07, 0.08];
  return {
    head,
    neck: [0, 0.12, 0.05, 0.075],
    body: (
      <group>
        <mesh position={[0, 0.09, 0]} scale={[1, 0.85, 1.1]} castShadow><sphereGeometry args={[0.1, 16, 12]} />{mat(c)}</mesh>
        <mesh position={[0, 0.07, 0.04]} scale={[0.8, 0.7, 0.8]}><sphereGeometry args={[0.09, 12, 10]} />{mat(light)}</mesh>
        <group position={[head[0], head[1], head[2]]}>
          <mesh castShadow><sphereGeometry args={[head[3], 16, 12]} />{mat(c)}</mesh>
          {[-1, 1].map((s) => (
            <mesh key={s} position={[s * 0.045, -0.025, 0.045]}><sphereGeometry args={[0.035, 10, 8]} />{mat(light)}</mesh>
          ))}
          {[-1, 1].map((s) => (
            <mesh key={`e${s}`} position={[s * 0.055, 0.06, -0.01]}><sphereGeometry args={[0.028, 10, 8]} />{mat(PINK)}</mesh>
          ))}
          <mesh position={[0, -0.01, 0.08]}><sphereGeometry args={[0.01, 8, 6]} />{mat('#ff8fa3', 0.4)}</mesh>
          <Eyes y={0.015} z={0.068} gap={0.035} r={0.017} />
        </group>
        {[-0.04, 0.04].map((x) => (
          <mesh key={x} position={[x, 0.07, 0.11]}><sphereGeometry args={[0.018, 8, 6]} />{mat(PINK)}</mesh>
        ))}
      </group>
    ),
  };
}

function parrot(pet: PetConfig, tail: RefObject<Group>, wings: RefObject<Group>): Parts {
  const c = pet.color;
  const light = lighter(c, 0.5);
  const head: [number, number, number, number] = [0, 0.2, 0.03, 0.065];
  return {
    head,
    neck: [0, 0.15, 0.02, 0.05],
    body: (
      <group>
        <mesh position={[0, 0.1, 0]} scale={[0.85, 1.25, 0.9]} castShadow><sphereGeometry args={[0.07, 14, 12]} />{mat(c, 0.6)}</mesh>
        <mesh position={[0, 0.09, 0.035]} scale={[0.6, 1, 0.6]}><sphereGeometry args={[0.06, 12, 10]} />{mat(light, 0.6)}</mesh>
        <group position={[head[0], head[1], head[2]]}>
          <mesh castShadow><sphereGeometry args={[head[3], 14, 12]} />{mat(c, 0.6)}</mesh>
          <mesh position={[0, -0.015, 0.065]} rotation={[0.5, 0, 0]}><coneGeometry args={[0.022, 0.05, 8]} />{mat('#f2c53d', 0.4)}</mesh>
          <Eyes y={0.012} z={0.05} gap={0.035} r={0.014} />
        </group>
        <group ref={wings}>
          {[-1, 1].map((s) => (
            <mesh key={s} name={`wing${s}`} position={[s * 0.06, 0.12, -0.01]} rotation={[0, 0, s * 0.2]} scale={[0.35, 1, 0.9]} castShadow><sphereGeometry args={[0.065, 10, 8]} />{mat(c, 0.6)}</mesh>
          ))}
        </group>
        {[-0.025, 0.025].map((x) => (
          <mesh key={x} position={[x, 0.015, 0.01]}><cylinderGeometry args={[0.006, 0.006, 0.03, 6]} />{mat('#e8a05c')}</mesh>
        ))}
      </group>
    ),
    tail: (
      <group ref={tail} position={[0, 0.06, -0.05]}>
        <mesh position={[0, -0.03, -0.04]} rotation={[-0.9, 0, 0]} scale={[1, 1, 0.35]} castShadow><coneGeometry args={[0.035, 0.14, 4]} />{mat(c === '#e0503a' ? '#4a8fe0' : '#e0503a', 0.6)}</mesh>
      </group>
    ),
  };
}

/** The pet model on its own, facing +z, standing at the origin. Also used for the preview in the pet window. */
export function PetModel({ pet, tailRef, wingsRef }: { pet: PetConfig; tailRef?: RefObject<Group>; wingsRef?: RefObject<Group> }) {
  const fallbackTail = useRef<Group>(null);
  const fallbackWings = useRef<Group>(null);
  const tail = tailRef ?? fallbackTail;
  const wings = wingsRef ?? fallbackWings;
  const parts =
    pet.species === 'hamster' ? hamster(pet) : pet.species === 'parrot' ? parrot(pet, tail, wings) : catOrDog(pet, tail);
  return (
    <group>
      {parts.body}
      {parts.tail}
      <PetAccessoryModel kind={pet.accessory} head={parts.head} neck={parts.neck} />
    </group>
  );
}

/** The pet in the room, keeping close to the avatar standing at `avatarSpot`. */
export function PetFigure({ pet, avatarSpot }: { pet: PetConfig; avatarSpot: [number, number] }) {
  const root = useRef<Group>(null);
  const body = useRef<Group>(null);
  const tail = useRef<Group>(null);
  const wings = useRef<Group>(null);
  const shadow = useRef<Group>(null);
  const cheer = useUI((s) => s.cheer);
  const cheerAt = useRef(-10);
  const flyer = pet.species === 'parrot';
  const scale = pet.species === 'hamster' ? 1.25 : pet.species === 'parrot' ? 1.3 : 1.35;

  useEffect(() => {
    if (cheer > 0) cheerAt.current = performance.now() / 1000;
  }, [cheer]);

  // Beside the avatar, on the side facing the camera.
  const [ax, az] = avatarSpot;
  const homeX = ax + 0.36;
  const homeZ = az - 0.36;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const g = root.current;
    const b = body.current;
    if (!g || !b) return;
    const since = performance.now() / 1000 - cheerAt.current;
    const happy = since < 1.2;

    if (flyer) {
      // Slow circles around the avatar's head, flapping.
      const a = t * 0.7;
      const x = ax + Math.cos(a) * 0.5;
      const z = az + Math.sin(a) * 0.5;
      g.position.set(x, 1.05 + Math.sin(t * 2.2) * 0.06 + (happy ? Math.abs(Math.sin(since * 9)) * 0.15 : 0), z);
      g.rotation.y = -a; // fly along the circle
      if (wings.current) {
        wings.current.children.forEach((w, i) => {
          w.rotation.z = (i === 0 ? -1 : 1) * (0.2 + Math.abs(Math.sin(t * (happy ? 26 : 14))) * 0.9);
        });
      }
      if (shadow.current) shadow.current.position.set(x, 0.006, z);
      return;
    }

    // Wander a little around its spot, now and then, and look at the camera between walks.
    const phase = (t % 9) / 9;
    const walking = phase > 0.55 && phase < 0.8;
    const wobble = Math.sin(t * 0.7) * 0.12;
    const x = homeX + Math.sin(t * 0.35) * 0.14;
    const z = homeZ + Math.cos(t * 0.35) * 0.08;
    g.position.set(x, 0, z);
    // Mostly faces the camera; turns a little to the side it's walking towards.
    g.rotation.y = Math.PI / 4 + wobble + (walking ? Math.sign(Math.cos(t * 0.35)) * 0.5 : 0);
    b.position.y = happy ? Math.abs(Math.sin(since * Math.PI * 3)) * 0.14 : walking ? Math.abs(Math.sin(t * 10)) * 0.015 : 0;
    b.scale.y = 1 + Math.sin(t * 2.4) * 0.025; // breathing
    if (tail.current) tail.current.rotation.y = Math.sin(t * (happy ? 22 : pet.species === 'dog' ? 9 : 3)) * (pet.species === 'cat' ? 0.35 : 0.6);
    if (shadow.current) shadow.current.position.set(x, 0.006, z);
  });

  return (
    <group onClick={(e) => { e.stopPropagation(); useUI.getState().openModal('pet'); }}>
      <group ref={shadow}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} raycast={() => null}>
          <circleGeometry args={[flyer ? 0.1 : 0.15, 20]} />
          <meshBasicMaterial color="#000000" transparent opacity={flyer ? 0.06 : 0.1} depthWrite={false} />
        </mesh>
      </group>
      <group ref={root} position={[homeX, 0, homeZ]}>
        <group ref={body} scale={scale}>
          <PetModel pet={pet} tailRef={tail} wingsRef={wings} />
        </group>
      </group>
    </group>
  );
}
