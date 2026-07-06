import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this.formElement = this.popupElement.querySelector(".popup__form");
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
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
}
