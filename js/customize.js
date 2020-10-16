'use strict';

(() => {
  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 25;
  const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

  const setupBlock = document.querySelector(`.setup`);
  const setupPlayer = setupBlock.querySelector(`.setup-player`);
  const setupNameInput = setupBlock.querySelector(`.setup-user-name`);
  const setupCoatColorInput = setupPlayer.querySelector(`[name="coat-color"]`);
  const setupEyesColorInput = setupPlayer.querySelector(`[name="eyes-color"]`);
  const setupFireballColorInput = setupPlayer.querySelector(`[name="fireball-color"]`);

  const wizardCoat = setupPlayer.querySelector(`.setup-wizard .wizard-coat`);
  const wizardEyes = setupPlayer.querySelector(`.setup-wizard .wizard-eyes`);
  const fireballColor = setupPlayer.querySelector(`.setup-fireball`);

  const onWizzardSetSettings = (evt) => {

    switch (evt.target) {
      case wizardCoat:
        setupCoatColorInput.value = window.util.getRandomArrayIndex(window.setup.const.COAT_COLORS);
        evt.target.style.fill = setupCoatColorInput.value;
        break;

      case wizardEyes:
        setupEyesColorInput.value = window.util.getRandomArrayIndex(window.setup.const.EYES_COLORS);
        evt.target.style.fill = setupEyesColorInput.value;
        break;

      case fireballColor:
        setupFireballColorInput.value = window.util.getRandomArrayIndex(FIREBALL_COLORS);
        evt.target.style.backgroundColor = setupFireballColorInput.value;
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
    onWizzardSetSettings
  };

})();
