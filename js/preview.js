'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var pictureElement = document.querySelector('.pictures');
  var pictureBigElement = document.querySelector('.big-picture');
  var сloseBtnElement = pictureBigElement.querySelector('#picture-cancel');


  var renderPictureBig = function (element, data) {
    element.querySelector('.big-picture__img img').src = data.src;
  };

  pictureElement.addEventListener('click', function (evt) {
    var picture = evt.target;

    if (picture.tagName === 'IMG') {
      renderPictureBig(pictureBigElement, picture);
      window.util.showElement(pictureBigElement);
    }
  });

  pictureElement.addEventListener('keydown', function (evt) {
    var picture = evt.target;

    if (evt.keyCode === ENTER_KEYCODE) {
      if (picture.tagName === 'A') {
        var pictureImg = picture.querySelector('img');
        renderPictureBig(pictureBigElement, pictureImg);
        window.util.showElement(pictureBigElement);
      }
    }
  });

  сloseBtnElement.addEventListener('click', function () {
    window.util.hideElement(pictureBigElement);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.util.hideElement(pictureBigElement);
    }
  });
})();
