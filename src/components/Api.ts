import type { AvatarFormData, CardData, UserData } from "../types/types";
import type { Card } from "./Card";
interface ApiOptions {
    baseUrl: string;
    headers: Record<string, string>;
}
//
export class Api {
    private baseUrl: string;
    private headers: Record<string, string>;

    constructor(options: ApiOptions) {
        console.log( `API initialized with baseUrl: ${options.baseUrl}`);
        this.baseUrl = options.baseUrl; 
        this.headers = options.headers;
    }

// Methods of API [getUserInfo, getCards, addCard, deleteCard, updateUserInfo, updateAvatar, likeCard, dislikeCard]
private async handleResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
        return await response.json() as Promise <T>;
    }
    return Promise.reject(`Error: ${response.status}`);
}
//metodos
async getUserInfo(): Promise<UserData> {
    const response = await fetch(`${this.baseUrl}/users/me`,{
        headers: this.headers,
    });
    return await this.handleResponse<UserData>(response);
}
    
async getInitialCards(): Promise<CardData[]> {
    const response = await fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
    });
    if (!response.ok) {
    return await response.json() //this.handleResponse<CardData[]>(response);
}
    throw new Error(`Error: ${response.status}`);
}

async updateUserInfo(name: string, about: string): Promise<UserData> {
   const response = await fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({name: name, about: about}),
    });
    return await this.handleResponse<UserData>(response);
  }
//addCard 
async addCard(name :string, link :string): Promise<CardData> {
    const response = await fetch(`${this.baseUrl}/cards`,{
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({name, link})
    });
    return await this.handleResponse<CardData>(response);
}

async deleteCard(cardId :string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers,
    });
    return await this.handleResponse(response);
}

async likeCard(cardId :string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this.headers,
    });
    return await this.handleResponse(response);
}

async unlikeCard(cardId :string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this.headers,
    });
    return await this.handleResponse(response);
}   

async updateAvatar(avatarUrl: AvatarFormData["avatar"]): Promise<UserData> {
    const response = await fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({ 
            avatar: avatarUrl,
        }),
    });
    return await this.handleResponse<UserData>(response);
}
}