import { Api } from "./components/Api.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForms.js";
import { UserInfo } from "./components/UserInfo.js";
import type { CardData } from "./types/types.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
// DOM Selectores
const profileInfo = document.querySelector<HTMLElement>(".profile__info")!;
const editModal = document.querySelector<HTMLElement>("#edit-popup")!;
const openModal = profileInfo.querySelector<HTMLButtonElement>(".profile__edit-button")!; 
const openNewCardModelButton = document.querySelector<HTMLButtonElement>(".profile__add-button")!; 
const formElement = editModal.querySelector<HTMLFormElement>("#edit-profile-form")!; 
const newCardForm = document.querySelector<HTMLFormElement>("#new-card-form")!;
const inputName = editModal.querySelector<HTMLInputElement>(".popup__input_type_name")!;
const inputDescription = editModal.querySelector<HTMLInputElement>(".popup__input_type_description")!;
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

const imagePopup = new PopupWithImage("#image-popup");

const createCard = (data: CardData): HTMLElement => {
  const card = new Card(data, "#card-template", (name: string, link: string) => {
    imagePopup.open(name, link);
  });
  return card.generateCard();
};

const cardList = new Section<CardData>(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardList.addItem(card);
    }
    },
  ".cards__list", //relación con el contenedor del DOM
);

const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues["profile-name"],
    about: inputValues ["profile-description"],
    avatar: inputValues[""]
  });
  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm(
  "#new-card-popup",
  (inputValues: Record<string, string>) => {
    const newCardElement = createCard({
      name: inputValues["card__title"],
      link: inputValues["card-body"],
      _id: "",
      owner: "",
      createdAt: "",
      isLiked: false
    });
    cardList.addItem(newCardElement);
    newCardPopup.close();
  });
  newCardPopup.setEventListeners();

  openModal.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    // llenar el form con datos actuales
    inputName.value = userData.name;
    inputDescription.value = userData.about;
    // avatarInput is not declared in this file; keep current avatar in the form if needed

    profileFormValidator.resetValidation();
    editProfilePopup.open();
    });

    openNewCardModelButton.addEventListener("click", ()=> {
      postValidator.resetValidation();
      newCardPopup.open();
    });

    const profileValidator = new FormValidator(defaultFormConfig, formElement);
    const postValidator = new FormValidator(defaultFormConfig, newCardForm);

    profileValidator.enableValidation();
    postValidator.enableValidation();

    //Inicialización cuando se carga la pagina
    document.addEventListener("DOMContentLoaded", () =>{
      cardList.renderItems(initialCards);
    });
//

const editPopup = new PopupWithForm(
  "#edit-popup",
  (inputValues: Record<string, string>) => {
    userInfo.setUserInfo({
      name: inputValues.name,
      about: inputValues.description,
      avatar: userInfo.getUserInfo().avatar,
    });
    editPopup.close();
  });
  editPopup.setEventListeners();

  /* 
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

/*
function createCard(item: CardData): void {
  const card = new Card(item, "#card-template", (name: string, link: string) => {
    imagePopup.open(name, link);
  });
  cardSection.addItem(card.generateCard());
}
*/
async function initApp() {
  try {
    const [userData, initialCards] = await Promise.all([
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
  } catch (error) {
    console.error("Fallo al cargar datos iniciales:", error);
  }
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
  inputName.value = userData.name;
  inputDescription.value = userData.about
  newCardValidator.resetValidation();
  newCardPopup.open();
});