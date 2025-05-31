class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this._handleServerResponse);
  }



  editProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleServerResponse);
  }

  addNewCard(nameCard, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: nameCard,
        link: link,
      }),
    }).then(this._handleServerResponse);
  }

  deleteCard(idToBeDeleted) {
    return fetch(`${this.baseUrl}/cards/${idToBeDeleted}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(
        `Não foi possivel excluir o cartão. [ERROR]: ${res.status}`
      );
    });
  }

  handleLikeAction(idToBeLiked, isLiked) {
    return fetch(`${this.baseUrl}/cards/${idToBeLiked}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Não foi possivel executar a ação ${res.status}`);
    });
  }

  editAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Não foi possível alterar a foto de perfil. ${res.status}`
      );
    });
  }

  getAvatar() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })

    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Não foi possível encontrar a foto de perfil. ${res.status}`
      );
    });

  }
}

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1/",
  headers: {
    "authorization": "ef40eba5-5f65-4620-a921-5bfd85fc37bd",
    "Content-Type": "application/json",
  },
});




export default api;
