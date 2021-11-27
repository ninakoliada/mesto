export class Api {
  constructor({baseUrl, headers}) {
   this.baseUrl = baseUrl;
   this.headers = headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this.baseUrl + '/users/me', {
        headers: this.headers,
    }).then(this._parseResponse);
  }

  getInitialCards() {
    return fetch(this.baseUrl + '/cards', {
      headers: this.headers,
    }).then(this._parseResponse)
  }

}