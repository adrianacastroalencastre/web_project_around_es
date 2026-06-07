export class Api {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    //GET 

    async getsUserInfo(): Promise<UserInfoData> {
        const response = await fetch(`${this.baseUrl}/user/info`);
        if(!response.ok) {
            throw new Error(`Error fetching user info: ${response.statusText}`);
        }
        return await response.json();
    } 
}

const api = new Api('https://around-api.es.tripleten-services.com/v1/.');