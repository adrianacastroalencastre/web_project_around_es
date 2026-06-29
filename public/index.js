import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
import { Card } from "./components/Card.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithForm } from "./components/PopupWithForms.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
//import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { Api } from "./components/Api.js";
// DOM Selectores
const profileInfo = document.querySelector(".profile__info");
const editModal = document.querySelector("#edit-popup");
const newCardModal = document.querySelector("#new-card-popup");
const openModal = profileInfo.querySelector(".profile__edit-button");
const openNewCardModelButton = document.querySelector(".profile__add-button");
const formElement = editModal.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(".popup__input_type_description");
const saveButton = formElement.querySelector(".popup__button");
const newCardButton = newCardForm.querySelector(".popup__button");
const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
const newCardinputs = Array.from(newCardForm.querySelectorAll(".popup__input"));
// Configuración
const validationConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: "popup__button",
    inactiveButtonClass: "popup__button_disabled",
};
const api;
new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    token: "ac46fbd6-44c2-43cd-96de-34088853b47e"
});
const api;
