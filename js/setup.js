'use strict';

const WIZARDS_AMOUNT = 4;
const NAMES = [`Иван`, `Хуан`, `Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];

const setupBlock = document.querySelector(`.setup`);
const setupSimilarBlock = setupBlock.querySelector(`.setup-similar`);
const setupSimilarList = setupBlock.querySelector(`.setup-similar-list`);
setupBlock.classList.remove(`hidden`);

const wizardTemplate = document.getElementById(`similar-wizard-template`).content.querySelector(`.setup-similar-item`);

const getRandomArrayIndex = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);

  return randomIndex;
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

let wizards = getWizardsData(WIZARDS_AMOUNT);

const createWizard = (wizardData) => {
  const element = wizardTemplate.cloneNode(true);
  element.querySelector(`.setup-similar-label`).textContent = wizardData.fullName;
  element.querySelector(`.wizard-coat`).style.fill = wizardData.coatColor;
  element.querySelector(`.wizard-eyes`).style.fill = wizardData.eyesColor;

  return element;
};

const renderFragment = (wizardsArray) => {
  const fragment = document.createDocumentFragment();

  wizardsArray.forEach(function (wizard) {
    const currentWizard = createWizard(wizard);
    fragment.appendChild(currentWizard);
  });

  return fragment;
};

setupSimilarList.appendChild(renderFragment(wizards));
setupSimilarBlock.classList.remove(`hidden`);
