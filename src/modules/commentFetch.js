import { commentURL } from './constants.js';

const addComment = async (itemId, user, com) => {
  const response = await fetch(commentURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ item_id: itemId, username: user, comment: com }),
  });
  return response;
};

const getComment = async (itemId) => {
  const response = await fetch(`${commentURL}?item_id=${itemId}`);
  if (response.status !== 400) {
    return response.json();
  }
  return [];
};

export { addComment, getComment };