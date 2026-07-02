import { UserInfo } from "./UserInfo";

import type { CardData, UserData } from "../types/types";
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

// Methods of API [getUserInfo, getInitialCards, addCard, deleteCard, updateUserInfo, updateAvatar, likeCard, dislikeCard]
private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    return response.json();
}

//metodos
async getUserInfo() {
    const response = await fetch(`${this.baseUrl}/users/me`,{
        headers: this.headers,
    });
    return await this.handleResponse<UserData>(response);
}
    
async getCards(): Promise<CardData[]> {
    const response = await fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
    });
    return await this.handleResponse(response);
}


async updateUserInfo(name: string, about: string): Promise<UserData> {
   const res = await fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({name: name, about: about}),
    });
    return await this.handleResponse<UserData>(res);
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