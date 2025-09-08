export default function RouteFallback() {
  return (
    <div className="page">
      <div className="skeleton" style={{ height: 260, borderRadius: 20, marginBottom: 12 }} />
      <div className="card-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="card" key={i}>
            <div className="skeleton" />
            <div className="info">
              <div className="skeleton" style={{ height: 14, margin: "8px 0", borderRadius: 6 }} />
              <div className="skeleton" style={{ height: 14, width: 80, borderRadius: 6 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
