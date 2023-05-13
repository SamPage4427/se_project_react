function ItemCard({ item, onSelectCard }) {
  return (
    <div className="cards__container">
      <img
        src={item.link}
        alt={item.name}
        className="cards__image"
        onClick={() => onSelectCard(item)}
      />
      <div className="cards__description">
        <span className="cards__name">{item.name}</span>
      </div>
    </div>
  );
}

export default ItemCard;
