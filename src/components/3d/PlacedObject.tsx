import { useLayoutEffect, useRef, useState } from 'react';
import { useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { MathUtils, type Group, type Mesh, type MeshBasicMaterial } from 'three';
import type { PlacedItem, RoomDefinition } from '../../types/game';
import { getFurniture } from '../../data/content';
import { FurnitureModel } from '../../objects/models';
import { rayPoint, ridersOf } from '../../objects/placement';
import { useUI } from '../../hooks/useUIStore';
import { useLayout } from '../../rooms/layoutStore';
import { trackDrag } from './PlacementController';

// One object in the room: renders the model, handles click/drag start, shows selection.

const COLORS = { selected: '#ffb35c', invalid: '#ff6b6b', hover: '#ffffff' };

export function PlacedObject({ item, room }: { item: PlacedItem; room: RoomDefinition }) {
  const def = getFurniture(item.objectId);
  const selected = useUI((s) => s.selectedUid === item.uid);
  const drag = useUI((s) => s.drag);
  const openActivity = useUI((s) => s.openActivity);
  const controls = useThree((s) => s.controls) as unknown as { enabled: boolean } | null;
  const camera = useThree((s) => s.camera);
  const canvas = useThree((s) => s.gl.domElement);
  const group = useRef<Group>(null);
  const marker = useRef<Group>(null);
  const halo = useRef<Mesh>(null);
  const born = useRef(performance.now());
  const [hovered, setHovered] = useState(false);

  // Where the object should be right now (saved place, or live drag preview).
  let target = item;
  let invalid = false;
  let lifted = false;
  if (drag?.preview) {
    if (drag.uid === item.uid) {
      target = drag.preview;
      invalid = !drag.valid;
      lifted = true;
    } else if (drag.riders.includes(item.uid)) {
      target = { ...item, x: item.x + drag.preview.x - drag.origin.x, z: item.z + drag.preview.z - drag.origin.z };
      lifted = true;
    }
  }

  // Start at the saved place; afterwards useFrame glides towards `target`.
  useLayoutEffect(() => {
    group.current?.position.set(item.x, item.y, item.z);
    group.current?.rotation.set(0, item.rot * (Math.PI / 2), 0);
  }, []);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.exp(-dt * 16);
    g.position.x = MathUtils.lerp(g.position.x, target.x, k);
    g.position.y = MathUtils.lerp(g.position.y, target.y + (lifted && def.mount !== 'wall' ? 0.08 : 0), k);
    g.position.z = MathUtils.lerp(g.position.z, target.z, k);
    const goal = target.rot * (Math.PI / 2);
    let diff = goal - g.rotation.y;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    g.rotation.y += diff * k;
    // pop-in when placed
    const t = Math.min(1, (performance.now() - born.current) / 380);
    const pop = t < 1 ? 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2) : 1;
    const s = pop * (hovered && !drag ? 1.025 : 1);
    g.scale.setScalar(s);
    if (marker.current) marker.current.position.y = def.size[1] + 0.32 + Math.sin(state.clock.elapsedTime * 3) * 0.05;
    if (halo.current) {
      const mat = halo.current.material as MeshBasicMaterial;
      mat.opacity = selected || invalid ? 0.4 + Math.sin(state.clock.elapsedTime * 4) * 0.12 : hovered ? 0.22 : 0;
    }
  });

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.stopPropagation();
    const items = useLayout.getState().rooms[room.id] ?? [];
    const p = rayPoint(e.ray, item, room);
    useUI.getState().startDrag({
      uid: item.uid,
      origin: item,
      startX: e.nativeEvent.clientX,
      startY: e.nativeEvent.clientY,
      offset: p ? { x: item.x - p.x, y: item.y - p.y, z: item.z - p.z } : { x: 0, y: 0, z: 0 },
      riders: ridersOf(item, items),
      moved: false,
      preview: null,
      valid: true,
    });
    trackDrag({ camera, canvas, room, controls });
  };

  const isWall = def.mount === 'wall';
  const [w, h, d] = def.size;
  const haloColor = invalid ? COLORS.invalid : selected ? COLORS.selected : COLORS.hover;

  return (
    <group
      ref={group}
      onPointerDown={onPointerDown}
      onDoubleClick={(e) => {
        e.stopPropagation();
        openActivity({ objectId: item.objectId, stage: 'practice' });
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'grab';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = '';
      }}
    >
      <FurnitureModel model={def.model} />
      {/* selection halo: on the floor for furniture, behind the object for wall items */}
      <mesh
        ref={halo}
        raycast={() => null}
        position={isWall ? [0, 0, -d / 2 + 0.003] : [0, 0.025, 0]}
        rotation={isWall ? [0, 0, 0] : [-Math.PI / 2, 0, 0]}
        renderOrder={2}
      >
        <planeGeometry args={isWall ? [w + 0.16, h + 0.16] : [w + 0.18, d + 0.18]} />
        <meshBasicMaterial color={haloColor} transparent opacity={0} depthWrite={false} />
      </mesh>
      {selected && !isWall && (
        <group ref={marker}>
          <mesh raycast={() => null} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.09, 0.16, 4]} />
            <meshStandardMaterial color={invalid ? COLORS.invalid : COLORS.selected} emissive={invalid ? COLORS.invalid : COLORS.selected} emissiveIntensity={0.5} />
          </mesh>
        </group>
      )}
    </group>
  );
}
