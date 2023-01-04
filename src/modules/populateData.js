import { movieDetail, shownMovies, reservationSection } from './constants.js';
import fetchMovie from './fetchMovies.js';
import countMovie from './countMovies.js';
import fetchReservations from './fetchReservations.js';
import dataForm from './dataForm.js';
import fetchSchedule from './fetchSchedule.js';

const populateData = async () => {
  const data = await fetchMovie('s');
  const fragment = new DocumentFragment();
  const parser = new DOMParser();
  data.forEach((element, index) => {
    const { show } = element;
    const domElements = `
            <div class="box" data-id=${element.show.id}>
              <div class="box-img">
                <img src="${show.image.original}" alt="${show.name}"/>
              </div>
              <div class="box-desc">
                <h4>${show.name}</h4>
                <div class="likes" data-id="${element.show.id}">
                  <a href="#" class="like-btn"><i class="fa-regular fa-heart"></i></a>
                  <small>${element.show.id} likes</small>
                </div>
              </div>
              <div class="btn-container" data-index="${index}" role="button">
                <button class="btn btn-comments" type="button" id=${show.externals.thetvdb}>
                  comments
              </button>
                <button type="button" class="btn btn-reservation" id="${element.show.externals.imdb}">Reservations</button>
              </div>
            </div>`;
    const box = parser.parseFromString(domElements, 'text/html').body.firstChild;
    fragment.appendChild(box);
  });
  movieDetail.appendChild(fragment);
  const counter = countMovie('box');
  shownMovies.innerText = `Shows(${counter})`;

  document.querySelectorAll('.btn-reservation').forEach((el) => {
    el.addEventListener('click', async () => {
      const reservs = await fetchReservations(el.id);
      reservationSection.classList.remove('hide-reservation');
      const reservsGenerator = `<div class="reservation-container">
        <button type="button" class="btn reservation-close-btn" id="close-reservation">
          <i class="fas fa-times"></i>
        </button>
        <div class="reservation-img">
          <img
            src="${reservs.image.original}"
            alt="${reservs.name}"
          />
        </div>
        <div class="reservation-description">
          <h3>${reservs.name}</h3>
          <div class="reservations">
            <p>Genres: ${reservs.genres}</p>
            <p>Language: ${reservs.language}</p>
            <p>Premiered: ${reservs.premiered}</p>
            <p>Country: ${reservs.network.country.name}</p>
          </div>
        </div>
        <div class="popup-reservations">
          <h3>Reservations(2)</h3>
          <div class="list-of-comments">
            <p>01/03/2023: Someone Reserved yesterday</p>
            <p>01/03/2023: Someone Reserved today</p>
          </div>
        </div>
        <form method="post" class="add-reservation">
          <h3>Add a reservation</h3>
          <div class="input-field">
          <input type="text" placeholder="Your name" class="input" name="name" id="nameReservation"/>
          </div>
          <div class="input-field">
          <input type="text" placeholder="Start date" class="input" name="startDate" id="startDate" required pattern="\d{4}-\d{2}-\d{2}"/>
          </div>
          <div class="input-field">
          <input type="text" placeholder="End date" class="input" name="endDate" id="endDate" required pattern="\d{4}-\d{2}-\d{2}"/>
          </div>
          <div class="btn-container">
            <button type="submit" class="btn" id="reserve">Reserve</button>
          </div>
        </form>
      </div>`;
      reservationSection.innerHTML = reservsGenerator;
      const reserveSubmit = document.getElementById('reserve');
      reserveSubmit.addEventListener('click', function (event) {
        const nameReservation = document.getElementById('nameReservation');
        const startReservation = document.getElementById('startDate');
        const endReservation = document.getElementById('endDate');
        if (nameReservation.value && startReservation.value && endReservation.value) {
        dataForm(event, el.id, nameReservation.value, startReservation.value, endReservation.value);
        } else {
          event.preventDefault();
          alert('Fill all fields')
        }
        
      });
      const scheduleReservs = await fetchSchedule(el.id);

    });
  });
};

export default populateData;