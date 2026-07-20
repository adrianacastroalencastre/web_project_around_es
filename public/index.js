var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Api } from "./components/Api.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForms.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
// DOM Selectores
const profileInfo = document.querySelector(".profile__info");
const editModal = document.querySelector("#edit-popup");
const openModal = profileInfo.querySelector(".profile__edit-button");
const openNewCardModelButton = document.querySelector(".profile__add-button");
const formElement = editModal.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const inputName = editModal.querySelector(".popup__input_type_name");
const inputDescription = editModal.querySelector(".popup__input_type_description");
const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "ac46fbd6-44c2-43cd-96de-34088853b47e",
        "Content-Type": "application/json",
    },
});
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
    avatarSelector: ".profile__image",
});
// image popup needs to be available for card callbacks
// image popup instance (declared earlier)
//
const createCard = (data) => {
    const card = new Card(data, "#card-template", (name, link) => {
        imagePopup.open(name, link);
    });
    return card.generateCard();
};
const cardSection = new Section({
    renderer: (item) => {
        const cardSection = createCard(item);
    },
}, ".cards__list");
const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
    userInfo.setUserInfo({
        name: inputValues["profile-name"],
        about: inputValues["profile-description"],
    });
    editProfilePopup.close();
});
editProfilePopup.setEventListeners();
const newCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
    const newCardElement = createCard({
        name: inputValues["card__title"],
        link: inputValues["card-body"],
    });
    cardSection.addItem(newCardElement);
    newCardPopup.close();
});
newCardPopup.setEventListeners();
editButton.addEventListeners("click", () => {
    const userData = userInfo.getUserInfo();
    // llenar el form con datos actuales
    nameInput.value = userData.name;
    usernameInput.value = userData.username;
    emailInput.value = userData.email;
    profileFormValidator.resetValidation();
    editProfilePopup.open();
});
addButton.addEventListener("click", () => {
    postValidator.resetvalidation();
    addPostPopup.open();
});
const profileValidtor = new FormValidator(defaultFormConfig, editForm);
const postValidator = new FormValidator(defaultFormConfig, CardForm);
profileValidator.enableValidation();
postValidator.enableValidation();
//Inicialización cuando se carga la pagina
document.addEventListener("DOMContentLoaded", () => {
    cardSection.renderItems(initialCards);
});
//
const editPopup = new PopupWithForm("#edit-popup", (inputValues) => {
    userInfo.setUserInfo({
        name: inputValues.name,
        about: inputValues.description,
        avatar: userInfo.getUserInfo().avatar,
    });
    editPopup.close();
});
editPopup.setEventListeners();
/*  api
    .updateUserInfo(inputValues.name, inputValues.description)
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar });
      editPopup.close();
    })
    .catch(console.error);
}
);
*/
/*  api
    .addCard(inputValues["place-name"], inputValues.link)
    .then((cardData) => {
      createCard(cardData);
      newCardPopup.close();
    })
    .catch(console.error);
}
);*/
const profileFormValidator = new FormValidator(defaultFormConfig, formElement);
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);
profileFormValidator.enableValidation();
newCardValidator.enableValidation();
/*
function createCard(item: CardData): void {
  const card = new Card(item, "#card-template", (name: string, link: string) => {
    imagePopup.open(name, link);
  });
  cardSection.addItem(card.generateCard());
}
*/
function initApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [userData, initialCards] = yield Promise.all([
                api.getUserInfo(),
                api.getInitialCards(),
            ]);
            userInfo.setUserInfo({
                name: userData.name,
                about: userData.about,
                avatar: userData.avatar,
            });
            initialCards.forEach((cardData) => {
                createCard(cardData);
            });
        }
        catch (error) {
            console.error("Fallo al cargar datos iniciales:", error);
        }
    });
}
initApp();
imagePopup.setEventListeners();
editPopup.setEventListeners();
newCardPopup.setEventListeners();
openModal.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    inputName.value = userData.name;
    inputDescription.value = userData.about;
    profileFormValidator.resetValidation();
    editPopup.open();
});
openNewCardModelButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    // Llenar el formulario con los datos actuales
    nameInput.value = userData.name;
    aboutInput.value = userData.about;
    newCardValidator.resetValidation();
    newCardPopup.open();
});
userInfo.setUserInfo(userData);
