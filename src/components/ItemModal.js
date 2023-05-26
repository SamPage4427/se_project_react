function ItemModal({ item, onClose, onDelete }) {
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
        <button className="item__delete-btn" type="button" onClick={onDelete}>
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
