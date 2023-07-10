function DeleteConfirmModal({
  name,
  onClose,
  onConfirm,
  onCancel,
  selectCard,
}) {
  return (
    <div className={`delete__modal modal__type_${name}`}>
      <div className="delete__modal-content">
        <button className="modal__close-btn" type="button" onClick={onClose} />
        <div className="delete__container">
          <h3 className="delete__description">
            Are you sure you want to delete this item?
            <br /> This action is irreversible.
          </h3>
        </div>
        <div className="delete__btn-container">
          <button
            className="delete__confirm"
            type="button"
            onClick={() => onConfirm(selectCard._id)}
          >
            Yes, delete item
          </button>
          <button className="delete__cancel" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
