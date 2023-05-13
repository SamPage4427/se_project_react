function ItemModal({ name, item, onClose }) {
  return (
    <div className={`item__modal modal__type_${name}`}>
      <div className="item__modal-content">
        <button className="modal__close-btn" type="button" onClick={onClose} />
        <img src={item.link} alt={item.name} className="item__modal-image" />
        <div className="item__card-name">{item.name}</div>
        <div className="item__weather-type">{`Weather: ${item.weather}`}</div>
      </div>
    </div>
  );
}

export default ItemModal;
