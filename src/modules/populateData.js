import {
  movieDetail,
  shownMovies,
  popupSection,
  selectedCommentUrl,
  reservationSection,
} from './constants.js';

import { addComment } from './commentFetch.js';
// import { postComment } from './eventHandler.js';
import fetchMovie from './fetchMovies.js';
import countMovie from './countMovies.js';
import fetchReservations from './fetchReservations.js';

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
        <h3>Comments(2)</h3>
        <div class="list-of-comments">
          <p>12/29/2022: Someone commented yesterday</p>
          <p>12/30/2022: Someone commented today</p>
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
          />
        </div>
        <div class="input-field">
          <textarea
            id="comment-text"
            class="input"
            cols="30"
            rows="5"
            placeholder="Your comments"
          ></textarea>
        </div>
        <div class="btn-container">
          <button type="submit" class="btn" id="${e.target.id}">Submit</button>
        </div>
      </form>
      </div>`;
      popupSection.innerHTML = displayCom;
      const commentForm = document.querySelector('.add-comments');
      const commenter = document.querySelector('#commenter-name');
      const commentText = document.querySelector('#comment-text');
      commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        addComment(itemId, commenter.value, commentText.value);
        commenter.value = '';
        commentText.value = '';
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
        <div class="popup-comments">
          <h3>Reservations(2)</h3>
          <div class="list-of-comments">
            <p>01/03/2023: Someone Reserved yesterday</p>
            <p>01/03/2023: Someone Reserved today</p>
          </div>
        </div>
        <form method="post" class="add-reservation">
          <h3>Reserve</h3>
          <div class="input-field"><input type="text" placeholder="Your name" class="input" name="name" id="name"/>
          </div>
          <div class="input-field"><textarea name="text-area" id="text-area" class="input"
              cols="30" rows="5" placeholder="Reserve"></textarea>
          </div>
          <div class="btn-container">
            <button type="submit" class="btn" id="reserve">Reserve</button>
          </div>
        </form>
      </div>`;
      reservationSection.innerHTML = reservsGenerator;
    });
  });
};

export default populateData;
