import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ItemCard from "./ItemCard.js";

function ClothesSection({ items, onSelectCard, openModal }) {
  const { currentUser } = useContext(CurrentUserContext);
  const userItems = items.filter((item) => item.owner === currentUser._id);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h3 className="clothes-section__title">Your Items</h3>
        <button
          className="clothes-section__add-btn"
          type="button"
          onClick={openModal}
        >
          + Add New
        </button>
      </div>
      <section className="clothes-section__items">
        <div className="clothes-section__item">
          {userItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
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
