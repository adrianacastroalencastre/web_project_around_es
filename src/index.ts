import { Api } from "./components/Api.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForms.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { UserInfo } from "./components/UserInfo.js";
import type { CardData, UserData } from "./types/types.js";
import { defaultFormConfig } from "./utils/constants.js";

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
const newCardInputs = Array.from(newCardForm.querySelectorAll<HTMLInputElement>(".popup__input"));
//
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers:{ 
    authorization: "ac46fbd6-44c2-43cd-96de-34088853b47e",
    "Content-Type": "application/json"
}});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__avatar"
});

// Sección de tarjetas 
const cardSection = new Section<CardData>(
  {items: [], renderer: (item) => {createCard(item)} },
  ".cards__list"
);

// validación
function showInputError(forms: HTMLFormElement, input: HTMLInputElement): void {
  const errorElement = formElement.querySelector<HTMLElement>(`popup__error_type_${input.name}`);
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
  button.classList.toggle(".popup__button_disabled", !isFormValid);
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
    cardSection.addItem(card.generateCard());
  }

  //POPUPS
 const imagePopup = new PopupWithImage("#image-popup");

 const editPopup = new PopupWithForm(
  "#edit-popup",
  (inputValues: Record<string, string>) => {
    api.updateUserInfo( inputValues.name, inputValues.description ).then((data) => {
      userInfo.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar });
      editPopup.close();
    })
    .catch(console.error);
  }
 );

 const newCardPopup = new PopupWithForm(
  "#new-card-popup",
  (inputValues: Record<string, string>) => {
    api.addCard(inputValues["place-name"], inputValues.link)
    .then((cardData) => {
      createCard(cardData);
      newCardPopup.close();
    })
    .catch(console.error);
  }
 );

 const editAvatarPopup = new PopupWithForm(
   ".profile__edit-button",
  async (inputValues: Record<string, string>) => {
   api.updateAvatar( inputValues.avatar).then((data) => {
      userInfo.setUserInfo(data);
      editAvatarPopup.close();
    })
    .catch(console.error);
  }
 );

 // validadores
const profileFormValidator = new FormValidator(defaultFormConfig, formElement);
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);

profileFormValidator.enableValidation();
newCardValidator.enableValidation();

async function initApp() {  
try {
  const [userData, initialCards] = await Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
  ]);
  userInfo.setUserInfo({name: userData.name, about: userData.about, avatar: userData.avatar});
  initialCards.forEach((CardData) => {
    createCard(CardData);
  });
} catch (error) {
  console.error("Fallo al cargar datos iniciales:", error);
}
}
initApp();

imagePopup.setEventListeners();
editPopup.setEventListeners();
newCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();

openModal.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  inputName.value = userData.name;
  inputDescription.value = userData.about;
  resetValidation(formElement, inputList, saveButton);
  editPopup.open();
});

openNewCardModelButton.addEventListener("click", () => {
  resetValidation(newCardForm, newCardInputs, newCardButton);
  newCardPopup.open();
});
//avatar perfil edit
const avatarEditButton = document.querySelector<HTMLFormElement>(". avatar")!;
avatarEditButton.addEventListener("click", () => {
  resetValidation({ } as HTMLFormElement, [], {} as HTMLButtonElement);
  editAvatarPopup.open();
});

inputList.forEach((input) => {
  input.addEventListener("input", () => {
    checkInputValidity(formElement, input);
    toggleButtonState(inputList, saveButton);
  });
});

newCardInputs.forEach((input) => {
  inputDescription.addEventListener("input", () => {
    checkInputValidity(newCardForm, input);
    toggleButtonState(newCardInputs, newCardButton);
  });
//
const popupEditProfile = new PopupWithForm("#edit-popup", (inputValues: Record<string, string>) => {
  api.updateUserInfo(inputValues.name, inputValues.description)
  .then((data) => { 
  })
}) 
});
