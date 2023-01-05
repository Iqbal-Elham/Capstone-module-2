import commentCounter from '../commentCounter.js';

describe('Test the comment counter method', () => {
  it('count the array length: 3', () => {
    expect(
      commentCounter([
        {
          item_id: 6644,
          username: 'iqbal',
          comment: 'comment 1',
        },
        {
          item_id: 54,
          username: 'diego',
          comment: 'comment 2',
        },
        {
          item_id: 3243,
          username: 'belay',
          comment: 'comment 3',
        },
      ]),
    ).toEqual(3);
  });
  it('count the array length: 3', () => {
    expect(
      commentCounter([
        {
          item_id: 6644,
          username: 'iqbal',
          comment: 'comment 1',
        },
        {
          item_id: 54,
          username: 'diego',
          comment: 'comment 2',
        },
      ]),
    ).toEqual(2);
  });
  it('count the array length: 3', () => {
    expect(
      commentCounter([]),
    ).toEqual(0);
  });
});