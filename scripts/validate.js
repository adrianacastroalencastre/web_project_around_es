const showInputError = (input, errorMessage) => {
  const errorEl = input.parentElement.querySelector(
    `.popup__error_${input.name},`,
  );
  input.classList.add("popup__input_type_error");
  errorEl.textContent = errorMessage;
  errorEl.classList.add("popup__input-error_active");
};
const hideInputError = (input) => {
  const errorEl = input.parentElement.querySelector(
    `.popup__error_${input.name}`,
  );
  input.classList.remove("popup__input_error");
  errorEl.textContent = "Correcto";
  errorEl.classList.remove("popup__error_active");
};
//
function toggleFormbutton(form, button) {
  if (form.checkValidity()) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

function setEventListeners(modal) {
  modal.addEventListener("input", (evt) => {
    if (evt.target.id === modal.id) {
      modal.classList.remove("popup_is-opened");
    }
  });
}
//export
export { toggleFormbutton, showInputError, hideInputError, setEventListeners };
/* 
// funcion ocultar error
function hideInputError(formElement, inputElement) {
  const errorEl = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorEl.classList.remove("popup__input-error_active");
  errorEl.textContent = "";
}
//verificar validez de input
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
*/
