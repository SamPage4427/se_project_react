import "../blocks/main/main.css";
import { useContext } from "react";

import WeatherCard from "./WeatherCard.js";
import ItemCard from "./ItemCard.js";
import CurrentTempUnitContext from "../contexts/CurrentTempUnitContext.js";
// import { defaultClothes } from "../utils/constants.js";
import { temperature } from "../utils/weatherAPI";

function Main({ temp, onImageClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTempUnitContext);
  const getWeatherType = () => {
    if (temp >= 86) {
      return "hot";
    } else if (temp >= 56 && temp <= 85) {
      return "warm";
    } else if (temp <= 55) {
      return "cold";
    }
  };
  const weatherType = getWeatherType();

  const currentTemp = temperature(temp)[currentTemperatureUnit];

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard day={false} weatherType="clear" temp={temp} />
      <section className="cards__section" id="item-cards-section">
        <p className="cards__recommend">
          Today is {currentTemp}&deg;{currentTemperatureUnit}. You may want to
          wear:
        </p>
        <div className="cards__items">
          {filteredCards.map((item) => {
            return (
              <ItemCard key={item.id} item={item} onSelectCard={onImageClick} />
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Main;
