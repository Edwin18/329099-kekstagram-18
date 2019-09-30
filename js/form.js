'use strict';

(function () {
  var HASHTAGS_MAX = 20;
  var HASHTAGS_MAX_LENGTH = 5;
  var HASHTAGS_REGEXP = /#/g;
  var COMMENTS_MAX = 140;

  var uploadFilesElement = document.querySelector('#upload-file');
  var photoFormElement = document.querySelector('.img-upload__overlay');
  var commentsElement = photoFormElement.querySelector('.text__description');
  var hashtagsElement = photoFormElement.querySelector('.text__hashtags');
  var imgElement = photoFormElement.querySelector('.img-upload__preview img');
  var effectsBarElement = photoFormElement.querySelector('.img-upload__effect-level');
  var effectsListElement = photoFormElement.querySelector('.effects__list');

  var removeEffects = function () {
    if (!(imgElement.className.match('effects__preview--') === null)) {
      var oldEffects = imgElement.className.match('effects__preview--').input;
      imgElement.classList.remove(oldEffects);
    }
  };

  var renderEffects = function (evt) {
    var eventTarget = evt.target;

    if (!(eventTarget.value === 'none')) {
      imgElement.classList.add('effects__preview--' + eventTarget.value);
      if (!(effectsBarElement.classList.contains === 'hiden')) {
        window.util.showElement(effectsBarElement);
      }
    } else {
      window.util.hideElement(effectsBarElement);
    }
  };

  var hashtagsValidation = function () {
    var tempArray = hashtagsElement.value.split(' ');

    if (!(tempArray.length > HASHTAGS_MAX_LENGTH)) {
      for (var i = 0; i < tempArray.length; i++) {
        if (tempArray[i].match(HASHTAGS_REGEXP) === null) {
          hashtagsElement.setCustomValidity('Вы забыли поставить хеш-тег #');
        } else {
          hashtagsElement.setCustomValidity('');

          if (tempArray[i].length >= HASHTAGS_MAX) {
            hashtagsElement.setCustomValidity('Ваш хеш-тег' + tempArray[i] + ' длинее 20 символов, укоротите)');
          } else {
            hashtagsElement.setCustomValidity('');
          }
        }
      }
    } else {
      hashtagsElement.setCustomValidity('Максимум 5 хеш-тегов');
    }
  };

  var commentsValidation = function () {
    if (commentsElement.value.length >= COMMENTS_MAX) {
      commentsElement.setCustomValidity('Слишком длинный комментарий');
    } else {
      commentsElement.setCustomValidity('');
    }
  };

  uploadFilesElement.addEventListener('change', function () {
    window.util.showElement(photoFormElement);
    window.util.hideElement(effectsBarElement);
  });

  effectsListElement.addEventListener('change', function (evt) {
    removeEffects();
    renderEffects(evt);
  });

  hashtagsElement.addEventListener('input', hashtagsValidation);

  commentsElement.addEventListener('input', commentsValidation);
})();
