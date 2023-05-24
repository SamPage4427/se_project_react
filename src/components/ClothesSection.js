function ClothesSection({ openModal }) {
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
    </div>
  );
}

export default ClothesSection;
