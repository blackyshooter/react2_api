export default function Pagination({
  page,
  totalPages,
  onPrev,
  onNext,
  onGoTo,
  loading,
}) {
  const canPrev = page > 1 && !loading;
  const canNext = page < totalPages && !loading;

  // Botones rápidos (1,2,3... cerca de la página actual)
  const pagesToShow = getPagesAround(page, totalPages, 2);

  return (
    <div className="pagination">
      <button className="pgBtn" onClick={onPrev} disabled={!canPrev}>
        ◀ Anterior
      </button>

      <div className="pgNumbers">
        {pagesToShow.map((p) => (
          <button
            key={p}
            className={`pgNum ${p === page ? "active" : ""}`}
            onClick={() => onGoTo(p)}
            disabled={loading}
          >
            {p}
          </button>
        ))}
      </div>

      <button className="pgBtn" onClick={onNext} disabled={!canNext}>
        Siguiente ▶
      </button>
    </div>
  );
}

function getPagesAround(current, total, radius = 2) {
  const start = Math.max(1, current - radius);
  const end = Math.min(total, current + radius);

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  // si querés, después metemos "..." cuando haya saltos grandes
  return pages;
}
