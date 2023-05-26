import { checkStatus } from "./weatherAPI.js";

class API {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getItems() {
    return fetch(`${this._baseUrl}/items`, {
      method: "GET",
      headers: this._headers,
    })
      .then(checkStatus)
      .catch((err) => console.error(err));
  }

  addItem({ name, imageUrl, weather }) {
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        imageUrl,
        weather,
      }),
    })
      .then(checkStatus)
      .catch((err) => console.error(err));
  }

  deleteItem(id) {
    return fetch(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(checkStatus)
      .catch((err) => console.error(err));
  }
}

export default API;
