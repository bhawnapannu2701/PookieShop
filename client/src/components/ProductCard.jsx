import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useLocale } from '../context/LocaleContext.jsx'
import { Link } from 'react-router-dom'
import LazyImage from './LazyImage.jsx'

export default function ProductCard({ p }) {
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { formatPrice, t } = useLocale();

  const wished = has(p.id);
  const id = p.id;

  // NUMERIC-FIRST local files (no rename to pN needed)
  const candidates = [
    `/img/products/${id}.jpg`,
    `/img/products/${id}.jpeg`,
    `/img/products/${id}.png`,
    `/img/products/${id}.webp`,
    // secondary (in case you also have pN.* later)
    `/img/products/p${id}.jpg`,
    `/img/products/p${id}.jpeg`,
    `/img/products/p${id}.png`,
    `/img/products/p${id}.webp`,
    // DB fallback
    p.imageUrl
  ];

  return (
    <div className="card" style={{position:'relative'}}>
      <button
        onClick={()=>toggle(p.id)}
        title={wished ? 'Remove from Wishlist' : 'Add to Wishlist'}
        style={{
          position:'absolute', right:10, top:10, zIndex:2,
          border:'0', background:'#fff', borderRadius:999, padding:'6px 10px',
          boxShadow:'0 6px 16px rgba(0,0,0,.12)', cursor:'pointer', fontSize:16
        }}
      >
        {wished ? '❤️' : '🤍'}
      </button>

      <Link to={`/product/${p.id}`} style={{display:'block'}}>
        <LazyImage
          src={candidates[0]}
          alts={candidates.slice(1)}
          alt={p.name}
          style={{ borderRadius: 16, overflow: 'hidden' }}
          imgStyle={{ width: '100%', height: 200, objectFit: 'cover', display:'block' }}
        />
      </Link>

      <div className="info">
        <Link to={`/product/${p.id}`} style={{ textDecoration:'none', color:'inherit' }}>
          <div style={{ fontWeight: 800, marginBottom: 6 }}>{p.name}</div>
        </Link>
        <div className="price">{formatPrice(p.price)}</div>
        <div style={{ marginTop: 10 }}>
          <button className="btn" onClick={() => addItem(p, 1)}>
            {t('actions.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
}
