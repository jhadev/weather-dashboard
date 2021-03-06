import { atom } from 'recoil';

const value = localStorage.getItem('saved');

let parsed = JSON.parse(value);

const weatherState = atom({
  key: 'weather',
  default: {},
});
const forecastState = atom({
  key: 'forecast',
  default: [],
});

const searchTermState = atom({
  key: 'searchTerm',
  default: parsed ? parsed[parsed.length - 1] : 'London',
});

export { forecastState, searchTermState, weatherState };
