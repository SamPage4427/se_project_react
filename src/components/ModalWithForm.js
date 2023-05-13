function ModalWithForm({ children, buttonText, title, onClose, name }) {
  return (
    <div className={`modal modal__type_${name}`}>
      <div className="modal__content">
        <button className="modal__close-btn" type="button" onClick={onClose} />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form">{children}</form>
        <button className="modal__submit-btn" type="submit">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;
