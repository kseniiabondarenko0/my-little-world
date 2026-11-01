import { useUI } from '../../hooks/useUIStore';
import { useLayout, EMPTY_ITEMS } from '../../rooms/layoutStore';
import { useProgress } from '../../progression/progressStore';
import { getFurniture, getWord } from '../../data/content';
import { removeObject, rotateObject } from '../../progression/actions';
import { SpeakButton } from './SpeakButton';

// Appears when an object in the room is selected.

export function ObjectToolbar() {
  const selectedUid = useUI((s) => s.selectedUid);
  const dragging = useUI((s) => s.drag?.moved ?? false);
  const roomId = useProgress((s) => s.currentRoomId);
  const language = useProgress((s) => s.language);
  const practised = useProgress((s) => s.practised);
  const items = useLayout((s) => s.rooms[roomId] ?? EMPTY_ITEMS);
  const item = items.find((i) => i.uid === selectedUid);
  if (!item || dragging) return null;

  const def = getFurniture(item.objectId);
  const word = getWord(def.wordId);
  const { openActivity, select } = useUI.getState();
  const done = practised.includes(def.id);

  return (
    <div className="toolbar" role="toolbar" aria-label={`${def.name} tools`}>
      <div className="toolbar-word">
        <span className="toolbar-name">{word.word}</span>
        <SpeakButton text={word.word} small />
        {word.translations?.[language] && <span className="toolbar-native">{word.translations[language]}</span>}
      </div>
      <div className="toolbar-actions">
        <button className="btn btn-primary" onClick={() => openActivity({ objectId: def.id, stage: 'practice' })}>
          ✏️ Practice {done && <span className="done-star">★</span>}
        </button>
        {def.mount !== 'wall' && (
          <button className="btn btn-soft" onClick={() => rotateObject(item.uid)} title="Rotate (R)">↻ <span className="hide-sm">Rotate</span></button>
        )}
        <button className="btn btn-soft" onClick={() => removeObject(item.uid)} title="Put back (Delete)">↩ <span className="hide-sm">Put back</span></button>
        <button className="btn btn-ghost" onClick={() => select(null)} aria-label="Close">✕</button>
      </div>
      <p className="toolbar-hint">Drag to move · double-click to practise</p>
    </div>
  );
}
