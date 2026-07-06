;
export class FormValidator {
    constructor(config, formElement, inputList, buttonElement) {
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
    /*private showInputError(
      inputElement: HTMLInputElement,
      errorMessage: string
    ): void {
      const errorElement = this.formElement.querySelector(
        `.${inputElement.name}-error`
      ) as HTMLElement;
  
      inputElement.classList.add(this.config.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this.config.errorClass);
    }
  
    private hideInputError(inputElement: HTMLInputElement): void {
      const errorElement = this.formElement.querySelector(
        `.${inputElement.name}-error`
      ) as HTMLElement;
  
      inputElement.classList.remove(this.config.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this.config.errorClass);
    }
  
    private checkInputValidity(inputElement: HTMLInputElement): void {
      if (!inputElement.validity.valid) {
        this.showInputError(inputElement, inputElement.validationMessage);
      } else {
        this.hideInputError(inputElement);
      }
    }
  
    private disableButton(): void {
      this.buttonElement.disabled = true;
      this.buttonElement.classList.add(this.config.inactiveButtonClass);
    }
  
    private enableButton(): void {
      this.buttonElement.disabled = false;
      this.buttonElement.classList.remove(this.config.inactiveButtonClass);
    }
  
    /*private toggleButtonState(inputList: HTMLInputElement[], button: HTMLButtonElement): void {
      if (this.hasInvalidInput()) {
        this.disableButton();
      } else {
        this.enableButton();
      }
    }*/
    setEventListeners() {
        const inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        const button = this.formElement.querySelector(this.config.submitButtonSelector);
        inputList.forEach((input) => {
            input.addEventListener("input", () => {
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
        this.toggleButtonState(inputList, button);
    }
}
