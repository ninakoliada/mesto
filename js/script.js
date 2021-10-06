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
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupClose = imagePopup.querySelector('.popup__close');
const imagePopupDescription = imagePopup.querySelector('.popup__description');

const profilePopup = document.body.querySelector('.page__profile-popup');
const placePopup = document.body.querySelector('.page__place-popup');
const profilePopupClose = profilePopup.querySelector('.popup__close');
const placePopupClose = placePopup.querySelector('.popup__close');
const popupName = profilePopup.querySelector('.popup__input_type_name');
const popupProfession = profilePopup.querySelector('.popup__input_type_profession');
const popupPlaceName = placePopup.querySelector('.popup__input_type_name');
const popupPlaceLink = placePopup.querySelector('.popup__input_type_link');
const popupButton = document.body.querySelector('.popup__button');

const editButton = document.body.querySelector('.profile__edit-button');
const addButton = document.body.querySelector('.profile__add-button');

const profileName = document.body.querySelector('.profile__name');
const profileProfession = document.body.querySelector('.profile__profession');

const editForm = profilePopup.querySelector('.popup__form');
const addForm = placePopup.querySelector('.popup__form');

function addImage(link, name) {
    const imageTemplate = document.querySelector('#card').content;
    const imageElement = imageTemplate.querySelector('.gallery__item').cloneNode(true);

    const cardImage =  imageElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    
    imageElement.querySelector('.card__text').textContent = name;

    const likeButton = imageElement.querySelector('.card__heart-button');
    
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('card__heart-button_active');
    });

    const deleteButton =  imageElement.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', function() {
      imageElement.remove()
    });

    cardImage.addEventListener('click', function() {
      imagePopupPicture.src = link;
      imagePopupPicture.alt = name;
      imagePopupDescription.textContent = name;
      imagePopup.classList.add('popup_visibility_visible');
    });

    const gallery = document.querySelector('.gallery');
    gallery.prepend(imageElement);
}

initialCards.forEach(function(item){
    addImage(item.link, item.name)
})


function profilePopupCloseHandler(event) {
    event.preventDefault();

    profilePopup.classList.remove('popup_visibility_visible');
}

function profileEditHandler() {
    popupName.value = profileName.textContent;
    popupProfession.value = profileProfession.textContent;
    profilePopup.classList.add('popup_visibility_visible');
}

function profileFormSubmitHandler(event) {
    event.preventDefault();

    profileName.textContent = popupName.value;
    profileProfession.textContent = popupProfession.value;

    profilePopupCloseHandler(event);
}

function placeAddHandler() {
    popupPlaceName.value = '';
    popupPlaceLink.value = '';
    placePopup.classList.add('popup_visibility_visible');
}

function placePopupCloseHandler(event) {
    event.preventDefault();

    placePopup.classList.remove('popup_visibility_visible');
}

function placeFormSubmitHandler(event) {
    event.preventDefault();
    addImage(popupPlaceLink.value, popupPlaceName.value)

    placePopupCloseHandler(event);
}

function imagePopupCloseHandler(event) {
  event.preventDefault();

  imagePopup.classList.remove('popup_visibility_visible');
}

profilePopupClose.addEventListener('click', profilePopupCloseHandler);
editButton.addEventListener('click', profileEditHandler);
editForm.addEventListener('submit', profileFormSubmitHandler);

addButton.addEventListener('click', placeAddHandler)
placePopupClose.addEventListener('click', placePopupCloseHandler);
addForm.addEventListener('submit', placeFormSubmitHandler);

imagePopupClose.addEventListener('click', imagePopupCloseHandler);
