import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useLocale } from "../context/LocaleContext.jsx";
import LazyImage from "../components/LazyImage.jsx";

export default function Basket() {
  const nav = useNavigate();
  const { items, addItem, remove, clear } = useCart();
  const { formatPrice } = useLocale();
  const [code, setCode] = useState("");

  const imgCandidates = (id, fallback) => ([
    `/img/products/${id}.jpg`, `/img/products/${id}.jpeg`,
    `/img/products/${id}.png`, `/img/products/${id}.webp`,
    `/img/products/p${id}.jpg`, `/img/products/p${id}.jpeg`,
    `/img/products/p${id}.png`, `/img/products/p${id}.webp`, fallback
  ]);

  const subtotal = (items || []).reduce((s, it) => s + (it.price || 0) * (it.qty || 0), 0);
  const coupon = useMemo(() => code.trim().toUpperCase(), [code]);
  let discount = 0;
  if (coupon === "BEAR10") discount = Math.round(subtotal * 0.10);
  if (coupon === "PAW100") discount = 100;
  const shipping = subtotal > 0 ? 79 : 0;
  const shippingAfter = coupon === "FREESHIP" ? 0 : shipping;
  const total = Math.max(0, subtotal - discount + shippingAfter);

  return (
    <div className="page">
      <div style={{display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10}}>
        <h1 style={{margin:0}}>🧺 Basket</h1>
        <Link to="/" className="navlink" style={{borderRadius:14, padding:"8px 12px"}}>← Continue Shopping</Link>
      </div>

      {(items || []).length === 0 ? (
        <div style={{padding:20, background:"#fff", border:"1px solid #f2efe9", borderRadius:16}}>
          Your basket is empty. <Link to="/" className="navlink" style={{marginLeft:8}}>Browse products</Link>
        </div>
      ) : (
        <>
          <div style={{display:"grid", gap:14}}>
            {items.map((it)=>(
              <div key={it.id} className="basket-row" style={{background:"#fff", border:"1px solid #f2efe9", borderRadius:18, padding:12}}>
                <div style={{borderRadius:14, overflow:"hidden", background:"#fff7f0"}}>
                  <LazyImage
                    src={imgCandidates(it.id, it.imageUrl)[0]}
                    alts={imgCandidates(it.id, it.imageUrl).slice(1)}
                    alt={it.name}
                    imgStyle={{width:"100%", height:90, objectFit:"cover", display:"block"}}
                  />
                </div>
                <div>
                  <div style={{fontWeight:800}}>{it.name}</div>
                  <div style={{opacity:.7}}>{formatPrice(it.price)}</div>
                </div>
                <div style={{display:"flex", alignItems:"center", gap:10, justifyContent:"flex-end", flexWrap:"wrap"}}>
                  <button className="navlink" onClick={()=>addItem(it,-1)} disabled={it.qty<=1}>−</button>
                  <div style={{minWidth:24, textAlign:"center", fontWeight:800}}>{it.qty}</div>
                  <button className="navlink" onClick={()=>addItem(it,1)}>+</button>
                  <button className="navlink" onClick={()=>remove(it.id)}>Remove</button>
                  <div style={{width:80, textAlign:"right", fontWeight:800}}>{formatPrice((it.price||0)*(it.qty||0))}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="basket-summary" style={{marginTop:16}}>
            <div style={{background:"#fff", border:"1px solid #f2efe9", borderRadius:16, padding:12}}>
              <input
                value={code}
                onChange={(e)=>setCode(e.target.value)}
                placeholder="BEAR10, FREESHIP, PAW100"
                style={{width:"100%", padding:"12px 14px", borderRadius:12, border:"1px solid #e7e0d8", outline:"none"}}
              />
            </div>

            <div style={{background:"#fff", border:"1px solid #f2efe9", borderRadius:16, padding:16}}>
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Discount" value={`- ${formatPrice(discount)}`} />
              <Row label="Shipping" value={formatPrice(shippingAfter)} />
              <hr style={{border:"0", borderTop:"1px dashed #e8dfd6", margin:"8px 0"}}/>
              <Row label="Total" value={formatPrice(total)} bold />
              <button className="btn" style={{width:"100%", marginTop:12}} onClick={()=>nav("/checkout")}>
                Proceed to Checkout 🐾
              </button>
            </div>
          </div>

          <div style={{marginTop:14}}>
            <button className="navlink" onClick={clear}>Clear Basket</button>
          </div>
        </>
      )}
    </div>
  );
}

function Row({label, value, bold}) {
  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
      <div style={{opacity:.8}}>{label}</div>
      <div style={{fontWeight:bold?900:700}}>{value}</div>
    </div>
  );
}
