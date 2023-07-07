import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ItemModal({ item, onClose, onDelete }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = item.owner._id === currentUser._id;
  const itemDeleteButtonClassName = `item__delete-btn ${
    isOwn ? "item__delete-btn_visible" : "item__delete-btn_hidden"
  }`;

  return (
    <div className="item__modal">
      <div className="item__modal-content">
        <button className="modal__close-btn" type="button" onClick={onClose} />
        <img
          src={item.imageUrl}
          alt={item.name}
          className="item__modal-image"
        />
        <div className="item__card-name">{item.name}</div>
        <div className="item__weather-type">Weather: {item.weather}</div>
        <button
          className={itemDeleteButtonClassName}
          type="button"
          onClick={onDelete}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
