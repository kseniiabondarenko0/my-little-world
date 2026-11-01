import type { PlacedItem, RoomDefinition } from '../types/game';
import type { SpatialCheck } from '../chapter/types';
import { getFurniture, getWord } from '../data/content';
import { itemRect, type Rect } from '../objects/placement';

// Checks instructions like "Put the bedside table next to the bed" against
// where the furniture really is. Pure geometry — no rendering.

const TOUCH = 0.18;

export interface CheckResult {
  ok: boolean;
  message: string;
}

const nameOf = (id: string) => `the ${getWord(getFurniture(id).wordId).word}`;

function gap(a: Rect, b: Rect): number {
  const dx = Math.max(0, a.minX - b.maxX, b.minX - a.maxX);
  const dz = Math.max(0, a.minZ - b.maxZ, b.minZ - a.maxZ);
  return Math.hypot(dx, dz);
}

function walls(r: Rect, room: RoomDefinition) {
  const hw = room.size.width / 2;
  const hd = room.size.depth / 2;
  return { back: r.minZ <= -hd + TOUCH, left: r.minX <= -hw + TOUCH, right: r.maxX >= hw - TOUCH, front: r.maxZ >= hd - TOUCH };
}

function rectOf(item: PlacedItem): Rect {
  const def = getFurniture(item.objectId);
  if (def.mount !== 'wall') return itemRect(item, def);
  // Wall items: a thin strip along their wall.
  const half = def.size[0] / 2;
  return item.wall === 'left'
    ? { minX: item.x - 0.05, maxX: item.x + 0.05, minZ: item.z - half, maxZ: item.z + half }
    : { minX: item.x - half, maxX: item.x + half, minZ: item.z - 0.05, maxZ: item.z + 0.05 };
}

/** Front direction of a floor object (models face +z before rotation). */
function front(item: PlacedItem): [number, number] {
  return [[0, 1], [1, 0], [0, -1], [-1, 0]][item.rot % 4] as [number, number];
}

export function evaluate(check: SpatialCheck, items: PlacedItem[], room: RoomDefinition): CheckResult {
  const a = items.find((i) => i.objectId === check.a);
  const b = check.b ? items.find((i) => i.objectId === check.b) : undefined;
  if (!a) return { ok: false, message: `First add ${nameOf(check.a)} to your room (Furniture tab).` };
  if (check.b && !b) return { ok: false, message: `First add ${nameOf(check.b)} to your room (Furniture tab).` };
  const A = nameOf(check.a);
  const B = check.b ? nameOf(check.b) : '';
  const ra = rectOf(a);
  const rb = b ? rectOf(b) : null;
  const win = room.window;

  switch (check.rel) {
    case 'againstWall': {
      const w = walls(ra, room);
      return { ok: w.back || w.left, message: `Push ${A} against the back wall or the left wall.` };
    }
    case 'nextTo':
      // Furniture snaps in 25 cm steps, so "next to" allows a small gap.
      return { ok: gap(ra, rb!) <= 0.6 && Math.abs(a.y - b!.y) < 0.5, message: `${cap(A)} isn’t next to ${B} yet. Move them closer.` };
    case 'near':
      return { ok: gap(ra, rb!) <= 1.2, message: `Move ${A} nearer to ${B}.` };
    case 'farFrom':
      return { ok: gap(ra, rb!) >= 2, message: `${cap(A)} is too close to ${B}. Move it further away.` };
    case 'onTop': {
      const h = getFurniture(b!.objectId).surfaceHeight ?? 0;
      const inside = a.x >= rb!.minX && a.x <= rb!.maxX && a.z >= rb!.minZ && a.z <= rb!.maxZ;
      return { ok: inside && Math.abs(a.y - h) < 0.05, message: `Drag ${A} onto ${B}.` };
    }
    case 'above': {
      const defA = getFurniture(a.objectId);
      if (defA.mount !== 'wall') return { ok: false, message: `${cap(A)} must hang on the wall.` };
      const hb = getFurniture(b!.objectId).size[1];
      const bottom = a.y - defA.size[1] / 2;
      const hw = room.size.width / 2;
      const hd = room.size.depth / 2;
      const ok = a.wall === 'left'
        ? rb!.minX <= -hw + 0.7 && a.z >= rb!.minZ - 0.15 && a.z <= rb!.maxZ + 0.15
        : rb!.minZ <= -hd + 0.7 && a.x >= rb!.minX - 0.15 && a.x <= rb!.maxX + 0.15;
      return { ok: ok && bottom >= hb - 0.15, message: `Hang ${A} on the wall right above ${B}. ${cap(B)} must stand against that wall — if the window is in the way, move ${B} first.` };
    }
    case 'inFrontOf': {
      const [fx, fz] = front(b!);
      const cx = (rb!.minX + rb!.maxX) / 2;
      const cz = (rb!.minZ + rb!.maxZ) / 2;
      const halfDepth = fx !== 0 ? (rb!.maxX - rb!.minX) / 2 : (rb!.maxZ - rb!.minZ) / 2;
      const halfWidth = fx !== 0 ? (rb!.maxZ - rb!.minZ) / 2 : (rb!.maxX - rb!.minX) / 2;
      const dx = a.x - cx;
      const dz = a.z - cz;
      const forward = dx * fx + dz * fz - halfDepth;
      const side = Math.abs(dx * fz - dz * fx);
      return { ok: forward > -0.3 && forward < 2.2 && side < halfWidth + 0.7, message: `Put ${A} in front of ${B} — on the side with the doors.` };
    }
    case 'nearWindow': {
      if (!win) return { ok: true, message: '' };
      const hw = room.size.width / 2;
      const hd = room.size.depth / 2;
      const ok = win.wall === 'back'
        ? ra.minZ <= -hd + 1.4 && ra.maxX >= win.center - win.width / 2 - 0.9 && ra.minX <= win.center + win.width / 2 + 0.9
        : ra.minX <= -hw + 1.4 && ra.maxZ >= win.center - win.width / 2 - 0.9 && ra.minZ <= win.center + win.width / 2 + 0.9;
      return { ok, message: `Move ${A} closer to the window.` };
    }
    case 'inCorner': {
      const w = walls(ra, room);
      const ok = (w.back || w.front) && (w.left || w.right);
      return { ok, message: `Put ${A} in a corner, touching two walls.` };
    }
    case 'inMiddle': {
      const cx = (ra.minX + ra.maxX) / 2;
      const cz = (ra.minZ + ra.maxZ) / 2;
      return { ok: Math.abs(cx) <= 1 && Math.abs(cz) <= 1, message: `Move ${A} to the middle of the room.` };
    }
    case 'onWall':
      return { ok: getFurniture(a.objectId).mount === 'wall', message: `${cap(A)} should be on a wall.` };
  }
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function evaluateAll(checks: SpatialCheck[], items: PlacedItem[], room: RoomDefinition): CheckResult {
  for (const c of checks) {
    const r = evaluate(c, items, room);
    if (!r.ok) return r;
  }
  return { ok: true, message: 'Perfect!' };
}
