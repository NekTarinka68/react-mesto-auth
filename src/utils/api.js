import { apiConfig } from "./constant";

export default class Api {
  constructor(apiConfig) {
    this._headers = apiConfig.headers;
    this._host = apiConfig.host;
  }

  _respondErr(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._host}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => this._respondErr(res))
  }

  getEditProfile(data) {
    return fetch(`${this._host}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name: data.name, about: data.about})
    })
    .then((res) => this._respondErr(res))
  }

  getInitialCards() {
    return fetch(`${this._host}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => this._respondErr(res))
  }

  getAddCard(data) {
    return fetch(`${this._host}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name: data.name, link: data.link})
    })
    .then((res) => this._respondErr(res))
  }

  getProfileAvatar(data) {
    return fetch(`${this._host}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data
      })
    })
    .then((res) => this._respondErr(res))
  }

  getLikeCard(id) {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => this._respondErr(res))
  }

  getDislikeCard(id) {
    return fetch(`${this._host}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => this._respondErr(res))
  }

  getDeleteCard(id) {
    return fetch(`${this._host}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => this._respondErr(res))
  }
}

export const api = new Api(apiConfig);