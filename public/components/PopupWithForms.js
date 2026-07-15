import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        console.log(this.popupElement);
        this.formElement = this.popupElement.querySelector(".profile__edit-button");
        this.inputList = Array.from(this.formElement.querySelectorAll(".popup__input"));
        this.handleFormSubmit = handleFormSubmit;
    }
    getInputValues() {
        const inputValues = {};
        this.inputList.forEach((inputElement) => {
            inputValues[inputElement.name] = inputElement.value;
        });
        return inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this.getInputValues());
            this.close();
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
