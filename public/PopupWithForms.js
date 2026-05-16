import { Popup } from './Popup.js';
export class PopupWithForms extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
    }
}
