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

