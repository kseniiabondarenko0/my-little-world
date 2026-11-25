import type { RoomDefinition } from '../types/game';

// The office: a small open-plan office in the city. Same coordinates as the bedroom: centred at (0, 0),
// back wall at z = -depth/2, left wall at x = -width/2.

export const office: RoomDefinition = {
  id: 'office',
  name: 'Office',
  icon: '💼',
  size: { width: 6.4, depth: 5.2, height: 3.0 },
  theme: {
    wall: '#eef1f5',
    wallLower: '#c5d3e3',
    trim: '#ffffff',
    floor: ['#b9c2cc', '#a9b3be'],
    floorStyle: 'tiles',
    base: '#9fb2c8',
    curtain: '#d9dee5',
  },
  window: { wall: 'back', center: -0.8, bottom: 0.9, width: 2.0, height: 1.4 },
  door: { wall: 'left', center: 1.6, bottom: 0, width: 0.95, height: 2.2 },
  objects: ['meeting-table', 'office-chair', 'filing-cabinet', 'water-cooler', 'shredder', 'printer', 'computer', 'laptop', 'stapler', 'sticky-notes', 'fire-extinguisher', 'sales-chart'],
  avatarSpot: [2.5, 2.0],
  nextRoom: 'hospital',
};
