interface FormConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string; 
}; 
export class FormValidator {
  private config: FormConfig;
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private buttonElement: HTMLButtonElement;

  constructor(config: FormConfig, formElement: HTMLFormElement, inputList?: HTMLInputElement[], buttonElement?: HTMLButtonElement) {
    this.config = config;
    this.formElement = formElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(this.config.inputSelector)
    ) as HTMLInputElement[];
    this.buttonElement = this.formElement.querySelector(
      this.config.submitButtonSelector
    ) as HTMLButtonElement;
  }

  private isValid(inputElement: HTMLInputElement): boolean {
    return inputElement.validity.valid;
  }
  /*private hasInvalidInput(): boolean {
    return this.inputList.some((inputElement) => !this.isValid(inputElement));
  }*/
  private hasInvalidInput(inputList: HTMLInputElement[]): boolean {
    return inputList.some(input =>!this.isValid(input));  
    }   

  private toggleButtonState(inputList: HTMLInputElement[], button: HTMLButtonElement): void {
    if (this.hasInvalidInput(inputList)) {
      button.classList.add(this.config.inactiveButtonClass);
      button.disabled = true;
    } else {
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
     
  private setEventListeners(): void {
    const inputList = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(this.config.inputSelector)
    );
    const button = this.formElement.querySelector<HTMLButtonElement>(
      this.config.submitButtonSelector
    )!;

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this.toggleButtonState(inputList, button);
      });
    });
  }

  //
  public enableValidation(): void {
    this.setEventListeners();
  }

  public resetValidation(): void {
    const inputList = Array.from(
      this.formElement.querySelectorAll<HTMLInputElement>(this.config.inputSelector)
    );
    const button = this.formElement.querySelector<HTMLButtonElement>(
      this.config.submitButtonSelector
    )!;

    this.toggleButtonState(inputList, button);
}
}
