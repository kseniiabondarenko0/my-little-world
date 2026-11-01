import { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { NeutralToneMapping, Vector3, type PerspectiveCamera } from 'three';
import { useProgress } from '../../progression/progressStore';
import { useLayout, EMPTY_ITEMS } from '../../rooms/layoutStore';
import { useUI } from '../../hooks/useUIStore';
import { getRoom } from '../../rooms';
import { Room } from './Room';
import { PlacedObject } from './PlacedObject';
import { MissionProps } from './MissionProps';
import { AvatarFigure } from './AvatarFigure';
import { usePlayer } from '../../player/playerStore';

// The main 3D view: camera, lights, room and the objects in it.

const TARGET = new Vector3(-0.2, 0.8, -0.2);

/**
 * Shifts the picture so the room is centred in the space the panels leave free,
 * and on first load moves the camera back far enough for the room to fit tall phone screens.
 */
function ViewOffset() {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const { width, height } = useThree((s) => s.size);
  const fitted = useRef(false);
  useEffect(() => {
    if (!fitted.current && width > 0) {
      fitted.current = true;
      const aspect = width / height;
      const distance = 13.3 * Math.max(1, 1.1 / aspect);
      camera.position.sub(TARGET).setLength(distance).add(TARGET);
    }
    if (width >= 760) camera.setViewOffset(width + 282, height, 0, 0, width, height);
    else camera.setViewOffset(width, height + 190, 0, 190, width, height);
    camera.updateProjectionMatrix();
  }, [camera, width, height]);
  return null;
}

export function Scene() {
  const room = getRoom(useProgress((s) => s.currentRoomId));
  const items = useLayout((s) => s.rooms[room.id] ?? EMPTY_ITEMS);
  const dragging = useUI((s) => s.drag !== null);
  const select = useUI((s) => s.select);
  const avatar = usePlayer((s) => s.current?.avatar);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [8, 7, 8], fov: 38, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = NeutralToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      onPointerMissed={(e) => {
        if (e.type === 'click') select(null);
      }}
    >
      <hemisphereLight args={['#fff6ee', '#d9c8ec', 1.1]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[5, 9, 4]}
        intensity={1.9}
        color="#fff2de"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
      />
      {room.window && (
        <pointLight position={[room.window.center, room.window.bottom + 0.6, -room.size.depth / 2 + 0.8]} intensity={2.2} distance={5} color="#d8ecff" />
      )}

      <ViewOffset />
      <Room room={room} />
      {items.map((item) => (
        <PlacedObject key={item.uid} item={item} room={room} />
      ))}
      <MissionProps />
      {avatar && room.avatarSpot && (
        <group
          onClick={(e) => {
            e.stopPropagation();
            useUI.getState().openModal('profile');
          }}
        >
          <AvatarFigure avatar={avatar} position={room.avatarSpot} />
        </group>
      )}

      <OrbitControls
        makeDefault
        enabled={!dragging}
        target={TARGET.toArray()}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={5}
        maxDistance={32}
        minPolarAngle={0.35}
        maxPolarAngle={1.38}
        minAzimuthAngle={-0.2}
        maxAzimuthAngle={Math.PI / 2 + 0.2}
      />
    </Canvas>
  );
}
