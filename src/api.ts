import { Wine } from './types/Wine';

const API_URL = 'http://localhost:8080/api/';

export async function getWines(): Promise<Wine[]> {
  const res = await fetch(API_URL + 'wines', {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMzdiNjNlMS1jZjkyLTQ5MzAtOWNhMS1mOTEyM2RlODA4NjQifQ.2_K_5nyJ4J_Axi0xwzpg2bKaPnrmzH1KqDF5i5OZEYvFAKVGCHBIQST_GsQsuhIH8xqzw9Sp7QpMV-WFgQ80aQ',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch wines: ${res.status}`);
  }

  const data = await res.json();

  return data.content as Wine[];
}

export async function getWineById(wineId: number): Promise<Wine> {
  const res = await fetch(API_URL + `wines/${wineId}`, {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMzdiNjNlMS1jZjkyLTQ5MzAtOWNhMS1mOTEyM2RlODA4NjQifQ.2_K_5nyJ4J_Axi0xwzpg2bKaPnrmzH1KqDF5i5OZEYvFAKVGCHBIQST_GsQsuhIH8xqzw9Sp7QpMV-WFgQ80aQ',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch wines: ${res.status}`);
  }

  const data = await res.json();

  return data as Wine;
}

export async function getCart(): Promise<Wine[]> {
  const res = await fetch(API_URL + 'cart', {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMzdiNjNlMS1jZjkyLTQ5MzAtOWNhMS1mOTEyM2RlODA4NjQifQ.2_K_5nyJ4J_Axi0xwzpg2bKaPnrmzH1KqDF5i5OZEYvFAKVGCHBIQST_GsQsuhIH8xqzw9Sp7QpMV-WFgQ80aQ',
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch wines: ${res.status}`);
  }

  const data = await res.json();

  return data.content as Wine[];
}

// export async function getSaved(): Promise<Wine[]> {
//   const res = await fetch(API_URL + 'saved');

//   if (!res.ok) {
//     throw new Error(`Failed to fetch saved wines: ${res.status}`);
//   }

//   const data: Wine[] = await res.json();
//   return data;
// }

// export async function addSaved(product: Wine) {
//   const {id, ...rest } = product;
//   const res = await fetch(API_URL + 'saved', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({...rest, wineId: id}),
//   });

//   if (!res.ok) throw new Error('Failed to add saved');
//   return res.json();
// }

// export async function deleteSaved(id: string) {
//   const res = await fetch(`${API_URL}saved/${id}`, {
//     method: 'DELETE',
//   });

//   if (!res.ok) throw new Error('Failed to delete saved');
//   return res.json();
// }
