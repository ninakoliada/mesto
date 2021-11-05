export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
    }

    _hasInvalidInput() {
        return Array.from(this._inputList).some((input) => {
          return !input.validity.valid;
        });
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.classList.add(this._settings.inactiveButtonClass);
            this._submitButton.setAttribute("disabled", true);
        } else {
            this._submitButton.classList.remove(this._settings.inactiveButtonClass);
            this._submitButton.removeAttribute("disabled");
        }
    }

    _inputHandler(event) {
        this._checkInputValidity(event.target);
        this.toggleButtonState();
    };

    _checkInputValidity(inputElement) {
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, errorElement);
        } else {
          this._hideInputError(inputElement, errorElement);
        }
    }
      
    _showInputError (inputElement, errorElement) {
        inputElement.classList.add(this._settings.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._settings.errorClass);
    }
      
    _hideInputError(inputElement, errorElement) {
        inputElement.classList.remove(this._settings.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._settings.errorClass);
    }
      
    enableValidation() {
        this._submitButton = this._form.querySelector(this._settings.submitButtonSelector);
        this._inputList = this._form.querySelectorAll(this._settings.inputSelector);
        
        this.toggleButtonState();
        
        this._inputList.forEach((input) => {
          input.addEventListener("input", (event) => {
              this._inputHandler(event);
          });
        });
    }
}