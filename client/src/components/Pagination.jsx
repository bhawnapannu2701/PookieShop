export default function Pagination({ page, setPage, totalPages }) {
  if (!totalPages || totalPages <= 1) return null;

  const prev = () => setPage(Math.max(0, page - 1));
  const next = () => setPage(Math.min(totalPages - 1, page + 1));

  return (
    <div style={{display:'flex', gap:10, alignItems:'center', justifyContent:'center', marginTop:16}}>
      <button className="navlink" onClick={prev} disabled={page===0}>Prev</button>
      <div style={{fontWeight:800}}>Page {page + 1} / {totalPages}</div>
      <button className="navlink" onClick={next} disabled={page>=totalPages-1}>Next</button>
    </div>
  )
}
