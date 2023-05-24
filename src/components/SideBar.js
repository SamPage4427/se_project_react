import avatarImage from "../images/avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatarImage} alt="Avatar" className="sidebar__avatar" />
      <h3 className="sidebar__name">Terrence Tegegne</h3>
    </div>
  );
}

export default SideBar;
