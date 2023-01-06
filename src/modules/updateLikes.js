import likeMovie from './likeMovie.js';

const updateLikes = async (id, element) => {
  let likeCount = parseInt(element.lastElementChild.textContent, 10);
  const likeIcon = element.firstElementChild;
  const result = await likeMovie(parseInt(id, 10));
  if (result) {
    likeCount += 1;
    element.lastElementChild.innerText = likeCount;
    likeIcon.classList.add('fa-solid');
  }
};

export default updateLikes;
