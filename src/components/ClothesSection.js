import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ItemCard from "./ItemCard.js";

function ClothesSection({ items, onSelectCard, openModal }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <h3 className="clothes-section__title">Your Items</h3>
      <button
        className="clothes-section__add-btn"
        type="button"
        onClick={openModal}
      >
        + Add New
      </button>
      <section className="clothes-section__items">
        <div className="clothes-section__item">
          {items.map((item) => {
            const isOwn = item.owner._id === currentUser._id;
            return (
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                weather={item.weather}
                item={item}
                onSelectCard={onSelectCard}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default ClothesSection;
