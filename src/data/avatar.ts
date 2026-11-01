import type { Accessory, AvatarConfig, HairStyle, OutfitStyle } from '../player/types';

// Avatar creator options. Add colours or presets here.

export const SKIN_TONES = ['#ffe0c7', '#f7c9a3', '#e8b088', '#c98b5e', '#9c6340', '#6e4429'];
export const HAIR_COLORS = ['#3b2a20', '#6b4423', '#b07642', '#e8c170', '#d9603b', '#2f2f3a', '#c9a6e8', '#8fc7e8'];
export const OUTFIT_COLORS = ['#ff8f7a', '#8fd3b6', '#a9c9f2', '#c3b0e6', '#ffd27a', '#f6a6c8'];

export const HAIR_STYLES: { id: HairStyle; label: string }[] = [
  { id: 'short', label: 'Short' },
  { id: 'long', label: 'Long' },
  { id: 'bun', label: 'Bun' },
  { id: 'curly', label: 'Curly' },
  { id: 'spiky', label: 'Spiky' },
  { id: 'bob', label: 'Bob' },
];

export const OUTFITS: { id: OutfitStyle; label: string }[] = [
  { id: 'tshirt', label: 'T-shirt' },
  { id: 'hoodie', label: 'Hoodie' },
  { id: 'dress', label: 'Dress' },
  { id: 'overalls', label: 'Overalls' },
];

export const ACCESSORIES: { id: Accessory; label: string }[] = [
  { id: 'none', label: 'None' },
  { id: 'glasses', label: 'Glasses' },
  { id: 'cap', label: 'Cap' },
  { id: 'headphones', label: 'Headphones' },
  { id: 'bow', label: 'Bow' },
  { id: 'flower', label: 'Flower' },
];

export const PRESETS: { name: string; avatar: AvatarConfig }[] = [
  { name: 'Sunny', avatar: { skin: SKIN_TONES[1], hair: 'long', hairColor: HAIR_COLORS[3], outfit: 'dress', outfitColor: OUTFIT_COLORS[4], accessory: 'flower' } },
  { name: 'Milo', avatar: { skin: SKIN_TONES[3], hair: 'curly', hairColor: HAIR_COLORS[0], outfit: 'hoodie', outfitColor: OUTFIT_COLORS[2], accessory: 'headphones' } },
  { name: 'Kiki', avatar: { skin: SKIN_TONES[0], hair: 'bun', hairColor: HAIR_COLORS[4], outfit: 'overalls', outfitColor: OUTFIT_COLORS[5], accessory: 'bow' } },
  { name: 'Leo', avatar: { skin: SKIN_TONES[2], hair: 'spiky', hairColor: HAIR_COLORS[1], outfit: 'tshirt', outfitColor: OUTFIT_COLORS[1], accessory: 'cap' } },
  { name: 'Nova', avatar: { skin: SKIN_TONES[5], hair: 'bob', hairColor: HAIR_COLORS[6], outfit: 'tshirt', outfitColor: OUTFIT_COLORS[3], accessory: 'glasses' } },
  { name: 'Pip', avatar: { skin: SKIN_TONES[4], hair: 'short', hairColor: HAIR_COLORS[5], outfit: 'hoodie', outfitColor: OUTFIT_COLORS[0], accessory: 'none' } },
];

export const DEFAULT_AVATAR = PRESETS[0].avatar;
