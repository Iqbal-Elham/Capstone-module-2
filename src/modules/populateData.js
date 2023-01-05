import {
  movieDetail,
  shownMovies,
  popupSection,
  selectedCommentUrl,
  reservationSection,
} from './constants.js';
import { addComment, getComment } from './commentFetch.js';
import { commentHandler, headerHandler } from './eventHandler.js';
import fetchMovie from './fetchMovies.js';
import countMovie from './countMovies.js';
import fetchReservations from './fetchReservations.js';
import dataForm from './dataForm.js';
import fetchSchedule from './fetchSchedule.js';
import fetchLikes from './fetchLikes.js';
import counterReservations from './counterReservations.js';

const populateData = async () => {
  const data = await fetchMovie('s');
  const likes = await fetchLikes();
  const fragment = new DocumentFragment();
  const parser = new DOMParser();
  data.forEach((element, index) => {
    const { show } = element;
    const item = likes.find((e) => e.item_id === show.id);

    let likeCount = 0;
    if (item) {
      likeCount = item.likes;
    }

    const domElements = `
            <div class="box" data-id=${element.show.id}>
              <div class="box-img">
                <img src="${show.image.original}" alt="${show.name}"/>
              </div>
              <div class="box-desc">
                <h4>${show.name}</h4>
                
                <div class="likes" data-id="${show.id}" role="button">          
                  <a href="#" class="like-btn"><i class="fa-regular fa-heart"></i></a>
                <p>${likeCount}</p>
                </div>    
              </div>
              <div class="btn-container" data-index="${index}" role="button">
                <button class="btn btn-comments" id=${show.externals.thetvdb}>
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

  const btn = document.querySelectorAll('.btn-comments');
  btn.forEach((el) => {
    el.addEventListener('click', async (e) => {
      popupSection.style.display = 'block';
      const itemId = e.target.id;
      const item = await fetch(`${selectedCommentUrl}${itemId}`)
        .then((response) => response.json());
      const displayCom = `<div class="popup-container">
      <button type="button" class="btn comments-close-btn" id="movie-close-btn">
        <i class="fas fa-times"></i>
      </button>
      <div class="popup-img">
        <img
          src="${item.image.original}"
          alt="${item.name}"
        />
      </div>
      <div class="title-description">
        <h3>${item.name}</h3>
        <div class="popup-description">
        <p>Genres: ${item.genres}</p>
        <p>Language: ${item.language}</p>
        <p>Premiered: ${item.premiered}</p>
        <p>Country: ${item.network.country.name}</p>
        </div>
      </div>
      <div class="popup-comments">
        <h3 class="comment-header"></h3>
        <div class="list-of-comments">
          
        </div>
      </div>
      <form method="post" class="add-comments">
        <h3>Add Comments</h3>
        <div class="input-field">
          <input
            type="text"
            placeholder="Your name"
            class="input"
            id="commenter-name"
            required
          />
        </div>
        <div class="input-field">
          <textarea
            id="comment-text"
            class="input"
            cols="30"
            rows="5"
            placeholder="Your comments"
            required
          ></textarea>
        </div>
        <div class="btn-container">
          <button type="submit" class="btn" id="${e.target.id}">Submit</button>
        </div>
      </form>
      </div>`;
      popupSection.innerHTML = displayCom;
      const commentHeader = document.querySelector('.comment-header');
      const allComments = document.querySelector('.list-of-comments');
      let getCom = await getComment(itemId);
      commentHandler(getCom, allComments);
      headerHandler(getCom, commentHeader);
      const commentForm = document.querySelector('.add-comments');
      const commenter = document.querySelector('#commenter-name');
      const commentText = document.querySelector('#comment-text');
      commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await addComment(itemId, commenter.value, commentText.value);
        allComments.innerHTML = '';
        commentHeader.innerHTML = '';
        getCom = await getComment(itemId);
        headerHandler(getCom, commentHeader);
        commentHandler(getCom, allComments);
        commentForm.reset();
      });
    });
  });

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
          <h3>Reservations<span id="counter-reservations"></span></h3>
          <div class="list-of-reservations">
          </div>
        </div>
        <form method="post" class="add-reservation">
          <h3>Add a reservation</h3>
          <div class="input-field">
          <input type="text" placeholder="Your name" class="input" name="name" id="nameReservation"/>
          </div>
          <div class="input-field">
          <label for="startDate">Start date:</label>
          <input type="text" placeholder="yyyy-mm-dd" class="input" name="startDate" id="startDate"/>
          </div>
          <div class="input-field">
          <label for="endDate">End date:</label>
          <input type="text" placeholder="yyyy-mm-dd" class="input" name="endDate" id="endDate"/>
          </div>
          <div class="btn-container">
            <button type="submit" class="btn" id="reserve">Reserve</button>
            <p class="alarm-form-reservations"></p>
          </div>
        </form>
      </div>`;
      reservationSection.innerHTML = reservsGenerator;
      const reserveSubmit = document.getElementById('reserve');
      reserveSubmit.addEventListener('click', async (event) => {
        const alarmFormReservations = document.querySelector('.alarm-form-reservations');
        const nameReservation = document.getElementById('nameReservation').value;
        const startReservation = document.getElementById('startDate').value;
        const endReservation = document.getElementById('endDate').value;
        if (nameReservation && startReservation && endReservation) {
          alarmFormReservations.innerHTML = '';
          const regEx = /^\d{4}-\d{2}-\d{2}$/;
          if (startReservation.match(regEx) && endReservation.match(regEx)) {
            alarmFormReservations.innerHTML = 'Reservation Completed';
            await dataForm(event, el.id, nameReservation, startReservation, endReservation);
            const scheduleReservs = await fetchSchedule(el.id);
            let scheduleGenerator = '';
            scheduleReservs.forEach((element) => {
              scheduleGenerator += `<p class="counterR">${element.date_start}/${element.date_end} by ${element.username}</p>`;
            });
            const listOfReservations = document.querySelector('.list-of-reservations');
            listOfReservations.innerHTML = scheduleGenerator;

            const arrayCounter = document.querySelectorAll('.counterR');
            const numberReservation = counterReservations(arrayCounter);
            const counterReserv = document.getElementById('counter-reservations');
            counterReserv.innerHTML = `(${numberReservation})`;
          } else {
            alarmFormReservations.innerHTML = '*Date format has to be yyyy-mm-dd';
            event.preventDefault();
          }
        } else {
          alarmFormReservations.innerHTML = '*All fields need be populated';
          event.preventDefault();
        }
      });
      const scheduleReservs = await fetchSchedule(el.id);
      let scheduleGenerator = '';
      scheduleReservs.forEach((element) => {
        scheduleGenerator += `<p class="counterR">${element.date_start}/${element.date_end} by ${element.username}</p>`;
      });
      const listOfReservations = document.querySelector('.list-of-reservations');
      listOfReservations.innerHTML = scheduleGenerator;

      const arrayCounter = document.querySelectorAll('.counterR');
      const numberReservation = counterReservations(arrayCounter);
      const counterReserv = document.getElementById('counter-reservations');
      counterReserv.innerHTML = `(${numberReservation})`;
    });
  });
};

export default populateData;
