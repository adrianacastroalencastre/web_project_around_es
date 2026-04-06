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

initialCards.forEach(function (card) {
  console.log(card.name);
});
//proyecto etapa2.Perfil modal//--------------------------------------------
//Seleccionar editarPerfil
const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-popup");
const closeButton = editModal.querySelector(".popup__close");

let formElement = document.querySelector(".form");

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
  const profileName = document.querySelector(
    ".popup__input popup__input_type_name",
  );
  const profileJob = document.querySelector(".popup__input_type_description");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  const nameInput = document.querySelector(".popup__input_type_name");
  const jobInput = document.querySelector("popup__input_type_description");

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

  formElement.addEventListener("submit", handleProfileFormSubmit);
}
