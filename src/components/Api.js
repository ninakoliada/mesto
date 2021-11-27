export class Api {
  constructor({baseUrl, headers}) {
   this.baseUrl = baseUrl;
   this.headers = headers;
  }

  getUserInfo() {
    return fetch(this.baseUrl + '/users/me', {
        headers: this.headers,
    }).then((res) => {
        return res.json();
    });
  }
}