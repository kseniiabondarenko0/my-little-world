import type { ActivityStage, PlacedItem } from '../types/game';
import { getFurniture } from '../data/content';
import { getRoom } from '../rooms';
import { useLayout } from '../rooms/layoutStore';
import { useProgress } from './progressStore';
import { useUI, type DragState } from '../hooks/useUIStore';
import { findFreeSpot, isPlacementValid, settleSmallItems, snapFloor } from '../objects/placement';
import { useChapter } from '../chapter/chapterStore';
import { useMission, type MissionRun } from '../missions/missionStore';
import { getChapter } from '../data/chapters';
import { missionForTask } from '../minigames/missions';
import { buildStages, choosePicks, findTask, type Task } from '../chapter/stages';

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

// ── Chapter tasks ──────────────────────────────────────────────────────────

/** Marks a chapter task as done and gives its reward (only the first time). */
export function completeTask(taskId: string, title: string, xp: number) {
  const room = currentRoom();
  if (!useChapter.getState().complete(room.id, taskId)) return;
  useProgress.getState().addXp(xp);
  useUI.getState().cheerUp();
  toast({ icon: '✅', title: `${title} — done!`, text: `+${xp} XP`, tone: 'success', avatar: true });
}

export function currentStages() {
  const progress = useProgress.getState();
  const room = currentRoom();
  return buildStages({
    chapter: getChapter(room.id),
    room,
    level: progress.level,
    state: useChapter.getState().rooms[room.id] ?? { done: [], picks: [], inspected: [], writings: [] },
    unlocked: progress.unlocked,
    items: roomItems(room.id),
    words: progress.words,
  });
}

/** Makes sure the three mini-games for this playthrough are chosen. */
export function ensurePicks() {
  const room = currentRoom();
  if (!(useChapter.getState().rooms[room.id]?.picks.length)) useChapter.getState().setPicks(room.id, choosePicks());
}

/** Starts whatever a Journey task needs: a mission in the room, a training session or a mini-game. */
export function startTask(task: Task) {
  const ui = useUI.getState();
  ui.select(null);
  if (task.kind === 'training') {
    ui.openTraining(task.id);
  } else if (task.kind === 'minigame' && task.gameId) {
    if (task.gameId === 'hidden' || task.gameId === 'designer') startMission(task.id);
    else ui.openMinigame(task.gameId, task.id);
  } else if (task.kind === 'mission') {
    startMission(task.id);
  } else if (task.id === 'movein:unlock' || task.id === 'movein:place') {
    ui.setPanelTab('furniture');
  } else if (task.id === 'explore:inspect') {
    toast({ icon: '👆', title: 'Tap the objects in your room', text: 'Each one shows its word, translation and an example.', tone: 'info' });
  }
}

export function startMission(taskId: string) {
  const room = currentRoom();
  const level = useProgress.getState().level;
  const def = missionForTask(getChapter(room.id), taskId, level);
  if (!def) return;
  useUI.getState().select(null);
  useMission.getState().start(taskId, def, room, level, roomItems(room.id));
}

/** Keeps the mission store connected to rewards and the student's writing portfolio. */
export function connectMissions() {
  useMission.setState({
    onFinish: (run: MissionRun) => {
      const task = findTask(currentStages(), run.taskId);
      completeTask(run.taskId, run.def.title, task?.xp ?? run.def.xp ?? 40);
      if (run.taskId === 'final') useProgress.getState().completeRoom(run.roomId);
    },
    onWriting: (run: MissionRun, text: string) => {
      const step = run.steps[run.index];
      useChapter.getState().addWriting(run.roomId, {
        id: `${run.taskId}-${run.index}`,
        title: run.def.title,
        prompt: 'prompt' in step ? step.prompt : '',
        text,
      });
      useProgress.getState().addXp(15);
    },
  });
}

/** A tap (not a drag) on furniture: missions first, otherwise it counts as exploring. */
export function tapObject(item: PlacedItem) {
  const room = currentRoom();
  useChapter.getState().inspect(room.id, item.objectId);
  if (useMission.getState().tapObject(item.objectId)) useUI.getState().select(null);
}
