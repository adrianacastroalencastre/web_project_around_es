import { Popup } from './Popup.js';
//
type FormSubmitHandler = (formData: Record<string, string>) => void;

export class PopupWithForms extends Popup {
    private _formElement: HTMLFormElement;
    private _handleFormSubmit: FormSubmitHandler;

    constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector('.popup__form') as HTMLFormElement;
        this._handleFormSubmit = handleFormSubmit;
    }
}

