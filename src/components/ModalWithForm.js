function ModalWithForm({
  children,
  buttonText,
  altButtonText,
  title,
  onClose,
  name,
  onSubmit,
  handleAltClick,
}) {
  return (
    <div className={`modal modal__type_${name}`}>
      <div className="modal__content">
        <button className="modal__close-btn" type="button" onClick={onClose} />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__button-container">
            <button className="modal__submit-btn" type="submit">
              {buttonText}
            </button>
            <button
              className="modal__alt-button"
              type="button"
              onClick={handleAltClick}
            >
              {altButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
