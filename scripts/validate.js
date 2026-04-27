const showInputError = (formElement, nameInput, errorMessage) => {
  const errorElement = formElement.querySelector(`.${nameInput.id}-error`);
  nameInput.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_visible");
};

const hideInputError = (formElement, nameInput) => {
  const errorElement = formElement.querySelector(`.${nameInput.id}-error`);
  nameInput.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_visible");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, nameInput) => {
  if (!nameInput.validity.valid) {
    showInputError(formElement, nameInput, nameInput.validationMessage);
  } else {
    hideInputError(formElement, nameInput);
  }
};

const setEventListeners = (formElement) => {
  const nameInput = formElement.querySelector(".popup__input_type_card-name");
  const linkInput = formElement.querySelector(".popup__input_type_url");
};
/*
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}; 
*/

const toggleButtonState = (nameInput, linkInput, buttonElement) => {
  if (hasInvalidInput(nameInput, linkInput)) {
    buttonElement.classList.add("popup__button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__button_disabled");
    buttonElement.disabled = false;
  }
};

const resetValidation = (formElement) => {
  const nameInput = formElement.querySelector(".popup__input_type_card-name");
  const linkInput = formElement.querySelector(".popup__input_type_url");
  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach((nameInput) => {
    hideInputError(formElement, nameInput);
  });
  toggleButtonState(nameInput, linkInput, buttonElement);
};

export { setEventListeners, resetValidation } from "./validate.js";
