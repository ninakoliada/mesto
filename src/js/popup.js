export function closePopup(popup) {
    popup.classList.remove('popup_visibility_visible');
  
    document.removeEventListener('keydown', escapeKeyDownHandler);
}

function escapeKeyDownHandler(event) {
    const popup = document.body.querySelector('.popup_visibility_visible');
  
    if (event.key === 'Escape') {
      closePopup(popup);
    }
}

export function openPopup(popup) {
    popup.classList.add('popup_visibility_visible');

    document.addEventListener('keydown', escapeKeyDownHandler);
}