import type { RoomDefinition } from '../types/game';

// The city street: the last stop on the map. Outdoors, so the floor is paving, the two walls are
// the fronts of buildings, the window is a shop window and the door is a shop door. Same coordinates
// as the bedroom: centred at (0, 0), back wall at z = -depth/2, left wall at x = -width/2.

export const city: RoomDefinition = {
  id: 'city',
  name: 'City',
  icon: '🏙️',
  size: { width: 7.0, depth: 6.0, height: 3.2 },
  theme: {
    wall: '#e9b48f',
    wallLower: '#9b8f84',
    trim: '#f6efe4',
    floor: ['#c9c3ba', '#b8b1a7'],
    floorStyle: 'paving',
    outdoor: true,
    base: '#7cbf6a',
    curtain: '#e46a5a',
  },
  window: { wall: 'left', center: -0.6, bottom: 0.8, width: 2.0, height: 1.5 },
  door: { wall: 'back', center: 2.4, bottom: 0, width: 1.1, height: 2.3 },
  objects: ['park-bench', 'bus-stop', 'street-lamp', 'traffic-light', 'post-box', 'fountain', 'ice-cream-cart', 'bus-ticket', 'skateboard', 'pigeon', 'street-sign', 'city-map'],
  avatarSpot: [2.7, 2.4],
};
