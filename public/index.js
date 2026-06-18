import { Api } from "./components/Api.js";
import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
const api = new Api({
    baseUrl: 'https://around-api.es.tripleten-services.com/v1',
    headers: {
        'Authorization': "ac46fbd6-44c2-43cd-96de-34088853b47e",
        'Content-Type': "application/json",
    }
});
const settings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    /*inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible' */
};
let currentUserId;
// perfil
const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');
/*const profileEditButton = document.querySelector('.profile__edit-button') as HTMLButtonElement;
const profileAddButton = document.querySelector('.profile__add-button') as HTMLButtonElement;*/
const profileAvatar = document.querySelector('.profile__image');
//buttons profile 
const buttonEditOpen = document.querySelector('.profile__edit-button');
const buttonAddOpen = document.querySelector('.profile__add-button');
const buttonAvatarOpen = document.querySelector('.profile__avatar-button');
// forms
const formEditProfile = document.querySelector('#edit-profile-form');
const formAddCard = document.querySelector('#new-card-form');
const formEditAvatar = document.querySelector('#edit-avatar-form');
// edit profile 
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector('.popup__input_type_description');
// container tarjetas
const listCard = document.querySelector('.cards__list');
//Popups image grand 
const popupImage = new PopupWithImage('#image-popup');
popupImage.setEventListeners();
// PopUp for confirm elimination 
const popupConfirm = new PopupWithConfirmation('#delete-popup');
popupConfirm.setEventListeners();
// Popup para editar perfil 
const popupEditProfile = new PopupWithForm('#edit-popup', {
    handleFormSubmit: (inputValues) => {
        popupEditProfile.renderisLoading(true);
        api.updateUserInfo({
            name: inputValues.name,
            about: inputValues.description,
        })
            .then((updateUser) => {
            titleProfile.textContent = updateUser.name;
            descriptionProfile.textContent = updateUser.about;
            popupEditProfile.close();
        })
            .catch((err) => {
            console.error("Error al actualizar el perfil:", err);
        })
            .finally(() => {
            popupEditProfile.renderisLoading(false);
        });
    },
});
popupEditProfile.setEventListeners();
// Popup for add new cards
const popupAddCard = new PopupWithForm("#new-card-popup", {
    handleFormSubmit: (inputValues) => {
        popupAddCard.renderIsLoading(true);
        api.addCard({
            name: inputValues.name,
            link: inputValues.link,
        })
            .then((newCard) => {
            renderCard(newCard);
            popupAddCard.close();
        })
            .catch((err) => {
            console.error("Error al agregar la tarjeta:", err);
        })
            .finally(() => {
            popupAddCard.renderIsLoading(false);
        });
    },
});
popupAddCard.setEventListeners();
// Popup para editar la foto de perfil
const popupEditAvatar = new PopupWithForm("#edit-avatar-popup", {
    handleFormSubmit: (inputValues) => {
        popupEditAvatar.renderIsLoading(true);
        api.updateAvatar(inputValues.avatar)
            .then((updatedUser) => {
            profileAvatar.src = updatedUser.avatar;
            popupEditAvatar.close();
        })
            .catch((err) => {
            console.error("Error al actualizar el avatar:", err);
        })
            .finally(() => {
            popupEditAvatar.renderIsLoading(false);
        });
    },
});
popupEditAvatar.setEventListeners();
// Validate forms 
const editProfileValidator = new FormValidator(settings, formEditProfile);
const addCardValidator = new FormValidator(settings, formAddCard);
editProfileValidator.setEventListeners();
addCardValidator.setEventListeners();
// if  form
if (formEditAvatar) {
    const editAvatarValidator = new FormValidator(settings, formEditAvatar);
    editAvatarValidator.setEventListeners();
}
// Functions Show and create cards 
function renderCard(cardData) {
    const card = new Card(cardData, '#card-template', popupImage, (cardId, cardInstance) => {
        popupConfirm.setAction(() => {
            api.deleteCard(cardId)
                .then(() => {
                cardInstance.removeCard();
                popupConfirm.close();
            })
                .catch((err) => {
                console.error("Error al eliminar la tarjeta:", err);
            });
        });
        popupConfirm.open();
    }, (cardId), isLiked, cardInstance);
    {
        const likePromise = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);
        likePromise
            .then((updatedCard) => {
            cardInstance.toggleLike(updatedCard.isliked);
        })
            .catch((err) => {
            console.error("Error al actualizar el estado de like:", err);
        });
    }
    currentUserId,
    ;
    ;
    listCard.prepend(card.generateCard());
}
buttonEditOpen.addEventListener("click", () => {
    nameInput.value = titleProfile.textContent;
    descriptionInput.value = descriptionProfile.textContent;
    popupEditProfile.open();
});
buttonAddOpen.addEventListener("click", () => {
    addCardValidator.resetValidation();
    popupAddCard.open();
});
if (buttonAvatarEdit) {
    buttonAvatarEdit.addEventListener("click", () => {
        popupEditAvatar.open();
    });
}
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
    currentUserId = userData._id;
    titleProfile.textContent = userData.name;
    descriptionProfile.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    cardsData.reverse().forEach((cardData) => renderCard(cardData));
})
    .catch((err) => {
    console.error("Error al cargar los datos iniciales:", err);
});
