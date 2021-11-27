export const initialCards = [
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

export const validationSettings = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
}

export const profilePopupSelector = '.page__profile-popup';
export const profilePopup = document.body.querySelector(profilePopupSelector);

export const placePopupSelector = '.page__place-popup';
export const placePopup = document.body.querySelector(placePopupSelector);

export const popupName = profilePopup.querySelector('.popup__input_type_name');
export const popupProfession = profilePopup.querySelector('.popup__input_type_about');

export const editButton = document.body.querySelector('.profile__edit-button');
export const addButton = document.body.querySelector('.profile__add-button');

export const profileForm = profilePopup.querySelector(".popup__form");
export const placeForm = placePopup.querySelector(".popup__form");

export const imagePopupSelector = '.page__image-popup';