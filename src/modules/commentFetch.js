import { commentURL } from './constants.js';

const addComment = async (itemId, username, comment) => {
  const response = await fetch(commentURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ itemId, username, comment }),
  });
  const data = await response.json();
  return data;
};

const getComment = async (itemId) => {
  const response = await fetch(`${commentURL}?item_id=${itemId}`);
  const data = await response.json();
  return data;
};

export { addComment, getComment };