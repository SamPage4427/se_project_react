import logoImage from "../images/logo.svg";
import avatarImage from "../images/avatar.svg";
import { currentDate } from "../utils/constants";
import { NavLink } from "react-router-dom";
import ToggleSwitch from "./ToggleSwitch";

function Header({ onCreateModal, location }) {
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
        <button className="header__button" type="text" onClick={onCreateModal}>
          + Add New Clothes
        </button>
        <NavLink to="/profile" className="header__link">
          <h2 className="header__name">Terrence Tegegne</h2>
        </NavLink>
        <NavLink to="/profile">
          <img src={avatarImage} alt="Avatar" className="header__avatar" />
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
