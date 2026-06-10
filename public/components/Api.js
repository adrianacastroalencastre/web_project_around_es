var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Api {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    //GET 
    handleResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }
            return yield response.json();
        });
    }
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/users/1`);
            return yield this.handleResponse(response);
        });
    }
    getCards() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}/cards`);
            return yield this.handleResponse(response);
        });
    }
}
// GET https://around-api.es.tripleten-services.com/v1/cards/
