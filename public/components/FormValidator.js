export class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        this.buttonElement = this.formElement.querySelector(this.config.submitButtonSelector);
    }
    isValid(inputElement) {
        return inputElement.validity.valid;
    }
    /*private hasInvalidInput(): boolean {
      return this.inputList.some((inputElement) => !this.isValid(inputElement));
    }*/
    hasInvalidInput(inputList) {
        return inputList.some(input => !this.isValid(input));
    }
    toggleButtonState(inputList, button) {
        if (this.hasInvalidInput(inputList)) {
            button.classList.add(this.config.inactiveButtonClass);
            button.disabled = true;
        }
        else {
            button.classList.remove(this.config.inactiveButtonClass);
            button.disabled = false;
        }
    }
    showInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`.popup__error_type_${inputElement.name}`);
        inputElement.classList.add(this.config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this.config.errorClass);
    }
    hideInputError(inputElement) {
        const errorElement = this.formElement.querySelector(`.popup__error_type_${inputElement.name}`);
        inputElement.classList.remove(this.config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this.config.errorClass);
    }
    checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this.showInputError(inputElement);
        }
        else {
            this.hideInputError(inputElement);
        }
    }
    disableButton() {
        this.buttonElement.disabled = true;
        this.buttonElement.classList.add(this.config.inactiveButtonClass);
    }
    enableButton() {
        this.buttonElement.disabled = false;
        this.buttonElement.classList.remove(this.config.inactiveButtonClass);
    }
    /*private toggleButtonState(inputList: HTMLInputElement[], button: HTMLButtonElement): void {
      if (this.hasInvalidInput()) {
        this.disableButton();
      } else {
        this.enableButton();
      }
    }
  
    /**/
    setEventListeners() {
        const inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        const button = this.formElement.querySelector(this.config.submitButtonSelector);
        inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this.checkInputValidity(input);
                this.toggleButtonState(inputList, button);
            });
        });
    }
    //
    enableValidation() {
        this.setEventListeners();
    }
    resetValidation() {
        const inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        const button = this.formElement.querySelector(this.config.submitButtonSelector);
        inputList.forEach((input) => {
            this.hideInputError(input);
        });
        this.toggleButtonState(inputList, button);
    }
}
