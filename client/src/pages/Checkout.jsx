import { useState, useMemo } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { useLocale } from '../context/LocaleContext.jsx'
import { createMockOrder } from '../api.js'

const SHIPPING_BASE_INR = 79;

export default function Checkout(){
  const { items, clearCart } = useCart();
  const { formatPrice } = useLocale();

  const [step, setStep] = useState(1); // 1 Delivery -> 2 Payment -> 3 Summary
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [order, setOrder] = useState(null);

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address1: '', address2: '', city: '', state: '', pincode: ''
  });

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + (it.price * it.qty), 0), [items]
  );
  const shipping = subtotal > 0 ? SHIPPING_BASE_INR : 0;
  const grand = Math.max(0, Math.round((subtotal + shipping) * 100) / 100);

  const nextFromDelivery = (e)=>{
    e.preventDefault();
    if (!form.name || !form.address1 || !form.city) { setMsg('Please fill required fields'); return; }
    setMsg(''); setStep(2);
  };

  const placeOrder = async ()=>{
    setBusy(true); setMsg('');
    try {
      const payload = {
        amount: grand, currency: 'INR',
        ...form
      };
      const res = await createMockOrder(payload);
      setOrder(res);
      clearCart();
      setStep(3);
    } catch (e) {
      setMsg('Failed to create order');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page">
      <h1>🧾 Checkout</h1>

      {step === 1 && (
        <form onSubmit={nextFromDelivery} className="card" style={{padding:12, display:'grid', gap:10}}>
          <h3 style={{margin:'4px 0'}}>Delivery details</h3>
          <div style={{display:'grid', gap:10, gridTemplateColumns:'1fr 1fr'}}>
            <input required placeholder="Full name" value={form.name} onChange={e=>setForm(s=>({...s,name:e.target.value}))}
              style={{gridColumn:'1/-1', padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8'}}/>
            <input placeholder="Email" value={form.email} onChange={e=>setForm(s=>({...s,email:e.target.value}))}
              style={{padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8'}}/>
            <input placeholder="Phone" value={form.phone} onChange={e=>setForm(s=>({...s,phone:e.target.value}))}
              style={{padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8'}}/>
            <input required placeholder="Address line 1" value={form.address1} onChange={e=>setForm(s=>({...s,address1:e.target.value}))}
              style={{gridColumn:'1/-1', padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8'}}/>
            <input placeholder="Address line 2" value={form.address2} onChange={e=>setForm(s=>({...s,address2:e.target.value}))}
              style={{gridColumn:'1/-1', padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8'}}/>
            <input required placeholder="City" value={form.city} onChange={e=>setForm(s=>({...s,city:e.target.value}))}
              style={{padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8'}}/>
            <input placeholder="State" value={form.state} onChange={e=>setForm(s=>({...s,state:e.target.value}))}
              style={{padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8'}}/>
            <input placeholder="Pincode" value={form.pincode} onChange={e=>setForm(s=>({...s,pincode:e.target.value}))}
              style={{padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8'}}/>
          </div>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:4}}>
            <div style={{opacity:.8}}>
              Subtotal: <b>{formatPrice(subtotal)}</b> · Shipping: <b>{formatPrice(shipping)}</b> ·
              <span style={{marginLeft:6}}>Total:</span> <b>{formatPrice(grand)}</b>
            </div>
            <button className="btn" type="submit">Continue to Payment</button>
          </div>
          {msg && <div style={{color:'#a44'}}>{msg}</div>}
        </form>
      )}

      {step === 2 && (
        <div className="card" style={{padding:12, display:'grid', gap:10}}>
          <h3 style={{margin:'4px 0'}}>Payment</h3>
          <div>Demo mode — no real gateway. Click the button to place a mock order.</div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div style={{fontWeight:800}}>Payable: {formatPrice(grand)}</div>
            <div style={{display:'flex', gap:8}}>
              <button className="navlink" onClick={()=>setStep(1)}>← Back</button>
              <button className="btn" disabled={busy} onClick={placeOrder}>
                {busy ? 'Placing…' : 'Place Order (Demo)'}
              </button>
            </div>
          </div>
          {msg && <div style={{color:'#a44'}}>{msg}</div>}
        </div>
      )}

      {step === 3 && (
        <div className="card" style={{padding:12}}>
          <h3 style={{margin:'4px 0'}}>Order Confirmed 🎉</h3>
          <div style={{display:'grid', gap:6}}>
            <div>Local Order ID: <b>{order?.localOrderId}</b></div>
            <div>Payment Id: <b>{order?.paymentId}</b></div>
            <div>Amount: <b>{formatPrice(order?.amount/100)}</b> ({order?.currency})</div>
          </div>
          <div style={{marginTop:10}}>
            <a className="navlink" href="/">Back to Shop</a>
          </div>
        </div>
      )}
    </div>
  )
}
