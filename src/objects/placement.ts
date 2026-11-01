import { Plane, Vector3, type Ray } from 'three';
import type { FurnitureDefinition, PlacedItem, RoomDefinition, WallOpening, WallSide } from '../types/game';
import { getFurniture } from '../data/content';

// Pure placement rules: snapping, collisions, walls and surfaces. No rendering here.

const GRID = 0.25;
const WALL_SNAP = 0.4;
const EPS = 0.01;
const WALL_GAP = 0.012;

export interface Rect {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

interface WallRect {
  minA: number;
  maxA: number;
  minY: number;
  maxY: number;
}

const snap = (v: number, step = GRID) => Math.round(v / step) * step;
const clamp = (v: number, min: number, max: number) => (min > max ? (min + max) / 2 : Math.min(max, Math.max(min, v)));

export function footprint(def: FurnitureDefinition, rot: number): [number, number] {
  const [w, , d] = def.size;
  return rot % 2 === 0 ? [w, d] : [d, w];
}

export function itemRect(item: PlacedItem, def = getFurniture(item.objectId)): Rect {
  const [w, d] = footprint(def, item.rot);
  return { minX: item.x - w / 2, maxX: item.x + w / 2, minZ: item.z - d / 2, maxZ: item.z + d / 2 };
}

function overlaps(a: Rect, b: Rect) {
  return a.minX < b.maxX - EPS && a.maxX > b.minX + EPS && a.minZ < b.maxZ - EPS && a.maxZ > b.minZ + EPS;
}

function contains(r: Rect, x: number, z: number, inset = 0) {
  return x >= r.minX + inset && x <= r.maxX - inset && z >= r.minZ + inset && z <= r.maxZ - inset;
}

/** Floor area in front of the door that must stay free. */
function doorZone(room: RoomDefinition): Rect | null {
  const door = room.door;
  if (!door) return null;
  const hw = room.size.width / 2;
  const hd = room.size.depth / 2;
  const half = door.width / 2;
  return door.wall === 'left'
    ? { minX: -hw, maxX: -hw + 0.9, minZ: door.center - half, maxZ: door.center + half }
    : { minX: door.center - half, maxX: door.center + half, minZ: -hd, maxZ: -hd + 0.9 };
}

/** Floor strip under the window, kept free of tall furniture (wardrobe, bookshelf). */
function windowZone(room: RoomDefinition, def: FurnitureDefinition): Rect | null {
  const win = room.window;
  if (!win || def.size[1] <= win.bottom + 0.2) return null;
  const hw = room.size.width / 2;
  const hd = room.size.depth / 2;
  const half = win.width / 2;
  return win.wall === 'back'
    ? { minX: win.center - half, maxX: win.center + half, minZ: -hd, maxZ: -hd + 0.7 }
    : { minX: -hw, maxX: -hw + 0.7, minZ: win.center - half, maxZ: win.center + half };
}

// ── Floor ─────────────────────────────────────────

export function snapFloor(x: number, z: number, def: FurnitureDefinition, rot: number, room: RoomDefinition) {
  const [w, d] = footprint(def, rot);
  const hw = room.size.width / 2;
  const hd = room.size.depth / 2;
  const minX = -hw + w / 2;
  const maxX = hw - w / 2;
  const minZ = -hd + d / 2;
  const maxZ = hd - d / 2;
  let sx = clamp(snap(x), minX, maxX);
  let sz = clamp(snap(z), minZ, maxZ);
  if (def.mount !== 'rug') {
    // Furniture close to a wall slides flush against it.
    if (sx - minX < WALL_SNAP) sx = minX;
    if (maxX - sx < WALL_SNAP) sx = maxX;
    if (sz - minZ < WALL_SNAP) sz = minZ;
    if (maxZ - sz < WALL_SNAP) sz = maxZ;
  }
  return { x: sx, z: sz };
}

/** The furniture top under a point, for small objects (lamp on nightstand). */
export function surfaceAt(x: number, z: number, items: PlacedItem[]): { height: number; item: PlacedItem } | null {
  let best: { height: number; item: PlacedItem } | null = null;
  for (const item of items) {
    const def = getFurniture(item.objectId);
    if (!def.surfaceHeight || def.mount !== 'floor') continue;
    if (contains(itemRect(item, def), x, z, 0.04) && (!best || def.surfaceHeight > best.height)) {
      best = { height: def.surfaceHeight, item };
    }
  }
  return best;
}

// ── Walls ─────────────────────────────────────────

function wallLength(room: RoomDefinition, wall: WallSide) {
  return wall === 'back' ? room.size.width : room.size.depth;
}

export function wallToWorld(along: number, y: number, wall: WallSide, def: FurnitureDefinition, room: RoomDefinition) {
  const depth = def.size[2];
  return wall === 'back'
    ? { x: along, y, z: -room.size.depth / 2 + depth / 2 + WALL_GAP, rot: 0, wall }
    : { x: -room.size.width / 2 + depth / 2 + WALL_GAP, y, z: along, rot: 1, wall };
}

function snapWall(along: number, y: number, wall: WallSide, def: FurnitureDefinition, room: RoomDefinition) {
  const [w, h] = def.size;
  const half = wallLength(room, wall) / 2;
  return {
    along: clamp(snap(along, 0.1), -half + w / 2 + 0.05, half - w / 2 - 0.05),
    y: clamp(snap(y, 0.1), 0.6 + h / 2, room.size.height - h / 2 - 0.12),
  };
}

function wallRect(item: PlacedItem, def: FurnitureDefinition): WallRect {
  const along = item.wall === 'left' ? item.z : item.x;
  const [w, h] = def.size;
  return { minA: along - w / 2, maxA: along + w / 2, minY: item.y - h / 2, maxY: item.y + h / 2 };
}

function openingRect(o: WallOpening, margin = 0.08): WallRect {
  return {
    minA: o.center - o.width / 2 - margin,
    maxA: o.center + o.width / 2 + margin,
    minY: o.bottom - margin,
    maxY: o.bottom + o.height + margin,
  };
}

function wallOverlaps(a: WallRect, b: WallRect) {
  return a.minA < b.maxA - EPS && a.maxA > b.minA + EPS && a.minY < b.maxY - EPS && a.maxY > b.minY + EPS;
}

// ── Validity ──────────────────────────────────────

/** Can `candidate` stand here? `others` must not include the candidate itself. */
export function isPlacementValid(candidate: PlacedItem, others: PlacedItem[], room: RoomDefinition): boolean {
  const def = getFurniture(candidate.objectId);
  if (def.mount === 'rug') return true;

  if (def.mount === 'wall') {
    const wall = candidate.wall ?? 'back';
    const rect = wallRect(candidate, def);
    const openings = [room.window, room.door].filter((o): o is WallOpening => !!o && o.wall === wall);
    if (openings.some((o) => wallOverlaps(rect, openingRect(o)))) return false;
    return !others.some((o) => {
      const od = getFurniture(o.objectId);
      return od.mount === 'wall' && (o.wall ?? 'back') === wall && wallOverlaps(rect, wallRect(o, od));
    });
  }

  const rect = itemRect(candidate, def);
  if (def.mount === 'small' && candidate.y > 0) {
    return !others.some((o) => {
      const od = getFurniture(o.objectId);
      return od.mount === 'small' && Math.abs(o.y - candidate.y) < 0.01 && overlaps(rect, itemRect(o, od));
    });
  }

  const door = doorZone(room);
  if (door && overlaps(rect, door)) return false;
  const win = windowZone(room, def);
  if (win && overlaps(rect, win)) return false;
  return !others.some((o) => {
    const od = getFurniture(o.objectId);
    if (od.mount === 'rug' || od.mount === 'wall') return false;
    if (od.mount === 'small' && o.y > 0) return false;
    return overlaps(rect, itemRect(o, od));
  });
}

// ── Pointer projection (dragging) ─────────────────

const hit = new Vector3();

function intersect(ray: Ray, normal: [number, number, number], constant: number): Vector3 | null {
  const plane = new Plane(new Vector3(...normal), constant);
  return ray.intersectPlane(plane, hit) ? hit.clone() : null;
}

/** Raw point where the pointer ray meets the plane this object moves on. */
export function rayPoint(ray: Ray, item: PlacedItem, room: RoomDefinition): Vector3 | null {
  const def = getFurniture(item.objectId);
  if (def.mount === 'wall') {
    return item.wall === 'left'
      ? intersect(ray, [1, 0, 0], room.size.width / 2)
      : intersect(ray, [0, 0, 1], room.size.depth / 2);
  }
  return intersect(ray, [0, 1, 0], -(def.mount === 'small' ? item.y : 0));
}

/** Where the dragged object would go for this pointer ray (snapped). */
export function projectPointer(
  ray: Ray,
  item: PlacedItem,
  others: PlacedItem[],
  room: RoomDefinition,
  offset: { x: number; y: number; z: number },
): PlacedItem | null {
  const def = getFurniture(item.objectId);
  const hw = room.size.width / 2;
  const hd = room.size.depth / 2;

  if (def.mount === 'wall') {
    const back = intersect(ray, [0, 0, 1], hd);
    const left = intersect(ray, [1, 0, 0], hw);
    const onBack = back && Math.abs(back.x) <= hw && back.y >= 0 && back.y <= room.size.height;
    const onLeft = left && Math.abs(left.z) <= hd && left.y >= 0 && left.y <= room.size.height;
    let wall: WallSide | null = null;
    if (onBack && onLeft) {
      wall = ray.origin.distanceTo(back!) <= ray.origin.distanceTo(left!) ? 'back' : 'left';
    } else if (onBack) wall = 'back';
    else if (onLeft) wall = 'left';
    if (!wall) return null;
    const p = wall === 'back' ? back! : left!;
    const along = wall === 'back' ? p.x + offset.x : p.z + offset.z;
    const s = snapWall(along, p.y + offset.y, wall, def, room);
    return { ...item, ...wallToWorld(s.along, s.y, wall, def, room) };
  }

  if (def.mount === 'small') {
    const surfaces = others
      .filter((o) => getFurniture(o.objectId).surfaceHeight && getFurniture(o.objectId).mount === 'floor')
      .sort((a, b) => getFurniture(b.objectId).surfaceHeight! - getFurniture(a.objectId).surfaceHeight!);
    const [w, d] = footprint(def, item.rot);
    for (const s of surfaces) {
      const h = getFurniture(s.objectId).surfaceHeight!;
      const p = intersect(ray, [0, 1, 0], -h);
      const r = itemRect(s);
      if (p && contains(r, p.x, p.z, -0.05)) {
        return {
          ...item,
          x: clamp(snap(p.x, 0.05), r.minX + w / 2, r.maxX - w / 2),
          z: clamp(snap(p.z, 0.05), r.minZ + d / 2, r.maxZ - d / 2),
          y: h,
        };
      }
    }
    const p = intersect(ray, [0, 1, 0], 0);
    if (!p) return null;
    return { ...item, ...snapFloor(p.x, p.z, def, item.rot, room), y: 0 };
  }

  const p = intersect(ray, [0, 1, 0], 0);
  if (!p) return null;
  return { ...item, ...snapFloor(p.x + offset.x, p.z + offset.z, def, item.rot, room), y: 0 };
}

// ── Automatic placement ───────────────────────────

/** Finds a sensible free spot for a new object, or null when the room is full. */
export function findFreeSpot(
  def: FurnitureDefinition,
  items: PlacedItem[],
  room: RoomDefinition,
  uid = '__probe',
): PlacedItem | null {
  const base: PlacedItem = { uid, objectId: def.id, x: 0, y: 0, z: 0, rot: 0 };
  const others = items.filter((i) => i.uid !== uid);
  const hw = room.size.width / 2;
  const hd = room.size.depth / 2;

  if (def.mount === 'rug') return { ...base, ...snapFloor(0.25, 0.5, def, 0, room) };

  if (def.mount === 'wall') {
    for (const wall of ['back', 'left'] as WallSide[]) {
      const half = wallLength(room, wall) / 2;
      for (const y of [1.6, 1.4, 1.8, 1.2]) {
        for (const along of spiral(half)) {
          const s = snapWall(along, y, wall, def, room);
          const cand = { ...base, ...wallToWorld(s.along, s.y, wall, def, room) };
          if (isPlacementValid(cand, others, room)) return cand;
        }
      }
    }
    return null;
  }

  if (def.mount === 'small') {
    // Prefer the top of a nightstand or desk.
    const surfaces = others
      .filter((o) => getFurniture(o.objectId).surfaceHeight && getFurniture(o.objectId).mount === 'floor')
      .sort((a, b) => getFurniture(a.objectId).surfaceHeight! - getFurniture(b.objectId).surfaceHeight!);
    for (const s of surfaces) {
      const cand = { ...base, x: s.x, z: s.z, y: getFurniture(s.objectId).surfaceHeight! };
      if (isPlacementValid(cand, others, room)) return cand;
    }
  }

  // Against the back wall (rot 0), then the left wall (rot 1), then anywhere.
  const candidates: PlacedItem[] = [];
  for (const x of spiral(hw)) candidates.push({ ...base, rot: 0, ...snapFloor(x, -hd, def, 0, room) });
  for (const z of spiral(hd)) candidates.push({ ...base, rot: 1, ...snapFloor(-hw, z, def, 1, room) });
  for (const z of spiral(hd)) for (const x of spiral(hw)) candidates.push({ ...base, ...snapFloor(x, z, def, 0, room) });
  return candidates.find((c) => isPlacementValid(c, others, room)) ?? null;
}

/** Positions from the centre outwards: 0, 0.25, -0.25, 0.5, ... */
function spiral(half: number): number[] {
  const out = [0];
  for (let v = GRID; v <= half; v += GRID) out.push(v, -v);
  return out;
}

/** Drops small objects to the floor when the furniture under them is gone or rotated away. */
export function settleSmallItems(items: PlacedItem[], room: RoomDefinition): PlacedItem[] {
  const changed: PlacedItem[] = [];
  let current = items;
  for (const item of items) {
    const def = getFurniture(item.objectId);
    if (def.mount !== 'small' || item.y === 0) continue;
    const others = current.filter((o) => o.uid !== item.uid);
    const surface = surfaceAt(item.x, item.z, others);
    if (surface && Math.abs(surface.height - item.y) < 0.01) continue;
    const spot = findFreeSpot(def, others, room, item.uid);
    if (spot) {
      changed.push(spot);
      current = current.map((o) => (o.uid === spot.uid ? spot : o));
    }
  }
  return changed;
}

/** Small objects standing on top of `item` (they move with it). */
export function ridersOf(item: PlacedItem, items: PlacedItem[]): string[] {
  const def = getFurniture(item.objectId);
  if (!def.surfaceHeight) return [];
  const rect = itemRect(item, def);
  return items
    .filter((o) => o.uid !== item.uid && getFurniture(o.objectId).mount === 'small')
    .filter((o) => Math.abs(o.y - def.surfaceHeight!) < 0.01 && contains(rect, o.x, o.z))
    .map((o) => o.uid);
}
