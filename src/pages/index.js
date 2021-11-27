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

const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  avatarSelector: '.profile__avatar'
});

const placePopup = new PopupWithForm(placePopupSelector, addPlaceCard);
const profilePopup = new PopupWithForm(profilePopupSelector, profileFormSubmitHandler);
const avatarPopup = new PopupWithForm(avatarPopupSelector, updateAvatar);
const imagePopup = new PopupWithImage(imagePopupSelector);
const confirmPopup = new PopupWithConfirm(confirmPopupSelector);

placePopup.setEventListeners();
profilePopup.setEventListeners();
imagePopup.setEventListeners();
confirmPopup.setEventListeners();
avatarPopup.setEventListeners();

const profileFormValidator = new FormValidator(validationSettings, profileForm);
const placeFormValidator = new FormValidator(validationSettings, placeForm);
const avatarFormValidator = new FormValidator(validationSettings, avatarForm);

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
avatarFormValidator.enableValidation();

const cardSection = new Section(
  {
    items: [],
    renderer: addCardToSection,
  },
  '.gallery'
);

cardSection.renderer();

editButton.addEventListener('click', openprofilePopupHandler);
addButton.addEventListener('click', openplacePopupHandler);

function openplacePopupHandler() {
  placeForm.reset();
  placeFormValidator.toggleButtonState();
  placePopup.open();
}

function openprofilePopupHandler() {
  const { name, about } = profileInfo.getUserInfo();

  popupName.value = name;
  popupProfession.value = about;

  profileFormValidator.toggleButtonState();
  profilePopup.open();
}

function profileFormSubmitHandler(data) {
  profilePopup.setLoading(true);

  api.editUserInfo(data)
    .then((res) => {
      profilePopup.close();
      profileInfo.setUserInfo(res)
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      profilePopup.setLoading(false);

    });
}

function addPlaceCard(data) {
  placePopup.setLoading(true);

  api.addCard(data)
    .then((res) => {
      addCardToSection(res)
      placePopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      placePopup.setLoading(false);
    })
}

function addCardToSection(data) {
  const card = new Card({
    data,
    userId: profileInfo.id, 
    selector: '#card', 
    handleCardClick: () => imagePopup.open(data),
    handleAddLike: () => {
      api.addLike(data._id).then(card.updateLikes).catch(err => console.log(err));
    },
    handleDeleteLike: () => {
      api.deleteLike(data._id).then(card.updateLikes).catch(err => console.log(err));
    },
    handleDeleteCard: () => {
      confirmPopup.open(() => {
        confirmPopup.setLoading(true);
        
        api.deleteCard(data._id)
          .then(() => {
            confirmPopup.close();
            card.removeCard();
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            confirmPopup.setLoading(false);
          })
      })
    }
  });

  cardSection.addItem(card.getCard());
}

function updateAvatar(data) {
  avatarPopup.setLoading(true);
  api.updateAvatar(data.link)
    .then((res) => {
      profileInfo.setUserInfo(res);
      avatarForm.reset();
      avatarPopup.close();
    })
    .finally(() => {
      avatarPopup.setLoading(false);
    });
}

document.querySelector('.profile__avatar-container').addEventListener('click', () => avatarPopup.open())

// ###########################################

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    profileInfo.setUserInfo(userData);
    cardsData.forEach(addCardToSection);
  })
  .catch((error) => {
    console.log(error);
  });
