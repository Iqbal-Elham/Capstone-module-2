import { reservationsURL } from './constants.js';

const fetchReservations = async (endpoint) => {
  const data = await fetch(`${reservationsURL}${endpoint}`)
    .then((response) => response.json());
  return data;
};

export default fetchReservations;