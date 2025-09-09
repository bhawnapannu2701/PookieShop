import { useEffect, useState } from "react";
import { getProductsRaw } from "../api";
import ProductCard from "../components/ProductCard.jsx";

export default function ShopAll() {
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    getProductsRaw({ page: 0, size: 48 })
      .then(setRows)
      .catch(setErr);
  }, []);

  return (
    <div className="page">
      <h1 style={{ marginTop: 0 }}>🍯 Shop All</h1>
      {err && <div style={{ color: "crimson" }}>Failed to load products.</div>}
      {!rows && <div className="skeleton" style={{ height: 220, borderRadius: 20 }} />}
      {rows && (
        <div className="grid-products">
          {rows.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
