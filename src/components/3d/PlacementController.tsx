import { Raycaster, Vector2, type Camera } from 'three';
import type { RoomDefinition } from '../../types/game';
import { useUI } from '../../hooks/useUIStore';
import { useLayout } from '../../rooms/layoutStore';
import { isPlacementValid, projectPointer } from '../../objects/placement';
import { commitDrag, tapObject } from '../../progression/actions';

// While an object is being dragged, follows the pointer (mouse or finger) across the room.
// Listeners are attached right in pointerdown so even very quick drags are caught.

const DRAG_THRESHOLD = 6;

interface TrackOptions {
  camera: Camera;
  canvas: HTMLElement;
  room: RoomDefinition;
  controls: { enabled: boolean } | null;
}

export function trackDrag({ camera, canvas, room, controls }: TrackOptions) {
  const raycaster = new Raycaster();
  const ndc = new Vector2();
  if (controls) controls.enabled = false;

  const onMove = (e: PointerEvent) => {
    const drag = useUI.getState().drag;
    if (!drag) return;
    if (!drag.moved && Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) < DRAG_THRESHOLD) return;
    const rect = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const items = useLayout.getState().rooms[room.id] ?? [];
    const others = items.filter((i) => i.uid !== drag.uid && !drag.riders.includes(i.uid));
    const candidate = projectPointer(raycaster.ray, drag.origin, others, room, drag.offset);
    if (!candidate) return;
    document.body.style.cursor = 'grabbing';
    useUI.getState().updateDrag({ moved: true, preview: candidate, valid: isPlacementValid(candidate, others, room) });
  };

  const onUp = (e: PointerEvent) => {
    onMove(e);
    const drag = useUI.getState().drag;
    if (drag?.moved && drag.preview) {
      if (drag.valid) commitDrag(drag);
      else {
        const onWall = drag.preview.wall !== undefined;
        useUI.getState().pushToast({
          icon: '🚫',
          title: 'It doesn’t fit there',
          text: onWall ? 'Pictures and mirrors can’t cover the window or door, or hide behind tall furniture.' : 'Try a free spot.',
          tone: 'warning',
        });
      }
    } else if (drag) {
      tapObject(drag.origin);
    }
    document.body.style.cursor = '';
    useUI.getState().endDrag();
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    if (controls) controls.enabled = true;
  };

  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onUp);
}
