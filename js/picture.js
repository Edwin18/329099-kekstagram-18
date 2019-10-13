'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureElement = document.querySelector('.pictures');
  var imgFilterElement = document.querySelector('.img-filters');

  var getPhotoElement = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__img').link = photo; // присваиваю ссылку на конкретный объект

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

  var getPhotos = function (photos) {
    renderPhotos(photos);
    imgFilterElement.classList.remove('img-filters--inactive');

    window.picture = {
      photos: photos,
      renderPhotos: renderPhotos
    };
  };

  window.data.get(URL, getPhotos, window.messages.renderError);
})();
