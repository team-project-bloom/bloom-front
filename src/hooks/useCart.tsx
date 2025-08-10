import { useCallback, useEffect, useState } from "react";
import { deleteCart, getCart, postCart, putCart } from "../api";
import { Wine } from "../types/Wine";

export const useCart = () => {
  const [cart, setCart] = useState<Wine[]>(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);

  const fetchCart = useCallback(async () => {
    try {
      const items = await getCart();
      setCart(items)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(async (wineId: number, quantity: number) => {
    setCart(prev => {
      const exists = prev.find(w => w.id === wineId);
      if (exists) {
        return prev.map(w =>
          w.id === wineId ? { ...w, quantity: (w.quantity ?? 1) + quantity } : w
        );
      }
      return [...prev];
    });

    try {
      await postCart(wineId, quantity);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        fetchCart();
      }
    }
  }, [fetchCart]);

  const updateQuantity = useCallback(async (wineId: number, quantity: number) => {
    setCart(prev => prev.map(w => w.id === wineId ? {...w, quantity} : w))
    try {
      await putCart(wineId, quantity);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        fetchCart();
      }
    }
  }, [fetchCart]);

  const removeFromCart = useCallback(async (wineId: number) => {
   setCart(prev => prev.filter(w => w.id !== wineId))

    try {
      await deleteCart(wineId);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        fetchCart();
      }
    }
  }, [fetchCart]);

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    fetchCart
  }
};
