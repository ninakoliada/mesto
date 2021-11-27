import { Popup } from "./Popup";

export class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    _confirmHandler = (event) => {
        event.preventDefault();
        this._confirmCallback();

        this.close()
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
}