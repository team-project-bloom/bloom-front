import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getWines, getWinesByParams } from '../api';
import { FilterOptions } from '../types/FilterOptions';
import { WineSearchParams } from '../types/Params';
import { Wine } from '../types/Wine';

interface WinesContextType {
  wines: Wine[];
  loading: boolean;
  error: string;
  fetchWinesByParams: (params: WineSearchParams) => Promise<void>;
  fetchAllWines: () => Promise<void>;
  initialFilters: FilterOptions | null;
}

export const WinesContext = React.createContext<WinesContextType>({
  wines: [],
  loading: false,
  error: '',
  fetchWinesByParams: async (_params: WineSearchParams) => {},
  fetchAllWines: async () => {},
  initialFilters: null,
});

interface Props {
  children: React.ReactNode;
}

export const WinesProvider: React.FC<Props> = ({ children }) => {
  const [wines, setWines] = useState<Wine[]>(() => {
    try {
      const saved = localStorage.getItem('wines');

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const initialFilters = useRef<FilterOptions | null>(null);

  const fetchAllWines = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedWines = await getWines();

      setWines(fetchedWines);
      localStorage.setItem('wines', JSON.stringify(fetchedWines));

      if (!initialFilters.current && fetchedWines.length > 0) {
        const prices = fetchedWines.map(w => w.price);
        const vintage = fetchedWines.map(w => w.vintage);

        initialFilters.current = {
          price: [Math.min(...prices), Math.max(...prices)],
          alcohol: Array.from(new Set(fetchedWines.map(w => w.alcohol))).sort(),
          variety: Array.from(new Set(fetchedWines.map(w => w.variety))),
          value: Array.from(new Set(fetchedWines.map(w => w.value))),
          vintage: [Math.min(...vintage), Math.max(...vintage)],
          grape: Array.from(new Set(fetchedWines.map(w => w.grape))),
          region: Array.from(new Set(fetchedWines.map(w => w.region))),
        };
      }
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

  const fetchWinesByParams = useCallback(async (params: WineSearchParams) => {
    setLoading(true);
    try {
      const fetchedWines = await getWinesByParams(
        params.wineSearchDto,
        params.pageable,
      );

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
      fetchAllWines,
      initialFilters: initialFilters.current,
    }),
    [wines, loading, error, fetchWinesByParams, fetchAllWines],
  );

  return (
    <WinesContext.Provider value={value}>{children}</WinesContext.Provider>
  );
};

export const useWines = () => {
  return useContext(WinesContext);
};
