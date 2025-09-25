import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { addWishlist, clearWishlistServer, getWishlistIds, removeWishlist } from "../api";

const WishlistContext = createContext(null);
const LS_KEY = "pookie_wishlist_ids_v1";

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch { return new Set(); }
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(Array.from(ids)));
  }, [ids]);

  // On mount: pull from server (demo user) and merge
  useEffect(() => {
    getWishlistIds().then(serverIds => {
      setIds(prev => new Set([...(prev||[]), ...serverIds]));
    }).catch(()=>{ /* ignore offline/server errors */ });
  }, []);

  const has = (id) => ids.has(id);

  const add = async (id) => {
    setIds(prev => new Set([...prev, id]));
    try { await addWishlist(id); } catch {}
  };

  const remove = async (id) => {
    setIds(prev => {
      const copy = new Set(prev);
      copy.delete(id);
      return copy;
    });
    try { await removeWishlist(id); } catch {}
  };

  const toggle = (id) => has(id) ? remove(id) : add(id);

  const clearAll = async () => {
    setIds(new Set());
    try { await clearWishlistServer(); } catch {}
  };

  const value = useMemo(() => ({ ids, has, add, remove, toggle, clearAll }), [ids]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(){
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be inside WishlistProvider");
  return ctx;
}
