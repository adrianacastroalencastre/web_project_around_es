type FormSubmitHandler = (inputValues: Record<string, string>) => void;
import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private handleFormSubmit: FormSubmitHandler;

  constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler) {
    super(popupSelector);

    this.formElement = this._popupElement.querySelector(
      ".popup__form"
    ) as HTMLFormElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(".popup__input")
    ) as HTMLInputElement[];
    this.handleFormSubmit = handleFormSubmit;
  }

  private _getInputValues(): Record<string, string> {
    const inputValues: Record<string, string> = {};

    this.inputList.forEach((inputElement) => {
      inputValues[inputElement.name] = inputElement.value;
    });

    return inputValues;
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
      this.handleFormSubmit(this._getInputValues());
    });
  }

  public close(): void {
    super.close();
    this.formElement.reset();
  }
}