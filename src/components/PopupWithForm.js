import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector);

        this._submitCallback = submitCallback;
        this._popupButton = this._popup.querySelector('.popup__button');
        this._popupButtonText = this._popupButton.textContent;
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

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__form').addEventListener('submit', this._submitHandler);
    }

    close() {
        super.close();
        this._popup.querySelector('.popup__form').reset();
    }

    setLoading(value) {
        this._popupButton.textContent = value ? 'Сохранение...' : this._popupButtonText;
    }
}