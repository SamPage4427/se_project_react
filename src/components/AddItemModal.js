import { useEffect, useState } from "react";
import ModalWithForm from "./ModalWithForm.js";

function AddItemModal({ isOpen, onAddItem, onClose, buttonText }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleUrlChange = (e) => setImageUrl(e.target.value);
  const handleWeatherChange = (e) => setWeather(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  }

  return (
    <ModalWithForm
      title="New Garment"
      onClose={onClose}
      onSubmit={handleSubmit}
      name="add-garment"
      buttonText={buttonText}
    >
      <label>
        <h3 className="modal__label">Name:</h3>
        <input
          className="modal__input"
          id="item-name-input"
          type="text"
          minLength={1}
          maxLength={30}
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label>
        <h3 className="modal__label">Image:</h3>
        <input
          className="modal__input"
          id="item-url-input"
          type="url"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
          required
        />
      </label>
      <p className="modal__text">Select the weather type:</p>
      <div className="modal__button">
        <input
          className="modal__btn-radio"
          name="radio-btn"
          type="radio"
          id="radio-hot-btn-input"
          value="hot"
          onChange={handleWeatherChange}
          required
        />
        <label htmlFor="radio-hot-btn-input"> Hot</label>
      </div>
      <div className="modal__button">
        <input
          className="modal__btn-radio"
          name="radio-btn"
          type="radio"
          id="radio-warm-btn-input"
          value="warm"
          onChange={handleWeatherChange}
          required
        />
        <label htmlFor="radio-warm-btn-input"> Warm</label>
      </div>
      <div className="modal__button">
        <input
          className="modal__btn-radio"
          name="radio-btn"
          type="radio"
          id="radio-cold-btn-input"
          value="cold"
          onChange={handleWeatherChange}
          required
        />
        <label htmlFor="radio-cold-btn-input"> Cold</label>
      </div>
    </ModalWithForm>
  );
}

export default AddItemModal;
