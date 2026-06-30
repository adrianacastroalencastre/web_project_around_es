import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.imageElement = this._popupElement.querySelector(".popup__image");
        this.captionElement = this._popupElement.querySelector(".popup__caption");
    }
    open(name, link) {
        if (!name || !link) {
            return;
        }
        this.imageElement.src = link;
        this.imageElement.alt = name;
        this.captionElement.textContent = name;
        super.open();
    }
}
