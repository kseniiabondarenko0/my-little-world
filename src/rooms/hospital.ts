import type { RoomDefinition } from '../types/game';

// The hospital: a bright ward in the city hospital. Same coordinates as the bedroom: centred at (0, 0),
// back wall at z = -depth/2, left wall at x = -width/2.

export const hospital: RoomDefinition = {
  id: 'hospital',
  name: 'Hospital',
  icon: '🏥',
  size: { width: 6.4, depth: 5.4, height: 3.0 },
  theme: {
    wall: '#f2fbf8',
    wallLower: '#bfe6da',
    trim: '#ffffff',
    floor: ['#e9f1ef', '#d5e4e0'],
    floorStyle: 'tiles',
    base: '#9fd3c4',
    curtain: '#a9cdea',
  },
  window: { wall: 'back', center: 0.6, bottom: 1.0, width: 1.6, height: 1.3 },
  door: { wall: 'left', center: 1.7, bottom: 0, width: 1.1, height: 2.2 },
  objects: ['hospital-bed', 'wheelchair', 'drip-stand', 'medical-trolley', 'crutches', 'stethoscope', 'thermometer', 'bandage', 'syringe', 'heart-monitor', 'x-ray', 'eye-chart'],
  avatarSpot: [2.5, 2.1],
  nextRoom: 'supermarket',
};
