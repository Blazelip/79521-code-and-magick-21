'use strict';

(() => {
  const setupBlock = document.querySelector(`.setup`);
  const setupForm = setupBlock.querySelector(`.setup-wizard-form`);
  const modalHandle = setupBlock.querySelector(`.upload`);
  const setupPlayer = setupBlock.querySelector(`.setup-player`);
  const setupNameInput = setupBlock.querySelector(`.setup-user-name`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupOpenIcon = setupOpen.querySelector(`.setup-open-icon`);
  const setupClose = setupBlock.querySelector(`.setup-close`);

  const openPopup = () => {
    setupBlock.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPopupEscPress);
    setupClose.addEventListener(`keydown`, onPopupCloseBtnEnter);
    setupPlayer.addEventListener(`click`, window.customize.onWizzardSetSettings);
  };

  const closePopup = () => {
    setupBlock.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onPopupEscPress);
    setupClose.removeEventListener(`keydown`, onPopupCloseBtnEnter);
    setupPlayer.removeEventListener(`click`, window.customize.onWizzardSetSettings);
  };

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

  const onSuccessSendForm = () => {
    setupBlock.classList.add(`hidden`);
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

  modalHandle.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupBlock.style.top = `${setupBlock.offsetTop - shift.y}px`;
      setupBlock.style.left = `${setupBlock.offsetLeft - shift.x}px`;
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          modalHandle.removeEventListener(`click`, onClickPreventDefault);
        };

        modalHandle.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  setupForm.addEventListener(`submit`, (evt) => {
    window.backend.upload(new FormData(setupForm), onSuccessSendForm, window.similar.onFailedRequest);
    evt.preventDefault();
  });

})();
