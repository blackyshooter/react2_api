import { useEffect, useState } from "react";
import "./App.css";

import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";

function getPrice(character) {
  // Precio "fake" determinístico (para practicar carrito sin backend)
  return Number((character.id * 1.37 + 9.9).toFixed(2));
}

export default function App() {
  const baseUrl = "https://rickandmortyapi.com/api/character?page=";

  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  async function requestData(currentPage) {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${baseUrl}${currentPage}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setCharacters(data.results || []);
      setTotalPages(data?.info?.pages ?? 1);
    } catch (e) {
      setCharacters([]);
      setErrorMsg("No se pudo cargar la data. Revisá tu conexión o la API.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    requestData(page);
  }, [page]);

  function addToCart(price) {
    setCartCount((prev) => prev + 1);
    setCartTotal((prev) => Number((prev + price).toFixed(2)));
  }

  const canPrev = page > 1 && !loading;
  const canNext = page < totalPages && !loading;

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">
          <h1 className="title">Tienda de NFTS</h1>
          <p className="subtitle">Rick & Morty API</p>
        </div>

        
        <h1 className="cartSummary">
          🛒 Artículos: <span className="cartSummaryNum">{cartCount}</span> | Total:{" "}
          <span className="cartSummaryNum">${cartTotal.toFixed(2)}</span>
        </h1>
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
          {characters.map((character) => {
            const price = getPrice(character);
            return (
              <CharacterCard
                key={character.id}
                character={character}
                price={price}
                onBuy={() => addToCart(price)}
              />
            );
          })}
        </section>
      )}

      <footer className="footer">
        Página <strong>{page}</strong> de <strong>{totalPages}</strong>
      </footer>
    </div>
  );
}
