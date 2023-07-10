import { baseUrl } from "./constants.js";
import { checkStatus } from "./weatherAPI.js";

export function signIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkStatus)
    .catch((e) => console.error(`Error in auth login: ${e}`));
}

export function register({ email, password, name, avatar }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, avatar }),
  })
    .then(checkStatus)
    .catch((e) => console.error(`Error in auth register: ${e}`));
}

export function validTokenCheck(token) {
  return fetch(`${baseUrl}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(checkStatus)
    .then((data) => {
      return data;
    })
    .catch((e) => console.error(`Error in auth checkToken: ${e}`));
}

export function updateUser(token, { name, avatar }) {
  return fetch(`${baseUrl}/user/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  })
    .then(checkStatus)
    .catch((e) => console.error(`Error in auth update: ${e}`));
}
