import './style.css';
import {
  showMenuItems,
  closePopup,
  closeReservation,
  currentYearHandler,
} from './modules/eventHandler.js';
import populateData from './modules/populateData.js';
import updateLikes from './modules/updateLikes.js';

populateData()
  .then(() => {
    const like = document.querySelectorAll('.likes');
    like.forEach((element) => {
      const { id } = element.dataset;
      element.addEventListener('click', () => {
        updateLikes(id, element);
      }, { once: true });
      showMenuItems();
    });
  });
closePopup();
closeReservation();
currentYearHandler();
populateData();