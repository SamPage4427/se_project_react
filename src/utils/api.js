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
    }).then(checkStatus);
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
    }).then(checkStatus);
  }

  deleteItem(id) {
    return fetch(`${this._baseUrl}/items/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(checkStatus);
  }
}

export default API;
