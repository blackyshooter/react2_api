export default function CharacterCard({ character, onBuy }) {
  const { id, name, image, status, species, gender } = character;

  // Precio mock (para que parezca ecommerce)
  const price = (id * 1.37 + 9.9).toFixed(2);

  const badgeClass =
    status === "Alive" ? "badgeAlive" : status === "Dead" ? "badgeDead" : "badgeUnknown";

  return (
    <article className="card">
      <div className="cardMedia">
        <img className="cardImg" src={image} alt={name} />
        <span className={`badge ${badgeClass}`}>{status}</span>
      </div>

      <div className="cardBody">
        <h3 className="cardTitle" title={name}>
          {name}
        </h3>

        <div className="meta">
          <span className="pill">{species}</span>
          <span className="pill">{gender}</span>
        </div>

        <div className="priceRow">
          <div className="price">
            <span className="priceSymbol">$</span>
            <span className="priceValue">{price}</span>
          </div>

          <button className="buyBtn" onClick={() => onBuy(character)}>
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
}
