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


  window.util = {
    getRandomArrayIndex,
    getPartOfArray,
    getMaxElement
  };

})();
