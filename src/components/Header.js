import { useContext } from "react";
import { NavLink } from "react-router-dom";

import logoImage from "../images/logo.svg";
import { currentDate } from "../utils/constants.js";
import ToggleSwitch from "./ToggleSwitch.js";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Header({ onCreateModal, location, onLoginModal, onRegisterModal }) {
  const { currentUser, isLoggedIn, noAvatar } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__container">
        <NavLink exact to="/">
          <img src={logoImage} alt="Logo" className="header__logo" />
        </NavLink>
        <h2 className="header__date">
          {currentDate}, {location}
        </h2>
      </div>
      <div className="header__container">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              className="header__button"
              type="text"
              onClick={onCreateModal}
            >
              + Add New Clothes
            </button>
            <NavLink to="/profile" className="header__link">
              <h2 className="header__name">
                {currentUser ? currentUser.name : "Terrence Tegegne"}
              </h2>
            </NavLink>
            <NavLink to="/profile">
              {currentUser ? (
                <img
                  src={currentUser.avatar}
                  alt="Avatar"
                  className="header__avatar"
                />
              ) : (
                <p className="header__noavatar">{noAvatar}</p>
              )}
            </NavLink>
          </>
        ) : (
          <>
            <button
              className="header__button"
              type="button"
              onClick={onRegisterModal}
            >
              Sign Up
            </button>
            <button
              className="header__button"
              type="button"
              onClick={onLoginModal}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
