import { weatherOptions } from "../utils/constants.js";

function WeatherCard({ day, weatherType, temp }) {
  const weatherOption = weatherOptions.find((item) => {
    return item.day === day && item.weatherType === weatherType;
  });

  const imgSrcUrl = weatherOption.url || "";

  return (
    <section className="weather" id="weather-section">
      <div className="weather__temp">{temp}&deg;F</div>
      <img src={imgSrcUrl} alt="Weather Type" className="weather__image" />
    </section>
  );
}

export default WeatherCard;
