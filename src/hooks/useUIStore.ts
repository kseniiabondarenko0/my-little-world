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

export type ModalId = 'rooms' | 'achievements' | 'menu' | 'intro' | 'words' | null;

export interface Toast {
  id: number;
  icon: string;
  title: string;
  text?: string;
  tone?: 'success' | 'info' | 'warning';
}

interface UIState {
  selectedUid: string | null;
  drag: DragState | null;
  activity: ActivityRequest | null;
  modal: ModalId;
  toasts: Toast[];
  thumbnails: Record<string, string>;
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
