export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
    }

    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
          this.close()
        }
    }

    open = () => {
        this._popup.classList.add('popup_visibility_visible');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close = () => {
        this._popup.classList.remove('popup_visibility_visible');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close').addEventListener('click', this.close);
        this._popup.querySelector('.popup__background').addEventListener('click', this.close);
    }
}