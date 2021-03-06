'use strict';

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;

const COAT_COLORS = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

let coatColor = `rgb(101, 137, 164)`;
let eyesColor = `black`;

const setupBlock = document.querySelector(`.setup`);
const setupPlayer = setupBlock.querySelector(`.setup-player`);
const setupNameInput = setupBlock.querySelector(`.setup-user-name`);
const setupCoatColorInput = setupPlayer.querySelector(`[name="coat-color"]`);
const setupEyesColorInput = setupPlayer.querySelector(`[name="eyes-color"]`);
const setupFireballColorInput = setupPlayer.querySelector(`[name="fireball-color"]`);

const wizardCoat = setupPlayer.querySelector(`.setup-wizard .wizard-coat`);
const wizardEyes = setupPlayer.querySelector(`.setup-wizard .wizard-eyes`);
const fireballColor = setupPlayer.querySelector(`.setup-fireball`);

const namesComparator = function (left, right) {
  if (left > right) {
    return 1;
  } else if (left < right) {
    return -1;
  } else {
    return 0;
  }
};

const getRank = (wizard) => {
  let rank = 0;

  if (wizard.colorCoat === coatColor) {
    rank += 2;
  }
  if (wizard.colorEyes === eyesColor) {
    rank += 1;
  }

  return rank;
};

const sortWizardsData = (sourceData) => {
  window.render.renderWizards(sourceData.sort(function (left, right) {
    let rankDiff = getRank(right) - getRank(left);
    if (rankDiff === 0) {
      rankDiff = namesComparator(left.name, right.name);
    }
    return rankDiff;
  }));
};

const chooseItemColor = (input, array) => {
  const currentColor = input.value;
  let newColor = window.util.getRandomArrayIndex(array);

  while (newColor === currentColor) {
    newColor = window.util.getRandomArrayIndex(array);
  }

  return newColor;
};

const onWizzardSetSettings = (evt) => {

  switch (evt.target) {
    case wizardCoat:
      const readyCoatColor = chooseItemColor(setupCoatColorInput, COAT_COLORS);
      setupCoatColorInput.value = readyCoatColor;
      evt.target.style.fill = readyCoatColor;
      coatColor = readyCoatColor;
      window.util.throttle(() => {
        sortWizardsData(window.sourceData);
      })();
      break;

    case wizardEyes:
      const readyEyesColor = chooseItemColor(setupEyesColorInput, EYES_COLORS);

      setupEyesColorInput.value = readyEyesColor;
      evt.target.style.fill = readyEyesColor;
      eyesColor = readyEyesColor;
      window.util.throttle(() => {
        sortWizardsData(window.sourceData);
      })();
      break;

    case fireballColor:
      const readyFireballColor = chooseItemColor(setupFireballColorInput, FIREBALL_COLORS);

      setupFireballColorInput.value = readyFireballColor;
      evt.target.style.backgroundColor = readyFireballColor;
      break;
  }
};

setupNameInput.addEventListener(`change`, (evt) => {
  const valueLength = evt.target.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    setupNameInput.setCustomValidity(`Ещё ${MIN_NAME_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    setupNameInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} симв.`);
  } else {
    setupNameInput.setCustomValidity(``);
  }

  setupNameInput.reportValidity();
});

window.customize = {
  onWizzardSetSettings,
  sortWizardsData
};
