import type { RoomDefinition } from '../types/game';

// The basement. Same coordinates as the bedroom: centred at (0, 0), back wall at z = -depth/2,
// left wall at x = -width/2. Window/door `center` is measured along their wall.

export const basement: RoomDefinition = {
  id: 'basement',
  name: 'Basement',
  icon: '📦',
  size: { width: 6.2, depth: 5.4, height: 2.5 },
  theme: {
    wall: '#e9e4dc',
    wallLower: '#c4bcb0',
    trim: '#d8d2c8',
    floor: ['#b9b5ae', '#a8a39b'],
    floorStyle: 'concrete',
    base: '#9c968c',
    curtain: '#c9b6e4',
  },
  window: { wall: 'back', center: 0.6, bottom: 1.75, width: 0.9, height: 0.45 },
  door: { wall: 'left', center: 1.6, bottom: 0, width: 0.9, height: 2.0 },
  objects: ['workbench', 'shelving', 'boiler', 'chest-freezer', 'toolbox', 'ladder', 'bicycle', 'cardboard-box', 'broom', 'bucket', 'paint', 'fuse-box'],
  avatarSpot: [2.5, 2.1],
  nextRoom: 'entrance',
};
