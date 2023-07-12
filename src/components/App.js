import "../blocks/app/App.css";

/*       React Imports       */
import { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";

/*      Util Imports      */
import { ESC_KEYCODE } from "../utils/constants.js";
import { getForcastWeather, parseWeatherData } from "../utils/weatherAPI.js";
import api from "../utils/api.js";
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
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfileModal from "./EditProfileModal.js";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectCard, setSelectCard] = useState({});
  const [temp, setTemp] = useState(32);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  const [noAvatar, setNoAvatar] = useState("");
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
    console.log(card);
  };

  function handleDeleteModal() {
    handleOpenModal("delete");
  }

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSignInModal = () => handleOpenModal("signin");
  const handleSignUpModal = () => handleOpenModal("signup");
  const handleEditProfileModal = () => handleOpenModal("edit-profile");

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleNoAvatar = (name) => {
    const initial = name.slice(0, 1);
    return initial;
  };

  function handleRegister({ email, password, name, avatar }) {
    auth
      .register({ email, password, name, avatar })
      .then((res) => {
        if (res) {
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
        const data = res.data;
        setLoggedIn(true);
        setCurrentUser(data);
        setToken(data.token);
        handleCloseModal();
        history.push("/profile");
        setNoAvatar(handleNoAvatar(data.name));
        console.log(isLoggedIn);
      })
      .catch((e) => console.error(`Error logging user in: ${e}`));
  }

  function handleSignout() {
    localStorage.removeItem("jwt");
    setCurrentUser("");
    setLoggedIn(false);
    setToken("");
    history.push("/");
  }

  function handleEditProfile({ name, avatar }) {
    auth
      .updateUser(token, { name, avatar })
      .then(() => {
        handleCloseModal();
        setCurrentUser({ ...currentUser, name, avatar });
      })
      .catch((e) => console.error(`Error: ${e}. Could not update user`));
  }

  function handleAddItem({ name, imageUrl, weather }) {
    console.log(token);
    api
      .addItem(
        {
          name,
          imageUrl,
          weather,
        },
        token
      )
      .then((res) => {
        setClothingItems([res.data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => console.error(err));
  }

  function handleDeleteItem(itemId) {
    api
      .deleteItem(itemId, token)
      .then(() => {
        const updateItems = clothingItems.filter((item) => {
          return item._id !== itemId;
        });
        setClothingItems(updateItems);
        handleCloseModal();
      })
      .catch((err) => console.error(err));
  }

  function handleAltClick() {
    if (activeModal === "signin") {
      handleCloseModal();
      handleOpenModal("signup");
    }
    if (activeModal === "signup") {
      handleCloseModal();
      handleOpenModal("signin");
    }
  }

  function handleLikeClick(currentUser, isLiked) {
    !isLiked
      ? api
          .addCardLike(currentUser, token)
          .then((updatedCard) => {
            updatedCard = updatedCard.data;
            setClothingItems((items) =>
              items.map((item) =>
                item._id === currentUser._id ? updatedCard : item
              )
            );
          })
          .catch((e) => console.error(e))
      : api
          .removeCardLike(currentUser, token)
          .then((updatedCard) => {
            updatedCard = updatedCard.data;
            setClothingItems((items) =>
              items.map((item) =>
                item._id === currentUser._id ? updatedCard : item
              )
            );
          })
          .catch((e) => console.error(e));
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
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .validTokenCheck(jwt)
        .then((res) => {
          setCurrentUser(res.data);
          setToken(jwt);
          setLoggedIn(true);
          setNoAvatar(handleNoAvatar(res.data.name));
        })
        .catch((e) => {
          console.error(`Token Check use effect: ${e}`);
        });
    }
  }, [token]);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTemperatureUnit,
          handleToggleSwitchChange,
        }}
      >
        <CurrentUserContext.Provider
          value={{ currentUser, isLoggedIn, noAvatar }}
        >
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
              onCardLike={handleLikeClick}
            />
          </Route>
          <ProtectedRoute path="/profile" loggedIn={isLoggedIn}>
            <Profile
              items={clothingItems}
              onSelectCard={handlePreviewModal}
              openCardModal={handleCreateModal}
              openSideEditModal={handleEditProfileModal}
              onSignout={handleSignout}
              onCardLike={handleLikeClick}
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
              altButtonText="or Register"
              altClick={handleAltClick}
            />
          )}
          {activeModal === "signup" && (
            <RegisterModal
              isOpen={handleSignUpModal}
              onSignUp={handleRegister}
              onClose={handleCloseModal}
              buttonText="Next"
              altButtonText="or Login"
              altClick={handleAltClick}
            />
          )}
          {activeModal === "edit-profile" && (
            <EditProfileModal
              isOpen={handleEditProfileModal}
              onEditProfile={handleEditProfile}
              onClose={handleCloseModal}
              buttonText="Save"
            />
          )}
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
