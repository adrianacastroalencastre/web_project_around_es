import type { UserData } from "../types/types.js";

interface UserInfoSelectors {
  nameSelector: string;
  descriptionSelector: string;
  avatarSelector: string;
}
export class UserInfo {
  private nameElement: HTMLElement;
  private descriptionElement: HTMLElement;
  private avatarElement: HTMLImageElement;

 constructor({ nameSelector, descriptionSelector, avatarSelector }: UserInfoSelectors) {
    this.nameElement = document.querySelector(nameSelector) as HTMLElement;
    this.descriptionElement = document.querySelector(
      descriptionSelector
    ) as HTMLElement;
    this.avatarElement = document.querySelector(avatarSelector) as HTMLImageElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this.nameElement.textContent || "",
      about: this.descriptionElement.textContent || "",
      avatar: this.avatarElement.src || "",
    };
  }

  public setUserInfo({ name, about, avatar }: UserData & { avatar: string }): void {
    this.nameElement.textContent = name;
    this.descriptionElement.textContent = about;
    this.avatarElement.src = avatar;
  }
}

