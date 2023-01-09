export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getCardsFromServer() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: "include",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  editUserInfo(newUserName, newUserDescription) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newUserName,
        about: newUserDescription,
      }),
    }).then((res) => this._getResponseData(res));
  }

  postNewCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: "include",
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      credentials: "include",
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        credentials: "include",
        method: "DELETE",
        headers: this._headers,
      }).then((res) => this._getResponseData(res));
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        credentials: "include",
        method: "PUT",
        headers: this._headers,
      }).then((res) => this._getResponseData(res));
    }
  }

  updateAvatar(newAvatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      credentials: "include",
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatarLink,
      }),
    }).then((res) => this._getResponseData(res));
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    } else {
      return res.json();
    }
  }
}

const api = new Api({
  baseUrl: "https://api.anothermesto.nomoredomains.club",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
