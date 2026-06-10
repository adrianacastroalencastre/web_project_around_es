import { FormValidator } from "./components/FormValidator.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
import { Card, CardData } from "./components/Card.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithForm } from "./components/PopupWithForms.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
/*import { Api } from "./components/Api.js";

const api = new Api('https://around-api.es.tripleten-services.com');
*/
const editProfileButton = document.querySelector(
  ".profile__edit-button"
) as HTMLButtonElement;
const editProfileModal = document.querySelector("#edit-popup") as HTMLElement;

const editProfileForm = editProfileModal.querySelector(
  ".popup__form"
) as HTMLFormElement;
const nameInput = editProfileModal.querySelector(
  ".popup__input_type_name"
) as HTMLInputElement;
const descriptionInput = editProfileModal.querySelector(
  ".popup__input_type_description"
) as HTMLInputElement;

const addCardButton = document.querySelector(
  ".profile__add-button"
) as HTMLButtonElement;
const addCardModal = document.querySelector("#new-card-popup") as HTMLElement;
const addCardForm = addCardModal.querySelector(
  ".popup__form"
) as HTMLFormElement;

const editProfileFormValidator = new FormValidator(
  defaultFormConfig,
  editProfileForm
);

const addCardFormValidator = new FormValidator(defaultFormConfig, addCardForm);

const cardSection = new Section<CardData>(
  {
    items: initialCards.slice().reverse(),
    renderer: (card: CardData) => {
      renderCard(card);
    },
  },
  ".cards__list"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");

//agregación del video

// ACTUALIZAR USUARIO CON API Y LUEGO AGREGARLO  EN LA SECCIÓN

const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.name,
    description: inputValues.description,
  });

  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

//  CREAR EL POST EN LA API 
const addCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
  const cardData: CardData = {
    name: inputValues["place-name"],
    link: inputValues.link,
};
addCardPopup.setEventListeners();
});
// linea agregada del video
/*const postData = await api.createPost(cardData);
const newPostElement = createPost(postData);
postSection.addItem(newPostElement);
addCardPopup.close(); */

function fillProfileForm(): void {
  const profileData = userInfo.getUserInfo();

  nameInput.value = profileData.name;
  descriptionInput.value = profileData.description;
}

function handleCardClick(name: string, link: string): void {
  imagePopup.open(name, link);
}

function handleOpenEditModal(): void {
  fillProfileForm();
  editProfileFormValidator.resetValidation();
  editProfilePopup.open();
}

function handleOpenAddCardModal(): void {
  addCardForm.reset();
  addCardFormValidator.resetValidation();
  addCardPopup.open();
}

function createCard(data: CardData): HTMLElement {
  const card = new Card(data, "#card-template", handleCardClick);
  return card.generateCard();
}

function renderCard(data: CardData): void {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
}

editProfileButton.addEventListener("click", handleOpenEditModal);
addCardButton.addEventListener("click", handleOpenAddCardModal);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

cardSection.renderItems();

/*
// INICIALIZACIÓN cuando se carga la página, obtenemos los datos del usuario y las tarjetas desde la API y los renderizamos en la interfaz
document.addEventListener("DOMContentLoaded", async () => {
  try {
  const [cards, userInfo] = await Promise.all( [
    api.getCards(),
    api.getUserInfo()
  ]);

/*  cardSection.renderItems(cards);
  userInfo.setUserInfo(userInfo);
  } catch (error) {
    console.error("Error loading cards:", error);
  }
});


async function initApp() {
  try {
    const [cards, userInfoData] = await Promise.all([
      api.getCards(),
      api.getUserInfo(),
    ]); 
  }
}
    initApp(); 

    */
