'use strict';

const WIZARDS_AMOUNT = 4;
const NAMES = [`Иван`, `Хуан`, `Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
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

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;

const setupBlock = document.querySelector(`.setup`);
const setupSimilarBlock = setupBlock.querySelector(`.setup-similar`);
const setupSimilarList = setupBlock.querySelector(`.setup-similar-list`);
const wizardTemplate = document.getElementById(`similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const setupOpen = document.querySelector(`.setup-open`);
const setupOpenIcon = setupOpen.querySelector(`.setup-open-icon`);
const setupClose = setupBlock.querySelector(`.setup-close`);

const setupPlayer = setupBlock.querySelector(`.setup-player`);

const setupNameInput = setupBlock.querySelector(`.setup-user-name`);
const setupCoatColorInput = setupPlayer.querySelector(`[name="coat-color"]`);
const setupEyesColorInput = setupPlayer.querySelector(`[name="eyes-color"]`);
const setupFireballColorInput = setupPlayer.querySelector(`[name="fireball-color"]`);

const wizardCoat = setupPlayer.querySelector(`.setup-wizard .wizard-coat`);
const wizardEyes = setupPlayer.querySelector(`.setup-wizard .wizard-eyes`);
const fireballColor = setupPlayer.querySelector(`.setup-fireball-wrap`);


const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const onPopupCloseBtnEnter = (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
};

const onPopupChangeCoatColor = () => {
  const colorValue = COAT_COLORS[getRandomArrayIndex(COAT_COLORS)];

  wizardCoat.style.fill = colorValue;
  setupCoatColorInput.value = colorValue;
};

const onPopupChangeEyesColor = () => {
  const colorValue = EYES_COLORS[getRandomArrayIndex(EYES_COLORS)];

  wizardEyes.style.fill = colorValue;
  setupEyesColorInput.value = colorValue;
};

const onPopupChangeFireballColor = () => {
  const colorValue = FIREBALL_COLORS[getRandomArrayIndex(FIREBALL_COLORS)];

  fireballColor.style.backgroundColor = colorValue;
  setupFireballColorInput.value = colorValue;
};

const openPopup = () => {
  setupBlock.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
  setupClose.addEventListener(`keydown`, onPopupCloseBtnEnter);
  wizardCoat.addEventListener(`click`, onPopupChangeCoatColor);
  wizardEyes.addEventListener(`click`, onPopupChangeEyesColor);
  fireballColor.addEventListener(`click`, onPopupChangeFireballColor);
};

const closePopup = () => {
  setupBlock.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
  setupClose.removeEventListener(`keydown`, onPopupCloseBtnEnter);
  wizardCoat.removeEventListener(`click`, onPopupChangeCoatColor);
  wizardEyes.removeEventListener(`click`, onPopupChangeEyesColor);
  fireballColor.removeEventListener(`click`, onPopupChangeFireballColor);
};

setupOpen.addEventListener(`click`, () => {
  openPopup();
});

setupOpenIcon.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, () => {
  closePopup();
});


setupNameInput.addEventListener(`blur`, () => {
  document.addEventListener(`keydown`, onPopupEscPress);
});

setupNameInput.addEventListener(`focus`, () => {
  document.removeEventListener(`keydown`, onPopupEscPress);
});

// setupNameInput.addEventListener(`invalid`, () => {
//   if (setupNameInput.validity.tooShort) {
//     setupNameInput.setCustomValidity(`Имя должно состоять минимум из 2-х символов`);
//   } else if (setupNameInput.validity.tooLong) {
//     setupNameInput.setCustomValidity(`Имя не должно превышать 25-ти символов`);
//   } else if (setupNameInput.validity.valueMissing) {
//     setupNameInput.setCustomValidity(`Обязательное поле`);
//   } else {
//     setupNameInput.setCustomValidity(``);
//   }
// });

setupNameInput.addEventListener(`input`, () => {
  const valueLength = setupNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    setupNameInput.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    setupNameInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
  } else {
    setupNameInput.setCustomValidity(``);
  }

  setupNameInput.reportValidity();
});

const getRandomArrayIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

const getWizardsData = (wizardAmount) => {
  const wizardsData = [];

  for (let i = 0; i < wizardAmount; i++) {
    const wizardData = {
      fullName: NAMES[getRandomArrayIndex(NAMES)] + ` ` + SURNAMES[getRandomArrayIndex(SURNAMES)],
      coatColor: COAT_COLORS[getRandomArrayIndex(COAT_COLORS)],
      eyesColor: EYES_COLORS[getRandomArrayIndex(EYES_COLORS)]
    };

    wizardsData.push(wizardData);
  }

  return wizardsData;
};

const createWizard = (wizardData) => {
  const element = wizardTemplate.cloneNode(true);

  element.querySelector(`.setup-similar-label`).textContent = wizardData.fullName;
  element.querySelector(`.wizard-coat`).style.fill = wizardData.coatColor;
  element.querySelector(`.wizard-eyes`).style.fill = wizardData.eyesColor;

  return element;
};

const renderWizards = (wizardsArray) => {
  const fragment = document.createDocumentFragment();

  wizardsArray.forEach(function (wizard) {
    const currentWizard = createWizard(wizard);
    fragment.appendChild(currentWizard);
  });

  setupSimilarList.appendChild(fragment);
};

let wizards = getWizardsData(WIZARDS_AMOUNT);
renderWizards(wizards);

// setupBlock.classList.remove(`hidden`);
setupSimilarBlock.classList.remove(`hidden`);
