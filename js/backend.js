'use strict';

(() => {
  const API_URL = `https://javascript.pages.academy/code-and-magick`;

  const TIMEOUT_IN_MS = 10000;

  const statusCode = {
    OK: 200
  };

  const getServerResponse = (xhr, onLoad, onError) => {
    xhr.addEventListener(`load`, () => {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} - ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  const download = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    getServerResponse(xhr, onLoad, onError);

    xhr.open(`GET`, `${API_URL}/data`);
    xhr.send();
  };

  const upload = (data, onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    getServerResponse(xhr, onLoad, onError);

    xhr.open(`POST`, API_URL);
    xhr.send(data);
  };

  window.backend = {
    download,
    upload
  };

})();
