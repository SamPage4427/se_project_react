import { weatherOptions } from "../utils/constants.js";

function WeatherCard({ day, weatherType, temp }) {
  const imgSrc = weatherOptions.filter((i) => {
    return i.day === day && i.weatherType === weatherType;
  });

  const imgSrcUrl = imgSrc[0].url || "";

  return (
    <section className="weather" id="weather-section">
      <div className="weather__temp">{temp}&deg;F</div>
      <img src={imgSrcUrl} alt="Weather Type" className="weather__image" />
    </section>
  );
}

export default WeatherCard;
