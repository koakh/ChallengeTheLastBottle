import { constants } from '../app/config';

export const log = (message, type = 'log') => {
  if (!constants.DEBUG) {
    return;
  }
  if (type === 'log') {
    // eslint-disable-next-line no-console
    console.log(message);
  }
  if (type === 'error') {
    // eslint-disable-next-line no-console
    console.error(message);
  }
};

export function randomNumber (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateRandomRgbColor = (ra, ga, ba) => {
  const r = randomNumber(ra[0], ra[1]);
  const g = randomNumber(ga[0], ga[1]);
  const b = randomNumber(ba[0], ba[1]);
  return `rgb(${r}, ${g}, ${b}`;
};

export const arrayIsInArray = (arr, subArr) => {
  for (let i = 0; i < arr.length; i++) {
    let checker = false;
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === subArr[j]) {
        checker = true;
      } else {
        checker = false;
        break;
      }
    }
    if (checker) {
      return true;
    }
  }
  return false;
};

export const randomPosition = (cols, rows) => [
  randomNumber(0, cols - 1),
  randomNumber(0, rows - 1)
];
