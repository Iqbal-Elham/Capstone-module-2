import {getURLreservation} from './constants.js';

const fetchSchedule = async (endpoint) => {
  const data = await fetch(`${getURLreservation}`+`"${endpoint}"`)
    .then((response) => response.json());
  return data;
};

export default fetchSchedule;