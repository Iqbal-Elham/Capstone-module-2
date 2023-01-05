import {
  navToggle, navLinks, popupSection, reservationSection, dateHandler,
} from './constants.js';

const closePopup = () => {
  popupSection.addEventListener('click', (e) => {
    if (e.target.className === 'btn comments-close-btn' || e.target.className === 'fas fa-times') {
      // reservationSection.classList.add('hide-reservation');
      popupSection.style.display = 'none';
    }
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

const currentYearHandler = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  dateHandler.textContent = currentYear;
};

export {
  showMenuItems,
  closePopup,
  closeReservation,
  currentYearHandler,
};
