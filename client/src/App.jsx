import React, { Suspense, lazy } from 'react'
import Navbar from './components/Navbar.jsx'
import RouteFallback from './components/RouteFallback.jsx'

// Lazy pages (code-splitting)
const ShopAll = lazy(() => import('./pages/ShopAll.jsx'))
const New = lazy(() => import('./pages/New.jsx'))
const ProductDetails = lazy(() => import('./pages/ProductDetails.jsx'))
const Basket = lazy(() => import('./pages/Basket.jsx'))
const Checkout = lazy(() => import('./pages/Checkout.jsx'))
const Account = lazy(() => import('./pages/Account.jsx'))
const Wishlist = lazy(() => import('./pages/Wishlist.jsx'))
const Admin = lazy(() => import('./pages/Admin.jsx'))

import { Routes, Route } from 'react-router-dom'

export default function App(){
  return (
    <div>
      <Navbar />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<ShopAll />} />
          <Route path="/new" element={<New />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </div>
  )
}
