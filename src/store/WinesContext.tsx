import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getWines, getWinesByParams } from '../api';
import { Wine } from '../types/Wine';

export const WinesContext = React.createContext({
  wines: [] as Wine[],
  loading: false,
  error: '',
  fetchWinesByParams: async(_params: any) => {},
  fetchAllWines: async () => {}
});

interface Props {
  children: React.ReactNode;
}

export const WinesProvider: React.FC<Props> = ({ children }) => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAllWines = useCallback(async() => {
    setLoading(true);
      try {
        const fetchedWines = await getWines();

        setWines(fetchedWines);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
  }, []);

  const fetchWinesByParams = useCallback(async(params: any) => {
    setLoading(true);
      try {
        const fetchedWines = await getWinesByParams(params.wineSearchDto, params.pageable);
        setWines(fetchedWines);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
  }, []);

  useEffect(() => {
    fetchAllWines();
  }, [fetchAllWines]);

  const value = useMemo(
    () => ({
      wines,
      loading,
      error,
      fetchWinesByParams,
      fetchAllWines
    }),
    [wines,loading, error, fetchWinesByParams, fetchAllWines],
  );

  return (
    <WinesContext.Provider value={value}>{children}</WinesContext.Provider>
  );
};

export const useWines = () => {
  return useContext(WinesContext);
};
