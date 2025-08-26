import { Wine, WineCart, WineFavourite } from './types/Wine';

const API_URL = `${import.meta.env.VITE_API_URL}/api/`;

interface WineSearchDto {
  title?: string[];
  priceFrom?: number;
  priceTo?: number;
  alcohol?: number[];
  variety?: string[];
  value?: string[];
  vintageFrom?: number;
  vintageTo?: number;
  grape?: string[];
}

interface Pageable {
  page: number;
  size: number;
  sort?: string[];
}

console.log(import.meta.env.REACT_APP_API_URL)

export async function postAuth(): Promise<string> {
  const res = await fetch(API_URL + 'auth/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const text = await res.text();

    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  const data = await res.json();

  return data.token;
}

export async function getToken(): Promise<string> {
  let token = localStorage.getItem('token');

  if (!token) {
    token = await postAuth();
    localStorage.setItem('token', token);
  }

  return token;
}

async function apiFetch<T>(url: string, options: RequestInit): Promise<T> {
  const token = await getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(url, { headers, ...options });
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
}

export async function getWines(): Promise<Wine[]> {
  const data = await apiFetch<{ content: Wine[] }>(API_URL + 'wines', {
    method: 'GET',
  });

  return data.content as Wine[];
}

export async function getWineById(wineId: number): Promise<Wine> {
  const data = await apiFetch<Wine>(API_URL + `wines/${wineId}`, {
    method: 'GET',
  });

  return data as Wine;
}

export async function getWinesByParams(
  wineSearchDto: WineSearchDto,
  pageable: Pageable,
): Promise<Wine[]> {
  const params = new URLSearchParams();

  Object.entries(wineSearchDto).forEach(([key, value]) => {
    params.append(key, value);
  });

  Object.entries(pageable).forEach(([key, value]) => {
    params.append(key, value);
  });

  const url = `${API_URL}wines/search?${params.toString()}`;

  const data = await apiFetch<{ content: Wine[] }>(url, { method: 'GET' });

  return data.content;
}

export async function getCart(): Promise<WineCart[]> {
  const data = await apiFetch<{ itemCartDtos: WineCart[] }>(API_URL + 'cart', {
    method: 'GET',
  });

  return data.itemCartDtos as WineCart[];
}

export async function postCart(
  wineId: number,
  quantity: number,
): Promise<WineCart> {
  const data = await apiFetch(API_URL + `cart`, {
    method: 'POST',
    body: JSON.stringify({ wineId, quantity }),
  });

  return data as WineCart;
}

export async function putCart(
  wineId: number,
  quantity: number,
): Promise<WineCart> {
  const data = await apiFetch(API_URL + `cart/items/${wineId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });

  return data as WineCart;
}

export async function deleteCart(wineId: number): Promise<void> {
  await apiFetch(API_URL + `cart/${wineId}`, { method: 'DELETE' });
}

export async function getFavourite(): Promise<WineFavourite[]> {
  const data = await apiFetch<{ content: WineFavourite[] }>(
    API_URL + 'favorite/all',
    {
      method: 'GET',
    },
  );

  return data.content as WineFavourite[];
}

export async function postFavourite(wineId: number): Promise<WineFavourite> {
  const data = await apiFetch(API_URL + `favorite/add`, {
    method: 'POST',
    body: JSON.stringify({ wineId }),
  });

  return data as WineFavourite;
}

export async function deleteFavourite(wineId: number): Promise<void> {
  await apiFetch(API_URL + `favorite/${wineId}`, {
    method: 'DELETE',
  });
}
