import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import {
  ESC_KEYCODE,
  defaultClothes,
  baseUrl,
  headers,
} from "../utils/constants";
import { getForcastWeather, parseWeatherData } from "../utils/weatherAPI.js";

import CurrentTempUnitContext from "../contexts/CurrentTempUnitContext.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Profile from "./Profile.js";
import Footer from "./Footer.js";
import ItemModal from "./ItemModal.js";
import AddItemModal from "./AddItemModal.js";
import API from "../utils/api.js";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [temp, setTemp] = useState(32);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const api = new API({ baseUrl, headers });

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

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  function handleAddItem({ name, imageUrl, weather }) {
    api
      .addItems({
        name,
        imageUrl,
        weather,
      })
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getForcastWeather()
      .then((data) => {
        const weatherTemp = parseWeatherData(data);
        setTemp(weatherTemp);
        api
          .getItems()
          .then((items) => {
            setClothingItems(items);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="page">
        <BrowserRouter>
          <CurrentTempUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <Header location={"Tokyo"} onCreateModal={handleCreateModal} />
            <Route exact path="/">
              <Main
                temp={temp}
                clothingItems={clothingItems}
                onImageClick={handlePreviewModal}
              />
            </Route>
            <Route path="/profile">
              <Profile
                items={clothingItems}
                onSelectCard={handlePreviewModal}
                openModal={handleCreateModal}
              />
            </Route>
            <Footer />
            {activeModal === "create" && (
              <AddItemModal
                isOpen={handleCreateModal}
                onClose={handleCloseModal}
                onAddItem={handleAddItem}
              />
            )}
            {activeModal === "preview" && (
              <ItemModal item={selectCard} onClose={handleCloseModal} />
            )}
          </CurrentTempUnitContext.Provider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
