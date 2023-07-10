import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function ItemCard({ item, onSelectCard, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked = item.likes.some((user) => user._id === currentUser._id);
  const itemLikeButtonClassName = `cards__like ${
    isLiked ? "cards__like_active" : "cards__like_inactive"
  }`;

  return (
    <div className="cards__container">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="cards__image"
        onClick={() => onSelectCard(item)}
      />
      <div className="cards__description">
        <span className="cards__name">{item.name}</span>
        <button
          className={itemLikeButtonClassName}
          type="button"
          onClick={() => onCardLike(item, isLiked)}
        />
      </div>
    </div>
  );
}

export default ItemCard;
