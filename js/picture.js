'use strict';

(function () {
  var LIKES = {
    MIN: 15,
    MAX: 250
  };
  var PHOTO_COUNT = 25;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureElement = document.querySelector('.pictures');
  var photos = [];

  var getRandomComments = function () {
    var tempComments = [];
    var randomCount = window.util.getRandomNumber(0, window.data.COMMENTS.length - 1);

    for (var i = 0; i <= randomCount; i++) {
      tempComments.push(window.data.COMMENTS[window.util.getRandomNumber(0, window.data.COMMENTS.length - 1)]);
    }

    return tempComments;
  };

  var getPhoto = function (count) {
    return {
      url: 'photos/' + (count + 1) + '.jpg',
      likes: window.util.getRandomNumber(LIKES.MIN, LIKES.MAX),
      comments: getRandomComments(),
      description: window.data.DESCRIPTION[window.util.getRandomNumber(0, window.data.DESCRIPTION.length - 1)]
    };
  };

  var getPhotos = function (photoCount) {

    for (var i = 0; i < photoCount; i++) {
      photos.push(getPhoto(i));
    }

    return photos;
  };

  var getPhotoElement = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  var renderPhotos = function (photoCount) {
    var fragment = document.createDocumentFragment();
    var object = getPhotos(photoCount);

    for (var i = 0; i < photoCount; i++) {
      var template = getPhotoElement(object[i]);
      fragment.appendChild(template);
    }

    pictureElement.appendChild(fragment);
  };

  renderPhotos(PHOTO_COUNT);
})();
