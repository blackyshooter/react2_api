export default function CharacterCard({ character, price, onBuy }) {
  const { name, image, status, species, gender } = character;

  const badgeClass =
    status === "Alive"
      ? "badgeAlive"
      : status === "Dead"
      ? "badgeDead"
      : "badgeUnknown";

  return (
    <article className="card">
      <div className="cardMedia">
        <img className="cardImg" src={image} alt={name} loading="lazy" />
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
            <span className="priceValue">{price.toFixed(2)}</span>
          </div>

          <button className="buyBtn" onClick={onBuy}>
            Comprar
          </button>
        </div>
      </div>
    </article>
  );
}
