import { Scene } from './components/3d/Scene';
import { ThumbnailRenderer } from './components/3d/ModelPreview';
import { TopBar } from './components/ui/TopBar';
import { Catalogue } from './components/ui/Catalogue';
import { ObjectToolbar } from './components/ui/ObjectToolbar';
import { ActivityModal } from './components/ui/ActivityModal';
import { TrainingModal } from './components/ui/TrainingModal';
import { MinigameModal } from './components/ui/MinigameModal';
import { MissionHUD } from './components/ui/MissionHUD';
import { PracticeMode } from './components/ui/PracticeMode';
import { Welcome } from './components/ui/Welcome';
import { Modals, Toasts } from './components/ui/Modals';
import { useProgressWatcher } from './hooks/useProgressWatcher';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useLayout } from './rooms/layoutStore';
import { useMission } from './missions/missionStore';
import { usePlayer } from './player/playerStore';
import { connectMissions } from './progression/actions';

connectMissions();

export default function App() {
  useProgressWatcher();
  useKeyboardShortcuts();
  const empty = useLayout((s) => Object.values(s.rooms).every((r) => r.length === 0));
  const mission = useMission((s) => s.run !== null);
  const hasPlayer = usePlayer((s) => s.current !== null);

  return (
    <div className={`app ${mission ? 'in-mission' : ''}`}>
      <div className="scene">
        <Scene />
      </div>
      {empty && !mission && hasPlayer && (
        <div className="empty-hint">
          <span>✨</span> Your room is empty. Open the Furniture tab and learn your first words!
        </div>
      )}
      <TopBar />
      <Catalogue />
      <ObjectToolbar />
      <MissionHUD />
      <ActivityModal />
      <TrainingModal />
      <MinigameModal />
      <PracticeMode />
      <Modals />
      <Welcome />
      <Toasts />
      <ThumbnailRenderer />
    </div>
  );
}
