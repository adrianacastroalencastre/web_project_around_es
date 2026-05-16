export class UserInfo {
    constructor(selectors) {
        this._nameElement = document.querySelector(selectors.nameSelector);
        this._jobElement = document.querySelector(selectors.jobSelector);
    }
}
