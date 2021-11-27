export class Card {
    constructor({ data, userId, selector, handleCardClick, handleAddLike, handleDeleteLike, handleDeleteCard }) {
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._id = data._id;
        this._userId = userId;
        this._isOwn = data.owner._id == userId;
        this._templateSelector = selector;
        this._handleCardClick = handleCardClick;
        this._handleAddLike = handleAddLike;
        this._handleDeleteLike = handleDeleteLike;
        this._handleDeleteCard = handleDeleteCard;

        this._element = this._getTemplate();
        this._likeButton = this._element.querySelector('.card__heart-button');
        this._likesCount = this._element.querySelector('.card__likes-count')
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.gallery__item')
            .cloneNode(true);
    }

    _handleLikeClick() {
        const hasLike = this._likes.some(({ _id }) => _id === this._userId);

        if (hasLike) {
            this._handleDeleteLike(this._id);
        } else {
            this._handleAddLike(this._id);
        }
    }

    updateLikes = ({ likes }) => {
        this._likeButton.classList.toggle('card__heart-button_active');

        this._likes = likes;
        this._likesCount.textContent = likes.length;
    }

    _handleDeleteClick = () => {
        this._handleDeleteCard();
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick();
        });
  
        this._element.querySelector('.card__delete-button').addEventListener('click', () => {
            this._handleDeleteClick();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    getCard() {
        this._cardImage =  this._element.querySelector('.card__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        const hasLike = this._likes.some(({ _id }) => _id === this._userId);

        if (hasLike) {
            this._likeButton.classList.add('card__heart-button_active');
        }

        if (this._isOwn) {
            this._element.querySelector('.card__delete-button').classList.add('card__delete-button_visible')
        }

        this._likesCount.textContent = this._likes.length;
        
        this._element.querySelector('.card__text').textContent = this._name;

        this._setEventListeners();

        return this._element;
    }

    removeCard() {
        this._element.remove();
        this._element = null;
    }
}