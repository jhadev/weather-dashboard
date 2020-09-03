import { atom } from 'recoil';

const weatherState = atom({
  key: 'weather',
  default: {},
});

const searchTermState = atom({
  key: 'searchTerm',
  default: 'London',
});

export { searchTermState, weatherState };
