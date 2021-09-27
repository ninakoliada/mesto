const popup = document.body.querySelector('.popup');
const popupClose = document.body.querySelector('.popup__close');
const popupName = document.body.querySelector('.popup__input_type_name');
const popupProfession = document.body.querySelector('.popup__input_type_profession');
const popupButton = document.body.querySelector('.popup__button');

const editButton = document.body.querySelector('.profile__edit-button');

const profileName = document.body.querySelector('.profile__name');
const profileProfession = document.body.querySelector('.profile__profession');

const editForm = document.body.querySelector('.popup__body');

function popupCloseHandler(event) {
    event.preventDefault();

    popup.classList.add('popup_visibility_hidden');
}

function profileEditHandler() {
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;

    popup.classList.remove('popup_visibility_hidden');
}

function formSubmitHandler(event) {
    event.preventDefault();

    profileName.textContent = popupName.value;
    profileProfession.textContent = popupProfession.value;

    popupCloseHandler(event);
}

popupClose.addEventListener('click', popupCloseHandler);
editButton.addEventListener('click', profileEditHandler);
editForm.addEventListener('submit', formSubmitHandler);
