import SideBar from "./SideBar.js";
import ClothesSection from "./ClothesSection.js";

function Profile({
  items,
  onSelectCard,
  openCardModal,
  openSideEditModal,
  onSignout,
  onCardLike,
}) {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <SideBar openModal={openSideEditModal} onSignout={onSignout} />
      </div>
      <div className="profile__clothes-section">
        <ClothesSection
          openModal={openCardModal}
          items={items}
          onSelectCard={onSelectCard}
          onCardLike={onCardLike}
        />
      </div>
    </div>
  );
}

export default Profile;
