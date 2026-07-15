import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    setSubmitHandler(handler) {
        const confirmButton = this.popupElement.querySelector(".popup__button");
    }
}
