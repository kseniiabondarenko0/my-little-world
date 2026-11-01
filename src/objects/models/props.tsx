import { Box, Cyl, Ball } from './parts';
import type { PropLook } from '../../chapter/types';

// Small loose things used by missions (boxes to unpack, clothes on the floor...).
// They stand on y = 0 and are about 0.3–0.6 m wide.

export function PropModel({ look, color = '#a9c9f2' }: { look: PropLook; color?: string }) {
  switch (look) {
    case 'box':
      return (
        <group>
          <Box size={[0.5, 0.36, 0.42]} position={[0, 0.18, 0]} color="#d9a874" radius={0.02} />
          <Box size={[0.08, 0.005, 0.43]} position={[0, 0.362, 0]} color="#c48f5c" radius={0.001} shadow={false} />
          <Box size={[0.51, 0.06, 0.05]} position={[0, 0.3, 0.2]} color="#f3e1c5" radius={0.01} shadow={false} />
        </group>
      );
    case 'clothes':
      return (
        <group rotation={[0, 0.4, 0]}>
          <Box size={[0.42, 0.06, 0.34]} position={[0, 0.03, 0]} color={color} radius={0.025} />
          <Box size={[0.36, 0.05, 0.28]} position={[0.02, 0.085, -0.01]} rotation={[0, 0.3, 0]} color={color} radius={0.02} />
        </group>
      );
    case 'socks':
      return (
        <group rotation={[0, -0.6, 0]}>
          <Box size={[0.08, 0.05, 0.26]} position={[-0.06, 0.025, 0]} color={color} radius={0.02} />
          <Box size={[0.08, 0.05, 0.26]} position={[0.06, 0.025, 0.03]} rotation={[0, 0.3, 0]} color={color} radius={0.02} />
        </group>
      );
    case 'book':
      return (
        <group rotation={[0, 0.7, 0]}>
          <Box size={[0.3, 0.05, 0.22]} position={[0, 0.025, 0]} color={color} radius={0.01} />
          <Box size={[0.27, 0.045, 0.2]} position={[0.01, 0.072, 0]} rotation={[0, 0.25, 0]} color="#ffd27a" radius={0.01} />
        </group>
      );
    case 'shoes':
      return (
        <group rotation={[0, 0.3, 0]}>
          {[-0.07, 0.07].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <Box size={[0.11, 0.07, 0.28]} position={[0, 0.035, 0]} color={color} radius={0.03} />
              <Box size={[0.115, 0.02, 0.29]} position={[0, 0.01, 0]} color="#ffffff" radius={0.008} />
            </group>
          ))}
        </group>
      );
    case 'pillow':
      return <Box size={[0.5, 0.13, 0.32]} position={[0, 0.065, 0]} rotation={[0, 0.5, 0]} color={color} radius={0.06} />;
    case 'blanket':
      return (
        <group rotation={[0, -0.3, 0]}>
          <Box size={[0.5, 0.16, 0.36]} position={[0, 0.08, 0]} color={color} radius={0.05} />
          <Box size={[0.5, 0.02, 0.06]} position={[0, 0.12, 0.17]} color="#ffffff" radius={0.008} shadow={false} />
        </group>
      );
    case 'suitcase':
      return (
        <group rotation={[0, 0.5, 0]}>
          <Box size={[0.46, 0.6, 0.2]} position={[0, 0.34, 0]} color={color} radius={0.05} />
          <Box size={[0.16, 0.05, 0.04]} position={[0, 0.68, 0]} color="#5b4b66" radius={0.015} />
          {[-0.17, 0.17].map((x) => <Ball key={x} radius={0.03} position={[x, 0.03, 0]} color="#5b4b66" />)}
        </group>
      );
    case 'cup':
      return (
        <group>
          <Cyl top={0.06} bottom={0.05} height={0.11} position={[0, 0.055, 0]} color={color} />
          <mesh position={[0.065, 0.06, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <torusGeometry args={[0.03, 0.01, 8, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>
        </group>
      );
    case 'phone':
      return <Box size={[0.08, 0.015, 0.16]} position={[0, 0.008, 0]} rotation={[0, 0.4, 0]} color="#4a3f58" radius={0.006} />;
    case 'toy':
      return (
        <group>
          <Ball radius={0.12} position={[0, 0.12, 0]} color={color} />
          <Ball radius={0.05} position={[-0.08, 0.24, 0]} color={color} />
          <Ball radius={0.05} position={[0.08, 0.24, 0]} color={color} />
        </group>
      );
  }
}
