import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import { NeutralToneMapping, type Group } from 'three';
import { getFurniture } from '../../data/content';
import { FurnitureModel } from '../../objects/models';
import { FURNITURE } from '../../data/furniture';
import { useUI } from '../../hooks/useUIStore';

// Small 3D views of one object: the spinning preview in activity cards,
// and a one-off renderer that turns every model into a catalogue thumbnail.

function Fitted({ objectId }: { objectId: string }) {
  const def = getFurniture(objectId);
  const scale = 1.25 / Math.max(...def.size);
  return (
    <Center key={objectId}>
      <group scale={scale}>
        <FurnitureModel model={def.model} />
      </group>
    </Center>
  );
}

function Lights() {
  return (
    <>
      <hemisphereLight args={['#fff6ee', '#d9c8ec', 1.4]} />
      <directionalLight position={[3, 5, 4]} intensity={1.8} color="#fff2de" />
    </>
  );
}

function Spin({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = -0.5 + Math.sin(s.clock.elapsedTime * 0.8) * 0.45;
  });
  return <group ref={ref}>{children}</group>;
}

export function ModelPreview({ objectId }: { objectId: string }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [1.4, 1.0, 1.9], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl, camera }) => {
        gl.toneMapping = NeutralToneMapping;
        camera.lookAt(0, 0, 0);
      }}
    >
      <Lights />
      <Spin>
        <Fitted objectId={objectId} />
      </Spin>
    </Canvas>
  );
}

function Capture({ onDone }: { onDone: (thumbs: Record<string, string>) => void }) {
  const { gl, scene, camera } = useThree();
  const [current, setCurrent] = useState(FURNITURE[0].id);
  const done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    let cancelled = false;
    const frame = () => new Promise((r) => requestAnimationFrame(r));
    (async () => {
      const out: Record<string, string> = {};
      camera.lookAt(0, 0, 0);
      for (const def of FURNITURE) {
        setCurrent(def.id);
        await frame();
        await frame();
        await frame();
        if (cancelled) return;
        gl.render(scene, camera);
        out[def.id] = gl.domElement.toDataURL('image/png');
      }
      if (!cancelled) done.current(out);
    })();
    return () => {
      cancelled = true;
    };
  }, [gl, scene, camera]);

  return (
    <group rotation={[0, -0.55, 0]}>
      <Fitted objectId={current} />
    </group>
  );
}

/** Renders each model once to an image for the catalogue, then removes itself. */
export function ThumbnailRenderer() {
  const setThumbnails = useUI((s) => s.setThumbnails);
  const [done, setDone] = useState(false);
  if (done) return null;
  return (
    <div style={{ position: 'fixed', left: -1000, top: 0, width: 160, height: 160, pointerEvents: 'none' }} aria-hidden>
      <Canvas
        frameloop="never"
        dpr={1}
        camera={{ position: [1.4, 1.0, 1.9], fov: 35 }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = NeutralToneMapping;
        }}
      >
        <Lights />
        <Capture
          onDone={(thumbs) => {
            setThumbnails(thumbs);
            setDone(true);
          }}
        />
      </Canvas>
    </div>
  );
}
