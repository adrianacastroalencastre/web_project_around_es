export class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        this.buttonElement = this.formElement.querySelector(this.config.submitButtonSelector);
    }
    _showInputError(inputElement, errorMessage) {
        const errorElement = this.formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(this.config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.config.errorClass);
    }
    _hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(this.config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this.config.errorClass);
    }
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this._hideInputError(inputElement);
        }
    }
    _hasInvalidInput() {
        return this.inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    _disableButton() {
        this.buttonElement.disabled = true;
        this.buttonElement.classList.add(this.config.inactiveButtonClass);
    }
    _enableButton() {
        this.buttonElement.disabled = false;
        this.buttonElement.classList.remove(this.config.inactiveButtonClass);
    }
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton();
        }
        else {
            this._enableButton();
        }
    }
    _setEventListeners() {
        this._toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }
    enableValidation() {
        this._setEventListeners();
    }
    resetValidation() {
        this._toggleButtonState();
        this.inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
}
///
