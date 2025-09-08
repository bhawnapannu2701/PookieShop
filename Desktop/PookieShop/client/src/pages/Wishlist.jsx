import { useEffect, useState } from 'react'
import { getWishlistProducts } from '../api'
import ProductCard from '../components/ProductCard.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'

function CardSkeleton(){
  return (
    <div className="card">
      <div className="skeleton" />
      <div className="info">
        <div className="skeleton" style={{height:14, margin:'8px 0', borderRadius:6}}/>
        <div className="skeleton" style={{height:14, width:80, borderRadius:6}}/>
      </div>
    </div>
  )
}

export default function Wishlist(){
  const { clearAll } = useWishlist()
  const [items,setItems] = useState(null)
  const [error,setError] = useState(null)

  useEffect(()=>{
    setItems(null); setError(null)
    getWishlistProducts().then(setItems).catch(setError)
  },[])

  return (
    <div className="page">
      <h1>🤍 Wishlist</h1>
      {error && <p style={{color:'crimson'}}>Failed to load wishlist.</p>}
      {!items && (
        <div className="card-grid">
          {Array.from({length:8}).map((_,i)=><CardSkeleton key={i}/>)}
        </div>
      )}
      {items && items.length === 0 && <p>No favorites yet. Tap the 🤍 on products to save them!</p>}
      {items && items.length > 0 && (
        <>
          <div style={{display:'flex', justifyContent:'flex-end', margin:'8px 0'}}>
            <button className="navlink" onClick={clearAll}>Clear Wishlist</button>
          </div>
          <div className="card-grid">
            {items.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </>
      )}
    </div>
  )
}
