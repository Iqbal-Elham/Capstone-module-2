import counterReservations from '../counterReservations.js';

describe('Test the comment counter method', () => {
  it('count the array length: 3', () => {
    expect(
      counterReservations([
        {
          username: 'John',
          date_start: '2020-12-17',
          date_end: '2020-12-18',
        },
        {
          username: 'John2',
          date_start: '2020-12-17',
          date_end: '2020-12-18',
        },
        {
          username: 'John3',
          date_start: '2020-12-17',
          date_end: '2020-12-18',
        },
      ]),
    ).toEqual(3);
  });
  it('count the array length: 2', () => {
    expect(
      counterReservations([
        {
          username: 'John4',
          date_start: '2020-12-17',
          date_end: '2020-12-18',
        },
        {
          username: 'John5',
          date_start: '2020-12-17',
          date_end: '2020-12-18',
        },
      ]),
    ).toEqual(2);
  });
  it('count the array length: 0', () => {
    expect(
      counterReservations([]),
    ).toEqual(0);
  });
});