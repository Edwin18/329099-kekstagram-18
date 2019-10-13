'use strict';

(function () {
  var imgFilterElement = document.querySelector('.img-filters');

  var clearPicture = function () {
    var photo = Array.from(document.querySelectorAll('.picture'));

    for (var i = 1; i <= photo.length; i++) {
      photo[photo.length - i].parentNode.removeChild(photo[photo.length - i]);
    }
  };

  var getRandomArray = function (arr, size) {
    var shuffled = arr.slice(0);
    var i = arr.length;
    var min = i - size;
    var temp;
    var index;

    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }

    return shuffled.slice(min);
  };

  var getFilterDiscussed = function (mostDiscussed) {
    var photos = mostDiscussed.slice();

    for (var i = 0; i < photos.length - 1; i++) {
      var max = photos[i];
      for (var k = i + 1; k < photos.length; k++) {
        if (max.comments.length < photos[k].comments.length) {
          photos[i] = photos[k];
          photos[k] = max;
          max = photos[i];
        }
      }
    }

    return photos;
  };

  imgFilterElement.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.tagName === 'BUTTON' || target.classList.contains('img-filters__button')) {
      if (target.id === 'filter-popular') {
        clearPicture();
        window.picture.renderPhotos(window.picture.photos);
      }

      if (target.id === 'filter-random') {
        var randomPhotos = getRandomArray(window.picture.photos, 10);

        clearPicture();
        window.picture.renderPhotos(randomPhotos);
      }

      if (target.id === 'filter-discussed') {
        var mostDiscussed = getFilterDiscussed(window.picture.photos);

        clearPicture();
        window.picture.renderPhotos(mostDiscussed);
      }
    }
  });
})();
