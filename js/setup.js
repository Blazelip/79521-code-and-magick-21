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
const fireballColor = setupPlayer.querySelector(`.setup-fireball`);


const onPopupEscPress = (evt) => {
  if (evt.key === `Escape` && document.activeElement !== setupNameInput) {
    evt.preventDefault();
    closePopup();
  }
};

const onPopupCloseBtnEnter = (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
};

const onWizzardSetSettings = (evt) => {

  switch (evt.target) {
    case wizardCoat:
      setupCoatColorInput.value = getRandomArrayIndex(COAT_COLORS);
      evt.target.style.fill = setupCoatColorInput.value;
      break;

    case wizardEyes:
      setupEyesColorInput.value = getRandomArrayIndex(EYES_COLORS);
      evt.target.style.fill = setupEyesColorInput.value;
      break;

    case fireballColor:
      setupFireballColorInput.value = getRandomArrayIndex(FIREBALL_COLORS);
      evt.target.style.backgroundColor = setupFireballColorInput.value;
      break;
  }
};

const openPopup = () => {
  setupBlock.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
  setupClose.addEventListener(`keydown`, onPopupCloseBtnEnter);
  setupPlayer.addEventListener(`click`, onWizzardSetSettings);
};

const closePopup = () => {
  setupBlock.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
  setupClose.removeEventListener(`keydown`, onPopupCloseBtnEnter);
  setupPlayer.removeEventListener(`click`, onWizzardSetSettings);
};

const getRandomArrayIndex = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getWizardsData = (wizardAmount) => {
  const wizardsData = [];

  for (let i = 0; i < wizardAmount; i++) {
    const wizardData = {
      fullName: getRandomArrayIndex(NAMES) + getRandomArrayIndex(SURNAMES),
      coatColor: getRandomArrayIndex(COAT_COLORS),
      eyesColor: getRandomArrayIndex(EYES_COLORS)
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

const wizards = getWizardsData(WIZARDS_AMOUNT);
renderWizards(wizards);

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

setupSimilarBlock.classList.remove(`hidden`);
