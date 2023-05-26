import SideBar from "./SideBar.js";
import ClothesSection from "./ClothesSection.js";
import ItemCard from "./ItemCard.js";

function Profile({ items, onSelectCard, openModal }) {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <SideBar />
      </div>
      <div className="profile__clothes-section">
        <ClothesSection openModal={openModal} />
        <section className="clothes-section__items">
          <div className="clothes-section__item">
            {items.map((item) => {
              return (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  weather={item.weather}
                  item={item}
                  onSelectCard={onSelectCard}
                />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
