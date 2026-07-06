import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
    //private handleConfirm: () => void;
    constructor(popupSelector) {
        super(popupSelector);
    }
}
/*setAction(callback: () => void): void {
    this.handleConfirm = callback;
}

setEventListeners(): void {
    super.setEventListeners();
    const confirmButton = this.popup.querySelector(".popup__button");
    confirmButton?.addEventListener("click", ()=> {
        this.handleConfirm();
    });
}
*/
