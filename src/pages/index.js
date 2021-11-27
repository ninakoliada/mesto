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
  avatarForm,
  editButton,
  profileForm,
  popupName,
  popupProfession,
  validationSettings,
  profilePopupSelector,
  placePopupSelector,
  imagePopupSelector,
  confirmPopupSelector,
  avatarPopupSelector,
} from '../utils/constants.js';

import './index.css';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';

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
const AvatarPopup = new PopupWithForm(avatarPopupSelector, updateAvatar);
const ImagePopup = new PopupWithImage(imagePopupSelector);
const ConfirmPopup = new PopupWithConfirm(confirmPopupSelector);

PlacePopup.setEventListeners();
ProfilePopup.setEventListeners();
ImagePopup.setEventListeners();
ConfirmPopup.setEventListeners();
AvatarPopup.setEventListeners();

const profileFormValidator = new FormValidator(validationSettings, profileForm);
const placeFormValidator = new FormValidator(validationSettings, placeForm);
const avatarFormValidator = new FormValidator(validationSettings, avatarForm);

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();

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
  ProfilePopup.setLoading(true);

  api.editUserInfo(data)
    .then((res) => {
      ProfilePopup.close();
      ProfileInfo.setUserInfo(res)
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      ProfilePopup.setLoading(false);

    });
}

function addPlaceCard(data) {
  PlacePopup.setLoading(true);

  api.addCard(data)
    .then((res) => {
      addCardToSection(res)
      PlacePopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      PlacePopup.setLoading(false);
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
    handleDeleteCard: (element) => {
      ConfirmPopup.open(() => {
        ConfirmPopup.setLoading(true);
        
        api.deleteCard(data._id)
          .then(() => {
            ConfirmPopup.close();
            element.remove();
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            ConfirmPopup.setLoading(false);
          })
      })
    }
  });

  CardSection.addItem(card.getCard());
}

function updateAvatar(data) {
  AvatarPopup.setLoading(true);
  api.updateAvatar(data.link)
    .then((res) => {
      ProfileInfo.setUserInfo(res);
      avatarForm.reset();
      AvatarPopup.close();
    })
    .finally(() => {
      AvatarPopup.setLoading(false);
    });
}

document.querySelector('.profile__avatar-container').addEventListener('click', () => AvatarPopup.open())

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

