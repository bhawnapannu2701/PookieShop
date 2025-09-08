import { useEffect, useState } from 'react'
import { searchProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct } from '../api'

const LS_TOKEN = "pookie_admin_token";

export default function Admin(){
  const [token,setToken] = useState(localStorage.getItem(LS_TOKEN) || "pookie-dev-1234");
  const [form,setForm] = useState({ name:'', price:'', category:'', imageUrl:'', description:'' });
  const [data,setData] = useState(null);
  const [q,setQ] = useState('');
  const [page,setPage] = useState(0);
  const [size] = useState(12);
  const [busy,setBusy] = useState(false);
  const [msg,setMsg] = useState('');

  const load = async ()=>{
    setBusy(true); setMsg('');
    try{
      const res = await searchProducts({ q, page, size, sort: 'new' });
      setData(res);
    }catch(e){ setMsg('Load failed'); } finally { setBusy(false); }
  };

  useEffect(()=>{ load() }, [q,page,size]);

  const saveToken = ()=>{
    localStorage.setItem(LS_TOKEN, token);
    setMsg('Token saved locally');
  };

  const create = async (e)=>{
    e.preventDefault();
    setBusy(true); setMsg('');
    try{
      const payload = { ...form, price: Number(form.price) };
      const created = await adminCreateProduct(payload, token);
      setMsg(`Created #${created.id}`);
      setForm({ name:'', price:'', category:'', imageUrl:'', description:'' });
      load();
    }catch{ setMsg('Create failed (check token)'); } finally { setBusy(false); }
  };

  const updateOne = async (p)=>{
    const price = Number(prompt('New price (₹ / USD converted on UI):', p.price) ?? p.price);
    if (!price || price<=0) return;
    setBusy(true); setMsg('');
    try{
      const u = await adminUpdateProduct(p.id, { price }, token);
      setMsg(`Updated #${u.id}`);
      load();
    }catch{ setMsg('Update failed'); } finally { setBusy(false); }
  };

  const removeOne = async (p)=>{
    if (!confirm(`Delete "${p.name}"?`)) return;
    setBusy(true); setMsg('');
    try{
      await adminDeleteProduct(p.id, token);
      setMsg(`Deleted #${p.id}`);
      load();
    }catch{ setMsg('Delete failed'); } finally { setBusy(false); }
  };

  return (
    <div className="page">
      <h1>Admin (demo)</h1>

      <div style={{display:'grid', gap:10, gridTemplateColumns:'1fr auto'}}>
        <div className="card" style={{padding:12}}>
          <div style={{display:'flex', gap:8, alignItems:'center', flexWrap:'wrap'}}>
            <input value={token} onChange={e=>setToken(e.target.value)} placeholder="X-Admin-Token"
                   style={{flex:'1 1 340px', padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8'}}/>
            <button className="navlink" onClick={saveToken}>Save Token</button>
          </div>
          <div style={{opacity:.6, fontSize:12, marginTop:6}}>Default dev token: <code>pookie-dev-1234</code> (can change in backend env)</div>
        </div>

        <div className="card" style={{padding:12}}>
          <div style={{display:'flex', gap:8}}>
            <input value={q} onChange={e=>{setQ(e.target.value); setPage(0);}} placeholder="Search"
                   style={{flex:1, padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8'}} />
            <button className="navlink" onClick={load}>Refresh</button>
          </div>
        </div>
      </div>

      <form onSubmit={create} className="card" style={{padding:12, marginTop:10}}>
        <h3 style={{margin:'6px 0'}}>Create new product</h3>
        <div style={{display:'grid', gap:10, gridTemplateColumns:'1fr 1fr'}}>
          <input required value={form.name} onChange={e=>setForm(s=>({...s,name:e.target.value}))} placeholder="Name"
                 style={{padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8', gridColumn:'1/-1'}}/>
          <input required type="number" min="0" step="0.01" value={form.price} onChange={e=>setForm(s=>( {...s,price:e.target.value} ))}
                 placeholder="Price (INR)" style={{padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8'}}/>
          <input value={form.category} onChange={e=>setForm(s=>({...s,category:e.target.value}))} placeholder="Category"
                 style={{padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8'}}/>
          <input value={form.imageUrl} onChange={e=>setForm(s=>({...s,imageUrl:e.target.value}))} placeholder="Image URL"
                 style={{padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8', gridColumn:'1/-1'}}/>
          <textarea value={form.description} onChange={e=>setForm(s=>({...s,description:e.target.value}))}
                    rows="3" placeholder="Description" style={{gridColumn:'1/-1', padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8'}}/>
        </div>
        <div style={{marginTop:8}}>
          <button className="btn" disabled={busy}>Create</button>
        </div>
      </form>

      {msg && <div style={{marginTop:10, color:'#764'}}> {msg} </div>}

      <div className="card" style={{padding:12, marginTop:10}}>
        <h3 style={{margin:'6px 0'}}>Products</h3>
        {!data && <div>Loading…</div>}
        {data && data.items.length===0 && <div>No items.</div>}
        {data && data.items.length>0 && (
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:12}}>
            {data.items.map(p=>(
              <div key={p.id} className="card" style={{padding:10}}>
                <img src={p.imageUrl} alt={p.name} style={{width:'100%', height:140, objectFit:'cover', borderRadius:12}}/>
                <div style={{fontWeight:800, marginTop:8}}>{p.name}</div>
                <div style={{opacity:.8}}>₹ {Number(p.price).toFixed(2)} · {p.category || '—'}</div>
                <div style={{display:'flex', gap:8, marginTop:8}}>
                  <button className="navlink" onClick={()=>updateOne(p)}>Edit Price</button>
                  <button className="navlink" onClick={()=>removeOne(p)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {data && data.totalPages>1 && (
          <div style={{display:'flex', gap:8, justifyContent:'center', marginTop:12}}>
            <button className="navlink" disabled={page<=0} onClick={()=>setPage(p=>p-1)}>← Prev</button>
            {Array.from({length:data.totalPages}).slice(0,10).map((_,i)=>(
              <button key={i} className="navlink" style={{background: i===page ? '#ffe8dd' : undefined}} onClick={()=>setPage(i)}>{i+1}</button>
            ))}
            <button className="navlink" disabled={page>=data.totalPages-1} onClick={()=>setPage(p=>p+1)}>Next →</button>
          </div>
        )}
      </div>
    </div>
  )
}
