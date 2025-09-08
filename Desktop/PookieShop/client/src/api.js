// client/src/api.js

// Prefer env var; warna Render backend par fallback (no trailing slash)
const API_BASE =
  (import.meta.env.VITE_API_BASE && import.meta.env.VITE_API_BASE.replace(/\/+$/, "")) ||
  "https://pookieshop-1.onrender.com";

/* ---------- Products ---------- */
export async function getProducts(page = 0, size = 12) {
  const res = await fetch(`${API_BASE}/api/products/raw?page=${page}&size=${size}`);
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}
export async function searchProducts({ q = "", category = "", sort = "reco", page = 0, size = 12 } = {}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (sort) params.set("sort", sort);
  params.set("page", page);
  params.set("size", size);
  const res = await fetch(`${API_BASE}/api/products?` + params.toString());
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

export default API_BASE;
