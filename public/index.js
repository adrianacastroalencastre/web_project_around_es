var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithForm } from "./components/PopupWithForms.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithConfirmation } from "./components/PopupWithConfirmation.js";
import { Section } from "./components/Section.js";
import { Api } from "./components/Api.js";
import {} from "./types/types.js";
import { defaultFormConfig } from "./utils/constants.js";
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
const Formconfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: "popup__button",
    inactiveButtonClass: "popup__button_disabled",
};
const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1/grupo12",
    headers: {
        authorization: "ac46fbd6-44c2-43cd-96de-34088853b47e",
        "Content-Type": "application/json"
    }
});
////
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
});
// Sección de tarjetas 
const cardSection = new Section({ items: [], renderer: (item) => { createCard(item); } }, ".cards__list");
// validación
function showInputError(forms, input) {
    const errorElement = formElement.querySelector(`popup__error_type_${input.name}`);
    if (errorElement)
        errorElement.textContent = input.validationMessage;
}
function hideInputError(form, input) {
    const errorElement = form.querySelector(`.popup__error_type_${input.name}`);
    if (errorElement)
        errorElement.textContent = "";
}
function checkInputValidity(form, input) {
    if (!input.validity.valid) {
        showInputError(form, input);
    }
    else {
        hideInputError(form, input);
    }
}
function toggleButtonState(inputs, button) {
    const isFormValid = inputs.every((input) => input.validity.valid);
    button.disabled = !isFormValid;
    button.classList.toggle("popup__button_disables", !isFormValid);
}
function resetValidation(form, inputs, button) {
    inputs.forEach((input) => hideInputError(form, input));
    button.disabled = true;
    button.classList.add("popup__button_disabled");
}
//creacion de tarjetas
function createCard(item) {
    const card = new Card(item, "#card__template", (name, link) => {
        imagePopup.open(name, link);
    });
    cardSection.addItem(card.generateCard());
}
//POPUPS
const imagePopup = new PopupWithImage("#image-popup");
const editPopup = new PopupWithForm("edit-popup", (inputValues) => {
    api.updateUserInfo(inputValues.name, inputValues.description).then((data) => {
        userInfo.setUserInfo({ name: data.name, description: data.about });
    })
        .catch(console.error);
});
const newCardPopup = new PopupWithForm("new-card-popup", (inputValues) => {
    api.addCard(inputValues["place-name"], inputValues.link)
        .then((cardData) => {
        createCard(cardData);
    })
        .catch(console.error);
});
// validadores
const editProfileValidator = new FormValidator(defaultFormConfig, formElement);
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);
editProfileValidator.enableValidation();
newCardValidator.enableValidation();
// inicialización: datos remotos
function initApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [userData, initialCards] = yield Promise.all([
                api.getUserInfo(),
                api.getCards()
            ]);
            userInfo.setUserInfo({ name: userData.name, description: userData.about });
            // aqui ya tienes ambos resultados listos para renderizar
        }
        catch (error) {
            console.error("Fallo al cargar datos iniciales:", error);
        }
    });
}
// Listeners de eventos
initApp();
imagePopup.setEventListeners();
editPopup.setEventListeners();
newCardPopup.setEventListeners();
openModal.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
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
