import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import {
  addButton,
  placeForm,
  editButton,
  profileForm,
  popupName,
  popupProfession,
  validationSettings,
  profilePopupSelector,
  placePopupSelector,
  imagePopupSelector,
} from '../utils/constants.js';

import './index.css';

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-30",
  headers: {
    authorization: "4efaaa97-5e92-49c0-9da5-0bde0e3791b7",
    "Content-Type": "application/json",
  },
});

const ProfileInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
});

const PlacePopup = new PopupWithForm(placePopupSelector, addPlaceCard);
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
    items: [],
    renderer: addCardToSection,
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
  const { name, about } = ProfileInfo.getUserInfo();

  popupName.value = name;
  popupProfession.value = about;

  profileFormValidator.toggleButtonState();
  ProfilePopup.open();
}

function profileFormSubmitHandler(data) {
  api.editUserInfo(data)
    .then(ProfileInfo.setUserInfo)
    .catch((error) => {
      console.log(error);
    });
}

function addPlaceCard(data) {
  api.addCard(data)
    .then(addCardToSection)
    .catch((error) => {
      console.log(error);
    })
}

function addCardToSection(data) {
  const card = new Card({
    data,
    userId: ProfileInfo.id, 
    selector: '#card', 
    handleCardClick: () => ImagePopup.open(data),
    handleAddLike: api.addLike,
    handleDeleteLike: api.deleteLike,
    handleDeleteCard: api.deleteCard,
  });

  CardSection.addItem(card.getCard());
}


// ###########################################

api.getUserInfo()
  .then((data) => {
    ProfileInfo.setUserInfo(data)
  })
  .catch((error) => {
    console.log(error);
  });

api.getInitialCards()
  .then((data) => {
    CardSection.clear();

    data.forEach(addCardToSection);
  })
  .catch((error) => {
    console.log(error);
  });

