import "../blocks/main/main.css";
import WeatherCard from "./WeatherCard.js";
import { defaultClothes } from "../utils/constants.js";
import ItemCard from "./ItemCard";
import { useMemo } from "react";

function Main({ temp, onImageClick }) {
  const weatherType = useMemo(() => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 56 && temp <= 85) {
      return "warm";
    } else if (temp <= 55) {
      return "cold";
    }
  }, [temp]);

  const filteredCards = defaultClothes.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={false} weatherType="clear" temp={temp} />
      <section className="cards__section" id="item-cards-section">
        <p className="cards__recommend">
          Today is {temp}&deg; F. You may want to wear:
        </p>
        <div className="cards__items">
          {filteredCards.map((item) => {
            return <ItemCard item={item} onSelectCard={onImageClick} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
