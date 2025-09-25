import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductDetails, postReview } from '../api'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useLocale } from '../context/LocaleContext.jsx'
import LazyImage from '../components/LazyImage.jsx'

export default function ProductDetails(){
  const { id } = useParams()
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const { t, formatPrice } = useLocale()
  const [data,setData] = useState(null)
  const [error,setError] = useState(null)
  const [rating,setRating] = useState(5)
  const [text,setText] = useState('')
  const [busy,setBusy] = useState(false)

  useEffect(()=>{
    setData(null); setError(null)
    getProductDetails(id).then(setData).catch(setError)
  },[id])

  const submitReview = async (e)=>{
    e.preventDefault()
    try {
      setBusy(true)
      await postReview({ productId: Number(id), rating: Number(rating), text })
      const fresh = await getProductDetails(id)
      setData(fresh); setText('')
    } catch { alert('Failed to submit review') } finally { setBusy(false) }
  }

  if (error) return <div className="page"><h1>{t('headings.product')}</h1><p style={{color:'crimson'}}>Not found.</p></div>
  if (!data) return <div className="page"><h1>{t('headings.product')}</h1><div className="skeleton" style={{height:320,borderRadius:20}}/></div>

  const wished = has(Number(id))

  // NUMERIC-FIRST local image candidates
  const localCandidates = [
    `/img/products/${id}.jpg`,
    `/img/products/${id}.jpeg`,
    `/img/products/${id}.png`,
    `/img/products/${id}.webp`,
    `/img/products/p${id}.jpg`,
    `/img/products/p${id}.jpeg`,
    `/img/products/p${id}.png`,
    `/img/products/p${id}.webp`,
    data.imageUrl
  ];

  return (
    <div className="page">
      <div style={{display:'grid', gap:20, gridTemplateColumns:'minmax(260px,520px) 1fr'}}>
        <div>
          <div style={{position:'relative', borderRadius:20, overflow:'hidden', boxShadow:'0 10px 30px rgba(0,0,0,.08)', background:'#fff'}}>
            <button
              onClick={()=>toggle(Number(id))}
              title={wished ? 'Remove from Wishlist' : 'Add to Wishlist'}
              style={{
                position:'absolute', right:10, top:10, zIndex:2,
                border:'0', background:'#fff', borderRadius:999, padding:'6px 10px',
                boxShadow:'0 6px 16px rgba(0,0,0,.12)', cursor:'pointer', fontSize:16
              }}
            >
              {wished ? '❤️' : '🤍'}
            </button>
            <LazyImage
              src={localCandidates[0]}
              alts={localCandidates.slice(1)}
              alt={data.name}
              imgStyle={{width:'100%', height:380, objectFit:'cover', display:'block'}}
            />
          </div>
        </div>

        <div>
          <h1 style={{marginTop:0}}>{data.name}</h1>
          <div className="price" style={{fontSize:22}}>{formatPrice(data.price)}</div>
          <p style={{opacity:.85}}>{data.description}</p>

          <button className="btn" onClick={()=>addItem({
            id: data.id, name: data.name, price: data.price, imageUrl: localCandidates[0]
          }, 1)}>{t('actions.addToCart')}</button>

          <div style={{marginTop:24}}>
            <h3 style={{margin:'10px 0'}}>Reviews ({data.reviewsSummary?.count || 0}) · ⭐ {Number(data.reviewsSummary?.average || 0).toFixed(1)}</h3>
            <div style={{display:'grid', gap:10}}>
              {data.reviews?.length ? data.reviews.map(r=>(
                <div key={r.id} style={{background:'#fff', border:'1px solid #f2efe9', borderRadius:16, padding:'10px 12px'}}>
                  <div style={{fontWeight:700}}>⭐ {r.rating}</div>
                  <div>{r.text}</div>
                  <div style={{opacity:.6, fontSize:12}}>{(r.createdAt || '').toString().replace('T',' ').slice(0,16)}</div>
                </div>
              )) : <div>No reviews yet. Be the first! 🐻</div>}
            </div>

            <form onSubmit={submitReview} style={{marginTop:14, display:'grid', gap:8, maxWidth:520}}>
              <div>
                <label style={{opacity:.8, fontSize:13}}>Rating</label><br/>
                <select value={rating} onChange={e=>setRating(e.target.value)} className="navlink">
                  {[5,4,3,2,1].map(n=><option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label style={{opacity:.8, fontSize:13}}>Your review</label><br/>
                <textarea value={text} onChange={e=>setText(e.target.value)} rows="3" style={{width:'100%', padding:10, borderRadius:12, border:'1px solid #e7e0d8'}} placeholder="Soft, cozy, and adorable!"></textarea>
              </div>
              <div>
                <button disabled={busy} className="btn" type="submit">Post Review</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
