import './style.css';
import {
  showMenuItems,
  closePopup,
  closeReservation,
  // displayComment,
} from './modules/eventHandler.js';
import populateData from './modules/populateData.js';

populateData();
showMenuItems();
closePopup();
closeReservation();
// displayComment();