export interface Wine {
  id: number;
  title: string;
  price: number;
  regionId: number;
  variety: 'RED' | 'ORANGE' | 'ROSE' | 'PROSECCO' | 'SPARKLING';
  value: 'NON_ORGANIC' | 'VEGAN' | 'NATURAL' | 'ORGANIC';
  imgUrl: string;
  alcohol?: number;
  vintage?: number;
  grapeId?: number;
  description?: string;
}
