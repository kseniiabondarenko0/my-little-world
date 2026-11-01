import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { MathUtils, type Group } from 'three';
import { useMission, type PropState } from '../../missions/missionStore';
import { PropModel } from '../../objects/models/props';

// Loose things on the floor during "sort" missions. Click one, then click furniture.

function Prop({ prop, picked }: { prop: PropState; picked: boolean }) {
  const ref = useRef<Group>(null);
  const tapProp = useMission((s) => s.tapProp);

  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const target = prop.done ? 0 : 1;
    const s = MathUtils.lerp(g.scale.x, target, 1 - Math.exp(-dt * 10));
    g.scale.setScalar(s < 0.02 ? 0 : s);
    g.visible = s > 0.02;
    g.position.y = picked ? 0.12 + Math.sin(state.clock.elapsedTime * 5) * 0.04 : prop.done ? 0.5 : 0;
  });

  return (
    <group position={[prop.x, 0, prop.z]}>
      <group
        ref={ref}
        onClick={(e) => {
          e.stopPropagation();
          tapProp(prop.def.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => (document.body.style.cursor = '')}
      >
        <PropModel look={prop.def.look} color={prop.def.color} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} raycast={() => null}>
          <circleGeometry args={[0.32, 24]} />
          <meshBasicMaterial color={picked ? '#ffb35c' : '#ffffff'} transparent opacity={picked ? 0.55 : 0.3} depthWrite={false} />
        </mesh>
      </group>
      {!prop.done && prop.opened && (
        <Html position={[0, 0.75, 0]} center distanceFactor={9} zIndexRange={[4, 0]} style={{ pointerEvents: 'none' }}>
          <div className={`prop-label ${picked ? 'picked' : ''}`}>{prop.def.label}</div>
        </Html>
      )}
      {!prop.done && !prop.opened && (
        <Html position={[0, 0.6, 0]} center distanceFactor={9} zIndexRange={[4, 0]} style={{ pointerEvents: 'none' }}>
          <div className="prop-label">?</div>
        </Html>
      )}
    </group>
  );
}

export function MissionProps() {
  const props = useMission((s) => s.run?.props);
  const picked = useMission((s) => s.run?.picked ?? null);
  if (!props?.length) return null;
  return (
    <group>
      {props.map((p) => (
        <Prop key={p.def.id} prop={p} picked={picked === p.def.id} />
      ))}
    </group>
  );
}
