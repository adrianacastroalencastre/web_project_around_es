interface FormConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string; 

}
export class FormValidator {
  private config: FormConfig;
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private buttonElement: HTMLButtonElement;

  constructor(config: FormConfig, formElement: HTMLFormElement) {
    this.config = config;
    this.formElement = formElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(this.config.inputSelector)
    ) as HTMLInputElement[];
    this.buttonElement = this.formElement.querySelector(
      this.config.submitButtonSelector
    ) as HTMLButtonElement;
  }

  private _showInputError(
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

  private _hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this.formElement.querySelector(
      `.${inputElement.name}-error`
    ) as HTMLElement;

    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this.config.errorClass);
  }

  private _checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  private _hasInvalidInput(): boolean {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  private _disableButton(): void {
    this.buttonElement.disabled = true;
    this.buttonElement.classList.add(this.config.inactiveButtonClass);
  }

  private _enableButton(): void {
    this.buttonElement.disabled = false;
    this.buttonElement.classList.remove(this.config.inactiveButtonClass);
  }

  private _toggleButtonState(): void {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  private _setEventListeners(): void {
    this._toggleButtonState();

    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  public enableValidation(): void {
    this._setEventListeners();
  }

  public resetValidation(): void {
    this._toggleButtonState();

    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}

///

