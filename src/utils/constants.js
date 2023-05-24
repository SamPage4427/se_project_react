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
export const baseUrl = "http://localhost:3001";
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

export const defaultClothes = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Winter coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  },
];
