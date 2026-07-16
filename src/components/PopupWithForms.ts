type FormSubmitHandler = (inputValues: Record<string, string>) => void;
import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private inputList: HTMLInputElement[];
  private handleFormSubmit: FormSubmitHandler;

  constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler) {
    super(popupSelector);
    this.formElement = this.popupElement.querySelector(
      ".profile__edit-button"
    ) as HTMLFormElement;
    this.inputList = Array.from(
      this.formElement.querySelectorAll(".popup__input")
    ) as HTMLInputElement[];
    this.handleFormSubmit = handleFormSubmit;
  }

  private getInputValues(): Record<string, string> {
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
      this.handleFormSubmit(this.getInputValues());
      this.close();
    });
  }

  public close(): void {
    super.close();
    this.formElement.reset();
  }

  renderisLoading(isLoading: boolean){
    if (isLoading) {
      this.formElement.querySelector(".popup__button")!.textContent = "Guardando...";
    } else {
      this.formElement.querySelector(".popup__button")!.textContent = "Guardar";
    }
  }
  
}