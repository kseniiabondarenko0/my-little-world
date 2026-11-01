import { useEffect } from 'react';
import { useUI } from './useUIStore';
import { removeObject, rotateObject } from '../progression/actions';

// Desktop shortcuts: R = rotate, Delete = remove, Esc = deselect / close.

export function useKeyboardShortcuts() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const ui = useUI.getState();
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Escape') {
        if (ui.activity) ui.closeActivity();
        else if (ui.training) ui.closeTraining();
        else if (ui.minigame) ui.closeMinigame();
        else if (ui.modal) ui.openModal(null);
        else ui.select(null);
        return;
      }
      if (ui.activity || ui.modal || ui.training || ui.minigame || !ui.selectedUid) return;
      if (e.key === 'r' || e.key === 'R') rotateObject(ui.selectedUid);
      if (e.key === 'Delete' || e.key === 'Backspace') removeObject(ui.selectedUid);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}
