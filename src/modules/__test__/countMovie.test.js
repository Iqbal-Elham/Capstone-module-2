/*
 * @jest-environment jsdom
 */

import countMovie from '../countMovies.js';

describe('Test for Movie counter function', () => {
  test('Counting the first five movies with "movie-counter" class', () => {
    document.body.innerHTML = `
    <section>
      <div class="movie-counter">Movie 1</div>
      <div class="movie-counter">Movie 2</div>
      <div class="movie-counter">Movie 3</div>
      <div class="movie-counter">Movie 4</div>
      <div class="movie-counter">Movie 5</div>
    </section>
  `;
    expect(countMovie('movie-counter')).toBe(5);
    expect(countMovie('movie-counter')).not.toBe(2);
    expect(countMovie('movie-counter')).not.toBe(null);
    expect(countMovie('movie-counter')).not.toBe(undefined);
  });

  test('counter should return 0 if there are no movies', () => {
    document.body.innerHTML = `
    <section></section>`;
    expect(countMovie('movie-counter')).toBe(0);
    expect(countMovie('movie-counter')).not.toBe(1);
    expect(countMovie('movie-counter')).not.toBe(null);
    expect(countMovie('movie-counter')).not.toBe(undefined);
  });

  test('the counter should count only movies of specified classes', () => {
    document.body.innerHTML = `<section>
        <div class="movie-counter">Movie 1</div>
        <div class="movie-counter">Movie 2</div>
        <div class="movie">Movie 3</div>
        <div class="movie-counter">Movie 4</div>
        <div class="movie">Movie 5</div>
        <div class="movie-counter">Movie 6</div>
      </section>
    `;
    expect(countMovie('movie-counter')).toBe(4);
    expect(countMovie('movie-counter')).not.toBe(6);
    expect(countMovie('movie-counter')).not.toBe(null);
    expect(countMovie('movie-counter')).not.toBe(undefined);
  });

  test('test for 49 movies', () => {
    document.body.innerHTML = `
    <section class="movie-section">        
    </section>`;
    const section = document.querySelector('.movie-section');
    for (let i = 0; i < 49; i += 1) {
      const divTag = document.createElement('div');
      divTag.classList.add('movie-counter');
      section.appendChild(divTag);
    }
    expect(countMovie('movie-counter')).toBe(49);
    expect(countMovie('movie-counter')).not.toBe(50);
    expect(countMovie('movie-counter')).not.toBe(null);
    expect(countMovie('movie-counter')).not.toBe(undefined);
  });

  test('test for 99 movies', () => {
    document.body.innerHTML = `
    <section class="movie-section">        
    </section>`;
    const section = document.querySelector('.movie-section');
    for (let i = 0; i < 99; i += 1) {
      const divTag = document.createElement('div');
      divTag.classList.add('movie-counter');
      section.appendChild(divTag);
    }
    expect(countMovie('movie-counter')).toBe(99);
    expect(countMovie('movie-counter')).not.toBe(100);
    expect(countMovie('movie-counter')).not.toBe(null);
    expect(countMovie('movie-counter')).not.toBe(undefined);
  });
});
