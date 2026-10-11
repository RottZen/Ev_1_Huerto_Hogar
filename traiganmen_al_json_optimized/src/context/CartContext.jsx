/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useMemo, useCallback } from 'react';

export const CartContext = createContext();

const readCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('huerto_cart');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage', error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(readCartFromStorage);

  useEffect(() => {
    localStorage.setItem('huerto_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) => (item.id === id ? { ...item, quantity } : item));
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  );

  const checkout = useCallback(() => {
    clearCart();
    return true;
  }, [clearCart]);

  const value = useMemo(
    () => ({ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartTotal, checkout }),
    [cart, addToCart, updateQuantity, removeFromCart, clearCart, cartTotal, checkout],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
