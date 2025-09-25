// client/src/api.js

// Prefer env var; otherwise fallback to Render backend (no trailing slash)
const API_BASE =
  (import.meta.env.VITE_API_BASE && import.meta.env.VITE_API_BASE.replace(/\/+$/, "")) ||
  "https://pookieshop-1.onrender.com";

// Small helper to build URL with query params
function withParams(base, params = {}) {
  const url = new URL(base);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });
  return url.toString();
}

/* ---------- Products ---------- */
// Existing function (hits /api/products/raw)
export async function getProducts(page = 0, size = 12) {
  const res = await fetch(withParams(`${API_BASE}/api/products/raw`, { page, size }));
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

// ✅ New: explicit named export used by ShopAll.jsx
// Alias to getProducts so both names work without changing the backend.
export async function getProductsRaw(page = 0, size = 12) {
  return getProducts(page, size);
}

export async function searchProducts(
  { q = "", category = "", sort = "reco", page = 0, size = 12 } = {}
) {
  const res = await fetch(
    withParams(`${API_BASE}/api/products`, { q, category, sort, page, size })
  );
  if (!res.ok) throw new Error("Failed to search products");
  return res.json();
}

export async function getProductDetails(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

/* ---------- Reviews ---------- */
export async function postReview({ productId, rating, text }) {
  const res = await fetch(`${API_BASE}/api/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, rating, text })
  });
  if (!res.ok) throw new Error("Failed to post review");
  return res.json();
}

/* ---------- Wishlist ---------- */
export async function getWishlistIds() {
  const res = await fetch(`${API_BASE}/api/wishlist`);
  if (!res.ok) throw new Error("Failed to load wishlist");
  return res.json();
}

export async function getWishlistProducts() {
  const res = await fetch(`${API_BASE}/api/wishlist/products`);
  if (!res.ok) throw new Error("Failed to load wishlist products");
  return res.json();
}

export async function addWishlist(productId) {
  const res = await fetch(`${API_BASE}/api/wishlist/${productId}`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to add to wishlist");
  return res.json();
}

export async function removeWishlist(productId) {
  const res = await fetch(`${API_BASE}/api/wishlist/${productId}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to remove from wishlist");
  return res.json();
}

export async function clearWishlistServer() {
  const res = await fetch(`${API_BASE}/api/wishlist`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to clear wishlist");
  return res.json();
}

/* ---------- Coupons ---------- */
export async function validateCoupon(code) {
  const res = await fetch(`${API_BASE}/api/coupons/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code })
  });
  if (!res.ok) throw new Error("Failed to validate coupon");
  return res.json();
}

/* ---------- Checkout (mock) ---------- */
export async function createMockOrder(payload) {
  const res = await fetch(`${API_BASE}/api/checkout/mock-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error("Failed to create mock order");
  return res.json();
}

/* ---------- Admin (demo) ---------- */
const adminHeaders = (token) => ({
  "Content-Type": "application/json",
  "X-Admin-Token": token
});

export async function adminCreateProduct(data, token) {
  const res = await fetch(`${API_BASE}/api/admin/products`, {
    method: "POST",
    headers: adminHeaders(token),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Create failed");
  return res.json();
}

export async function adminUpdateProduct(id, data, token) {
  const res = await fetch(`${API_BASE}/api/admin/products/${id}`, {
    method: "PUT",
    headers: adminHeaders(token),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
}

export async function adminDeleteProduct(id, token) {
  const res = await fetch(`${API_BASE}/api/admin/products/${id}`, {
    method: "DELETE",
    headers: { "X-Admin-Token": token }
  });
  if (!res.ok) throw new Error("Delete failed");
  return res.json();
}

// Keep default export unchanged to avoid breaking other imports
export default API_BASE;
