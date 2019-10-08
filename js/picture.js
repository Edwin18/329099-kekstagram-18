'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureElement = document.querySelector('.pictures');

  var getPhotoElement = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  window.picture = {
    renderPhotos:
    function (photos) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < photos.length; i++) {
        var template = getPhotoElement(photos[i]);
        fragment.appendChild(template);
      }

      pictureElement.appendChild(fragment);
    }
  };
})();
