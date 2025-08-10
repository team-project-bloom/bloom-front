import { useEffect, useState } from 'react';
import { getWineById } from '../api';
import { Wine } from '../types/Wine';

export const useWine = (wineId: number) => {
  const [wine, setWine] = useState<Wine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!wineId) {
      return;
    }

    setLoading(true);
    getWineById(wineId)
      .then(data => setWine(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [wineId]);

  return { wine, loading, error };
};
