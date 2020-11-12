'use strict';

const FILE_TYPES = [`jpg`, `jpeg`, `png`];

const fileChooser = document.querySelector(`.upload input[type=file]`);
const preview = document.querySelector(`.setup-user-pic`);

const onFileInputLoadPic = () => {
  const file = fileChooser.files[0];
  const fileType = file.type;

  const matches = FILE_TYPES.some((item) => {
    return fileType.endsWith(item);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

fileChooser.addEventListener(`change`, onFileInputLoadPic);
