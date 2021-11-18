import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
    open = ({ link, name }) => {
        const popupPicture = this._popup.querySelector('.popup__image');
        const popupDescription = this._popup.querySelector('.popup__description');

        popupPicture.src = link;
        popupPicture.alt = name;
        popupDescription.textContent = name;

        super.open();
    }
}