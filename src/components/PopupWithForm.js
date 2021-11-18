import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);

        this._submitCallback = submitCallback;
    }

    _getInputValues = () => {
        const inputs = Array.from(this._popup.querySelectorAll('.popup__input'));
        const inputValues = {};

        inputs.forEach(({ name, value }) => {
            inputValues[name] = value;
        })

        return inputValues;
    }

    _submitHandler = (event) => {
        event.preventDefault();
        this._submitCallback(this._getInputValues());
    }

    setEventListeners = () => {
        this._popup.querySelector('.popup__close').addEventListener('click', this.close);
        this._popup.querySelector('.popup__background').addEventListener('click', this.close);
        this._popup.querySelector('.popup__form').addEventListener('submit', this._submitHandler);
    }

    close = () => {
        this._popup.classList.remove('popup_visibility_visible');
        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.querySelector('.popup__form').reset();
    }
}