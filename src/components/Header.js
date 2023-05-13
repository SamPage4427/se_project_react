import logoImage from "../images/logo.svg";
import avatarImage from "../images/avatar.svg";
import { currentDate } from "../utils/constants";

function Header({ onCreateModal, location }) {
  return (
    <header className="header">
      <div className="header__container">
        <img src={logoImage} alt="Logo" className="header__logo" />
        <h2 className="header__date">
          {currentDate}, {location}
        </h2>
      </div>
      <div className="header__container">
        <button className="header__button" type="text" onClick={onCreateModal}>
          + Add New Clothes
        </button>
        <h2 className="header__name">Name</h2>
        <img src={avatarImage} alt="Avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
