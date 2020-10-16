'use strict';

(() => {
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

  window.util = {
    getRandomArrayIndex,
    getMaxElement
  };

})();
