import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import {
  addButton,
  placeForm,
  editButton,
  profileForm,
  initialCards,
  popupName,
  popupProfession,
  validationSettings,
  profilePopupSelector,
  placePopupSelector,
  imagePopupSelector,
} from '../utils/constants.js';

import './index.css';

const ProfileInfo = new UserInfo({
  nameSelector: '.profile__name',
  professionSelector: '.profile__profession',
});

const PlacePopup = new PopupWithForm(placePopupSelector, placeFormSubmitHandler);
const ProfilePopup = new PopupWithForm(profilePopupSelector, profileFormSubmitHandler);
const ImagePopup = new PopupWithImage(imagePopupSelector);

PlacePopup.setEventListeners();
ProfilePopup.setEventListeners();
ImagePopup.setEventListeners();

const profileFormValidator = new FormValidator(validationSettings, profileForm);
const placeFormValidator = new FormValidator(validationSettings, placeForm);

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

const CardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#card', () => ImagePopup.open(item));

      CardSection.addItem(card.getCard());
    },
  },
  '.gallery'
);

CardSection.renderer();

editButton.addEventListener('click', openProfilePopupHandler);
addButton.addEventListener('click', openPlacePopupHandler);

function openPlacePopupHandler() {
  placeForm.reset();
  placeFormValidator.toggleButtonState();
  PlacePopup.open();
}

function openProfilePopupHandler() {
  const { name, profession } = ProfileInfo.getUserInfo();

  popupName.value = name;
  popupProfession.value = profession;

  profileFormValidator.toggleButtonState();
  ProfilePopup.open();
}

function profileFormSubmitHandler(data) {
  ProfileInfo.setUserInfo(data);
  ProfilePopup.close();
}

function placeFormSubmitHandler(data) {
  const card = new Card(data, '#card', () => ImagePopup.open(item));

  CardSection.addItem(card.getCard());
  PlacePopup.close();
}
