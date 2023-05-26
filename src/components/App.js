/*       React Imports       */
import { useEffect, useState } from "react";
import { HashRouter, Route } from "react-router-dom";

/*      Util Imports      */
import { ESC_KEYCODE, baseUrl, headers } from "../utils/constants";
import { getForcastWeather, parseWeatherData } from "../utils/weatherAPI.js";
import API from "../utils/api.js";

/*       Context Imports       */
import CurrentTempUnitContext from "../contexts/CurrentTempUnitContext.js";

/*       Funtional Imports       */
import Header from "./Header.js";
import Main from "./Main.js";
import Profile from "./Profile.js";
import Footer from "./Footer.js";
import ItemModal from "./ItemModal.js";
import AddItemModal from "./AddItemModal.js";
import DeleteConfirmModal from "./DeleteConfirmModal.js";

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

  function handleDeleteModal() {
    handleOpenModal("delete");
  }

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
      .addItem({
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

  function handleDeleteItem(itemId) {
    api
      .deleteItem(itemId)
      .then(() => {
        const updateItems = clothingItems.filter((item) => {
          return item.id !== itemId;
        });
        setClothingItems(updateItems);
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
        <HashRouter>
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
              <ItemModal
                item={selectCard}
                onClose={handleCloseModal}
                onDelete={handleDeleteModal}
              />
            )}
            {activeModal === "delete" && (
              <DeleteConfirmModal
                name="delete-modal"
                onClose={handleCloseModal}
                onConfirm={handleDeleteItem}
                onCancel={handleCloseModal}
                selectCard={selectCard}
              />
            )}
          </CurrentTempUnitContext.Provider>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
