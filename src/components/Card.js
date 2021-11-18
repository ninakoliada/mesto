export class Card {
    constructor(data, selector, handleCardClick) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = selector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.gallery__item')
            .cloneNode(true);
    }

    _handleLikeClick() {
        this._likeButton.classList.toggle('card__heart-button_active');
    }

    _handleDeleteClick() {
        this._element.remove();
    }

    _setEventListeners() {
        this._likeButton = this._element.querySelector('.card__heart-button');
    
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
        this._element = this._getTemplate();

        this._cardImage =  this._element.querySelector('.card__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        
        this._element.querySelector('.card__text').textContent = this._name;

        this._setEventListeners();

        return this._element;
    }
}