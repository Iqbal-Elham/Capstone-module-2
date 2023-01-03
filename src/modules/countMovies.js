const countMovie = (movie) => {
  const box = document.querySelectorAll(`.${movie}`);
  let movieCounter = 0;
  box.forEach(() => {
    movieCounter += 1;
  });
  return movieCounter;
};

export default countMovie;
