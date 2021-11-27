import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        
        this._popupButton = this._popup.querySelector('.popup__button');
        this._popupButtonText = this._popupButton.textContent;
    }

    _confirmHandler = (event) => {
        event.preventDefault();
        this._confirmCallback();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('.popup__confirm').addEventListener('click', this._confirmHandler);
    }

    removeEventListeners() {
        this._popup.querySelector('.popup__confirm').removeEventListeners('click', this._confirmHandler);
    }

    open(callback) {
        super.open();

        this._confirmCallback = callback;
        this.setEventListeners();
    }

    close() {
        super.close();

        this.removeEventListeners()
    }
    
    setLoading(value) {
        this._popupButton.textContent = value ? 'Сохранение...' : this._popupButtonText;
    }
}