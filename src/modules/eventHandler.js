import {
  navToggle, navLinks, movieCloseBtn, popupSection, reservationSection,
} from './constants.js';

const closePopup = () => {
  movieCloseBtn.addEventListener('click', () => {
    popupSection.classList.add('hide-movie');
  });
};

const closeReservation = () => {
  reservationSection.addEventListener('click', (e) => {
    if (e.target.className === 'btn reservation-close-btn' || e.target.className === 'fas fa-times') {
      reservationSection.classList.add('hide-reservation');
    }
  });
};

const showMenuItems = () => {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show-links');
  });
};

export { showMenuItems, closePopup, closeReservation };
