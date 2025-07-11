const API_URL = import.meta.env.VITE_BACK

if (import.meta.env.MODE !== 'production') {
  console.log('URL da API usada:', API_URL);
}


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

  getCards(token) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  },
    }).then(this._handleServerResponse);
  }



  editProfile(name, about, token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleServerResponse);
  }

  addNewCard(nameCard, link, token) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  },
      body: JSON.stringify({
        name: nameCard,
        link: link,
      }),
    }).then(this._handleServerResponse);
  }

  deleteCard(idToBeDeleted, token) {
    return fetch(`${this.baseUrl}/cards/${idToBeDeleted}`, {
      method: "DELETE",
      headers: {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(
        `Não foi possivel excluir o cartão. [ERROR]: ${res.status}`
      );
    });
  }

  handleLikeAction(idToBeLiked, isLiked, token) {
    return fetch(`${this.baseUrl}/cards/${idToBeLiked}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Não foi possivel executar a ação ${res.status}`);
    });
  }

  editAvatar(link, token) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  },
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

  getAvatar(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  },
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

  getUser(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
    'Authorization': `Bearer ${token}`,
    "Content-Type": "application/json",
  },
    })

    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Não foi possível encontrar o usuário. ${res.status}`
      );
    });

  }


    getUserInfo(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${token}`
      },

    }).then(this._handleServerResponse);
  }

}

const api = new Api({
  baseUrl:`${API_URL}` ,
  // headers: {
  //   'Authorization': `Bearer ${token}`,
  //   "Content-Type": "application/json",
  // },
});




export default api;
