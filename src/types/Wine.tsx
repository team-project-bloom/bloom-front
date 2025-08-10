export enum WineVariety {
  RED = 'RED',
  ORANGE = 'ORANGE',
  ROSE = 'ROSE',
  PROSECCO = 'PROSECCO',
  SPARKLING = 'SPARKLING',
}

export enum WineValue {
  NON_ORGANIC = 'NON_ORGANIC',
  VEGAN = 'VEGAN',
  NATURAL = 'NATURAL',
  ORGANIC = 'ORGANIC',
}

export interface Wine {
  id: number;
  title: string;
  price: number;
  regionId: number;
  variety: WineVariety;
  value: WineValue;
  imgUrl: string;
  alcohol: number;
  vintage: number;
  grapeId: number;
  description?: string;
  quantity?: number;
  wineId?: number;
}

export interface WineCart {
  id: number;
  title: string;
  price: number;
  variety: WineVariety;
  quantity: number;
  wineId: number;
}
