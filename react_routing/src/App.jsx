import { useEffect, useMemo, useState } from "react";
import "./App.css";
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";

export default function App() {
  const baseUrl = "https://rickandmortyapi.com/api/character?page=";

  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // “Carrito” simple para simular ecommerce
  const [cartCount, setCartCount] = useState(0);

  async function requestData(currentPage) {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${baseUrl}${currentPage}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setCharacters(data.results || []);
      setTotalPages(data?.info?.pages ?? 1);
    } catch (err) {
      setCharacters([]);
      setErrorMsg("No se pudo cargar la data. Revisá tu internet o la API.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    requestData(page);
  }, [page]);

  const canPrev = page > 1 && !loading;
  const canNext = page < totalPages && !loading;

  const headerInfo = useMemo(() => {
    return {
      title: "Mini Ecommerce (API)",
      subtitle: "Tarjetas + paginación con estados (React + Vite)",
    };
  }, []);

  function handleBuy(character) {
    setCartCount((c) => c + 1);
    // si querés, después lo convertimos en un carrito real
    // por ahora simulamos compra rápida:
    // alert(`Compraste: ${character.name}`);
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <h1 className="title">{headerInfo.title}</h1>
          <p className="subtitle">{headerInfo.subtitle}</p>
        </div>

        <div className="cart">
          <span className="cartLabel">Carrito</span>
          <span className="cartBadge">{cartCount}</span>
        </div>
      </header>

      <section className="controls">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={() => canPrev && setPage((p) => p - 1)}
          onNext={() => canNext && setPage((p) => p + 1)}
          onGoTo={(p) => setPage(p)}
          loading={loading}
        />
      </section>

      {errorMsg && (
        <div className="state stateError">
          <strong>Ups:</strong> {errorMsg}
        </div>
      )}

      {loading && (
        <div className="state stateLoading">
          <div className="spinner" />
          <span>Cargando productos...</span>
        </div>
      )}

      {!loading && !errorMsg && (
        <section className="grid">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onBuy={handleBuy}
            />
          ))}
        </section>
      )}

      <footer className="footer">
        Página <strong>{page}</strong> de <strong>{totalPages}</strong>
      </footer>
    </div>
  );
}

 // export default App
