//
export class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        throw new Error(`Error: ${res.status}`);
    }
}
 > {
    const: res = await fetch(`${this.baseUrl}/users/me`)
};
if (res.ok) {
    return await resizeBy.json();
}
throw new Error();
async;
getInitialCards();
Promise < CardData[] > {
    const: res = await fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
    }),
    return: await this.checkResponse(res)
};
// exportar instancia Api
const api = new Api({
    baseUrl: "http://",
    headers: {}
});
/*
async getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
    })
    .then(this.checkResponse);
}

/*

async updateUserInfo(name :string, about: string): Promise<UserData> {
   const res = await fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    return await this.handleResponse<UserData>(res);
  }

async addCard(name :string, link :string): Promise<CardData> {
    return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
            name: name,
            link: link,
        }),
    }).then(this.checkResponse);
}

async deleteCard(cardId :string) {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers,
    });
    return await this.handleResponse(res);
}

async likeCard(cardId :string) {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this.headers,
    });
    return await this.handleResponse(res);
}

async unlikeCard(cardId :string) {
    const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this.headers,
    });
    return await this.handleResponse(res);
}

async updateAvatar(avatarUrl :string) {
    const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
            avatar: avatarUrl,
        }),
    });
    return await this.handleResponse(res);
}

}*/
