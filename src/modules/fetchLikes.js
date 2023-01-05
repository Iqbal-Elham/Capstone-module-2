import { likedMovieURL } from './constants.js';

const fetchLikes = async () => {
  const data = await fetch(`${likedMovieURL}`).then((response) => response.json());
  return data;
};
export default fetchLikes;