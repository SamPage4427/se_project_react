import SideBar from "./SideBar.js";
import ClothesSection from "./ClothesSection.js";

function Profile({ items, onSelectCard, openModal }) {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <SideBar />
      </div>
      <div className="profile__clothes-section">
        <ClothesSection
          openModal={openModal}
          items={items}
          onSelectCard={onSelectCard}
        />
      </div>
    </div>
  );
}

export default Profile;
