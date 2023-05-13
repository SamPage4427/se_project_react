import "../blocks/app/App.css";

import { useEffect, useState } from "react";

import { ESC_KEYCODE } from "../utils/constants";
import { getForcastWeather, parseWeatherData } from "../utils/weatherAPI.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ModalWithForm from "./ModalWithForm.js";
import ItemModal from "./ItemModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [temp, setTemp] = useState(32);

  function handleEscClose(e) {
    if (e.which === ESC_KEYCODE) {
      handleCloseModal();
    }
  }

  function handleOpenModal(modal) {
    setActiveModal(modal);
    document.addEventListener("keydown", handleEscClose);
  }

  const handleCreateModal = () => {
    handleOpenModal("create");
  };

  const handlePreviewModal = (card) => {
    handleOpenModal("preview");
    setSelectCard(card);
  };

  const handleCloseModal = () => {
    setActiveModal("");
    document.removeEventListener("keydown", handleEscClose);
  };

  useEffect(() => {
    getForcastWeather()
      .then((data) => {
        const weatherTemp = parseWeatherData(data);
        setTemp(weatherTemp);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="page">
        <Header location={"Tokyo"} onCreateModal={handleCreateModal} />
        <Main temp={temp} onImageClick={handlePreviewModal} />
        <Footer />
        {activeModal === "create" && (
          <ModalWithForm
            title="New Garment"
            onClose={handleCloseModal}
            name="add-garment"
            buttonText="Add Garment"
          >
            <label>
              <h3 className="modal__label">Name:</h3>
              <input
                className="modal__input"
                type="text"
                minLength={1}
                maxLength={30}
                placeholder="Name"
                required
              />
            </label>
            <label>
              <h3 className="modal__label">Image:</h3>
              <input
                className="modal__input"
                type="url"
                placeholder="Image URL"
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
                required
              />
              <label htmlFor="radio-cold-btn-input"> Cold</label>
            </div>
          </ModalWithForm>
        )}
        {activeModal === "preview" && (
          <ItemModal item={selectCard} onClose={handleCloseModal} />
        )}
      </div>
    </>
  );
}

export default App;
