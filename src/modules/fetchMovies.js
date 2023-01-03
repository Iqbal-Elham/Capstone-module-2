import { movieURL } from './constants.js';

const fetchMovie = async (endpoint) => {
  const data = await fetch(`${movieURL}${endpoint}`)
    .then((response) => response.json());
  return data;
};

export default fetchMovie;