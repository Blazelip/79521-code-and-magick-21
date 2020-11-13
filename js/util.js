'use strict';

const DEBOUNCE_INTERVAL = 250;

const getRandomArrayIndex = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

const shuffleArray = (array) => {
  const copiedArray = array.slice();

  for (let i = copiedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copiedArray[i];
    copiedArray[i] = copiedArray[j];
    copiedArray[j] = temp;
  }

  return copiedArray;
};

const getPartOfArray = (array, endPoint) => {
  return shuffleArray(array).slice(0, endPoint);
};

const showErrorMessage = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const debounce = (cb, interval = DEBOUNCE_INTERVAL) => {
  let lastTimeout = null;

  return function (...parameters) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...parameters);
    }, interval);
  };
};

window.util = {
  getRandomArrayIndex,
  getPartOfArray,
  getMaxElement,
  showErrorMessage,
  debounce
};
