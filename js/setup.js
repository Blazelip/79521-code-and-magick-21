'use strict';

(() => {
  const WIZARDS_AMOUNT = 4;
  // const NAMES = [`Иван`, `Хуан`, `Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  // const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const COAT_COLORS = [
    `rgb(101, 137, 164)`,
    `rgb(241, 43, 107)`,
    `rgb(146, 100, 161)`,
    `rgb(56, 159, 117)`,
    `rgb(215, 210, 55)`,
    `rgb(0, 0, 0)`
  ];
  const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];

  const setupBlock = document.querySelector(`.setup`);
  const setupSimilarBlock = setupBlock.querySelector(`.setup-similar`);
  const setupSimilarList = setupBlock.querySelector(`.setup-similar-list`);
  const wizardTemplate = document.getElementById(`similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  // const getWizardsData = (wizardAmount) => {
  //   const wizardsData = [];

  //   for (let i = 0; i < wizardAmount; i++) {
  //     const wizardData = {
  //       fullName: window.util.getRandomArrayIndex(NAMES) + window.util.getRandomArrayIndex(SURNAMES),
  //       coatColor: window.util.getRandomArrayIndex(COAT_COLORS),
  //       eyesColor: window.util.getRandomArrayIndex(EYES_COLORS)
  //     };

  //     wizardsData.push(wizardData);
  //   }

  //   return wizardsData;
  // };

  const createWizard = (wizardData) => {
    const element = wizardTemplate.cloneNode(true);

    element.querySelector(`.setup-similar-label`).textContent = wizardData.name;
    element.querySelector(`.wizard-coat`).style.fill = wizardData.colorCoat;
    element.querySelector(`.wizard-eyes`).style.fill = wizardData.colorEyes;

    return element;
  };

  const renderWizards = (wizardsArray) => {
    const fragment = document.createDocumentFragment();

    wizardsArray.forEach((wizard) => {
      const currentWizard = createWizard(wizard);
      fragment.appendChild(currentWizard);
    });

    setupSimilarList.appendChild(fragment);
  };

  const onSuccessLoadData = (serverData) => {
    const dataFragment = window.util.getPartOfArray(serverData, WIZARDS_AMOUNT);
    renderWizards(dataFragment);
    setupSimilarBlock.classList.remove(`hidden`);
  };

  const onFailedRequest = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.download(onSuccessLoadData, onFailedRequest);


  window.setup = {
    const: {
      COAT_COLORS,
      EYES_COLORS
    },
    methods: {
      onFailedRequest
    }
  };

})();
