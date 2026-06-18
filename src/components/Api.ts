import { CardData } from "./Card";

interface ApiOptions {
    baseUrl: string;
    headers: Record<string, string>;
}
export class Api {
    private baseUrl: string;
    private _headers: Record<string, string>;

    constructor(options: ApiOptions) {
        this.baseUrl = options.baseUrl; 
        this._headers = options.headers;
    }
}

_checkResponse(res) {
    if (res.ok) {
        return res.json(); 
    }
    return Promise.reject(`Error: ${res.status}`);
}

getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
        headers: this._headers,
    })
    .then(this._checkResponse);
}

getInitialCards() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
    })
    .then(this._checkResponse);
}

getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
        headers: this._headers,
    })
    .then(this._checkResponse);
}

updateUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ 
            name: name, 
            about: about,
        }),
    }).then(this._checkResponse);
}

addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ 
            name: name, 
            link: link,
        }),
    }).then(this._checkResponse);
}

deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
    }).then(this._checkResponse);
}

likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
    }).then(this._checkResponse);
}

unlikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
    }).then(this._checkResponse);
}   

updateAvatar(avatarUrl) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ 
            avatar: avatarUrl,
        }),
    }).then(this._checkResponse);
}