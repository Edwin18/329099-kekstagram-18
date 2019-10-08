'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureElement = document.querySelector('.pictures');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainElement = document.querySelector('main');

  var renderError = function () {
    var errorElement = errorTemplate.cloneNode(true);

    mainElement.appendChild(errorElement);
  };

  var getPhotoElement = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  var renderPhotos = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var template = getPhotoElement(photos[i]);
      fragment.appendChild(template);
    }

    pictureElement.appendChild(fragment);
  };

  window.data.get(URL, renderPhotos, renderError);
})();
