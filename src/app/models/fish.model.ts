export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';

export interface Fish {
  name: string;
  lengthMin: number; // in cm
  lengthMax: number;
  color: string;
  rarity: Rarity;
  weightMin: number; // in kg
  weightMax: number;
  pricePerKg: number;
  image?: string;
}
