import { likedMovieURL } from './constants.js';

const likeMovie = async (id) => {
  const data = await fetch(likedMovieURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item_id: id }),
  });
  return data;
};

export default likeMovie;