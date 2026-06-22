import { CardData } from "./Card";
import { UserInfo } from "./UserInfo";
interface ApiOptions {
    baseUrl: string;
    headers: Record<string, string>;
}
//
export class Api {
    private baseUrl: string;
    private headers: Record<string, string>;

    constructor(options: ApiOptions) {
        this.baseUrl = options.baseUrl; 
        this.headers = options.headers;
    }
// Desde aqui analizar codigo
private checkResponse(res: Response) {
    if (res.ok) {
        return res.json();
    }
    throw new Error(`Error: ${res.status}`);
}
// Methods of API [getUserInfo, getInitialCards, addCard, deleteCard, updateUserInfo, updateAvatar, likeCard, dislikeCard]
async getInitialCards(){
    const res = await fetch(`${this.baseUrl}/cards`,{
        headers: this.headers
    });
    return this.checkResponse(res);
}

async getUserInfo(): Promise<User> {
    const res = await fetch(`${this.baseUrl}/users/me`,{
        headers: this.headers
    });
    if (res.ok) {
        return await res.json();
}
throw new Error(`Error: ${res.status}`);
}

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

}

}
