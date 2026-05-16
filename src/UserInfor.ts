interface UserInfoSelectors {
    nameSelector: string;
    jobSelector: string;
}
//
interface UserData {
    name: string;
    job: string;
}

export class UserInfo {
    private _nameElement: HTMLElement;
    private _jobElement: HTMLElement;

    constructor(selectors: UserInfoSelectors) {
        this._nameElement = document.querySelector(selectors.nameSelector) as HTMLElement;
        this._jobElement = document.querySelector(selectors.jobSelector) as HTMLElement;
    }
}