export interface Pageable {
  page: number;
  size: number;
  sort: string[];
}

export interface WineSearchParams {
  wineSearchDto: Record<string, any>;
  pageable: Pageable;
}
