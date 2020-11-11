'use strict';

const onSuccessLoadData = (serverData) => {
  window.sourceData = serverData;
  window.customize.sortWizardsData(window.sourceData);
};

const onFailedRequest = (errorMessage) => {
  window.util.showErrorMessage(errorMessage);
};

window.similar = {
  onFailedRequest,
  onSuccessLoadData
};

