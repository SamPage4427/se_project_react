import sunnyDay from "../images/day/sunny.svg";
import cloudyDay from "../images/day/cloudy.svg";
import rainyDay from "../images/day/rain.svg";
import stormDay from "../images/day/storm.svg";
import snowDay from "../images/day/snow.svg";
import foggyDay from "../images/day/fog.svg";
import clearNight from "../images/night/night-moon.svg";
import cloudyNight from "../images/night/night-cloud.svg";
import rainyNight from "../images/night/night-rain.svg";
import stormNight from "../images/night/night-storm.svg";
import snowNight from "../images/night/night-snow.svg";
import foggyNight from "../images/night/night-fog.svg";

export const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});
export const apiKey = "15e59ac98f2bc0b63d4f108c616da6c4";
export const latitude = 35.6762;
export const longitude = 139.6503;
export const ESC_KEYCODE = 27;
export const baseUrl =
  "https://my-json-server.typicode.com/SamPage4427/se_project_react";
export const headers = { "Content-Type": "application/json" };

export const weatherOptions = [
  {
    url: sunnyDay,
    day: true,
    weatherType: "sunny",
  },
  {
    url: cloudyDay,
    day: true,
    weatherType: "cloudy",
  },
  {
    url: rainyDay,
    day: true,
    weatherType: "rain",
  },
  {
    url: stormDay,
    day: true,
    weatherType: "storm",
  },
  {
    url: snowDay,
    day: true,
    weatherType: "snow",
  },
  {
    url: foggyDay,
    day: true,
    weatherType: "fog",
  },
  {
    url: clearNight,
    day: false,
    weatherType: "clear",
  },
  {
    url: cloudyNight,
    day: false,
    weatherType: "cloudy",
  },
  {
    url: rainyNight,
    day: false,
    weatherType: "rain",
  },
  {
    url: stormNight,
    day: false,
    weatherType: "storm",
  },
  {
    url: snowNight,
    day: false,
    weatherType: "snow",
  },
  {
    url: foggyNight,
    day: false,
    weatherType: "fog",
  },
];
