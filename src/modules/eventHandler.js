import { navToggle, navLinks } from './constants.js';

const showMenuItems = () => {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show-links');
  });
};

export default showMenuItems;
