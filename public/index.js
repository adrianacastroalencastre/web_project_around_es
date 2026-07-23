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
const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "ac46fbd6-44c2-43cd-96de-34088853b47e",
        "Content-Type": "application/json",
    },
});
const profileInfo = document.querySelector(".profile__info");
const editModal = document.querySelector("#edit-popup");
const openModal = profileInfo.querySelector(".profile__edit-button");
const openNewCardModelButton = document.querySelector(".profile__add-button");
const formElement = editModal.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const inputName = editModal.querySelector(".popup__input_type_name");
const inputDescription = editModal.querySelector(".popup__input_type_description");
const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, "#card-template", handleCardClick);
        const cardElement = card.generateCard();
        cardSection.addItem(cardElement);
    },
}, ".cards__list");
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
    avatarSelector: ".profile__image",
});
const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        //Actualizar la información en la api
        //userInfo.setUserInfo({
        name: inputValues["profile-name"],
        about: inputValues["profile-description"],
        avatar: inputValues["profile-avatar"]
    }; // avance lune 1.19 horas del video
    editProfilePopup.close();
}));
editProfilePopup.setEventListeners();
const addCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
    // crear el post en la api y luego agregarlo a la sección
    const newCardElement = createCard({
        name: inputValues["card__title"],
        link: inputValues["card-body"],
        _id: "",
        owner: "",
        createdAt: "",
        isLiked: false
    });
    cardList.addItem(newCardElement);
    addCardPopup.close();
});
addCardPopup.setEventListeners();
const imagePopup = new PopupWithImage("#image-popup");
const createCard = (data) => {
    const card = new Card(data, "#card-template", (name, link) => {
        imagePopup.open(name, link);
    });
    return card.generateCard();
};
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item);
        cardList.addItem(card);
    }
}, ".cards__list");
openModal.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    // Editado hoy domingo
    // llenar el form con datos actuales
    inputName.value = userData.name;
    inputDescription.value = userData.about;
    profileFormValidator.resetValidation();
    editProfilePopup.open();
});
openNewCardModelButton.addEventListener("click", () => {
    postValidator.resetValidation();
    addCardPopup.open();
});
const profileValidator = new FormValidator(defaultFormConfig, formElement);
const postValidator = new FormValidator(defaultFormConfig, newCardForm);
profileValidator.enableValidation();
postValidator.enableValidation();
// editado hoy domingo
//Inicialización cuando se carga la pagina
document.addEventListener("DOMContentLoaded", () => {
    cardList.renderItems(initialCards);
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
const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListeners();
const handleCardClick = (name, link) => {
    popupWithImage.open(name, link);
};
/*
const card = new Card(cardData, "#card-template", handleCardClick)

const updateUser = await api.updateUserInfo({name, about});
userInfo.setUserInfo(updatedUser); // updatesUser ya tiene avatar

// La lección recomienda crear interfaces separadas:
UserFormData : solo name y about (lo que envias al servidor)
UserData : respuesta completa con name, about, avatar, _id

api
    .updateUserInfo(inputValues.name, inputValues.description)
    .then((data) => {
      userInfo.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar });
      editPopup.close();
    })
    .catch(console.error);
}
);

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
// editado hoy domingo 
//INICIALIZACIÓN CUANDO SE CARGA LA PAGINA
// OBTENER LOS CARDS DESDE UNA API
function initApi() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [userData, initialCards] = yield Promise.all([
                api.getUserInfo(),
                api.getInitialCards(),
            ]);
            userInfo.setUserInfo(userData);
            cardSection.renderItems(initialCards);
        }
        catch (error) {
            // Si hay un error, podemos cargar los posts iniciales como fallback
            console.error("Error fetching cards:", error);
        }
    });
}
initApi();
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
addCardPopup.setEventListeners();
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
    inputName.value = userData.name;
    inputDescription.value = userData.about;
    newCardValidator.resetValidation();
    addCardPopup.open();
});
