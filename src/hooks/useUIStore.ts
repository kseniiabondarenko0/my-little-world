import { create } from 'zustand';
import type { ActivityStage, PlacedItem } from '../types/game';

// Temporary screen state (not saved): selection, dragging, open windows, notifications.

export interface DragState {
  uid: string;
  origin: PlacedItem;
  startX: number;
  startY: number;
  offset: { x: number; y: number; z: number };
  riders: string[];
  moved: boolean;
  preview: PlacedItem | null;
  valid: boolean;
}

export interface ActivityRequest {
  objectId: string;
  stage: ActivityStage;
  /** Changes every time a session opens, so "Practise again" starts fresh. */
  nonce?: number;
}

export type ModalId = 'rooms' | 'achievements' | 'menu' | 'words' | 'profile' | 'practice' | null;

export interface Toast {
  id: number;
  icon: string;
  title: string;
  text?: string;
  tone?: 'success' | 'info' | 'warning';
  /** Show the player's avatar instead of the icon. */
  avatar?: boolean;
}

export type PanelTab = 'journey' | 'furniture';

interface UIState {
  selectedUid: string | null;
  drag: DragState | null;
  activity: ActivityRequest | null;
  modal: ModalId;
  toasts: Toast[];
  thumbnails: Record<string, string>;
  /** Increases whenever the avatar should celebrate. */
  cheer: number;
  panelTab: PanelTab;
  /** A mini-game window that is open (game id + the chapter task it counts for, if any). */
  minigame: { gameId: string; taskId: string | null; nonce: number } | null;
  /** A vocabulary training session that is open. */
  training: { taskId: string | null; nonce: number } | null;
  cheerUp: () => void;
  setPanelTab: (tab: PanelTab) => void;
  openMinigame: (gameId: string, taskId: string | null) => void;
  closeMinigame: () => void;
  openTraining: (taskId: string | null) => void;
  closeTraining: () => void;
  select: (uid: string | null) => void;
  startDrag: (drag: DragState) => void;
  updateDrag: (patch: Partial<DragState>) => void;
  endDrag: () => void;
  openActivity: (req: ActivityRequest) => void;
  closeActivity: () => void;
  openModal: (modal: ModalId) => void;
  pushToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: number) => void;
  setThumbnails: (thumbs: Record<string, string>) => void;
}

let toastId = 0;

export const useUI = create<UIState>()((set) => ({
  selectedUid: null,
  drag: null,
  activity: null,
  modal: null,
  toasts: [],
  thumbnails: {},
  cheer: 0,
  panelTab: 'journey',
  minigame: null,
  training: null,
  cheerUp: () => set((s) => ({ cheer: s.cheer + 1 })),
  setPanelTab: (panelTab) => set({ panelTab }),
  openMinigame: (gameId, taskId) => set({ minigame: { gameId, taskId, nonce: Date.now() }, selectedUid: null }),
  closeMinigame: () => set({ minigame: null }),
  openTraining: (taskId) => set({ training: { taskId, nonce: Date.now() } }),
  closeTraining: () => set({ training: null }),
  select: (uid) => set({ selectedUid: uid }),
  startDrag: (drag) => set({ drag, selectedUid: drag.uid }),
  updateDrag: (patch) => set((s) => (s.drag ? { drag: { ...s.drag, ...patch } } : s)),
  endDrag: () => set({ drag: null }),
  openActivity: (activity) => set({ activity: { ...activity, nonce: Date.now() } }),
  closeActivity: () => set({ activity: null }),
  openModal: (modal) => set({ modal }),
  pushToast: (toast) => {
    const id = ++toastId;
    set((s) => ({ toasts: [...s.toasts.slice(-3), { ...toast, id }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3800);
  },
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  setThumbnails: (thumbnails) => set({ thumbnails }),
}));
