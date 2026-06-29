import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
import { Card } from "./components/Card.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithForm } from "./components/PopupWithForms.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
//import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { Api } from "./components/Api.js";

interface CardData {
  name:string;
  link:string;
}

interface UserData {
  name: string;
  description: string;
}

interface ApiUserResponse {
  name: string;
  about: string;
}

interface ApiCardResponse {
  name: string;
  link: string;
  _id: string;
}

interface ValidationConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonSelector: string;
}

// DOM Selectores
const profileInfo = document.querySelector<HTMLElement>(".profile__info")!;
const editModal = document.querySelector<HTMLElement>("#edit-popup")!;
const newCardModal = document.querySelector<HTMLElement>("#new-card-popup"); 
const openModal = profileInfo.querySelector<HTMLButtonElement>(".profile__edit-button")!;
const openNewCardModelButton = document.querySelector<HTMLButtonElement>(".profile__add-button")!;
const formElement = editModal.querySelector<HTMLFormElement>("#edit-profile-form")!;
const newCardForm = document.querySelector<HTMLFormElement>("#new-card-form")!;

const inputName = document.querySelector<HTMLInputElement>(".popup__input_type_name")!;
const inputDescription = document.querySelector<HTMLInputElement>(".popup__input_type_description")!;

const saveButton = formElement.querySelector<HTMLButtonElement>(".popup__button")!;
const newCardButton = newCardForm.querySelector<HTMLButtonElement>(".popup__button")!;

const inputList = Array.from(formElement.querySelectorAll<HTMLInputElement>(".popup__input"));
const newCardinputs = Array.from(newCardForm.querySelectorAll<HTMLInputElement>(".popup__input"));

// Configuración

const validationConfig: ValidationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: "popup__button",
  inactiveButtonClass: "popup__button_disabled",
};

const api new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  token: "ac46fbd6-44c2-43cd-96de-34088853b47e"
});

const userInfo = new UserInfo({
  nameSelector: "",
  jobSelector: ".profile__descripotion",
});

// Sección de tarjetas 
const cardSection = new Section<CardData>(
  {renderer: createCard },
  ".cards__list"
);

// validación
function showInputError(forms: HTMLFormElement, input: HTMLInputElement): void {
  const errorElement = formElement.querySelector<HTMLElement>(`popup__error_type_${input,name}`);
  if (errorElement) errorElement.textContent = input.validationMessage;
}

function hideInputError(form: HTMLFormElement, input: HTMLInputElement): void {
  const errorElement = form.querySelector<HTMLElement>(`.popup__error_type_${input.name}`);
  if (errorElement) errorElement.textContent = "";
}

function checkInputValidity(form: HTMLFormElement, input: HTMLInputElement): void{
  if (!input.validity.valid) {
    showInputError(form, input);
  } else {
    hideInputError(form, input);
  }
}

function toggleButtonState(inputs: HTMLInputElement[], button: HTMLButtonElement): void {
  const isFormValid = inputs.every((input) => input.validity.valid);
  button.disabled = !isFormValid;
  button.classList.toggle("popup__button_disables", !isFormValid);
}

function resetValidation(
  form: HTMLFormElement,
  inputs:HTMLInputElement[],
  button: HTMLButtonElement): void {
    inputs.forEach((input) => hideInputError(form, input));
    button.disabled = true;
    button.classList.add("popup__button_disabled");
  }
  //creacion de tarjetas
  function createCard(item: CardData): void {
    const card = new Card(item, "#card__template", (name: string, link: string) => {
      imagePopup.open(name, link);
    });
    cardSection.addItem(card.getView());
  }

  //POPUPS
 const imagePopup = new PopupWithImage("#image-popup");

 const editPopup = new PopupWithForm(
  "edit-popup",
  (inputValues: Record<string, string>) => {
    api.setUserInfo({ name: inputValues.name, about: inputValues.description }).then((data: ApiUserResponse) => {
      userInfo.setUserInfo({ name: data.name, description: data.about});
    })
    .catch(console.error);
  }
 );

 const newCardPopup = new PopupWithForm(
  "new-card-popup",
  (inputValues: Record<string, string>) => {
    api.addCard({name: inputValues["place-name"], link: inputValues.link})
    .then((cardData: ApiCardResponse) => {
      createCard({ name: cardData.name, link: cardData.link       
      });
    })
    .catch(console.error);
  }
 );

 // validadores
const editProfileValidator = new FormValidator(validationConfig, formElement);
const newCardValidator = new FormValidator(validationConfig, newCardForm);

editProfileValidator.setEventListeners();
newCardValidator.setEventListeners();

// inicialización: datos remotos
api.getUserInfo()
.then((data: ApiUserResponse) => {
  userInfo.setUserInfo({ name: data.name, description: data.about });
})
.catch(console.error);

api
.getInitialCards()
.then((cards: ApiCardResponse[]) => {
  cardSection.renderItems(cards);
})
.catch(console.error);

// Listeners de eventos
imagePopup.setEventListeners();
editPopup.setEventListeners();
newCardPopup.setEventListeners();

openModal.addEventListener("click", () => {
  const userData: UserData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputDescription.value = userData.description;
  resetValidation(formElement, inputList, saveButton);
  editPopup.open();
});

openNewCardModelButton.addEventListener("click", () => {
  resetValidation(newCardForm, newCardinputs, newCardButton);
  newCardPopup.open();
});

inputList.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(formElement, input);
    toggleButtonState(inputList, saveButton);
  });
});

newCardinputs.forEach((input) => {
  inputDescription.addEventListener("input", () => {
    checkInputValidity(newCardForm, input);
    toggleButtonState(newCardinputs, newCardButton);
  });
});

