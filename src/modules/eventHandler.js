import {
  navToggle, navLinks, movieCloseBtn, popupSection, reservationSection, reservationCloseBtn,
  // btn,
} from './constants.js';

const closePopup = () => {
  movieCloseBtn.addEventListener('click', () => {
    popupSection.style.display = 'none';
  });
};

const closeReservation = () => {
  reservationCloseBtn.addEventListener('click', () => {
    reservationSection.classList.add('hide-reservation');
  });
};

const showMenuItems = () => {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show-links');
  });
};

// const displayComment = () => {
//   const btn = document.querySelectorAll('.btn-comments');
//   btn.forEach((el) => {
//     el.addEventListener('click', () => {
//       popupSection.style.display = 'block';
//     });
//   });
// };

export {
  showMenuItems,
  closePopup,
  closeReservation,
  // displayComment,
};
