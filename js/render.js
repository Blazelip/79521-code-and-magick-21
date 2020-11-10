'use strict';

const WIZARDS_AMOUNT = 4;

const setupBlock = document.querySelector(`.setup`);
const setupSimilarList = setupBlock.querySelector(`.setup-similar-list`);
const setupSimilarBlock = setupBlock.querySelector(`.setup-similar`);
const wizardTemplate = document.getElementById(`similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const createWizard = (wizardData) => {
  const element = wizardTemplate.cloneNode(true);

  element.querySelector(`.setup-similar-label`).textContent = wizardData.name;
  element.querySelector(`.wizard-coat`).style.fill = wizardData.colorCoat;
  element.querySelector(`.wizard-eyes`).style.fill = wizardData.colorEyes;

  return element;
};

const renderWizards = (wizardsArray) => {
  const fragment = document.createDocumentFragment();
  const takeNumber = wizardsArray.length > WIZARDS_AMOUNT ? WIZARDS_AMOUNT : wizardsArray.length;

  setupSimilarList.innerHTML = ``;
  // wizardsArray.forEach((wizard) => {
  //   const currentWizard = createWizard(wizard);
  //   fragment.appendChild(currentWizard);
  // });

  for (let i = 0; i < takeNumber; i++) {
    const currentWizard = createWizard(wizardsArray[i]);
    fragment.appendChild(currentWizard);
  }

  setupSimilarList.appendChild(fragment);
  setupSimilarBlock.classList.remove(`hidden`);
};

window.render = {
  renderWizards
};
