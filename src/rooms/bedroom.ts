import type { RoomDefinition } from '../types/game';

// The bedroom. The room is centred at (0, 0); the back wall is at z = -depth/2,
// the left wall at x = -width/2. Window/door `center` is measured along their wall.

export const bedroom: RoomDefinition = {
  id: 'bedroom',
  name: 'Bedroom',
  icon: '🛏️',
  size: { width: 6, depth: 6, height: 2.8 },
  theme: {
    wall: '#f8e8dc',
    wallLower: '#f0cfc0',
    trim: '#fffaf4',
    floor: ['#e9caa5', '#e1be96'],
    base: '#d9c6ec',
    curtain: '#a9cdea',
  },
  window: { wall: 'back', center: 0.6, bottom: 0.95, width: 1.5, height: 1.25 },
  door: { wall: 'left', center: 1.7, bottom: 0, width: 0.95, height: 2.15 },
  objects: ['bed', 'lamp', 'nightstand', 'carpet', 'wardrobe', 'desk', 'chair', 'bookshelf', 'picture', 'mirror', 'plant', 'chest'],
  avatarSpot: [2.45, 2.45],
  nextRoom: 'kitchen',
};
