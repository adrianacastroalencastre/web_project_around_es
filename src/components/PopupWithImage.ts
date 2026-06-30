import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  private imageElement: HTMLImageElement;
  private captionElement: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);

    this.imageElement = this._popupElement.querySelector(
      ".popup__image"
    ) as HTMLImageElement;
    this.captionElement = this._popupElement.querySelector(
      ".popup__caption"
    ) as HTMLElement;
  }

  public open(name?: string, link?: string): void {
    if (!name || !link) {
      return;
    }

    this.imageElement.src = link;
    this.imageElement.alt = name;
    this.captionElement.textContent = name;

    super.open();
  }
}