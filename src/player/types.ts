// Player identity. The id is permanent and separate from the nickname,
// so a nickname can change and the same id can later link to a cloud account
// (friends, room visits, leaderboards). No real names or personal data are stored.

export type HairStyle = 'short' | 'long' | 'bun' | 'curly' | 'spiky' | 'bob';
export type OutfitStyle = 'tshirt' | 'hoodie' | 'dress' | 'overalls';
export type Accessory = 'none' | 'glasses' | 'cap' | 'headphones' | 'bow' | 'flower';

export interface AvatarConfig {
  skin: string;
  hair: HairStyle;
  hairColor: string;
  outfit: OutfitStyle;
  outfitColor: string;
  accessory: Accessory;
}

export interface PlayerProfile {
  /** Stable unique id, generated once on this device. */
  id: string;
  nickname: string;
  avatar: AvatarConfig;
  createdAt: number;
}
