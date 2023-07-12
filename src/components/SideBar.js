import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function SideBar({ openModal, onSignout }) {
  const { currentUser, noAvatar } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {currentUser.avatar !== "" ? (
          <img
            src={currentUser.avatar}
            alt="Avatar"
            className="sidebar__avatar"
          />
        ) : (
          <p className="sidebar__noavatar">{noAvatar}</p>
        )}
        <h3 className="sidebar__name">{currentUser.name}</h3>
      </div>
      <div className="sidebar__btn-container">
        <button
          className="sidebar__btn-update"
          type="button"
          onClick={openModal}
        >
          Change profile data
        </button>
        <button className="sidebar__logout" type="button" onClick={onSignout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
