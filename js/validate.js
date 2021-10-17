function hasInvalidInput(inputList) {
  return Array.from(inputList).some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(selectors, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

function showInputError(selectors, inputElement, errorElement) {
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(selectors.errorClass);
}

function hideInputError(selectors, inputElement, errorElement) {
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(selectors.errorClass);
}

function checkInputValidity(selectors, form, inputElement) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    showInputError(selectors, inputElement, errorElement);
  } else {
    hideInputError(selectors, inputElement, errorElement);
  }
}

function inputHandler(selectors, form, inputList, buttonElement) {
  return (event) => {
    checkInputValidity(selectors, form, event.target);
    toggleButtonState(selectors, inputList, buttonElement);
  };
}

function enableValidation(selectors) {
  const forms = document.querySelectorAll(selectors.formSelector);

  forms.forEach((form) => {
    const submitButton = form.querySelector(selectors.submitButtonSelector);
    const inputList = form.querySelectorAll(selectors.inputSelector);

    toggleButtonState(selectors, inputList, submitButton);
    
    inputList.forEach((input) => {
      input.addEventListener("input", inputHandler(selectors, form, inputList, submitButton));
    });
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
