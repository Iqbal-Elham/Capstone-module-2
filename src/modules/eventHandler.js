import {
  navToggle, navLinks, movieCloseBtn, popupSection, reservationSection, reservationCloseBtn,
} from './constants.js';

const closePopup = () => {
  movieCloseBtn.addEventListener('click', () => {
    popupSection.classList.add('hide-movie');
  });
};

// const closeReservation = () => {
//   reservationCloseBtn.addEventListener('click', () => {
//     reservationSection.classList.add('hide-reservation');
//   });
// };

const showMenuItems = () => {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show-links');
  });
};

export { showMenuItems, closePopup};
