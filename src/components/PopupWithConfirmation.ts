type FormSubmitHandler = (inputValues: Record<string, string>) => void;
import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup { 
    setSubmitHandler(handler: FormSubmitHandler): void {
        const confirmButton = this.popupElement.querySelector(".popup__button") as HTMLButtonElement;               
    }
}