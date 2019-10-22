'use strict';

(function () {
  var imgFilterElement = document.querySelector('.img-filters');
  var lastTimeout;

  var clearPicture = function () {
    var photo = document.querySelectorAll('.picture');

    photo.forEach(function (elem) {
      elem.parentNode.removeChild(elem);
    });
  };

  var clearBtn = function () {
    var btns = document.querySelectorAll('.img-filters__button');

    btns.forEach(function (elem) {
      if (elem.classList.contains('img-filters__button--active')) {
        elem.classList.remove('img-filters__button--active');
      }
    });
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
    var photos = mostDiscussed.slice(0);

    photos.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    return photos;
  };

  var onBtnClick = function (target) {
    if (target.id === 'filter-popular') {
      target.classList.add('img-filters__button--active');
      window.picture.renderPhotos(window.picture.photos);
    }

    if (target.id === 'filter-random') {
      var randomPhotos = getRandomArray(window.picture.photos, 10);

      target.classList.add('img-filters__button--active');
      window.picture.renderPhotos(randomPhotos);
    }

    if (target.id === 'filter-discussed') {
      var mostDiscussed = getFilterDiscussed(window.picture.photos);

      target.classList.add('img-filters__button--active');
      window.picture.renderPhotos(mostDiscussed);
    }
  };

  imgFilterElement.addEventListener('click', function (evt) {
    var target = evt.target;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      if (target.tagName === 'BUTTON' || target.classList.contains('img-filters__button')) {
        clearPicture();
        clearBtn();
        onBtnClick(target);
      }
    }, 500);
  });
})();
