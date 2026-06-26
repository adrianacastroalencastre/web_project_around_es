//
export class Api {
    baseUrl;
    headers;
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    // Desde aqui 
    /*private checkResponse(res: Response): Promise<T> {
        if (!res.ok) {
            throw new Error(`Error fetching cards: ${response.statusText}`);
        }
        return await response.json();
    }
    }
    */
    // Methods of API [getUserInfo, getInitialCards, addCard, deleteCard, updateUserInfo, updateAvatar, likeCard, dislikeCard]
    // -->>>>>>>
    async handleResponse(response) {
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        return await response.json();
    }
    async getUserInfo() {
        const response = await fetch(`${this.baseUrl}/users/1`);
        return await this.handleResponse(response);
    }
    async getCards() {
        const response = await fetch(`${this.baseUrl}/cards`);
        return await this.handleResponse(response);
    }
}
//
// ---------------------------------------------------------------------------
/*async updateUserInfo(name: string, description: string): Promise<UserInfo> {
   const res = await fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(name, description),
    });
    return await this.handleResponse<UserInfo>(res);
  }
//addCard
async addCard(name :string, link :string): Promise<CardData> {
    const res = await fetch(`${this.baseUrl}/cards`,{
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({name, link})
    });

    if(res.ok) {
        return await res.json();
    }
    throw new Error(`Error: ${res.status}`);
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

}
*/ 
