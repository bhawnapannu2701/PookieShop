import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { LocaleProvider } from './context/LocaleContext.jsx'

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Root element #root not found in index.html')
}

createRoot(rootEl).render(
  <React.StrictMode>
    <BrowserRouter>
      <LocaleProvider>
        <CartProvider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </CartProvider>
      </LocaleProvider>
    </BrowserRouter>
  </React.StrictMode>
)
