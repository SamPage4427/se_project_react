import "../blocks/app/App.css";

/*       React Imports       */
import { useEffect, useState } from "react";
import { HashRouter, Route } from "react-router-dom";

/*      Util Imports      */
import { ESC_KEYCODE, baseUrl, headers } from "../utils/constants";
import { getForcastWeather, parseWeatherData } from "../utils/weatherAPI.js";
import API from "../utils/api.js";

/*       Context Imports       */
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext.js";

/*       Funtional Imports       */
import Header from "./Header.js";
import Main from "./Main.js";
import Profile from "./Profile.js";
import Footer from "./Footer.js";
import ItemModal from "./ItemModal.js";
import AddItemModal from "./AddItemModal.js";
import DeleteConfirmModal from "./DeleteConfirmModal.js";

const api = new API({ baseUrl, headers });

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [temp, setTemp] = useState(32);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(modal) {
    setActiveModal(modal);
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
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  // const handleIsLoading = () => {
  //   isLoading === false ? setIsLoading(true) : setIsLoading(false);
  // };

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
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.which === ESC_KEYCODE) {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

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
    <div className="page">
      <HashRouter>
        <CurrentTemperatureUnitContext.Provider
          value={{
            currentTemperatureUnit,
            handleToggleSwitchChange,
          }}
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
              buttonText="Add Garment"
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
              buttonText="Yes, delete item"
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </HashRouter>
    </div>
  );
}

export default App;
