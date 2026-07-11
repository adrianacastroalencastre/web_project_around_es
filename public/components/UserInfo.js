export class UserInfo {
    constructor({ nameSelector, descriptionSelector, avatarSelector }) {
        this.nameElement = document.querySelector(nameSelector);
        this.descriptionElement = document.querySelector(descriptionSelector);
        this.avatarElement = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent || "",
            about: this.descriptionElement.textContent || "",
            avatar: this.avatarElement.src || "",
        };
    }
    setUserInfo({ name, about, avatar }) {
        this.nameElement.textContent = name;
        this.descriptionElement.textContent = about;
        this.avatarElement.src = avatar;
    }
}
