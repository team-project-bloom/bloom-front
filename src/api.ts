import { Wine } from './types/Wine';

const API_URL = 'http://localhost:8080/api/';

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

export async function postAuth(): Promise<string> {
const res = await fetch(API_URL + 'auth/registration', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  
})

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
    Authorization: `Bearer ${token}`
  }

  const res = await fetch(url, { headers, ...options });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

export async function getWines(): Promise<Wine[]> {
  const data = await apiFetch<{ content: Wine[] }>(API_URL + 'wines', { method: 'GET' });

  return data.content as Wine[];
}

export async function getWineById(wineId: number): Promise<Wine> {
  const data = await apiFetch<Wine>(API_URL + `wines/${wineId}`, { method: 'GET' });

  return data as Wine;
}

export async function getWinesByParams(wineSearchDto: WineSearchDto, pageable: Pageable): Promise<Wine[]> {
  const params = new URLSearchParams();

  Object.entries(wineSearchDto).forEach(([key, value]) => {
    params.append(key, value)
  })

  Object.entries(pageable).forEach(([key, value]) => {

    params.append(key, value)

  })

  const url = `${API_URL}wines/search?${params.toString()}`;

  const data = await apiFetch<{ content: Wine[] }>(url, { method: 'GET' });

  return data.content;
}

export async function getCart(): Promise<Wine[]> {
  const data = await apiFetch<{ itemCartDtos: Wine[] }>(API_URL + 'cart', { method: 'GET' });

  return data.itemCartDtos as Wine[];
}

export async function postCart(wineId: number, quantity: number): Promise<any> {
  const data = await apiFetch(API_URL + `cart`, {
    method: 'POST',
    body: JSON.stringify({ wineId, quantity })
  });

  return data;
}

export async function putCart(wineId: number, quantity: number): Promise<any> {
  const data = await apiFetch(API_URL + `cart/item/${wineId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity })
  });

  console.log(data)

  return data;
}

export async function deleteCart(wineId: number): Promise<any> {
  const data = await apiFetch(API_URL + `cart/${wineId}`, { method: 'DELETE' });

  return data;

}
