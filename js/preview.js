'use strict';

(function () {
  var pictureElement = document.querySelector('.pictures');
  var pictureBigElement = document.querySelector('.big-picture');
  var сloseBtnElement = pictureBigElement.querySelector('#picture-cancel');

  var renderPictureBig = function (element, data) {
    element.querySelector('.big-picture__img img').src = data.src;
  };

  var onPictureEscPress = function (evt) {
    if (evt.keyCode === window.constants.KEY_CODE.ESC) {
      window.util.closePopUp(pictureBigElement, onPictureEscPress);
    }
  };

  pictureElement.addEventListener('click', function (evt) {
    var picture = evt.target;

    if (picture.tagName === 'IMG' && picture.closest('.picture')) {
      renderPictureBig(pictureBigElement, picture);
      window.util.openPopUp(pictureBigElement, onPictureEscPress);
    }
  });

  pictureElement.addEventListener('keydown', function (evt) {
    var picture = evt.target;

    if (evt.keyCode === window.constants.KEY_CODE.ENTER) {
      if (picture.tagName === 'A') {
        var pictureImg = picture.querySelector('img');
        renderPictureBig(pictureBigElement, pictureImg);
        window.util.openPopUp(pictureBigElement, onPictureEscPress);
      }
    }
  });

  сloseBtnElement.addEventListener('click', function () {
    window.util.closePopUp(pictureBigElement, onPictureEscPress);
  });
})();
