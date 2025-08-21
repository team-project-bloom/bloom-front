export interface FilterOptions {
  price: number[];
  alcohol: number[];
  variety: string[];
  value: string[];
  vintage: number[];
  grape: string[];
  region: string[];
}

export interface FilterRequest {
  title?: string[];
  priceFrom: number;
  priceTo: number;
  vintageFrom: number;
  vintageTo: number;
  alcohol?: number[];
  variety?: string[];
  value?: string[];

  grape?: string[];
  region?: string[];
}

export const defaultFilterRequest: FilterRequest = {
  title: [],
  priceFrom: 0,
  priceTo: 0,
  vintageFrom: 0,
  vintageTo: 0,
  alcohol: [],
  variety: [],
  value: [],
  grape: [],
  region: [],
};
