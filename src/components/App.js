import "../blocks/app/App.css";

/*       React Imports       */
import { useEffect, useState } from "react";
import { HashRouter, Route, useHistory } from "react-router-dom";

/*      Util Imports      */
import { ESC_KEYCODE, baseUrl, headers } from "../utils/constants.js";
import { getForcastWeather, parseWeatherData } from "../utils/weatherAPI.js";
import API from "../utils/api.js";
import * as auth from "../utils/auth.js";

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
import RegisterModal from "./RegisterModal.js";
import LoginModal from "./LoginModal.js";
import ProtectedRoute from "./ProtectedRoute.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

const api = new API({ baseUrl, headers });

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [temp, setTemp] = useState(32);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  const history = useHistory();

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

  const handleSignInModal = () => handleOpenModal("signin");
  const handleSignUpModal = () => handleOpenModal("signup");

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

  function handleRegister({ email, password, name, avatar }) {
    auth
      .register({ email, password, name, avatar })
      .then((res) => {
        if (res) {
          setCurrentUser(res.data);
          handleLogin({ email, password });
          handleCloseModal();
          console.log(isLoggedIn);
        }
      })
      .catch((e) => console.error(`Error signing up user ${e}`));
  }

  function handleLogin({ email, password }) {
    auth
      .signIn({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        if (data.token) {
          return auth.validTokenCheck(data.token);
        }
      })
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res.data);
        history.push("/profile");
        handleCloseModal();
        console.log(isLoggedIn);
      })
      .catch((e) => console.error(`Error logging user in: ${e}`));
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .validTokenCheck(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res.data);
        })
        .catch((e) => console.error(`Token Check use effect: ${e}`));
    }
  }, [token]);

  return (
    <div className="page">
      <HashRouter>
        <CurrentTemperatureUnitContext.Provider
          value={{
            currentTemperatureUnit,
            handleToggleSwitchChange,
          }}
        >
          <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
            <Header
              location={"Tokyo"}
              onCreateModal={handleCreateModal}
              onLoginModal={handleSignInModal}
              onRegisterModal={handleSignUpModal}
              loggedIn={isLoggedIn}
            />

            <Route exact path="/">
              <Main
                temp={temp}
                clothingItems={clothingItems}
                onImageClick={handlePreviewModal}
              />
            </Route>
            <ProtectedRoute path="/profile" loggedIn={isLoggedIn}>
              <Profile
                items={clothingItems}
                onSelectCard={handlePreviewModal}
                openModal={handleCreateModal}
              />
            </ProtectedRoute>
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
            {activeModal === "signin" && (
              <LoginModal
                isOpen={handleSignInModal}
                onLogin={handleLogin}
                onClose={handleCloseModal}
                buttonText="Log In"
              />
            )}
            {activeModal === "signup" && (
              <RegisterModal
                isOpen={handleSignUpModal}
                onSignUp={handleRegister}
                onClose={handleCloseModal}
                buttonText="Next"
              />
            )}
          </CurrentUserContext.Provider>
        </CurrentTemperatureUnitContext.Provider>
      </HashRouter>
    </div>
  );
}

export default App;
