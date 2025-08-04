import React, { useContext, useEffect, useMemo, useState } from 'react';
import { getCart } from '../api';
import { Wine } from '../types/Wine';

export const CartContext = React.createContext({
  wines: [] as Wine[],
  loading: false,
  error: '',
});

interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const fetchedWines = await getCart();

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
    };

    fetchData();
  }, []);

  const value = useMemo(
    () => ({
      wines,
      loading,
      error,
    }),
    [wines, loading, error],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
