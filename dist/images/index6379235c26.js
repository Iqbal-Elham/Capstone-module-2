import"./style.css";import{showMenuItems,closePopup,closeReservation}from"./modules/eventHandler.js";import populateData from"./modules/populateData.js";import updateLikes from"./modules/updateLikes.js";populateData().then((()=>{document.querySelectorAll(".like-btn").forEach((e=>{const{id:o}=e.dataset;e.addEventListener("click",(()=>{updateLikes(o,e)}),{once:!0})}))})),showMenuItems(),closePopup(),closeReservation();