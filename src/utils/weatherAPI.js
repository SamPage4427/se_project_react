import { latitude, longitude, apiKey } from "./constants.js";

function checkStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function getForcastWeather() {
  const weatherAPI = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(checkStatus);
  return weatherAPI;
}

function parseWeatherData(data) {
  const main = data.main;
  const temp = main && main.temp;
  return Math.ceil(temp);
}

const temperature = (temp) => ({
  F: `${Math.round(temp)}`,
  C: `${Math.round(((temp - 32) * 5) / 9)}`,
});

export { getForcastWeather, parseWeatherData, temperature, checkStatus };
