import { setEventListeners, resetValidation } from "./validate.js";

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];
//
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".cards__list");

// 2. Agregar nuevas tarjetas con la ventana emergente "Agregar una tarjeta”
const addButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const AddCardCloseButton = addCardModal.querySelector(".popup__close");
//configurar para abrir modal
addButton.addEventListener("click", handleOpenAddCardModal);

// cerrar el modal
// Seleccionar editarPerfil
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const closeButton = editProfileModal.querySelector(".popup__close");
const formElement = document.querySelector("#edit-profile-form");
//
function getCardElement(
  name = "Sin titulo",
  link = "./images/placeholder-image.png",
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imagePopup);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement(name, link);
  container.appendChild(cardElement);
}

//const cardsContainer = document.querySelector(".cards__list");
initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsContainer);
});

//
editProfileButton.addEventListener("click", handleOpenEditModal);

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Ampliar imagen al hacer click en la tarjeta
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

//
const addCardForm = addCardModal.querySelector("#new-card-form");

const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardForm.querySelector(".popup__input_type_url");
const forms = document.querySelectorAll(".popup__form");
// Implementar funciones reutilizables openModal() y closeModal()
function openModal(modal) {
  console.log("abriendo modal");
  setEventListeners(forms);
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
  modal.addEventListener("click", handleOverlayClick);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  const formElement = modal.querySelector(".popup__form");
  if (formElement) {
    resetValidation(formElement);
  }
  //remover listener para click en superposicion
  /*document.removeEventListener("keydown", handleEscClose);
  modal.removeEventListener("click", handleOverlayClick);*/
}
// funcion llenar formulario con datos actuales
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// funcion para manejar apertura del modal ->
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editProfileModal);
}

function handleOpenAddCardModal() {
  openModal(addCardModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  renderCard(name, link, cardsContainer);
  closeModal(addCardModal);
  addCardForm.reset(); // limpia form
}

//funcion que maneja envío de formulario
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeModal(editProfileModal);
}
// Events
editProfileButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

editProfileButton.addEventListener("click", () => {
  fillProfileForm(); // rellenar form
  openModal(editProfileModal);
});

formElement.addEventListener("submit", handleProfileFormSubmit);

//
addButton.addEventListener("click", handleOpenAddCardModal);

AddCardCloseButton.addEventListener("click", () => closeModal(addCardModal));

addCardForm.addEventListener("submit", handleCardFormSubmit);

imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));

// funcion para manejar tecla escp
function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}
/* //

*/
