export default function Filters({ q, setQ, category, setCategory, sort, setSort }) {
  return (
    <div style={{
      background:'#fff', border:'1px solid #f2efe9', borderRadius:20, padding:12,
      display:'grid', gap:10, gridTemplateColumns:'1fr 180px 180px'
    }}>
      <input
        value={q}
        onChange={e=>setQ(e.target.value)}
        placeholder="Search cozy things…"
        style={{padding:'10px 12px', borderRadius:12, border:'1px solid #e7e0d8'}}
      />
      <select value={category} onChange={e=>setCategory(e.target.value)} className="navlink" style={{padding:'10px 12px'}}>
        <option value="">All Categories</option>
        <option>Apparel</option>
        <option>Accessories</option>
        <option>Home</option>
        <option>Kitchen</option>
        <option>Stationery</option>
        <option>Beauty</option>
        <option>Plushies</option>
      </select>
      <select value={sort} onChange={e=>setSort(e.target.value)} className="navlink" style={{padding:'10px 12px'}}>
        <option value="reco">Recommended</option>
        <option value="priceAsc">Price: Low → High</option>
        <option value="priceDesc">Price: High → Low</option>
        <option value="new">New Arrivals</option>
      </select>
    </div>
  )
}
