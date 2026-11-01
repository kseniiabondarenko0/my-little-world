import { useEffect } from 'react';
import { Scene } from './components/3d/Scene';
import { ThumbnailRenderer } from './components/3d/ModelPreview';
import { TopBar } from './components/ui/TopBar';
import { Catalogue } from './components/ui/Catalogue';
import { ObjectToolbar } from './components/ui/ObjectToolbar';
import { ActivityModal } from './components/ui/ActivityModal';
import { Modals, Toasts } from './components/ui/Modals';
import { useProgressWatcher } from './hooks/useProgressWatcher';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useProgress } from './progression/progressStore';
import { useLayout } from './rooms/layoutStore';
import { useUI } from './hooks/useUIStore';

export default function App() {
  useProgressWatcher();
  useKeyboardShortcuts();
  const empty = useLayout((s) => Object.values(s.rooms).every((r) => r.length === 0));

  useEffect(() => {
    if (!useProgress.getState().seenIntro) useUI.getState().openModal('intro');
  }, []);

  return (
    <div className="app">
      <div className="scene">
        <Scene />
      </div>
      {empty && (
        <div className="empty-hint">
          <span>✨</span> Your room is empty. Pick furniture from the catalogue to start learning!
        </div>
      )}
      <TopBar />
      <Catalogue />
      <ObjectToolbar />
      <ActivityModal />
      <Modals />
      <Toasts />
      <ThumbnailRenderer />
    </div>
  );
}
