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

export enum WineImg {
  BILLY_BUTTON_COL_FONDO = 'public/wines_images/Billy Button Col Fondo.png',
  COBAW_RIDGE_PYRENEES_ROSÉ = 'public/wines_images/Cobaw Ridge Pyrenees Rosé.png',
  DOMAINE_GAYDA_SPHÈRE = 'public/wines_images/Domaine Gayda Sphère.png',
  FUNKSTILLE_SKIN_CONTACT = 'public/wines_images/Funkstille Skin Contact.png',
  JAUMA_ORIGINS_SKIN_CONTACT = 'public/wines_images/Jauma Origins Skin Contact.png',
  LANSDOWNE_SUPER_PLONK = 'public/wines_images/Lansdowne Super Plonk.png',
  OLD_MATES_PINOT_NOIR = 'public/wines_images/Old Mates Pinot Noir 2024.png',
  OLD_MATES_ROSÉ = 'public/wines_images/Old Mates Rosé 2024.png',
  SÈT_E_MÈZ_PÉT_NAT_ROSÉ = 'public/wines_images/Sèt e Mèz Pét Nat Rosé.png',
  VINO_FRIENDO_ROSATO = 'public/wines_images/Vino Friendo Rosato 2024.png',
}

export interface Wine {
  id: number;
  title: string;
  price: number;
  region: string;
  variety: WineVariety;
  value: WineValue;
  alcohol: number;
  vintage: number;
  grape: string;
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

export interface WineFavourite {
  id: number;
  userId: number;
  wineId: number;
  title: string;
  price: number;
  variety: string;
  value: string;
  region: string;
  grape: string;
}
