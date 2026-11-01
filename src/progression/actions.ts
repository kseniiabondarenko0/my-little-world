import type { ActivityStage, PlacedItem } from '../types/game';
import { getFurniture } from '../data/content';
import { getRoom } from '../rooms';
import { useLayout } from '../rooms/layoutStore';
import { useProgress } from './progressStore';
import { useUI, type DragState } from '../hooks/useUIStore';
import { findFreeSpot, isPlacementValid, settleSmallItems, snapFloor } from '../objects/placement';

// Game actions that touch several stores at once (room layout + progress + screen state).

const currentRoom = () => getRoom(useProgress.getState().currentRoomId);
const roomItems = (roomId: string) => useLayout.getState().rooms[roomId] ?? [];
const toast = useUI.getState().pushToast;

export function addObjectToRoom(objectId: string) {
  const room = currentRoom();
  const items = roomItems(room.id);
  const existing = items.find((i) => i.objectId === objectId);
  if (existing) {
    useUI.getState().select(existing.uid);
    return;
  }
  const def = getFurniture(objectId);
  const uid = `${objectId}-${Date.now().toString(36)}`;
  const spot = findFreeSpot(def, items, room, uid);
  if (!spot) {
    toast({ icon: '📦', title: 'No free space', text: 'Move or remove something first.', tone: 'warning' });
    return;
  }
  useLayout.getState().addItem(room.id, spot);
  useUI.getState().select(uid);
}

export function removeObject(uid: string) {
  const room = currentRoom();
  useLayout.getState().removeItem(room.id, uid);
  const settled = settleSmallItems(roomItems(room.id), room);
  if (settled.length) useLayout.getState().updateItems(room.id, settled);
  useUI.getState().select(null);
}

export function rotateObject(uid: string) {
  const room = currentRoom();
  const items = roomItems(room.id);
  const item = items.find((i) => i.uid === uid);
  if (!item) return;
  const def = getFurniture(item.objectId);
  if (def.mount === 'wall') return;
  const rot = (item.rot + 1) % 4;
  const pos = item.y > 0 ? { x: item.x, z: item.z } : snapFloor(item.x, item.z, def, rot, room);
  const rotated: PlacedItem = { ...item, rot, ...pos };
  const others = items.filter((i) => i.uid !== uid);
  if (!isPlacementValid(rotated, others, room)) {
    toast({ icon: '↻', title: 'Not enough space', text: 'Move it somewhere freer, then rotate.', tone: 'warning' });
    return;
  }
  useLayout.getState().updateItems(room.id, [rotated]);
  const settled = settleSmallItems(roomItems(room.id), room);
  if (settled.length) useLayout.getState().updateItems(room.id, settled);
}

export function commitDrag(drag: DragState) {
  if (!drag.preview) return;
  const room = currentRoom();
  const items = roomItems(room.id);
  const dx = drag.preview.x - drag.origin.x;
  const dz = drag.preview.z - drag.origin.z;
  const riders = items
    .filter((i) => drag.riders.includes(i.uid))
    .map((i) => ({ ...i, x: i.x + dx, z: i.z + dz }));
  useLayout.getState().updateItems(room.id, [drag.preview, ...riders]);
}

/** Called when a lesson or practice session is finished. */
export function finishSession(objectId: string, stage: ActivityStage, perfect: boolean) {
  const progress = useProgress.getState();
  if (stage === 'lesson') progress.unlockObject(objectId);
  else progress.markPractised(objectId);
  if (perfect) progress.addPerfectSession();
}
