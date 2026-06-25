import { Popup } from "./Popup.js";

/*export class PopupWithConfirmation extends Popup {
  private form: HTMLFormElement | null;
  //private handleSubmit: () => void;
  constructor(popupSelector :string) {
    super(popupSelector);
    this.form = this.popup.querySelector(".popup__form");
  }

const getUserInfo = form.querySelector(
  ".form__input_type-id",
)
as HTMLInputElement; 

  setSubmitAction(action) {
    this._handleSubmit = action;
  };

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleSubmit();
    });
  }
}

  // api.deleteCard(cardId) */