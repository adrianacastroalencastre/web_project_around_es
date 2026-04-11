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
// Seleccionar editarPerfil
const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const closeButton = editModal.querySelector(".popup__close");
//
const template = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".cards__list");

let formElement = document.querySelector("#edit-profile-form");

// Implementar funciones reutilizables openModal() y closeModal()
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

editButton.addEventListener("click", () => {
  openModal(editModal);
});

closeButton.addEventListener("click", () => {
  closeModal(editModal);
});

function fillProfileForm() {
  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__job");

  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector(".popup__input_type_description");

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

//
function handleOpenEditModal() {
  fillProfileForm();
  openModal(editModal);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector(".popup__input_type_name");
  let jobInput = document.querySelector(".popup__input_type_description");

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  let profileName = document.querySelector(".profile__name");
  let profileJob = document.querySelector(".profile__job");
  //actualizar
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  closeModal(editModal);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const addButton = document.querySelector(".profile__add-button"); // boton +
  const addCardModal = document.querySelector(".add-card-popup"); // ventana emergente
  const closeButton = addCardModal.querySelector(".modal__close"); // boton x

  addButton.addEventListener("click", () => {
    openModal(addCardModal);
  });

  closeButton.addEventListener("click", () => {
    closeModal(addCardModal);
  });

  const nameInput = document.querySelector(".popup__input_type_title");
  const linkInput = document.querySelector(".popup__input_type_link");

  const nameValue = nameInput.value;
  const linkValue = linkInput.value;

  const cardsContainer = document.querySelector(".cards__list");
  renderCard(nameValue, linkValue, cardsContainer);

  const addCardForm = document.querySelector(".add-card-form");
  addCardForm.addEventListener("submit", handleCardFormSubmit);

  closeModal(addCardModal);

  //limpiar formulario
  nameInput.value = "";
  linkInput.value = "";
}

function getCardElement(card) {
  //obtener el template del HTML
  const cardTemplate = document.querySelector("#card-template").content;
  // clonar el template
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  //llenar con datos
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  return cardElement;
}

function renderCard(card, container) {
  const cardElement = getCardElement(card);
  container.append(cardElement);
}

initialCards.forEach((card) => {
  renderCard(card, cardsContainer);
});
