import { CardData, UserData } from './Card';
export class Api {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    //GET 
    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        return await response.json();
    }

    async getUserInfo(): Promise<{ name: string; about: string; avatar: string }> {
        const response = await fetch(`${this.baseUrl}/users/1`);
        return await this.handleResponse<UserData>(response);
    }

    async getCards(): Promise<CardData[]> {
        const response = await fetch(`${this.baseUrl}/cards`);
        return await this.handleResponse<CardData[]>(response);
    }
}

// GET https://around-api.es.tripleten-services.com/v1/cards/
 
