import React, {createContext, useContext, useEffect, useMemo, useState} from "react";

const CartContext = createContext(null);
const LS_KEY = "pookie_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(x => x.id === product.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        imageUrl: product.imageUrl,
        qty
      }];
    });
  };

  const incQty = id => setItems(prev =>
    prev.map(it => it.id === id ? { ...it, qty: it.qty + 1 } : it)
  );

  const decQty = id => setItems(prev =>
    prev.map(it => it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it)
  );

  const removeItem = id => setItems(prev => prev.filter(it => it.id !== id));
  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const totalQty = items.reduce((s, it) => s + it.qty, 0);
    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    return { totalQty, subtotal };
  }, [items]);

  const value = { items, addItem, incQty, decQty, removeItem, clearCart, totals };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
