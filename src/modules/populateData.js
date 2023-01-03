import { movieDetail, shownMovies } from './constants.js';
import fetchMovie from './fetchMovies.js';
import countMovie from './countMovies.js';

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
                <button type="button" class="btn">Reservations</button>
              </div>
            </div>`;
    const modal = parser.parseFromString(domElements, 'text/html').body.firstChild;
    fragment.appendChild(modal);
  });
  movieDetail.appendChild(fragment);
  const counter = countMovie('modal');
  shownMovies.innerText = `Shows(${counter})`;
};

export default populateData;