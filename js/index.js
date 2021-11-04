import { Card } from './Card.js'
import { openPopup, closePopup } from './popup.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [
  {
    name: 'Мячик',
    link: 'https://images.unsplash.com/photo-1612502169027-5a379283f9c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=464&q=80'
  },
  {
    name: 'Золотой Снитч',
    link: 'https://images.unsplash.com/photo-1550948537-130a1ce83314?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1172&q=80'
  },
  {
    name: 'Эльф',
    link: 'https://images.unsplash.com/photo-1583513702439-2e611c58e93d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80'
  },
  {
    name: 'Картошка фри',
    link: 'https://images.unsplash.com/photo-1583337260546-28b6bf66d004?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=388&q=80'
  },
  {
    name: 'Собак в очках',
    link: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Улыбочка',
    link: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80'
  }
];

const imagePopup = document.body.querySelector('.page__image-popup');
const imagePopupClose = imagePopup.querySelector('.popup__close');
const imagePopupOverlay = imagePopup.querySelector('.popup__background');

const profilePopup = document.body.querySelector('.page__profile-popup');
const placePopup = document.body.querySelector('.page__place-popup');
const profilePopupClose = profilePopup.querySelector('.popup__close');
const profilePopupOverlay = profilePopup.querySelector('.popup__background');
const placePopupClose = placePopup.querySelector('.popup__close');
const placePopupOverlay = placePopup.querySelector('.popup__background');
const popupName = profilePopup.querySelector('.popup__input_type_name');
const popupProfession = profilePopup.querySelector('.popup__input_type_profession');
const popupPlaceName = placePopup.querySelector('.popup__input_type_name');
const popupPlaceLink = placePopup.querySelector('.popup__input_type_link');

const editButton = document.body.querySelector('.profile__edit-button');
const addButton = document.body.querySelector('.profile__add-button');

const profileName = document.body.querySelector('.profile__name');
const profileProfession = document.body.querySelector('.profile__profession');

const editForm = profilePopup.querySelector('.popup__form');
const addForm = placePopup.querySelector('.popup__form');
const addFormButton = placePopup.querySelector('.popup__button');
const gallery = document.querySelector('.gallery');

function addImage(data) {
  const card = new Card(data, '#card');

  gallery.prepend(card.getCard());
}

initialCards.forEach(function(item){
  addImage(item)
});

function profilePopupCloseHandler(event) {
  closePopup(profilePopup);
}

function profileEditHandler() {
  popupName.value = profileName.textContent;
  popupName.dispatchEvent(new Event('input'));

  popupProfession.value = profileProfession.textContent;
  popupProfession.dispatchEvent(new Event('input'));

  openPopup(profilePopup);
}

function profileFormSubmitHandler(event) {
  event.preventDefault();

  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;

  profilePopupCloseHandler(event);
}

function placeAddHandler() {
  addForm.reset();
  addFormButton.classList.add('popup__button_disabled');

  openPopup(placePopup);
}

function placePopupCloseHandler(event) {
  closePopup(placePopup);
}

function placeFormSubmitHandler(event) {
  event.preventDefault();
  
  addImage({
    link: popupPlaceLink.value,
    name: popupPlaceName.value
  })

  placePopupCloseHandler(event);
}

function imagePopupCloseHandler(event) {
  closePopup(imagePopup);
}

profilePopupClose.addEventListener('click', profilePopupCloseHandler);
profilePopupOverlay.addEventListener('click', profilePopupCloseHandler);
editButton.addEventListener('click', profileEditHandler);
editForm.addEventListener('submit', profileFormSubmitHandler);

addButton.addEventListener('click', placeAddHandler)
placePopupClose.addEventListener('click', placePopupCloseHandler);
placePopupOverlay.addEventListener('click', placePopupCloseHandler);
addForm.addEventListener('submit', placeFormSubmitHandler);

imagePopupClose.addEventListener('click', imagePopupCloseHandler);
imagePopupOverlay.addEventListener('click', imagePopupCloseHandler);

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
}

const editFormValidator = new FormValidator(settings, editForm);
const addFormValidator = new FormValidator(settings, addForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();