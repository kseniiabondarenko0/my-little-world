import { create } from 'zustand';
import type { Level, PlacedItem, RoomDefinition } from '../types/game';
import { forLevel, type MissionDefinition, type MissionStep, type PropDef } from '../chapter/types';
import { getFurniture, getWord } from '../data/content';
import { itemRect, isPlacementValid } from '../objects/placement';
import { evaluateAll } from './spatial';
import { evaluateWriting, type WritingResult } from './writing';
import { shuffle } from '../activities/engine';

// Runs one mission at a time: which step we're on, what's been found,
// props on the floor, and feedback. Rewards are given by the caller (onFinish).

export interface PropState {
  def: PropDef;
  x: number;
  z: number;
  done: boolean;
  opened: boolean;
}

export interface Feedback {
  tone: 'good' | 'bad' | 'info';
  text: string;
}

export interface MissionRun {
  taskId: string;
  roomId: string;
  def: MissionDefinition;
  steps: MissionStep[];
  index: number;
  showIntro: boolean;
  found: string[];
  props: PropState[];
  picked: string | null;
  message: Feedback | null;
  stepDone: boolean;
  writing: WritingResult | null;
  mistakes: number;
}

interface MissionState {
  run: MissionRun | null;
  /** Called when the last step is finished. Set by the app (progression/actions). */
  onFinish: ((run: MissionRun) => void) | null;
  onWriting: ((run: MissionRun, text: string) => void) | null;
  start: (taskId: string, def: MissionDefinition, room: RoomDefinition, level: Level, items: PlacedItem[]) => void;
  beginSteps: (items: PlacedItem[], room: RoomDefinition) => void;
  next: (items: PlacedItem[], room: RoomDefinition) => void;
  quit: () => void;
  tapObject: (objectId: string) => boolean;
  tapProp: (propId: string) => void;
  checkPlacement: (items: PlacedItem[], room: RoomDefinition) => void;
  choose: (index: number) => void;
  submitWriting: (text: string) => void;
  submitShop: (ids: string[]) => void;
}

const wordOf = (objectId: string) => getWord(getFurniture(objectId).wordId).word;

/** Free floor spots for mission props, away from furniture, the door and the avatar. */
function propSpots(count: number, items: PlacedItem[], room: RoomDefinition): [number, number][] {
  const hw = room.size.width / 2 - 0.35;
  const hd = room.size.depth / 2 - 0.35;
  const blockers = items
    .filter((i) => {
      const m = getFurniture(i.objectId).mount;
      return m === 'floor' || (m === 'small' && i.y === 0);
    })
    .map((i) => itemRect(i));
  const candidates: [number, number][] = [];
  for (let x = -hw; x <= hw; x += 0.35) {
    for (let z = -hd; z <= hd; z += 0.35) {
      const probe: PlacedItem = { uid: '__prop', objectId: 'lamp', x, y: 0, z, rot: 0 };
      if (!isPlacementValid(probe, [], room)) continue;
      const clear = blockers.every((r) => x < r.minX - 0.3 || x > r.maxX + 0.3 || z < r.minZ - 0.3 || z > r.maxZ + 0.3);
      if (clear) candidates.push([x, z]);
    }
  }
  const chosen: [number, number][] = [];
  for (const c of shuffle(candidates)) {
    if (chosen.every(([x, z]) => Math.hypot(x - c[0], z - c[1]) > 0.7)) chosen.push(c);
    if (chosen.length === count) break;
  }
  // A very full room: allow props to stand closer together.
  for (const c of shuffle(candidates)) {
    if (chosen.length >= count) break;
    if (!chosen.includes(c)) chosen.push(c);
  }
  while (chosen.length < count) chosen.push([(Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3]);
  return chosen;
}

function prepareStep(run: MissionRun, items: PlacedItem[], room: RoomDefinition): MissionRun {
  const step = run.steps[run.index];
  const base = { ...run, found: [], picked: null, stepDone: false, writing: null, message: null as Feedback | null, props: [] as PropState[] };
  if (step.type === 'sort') {
    const spots = propSpots(step.props.length, items, room);
    base.props = step.props.map((def, i) => ({ def, x: spots[i][0], z: spots[i][1], done: false, opened: !step.boxes }));
  }
  if (step.type === 'find') {
    const present = step.targets.filter((t) => items.some((i) => i.objectId === t));
    if (present.length < (step.count ?? 1)) {
      base.message = { tone: 'info', text: 'Some objects you need aren’t in your room. Add them from the Furniture tab.' };
    }
  }
  return base;
}

export const useMission = create<MissionState>()((set, get) => {
  const update = (fn: (run: MissionRun) => Partial<MissionRun>) => {
    const run = get().run;
    if (run) set({ run: { ...run, ...fn(run) } });
  };
  const solved = (text: string) => update(() => ({ stepDone: true, message: { tone: 'good', text } }));
  const wrong = (text: string) => update((r) => ({ message: { tone: 'bad', text }, mistakes: r.mistakes + 1 }));

  return {
    run: null,
    onFinish: null,
    onWriting: null,

    start: (taskId, def, room, level) => {
      set({
        run: {
          taskId, roomId: room.id, def, steps: forLevel(def.steps, level), index: 0, showIntro: true,
          found: [], props: [], picked: null, message: null, stepDone: false, writing: null, mistakes: 0,
        },
      });
    },

    beginSteps: (items, room) => update((r) => ({ ...prepareStep({ ...r, showIntro: false }, items, room) })),

    next: (items, room) => {
      const run = get().run;
      if (!run) return;
      if (run.index + 1 >= run.steps.length) {
        get().onFinish?.(run);
        set({ run: null });
        return;
      }
      set({ run: prepareStep({ ...run, index: run.index + 1 }, items, room) });
    },

    quit: () => set({ run: null }),

    tapObject: (objectId) => {
      const run = get().run;
      if (!run || run.showIntro || run.stepDone) return false;
      const step = run.steps[run.index];
      if (step.type === 'find') {
        const need = step.count ?? 1;
        if (run.found.includes(objectId)) {
          update(() => ({ message: { tone: 'info', text: `You already found the ${wordOf(objectId)}.` } }));
        } else if (step.targets.includes(objectId)) {
          const found = [...run.found, objectId];
          if (found.length >= need) {
            update(() => ({ found }));
            solved(need > 1 ? `Great! You found ${need}.` : `Yes! The ${wordOf(objectId)}.`);
          } else {
            update(() => ({ found, message: { tone: 'good', text: `Yes, the ${wordOf(objectId)}! ${need - found.length} more.` } }));
          }
        } else {
          wrong(`That’s the ${wordOf(objectId)}. Try again!`);
        }
        return true;
      }
      if (step.type === 'sort') {
        const prop = run.props.find((p) => p.def.id === run.picked);
        if (!prop) {
          update(() => ({ message: { tone: 'info', text: step.boxes ? 'First click a box on the floor.' : 'First click a thing on the floor.' } }));
          return true;
        }
        if (prop.def.accept.includes(objectId)) {
          const props = run.props.map((p) => (p === prop ? { ...p, done: true } : p));
          update(() => ({ props, picked: null }));
          if (props.every((p) => p.done)) solved('All done! Everything is in the right place.');
          else update(() => ({ message: { tone: 'good', text: `Good — ${prop.def.label} → the ${wordOf(objectId)}.` } }));
        } else {
          wrong(`Hmm, ${prop.def.label} doesn’t go in/on the ${wordOf(objectId)}. Try somewhere else.`);
        }
        return true;
      }
      return false;
    },

    tapProp: (propId) => {
      const run = get().run;
      if (!run || run.stepDone || run.showIntro) return;
      const prop = run.props.find((p) => p.def.id === propId);
      if (!prop || prop.done) return;
      const props = run.props.map((p) => (p === prop ? { ...p, opened: true } : p));
      const text = prop.opened
        ? `You picked up ${prop.def.label}. Now click where it goes.`
        : `Inside the box: ${prop.def.label}. Where does it go? Click the furniture.`;
      update(() => ({ props, picked: propId, message: { tone: 'info', text } }));
    },

    checkPlacement: (items, room) => {
      const run = get().run;
      if (!run) return;
      const step = run.steps[run.index];
      if (step.type !== 'place') return;
      const result = evaluateAll(step.checks, items, room);
      if (result.ok) solved('Perfect! That’s exactly right.');
      else wrong(result.message);
    },

    choose: (index) => {
      const run = get().run;
      if (!run || run.stepDone) return;
      const step = run.steps[run.index];
      if (step.type !== 'choice') return;
      const opt = step.options[index];
      if (opt.correct) solved(opt.feedback);
      else wrong(opt.feedback);
    },

    submitWriting: (text) => {
      const run = get().run;
      if (!run) return;
      const step = run.steps[run.index];
      if (step.type !== 'write') return;
      const writing = evaluateWriting(text, step.minWords, step.require);
      update(() => ({ writing }));
      if (writing.ok) {
        get().onWriting?.(run, text);
        solved('Well written! Your text is saved in your profile.');
      } else {
        update(() => ({ message: { tone: 'info', text: 'Almost — check the list below and add a little more.' } }));
      }
    },

    submitShop: (ids) => {
      const run = get().run;
      if (!run) return;
      const step = run.steps[run.index];
      if (step.type !== 'shop') return;
      const chosen = step.items.filter((i) => ids.includes(i.id));
      const total = chosen.reduce((n, i) => n + i.price, 0);
      const missing = step.needs.filter((n) => !chosen.some((i) => i.tags.includes(n.tag)));
      const big = chosen.filter((i) => i.tags.includes('big')).length;
      if (total > step.budget) return wrong(`That costs ${total} coins — your budget is ${step.budget}.`);
      if (missing.length) return wrong(`Your cousin still needs something for: ${missing.map((m) => m.label).join(', ')}.`);
      if (step.maxBig !== undefined && big > step.maxBig) return wrong(`The room is small — choose only ${step.maxBig} big item.`);
      solved(`Great choices! You spent ${total} of ${step.budget} coins.`);
    },
  };
});
