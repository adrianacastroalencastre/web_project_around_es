var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//
export class Api {
    constructor(options) {
        console.log(`API initialized with baseUrl: ${options.baseUrl}`);
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    // Methods of API [getUserInfo, getCards, addCard, deleteCard, updateUserInfo, updateAvatar, likeCard, dislikeCard]
    handleResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (response.ok) {
                return yield response.json();
            }
            return Promise.reject(`Error: ${response.status}`);
        });
    }
    //metodos
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/users/me`, {
                headers: this.headers,
            });
            return yield this.handleResponse(response);
        });
    }
    getInitialCards() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/cards`, {
                headers: this.headers,
            });
            if (response.ok) {
                return yield response.json();
            }
            throw new Error(`Error: ${response.status}`);
        });
    }
    updateUserInfo(name, about) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({ name: name, about: about }),
            });
            return yield this.handleResponse(response);
        });
    }
    //addCard 
    addCard(name, link) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/cards`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ name, link })
            });
            return yield this.handleResponse(response);
        });
    }
    deleteCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this.headers,
            });
            return yield this.handleResponse(response);
        });
    }
    likeCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this.headers,
            });
            return yield this.handleResponse(response);
        });
    }
    dislikeCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this.headers,
            });
            return yield this.handleResponse(response);
        });
    }
    updateAvatar(avatarUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    avatar: avatarUrl,
                }),
            });
            return yield this.handleResponse(response);
        });
    }
}
