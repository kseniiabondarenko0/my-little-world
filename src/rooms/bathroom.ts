import type { RoomDefinition } from '../types/game';

// The bathroom. Same coordinates as the bedroom: centred at (0, 0), back wall at z = -depth/2,
// left wall at x = -width/2. Window/door `center` is measured along their wall.

export const bathroom: RoomDefinition = {
  id: 'bathroom',
  name: 'Bathroom',
  icon: '🛁',
  size: { width: 5.6, depth: 5.2, height: 2.7 },
  theme: {
    wall: '#e9f4f8',
    wallLower: '#c9e2ee',
    trim: '#ffffff',
    floor: ['#e3ecf1', '#cfdde6'],
    base: '#b6d4e2',
    curtain: '#c8ead9',
  },
  window: { wall: 'back', center: -0.6, bottom: 1.3, width: 1.0, height: 0.8 },
  door: { wall: 'left', center: 1.5, bottom: 0, width: 0.9, height: 2.1 },
  objects: ['bath', 'washbasin', 'toilet', 'shower', 'towel', 'cabinet', 'washing-machine', 'bath-mat', 'toothbrush', 'soap', 'hairdryer', 'scales'],
  avatarSpot: [2.1, 1.9],
  nextRoom: 'living-room',
};
