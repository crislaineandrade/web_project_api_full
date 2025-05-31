

class Auth{
  constructor(options) {
  this.baseUrl = options.baseUrl
  this.headers = options.headers

  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  register(email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({email,password})
    })
    .then(this._handleServerResponse)

  }

  login(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})

    })
    .then(this._handleServerResponse)

  }


  getUserInfo(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`
      },

    }).then(this._handleServerResponse);
  }

  // tokenValidate(token, email) {
  //   return fetch(`${this.baseUrl}/users/me`, {
  //     method: "GET",
  //     headers: {
  //       "Contenty-Type": "application/json",
  //       "Authorization": `Bearer ${token}`
  //     }
  //   })
  //   .then(this._handleServerResponse)
  // }
}









const auth = new Auth({
  baseUrl: 'https://se-register-api.en.tripleten-services.com/v1',
  headers: {
    "Content-Type": "application/json",
  }
})

export default auth