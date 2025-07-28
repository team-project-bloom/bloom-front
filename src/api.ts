import { Wine } from './types/Wine';
import wines from '../public/api/wines.json';

const delay = () => new Promise(resolve => setTimeout(resolve, 500));

export function getWines(): Promise<Wine[]> {
  return delay().then(() => wines);
}
