import {
  navToggle, navLinks, movieCloseBtn, popupSection,
} from './constants.js';

const closePopup = () => {
  movieCloseBtn.addEventListener('click', () => {
    popupSection.classList.add('hide-movie');
  });
};

const showMenuItems = () => {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show-links');
  });
};

export { showMenuItems, closePopup };
