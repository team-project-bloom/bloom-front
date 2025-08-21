import { useCallback, useEffect, useState } from 'react';
import { deleteFavourite, getFavourite, postFavourite } from '../api';
import { WineFavourite } from '../types/Wine';

export const useFavourite = () => {
  const [favourite, setFavourite] = useState<WineFavourite[]>(() => {
    try {
      const saved = localStorage.getItem('favourite');

      if (!saved) {
        return [];
      }

      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('favourite', JSON.stringify(favourite));
  }, [favourite]);

  const fetchFavourite = useCallback(async () => {
    setLoading(true);
    try {
      const items = await getFavourite();

      setFavourite(items);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavourite();
  }, [fetchFavourite]);

  const addToFavourite = useCallback(async (wineId: number) => {
    setLoading(true);
    try {
      const item = await postFavourite(wineId);

      setFavourite((prev: WineFavourite[]) => [...prev, item]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFromFavourite = useCallback(
    async (id: number, wineId: number) => {
      setLoading(true);

      await deleteFavourite(id);
      try {
        setFavourite((prev: WineFavourite[]) =>
          prev.filter(w => w.wineId !== wineId),
        );
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    favourite,
    loading,
    error,
    addToFavourite,
    removeFromFavourite,
    fetchFavourite,
  };
};
