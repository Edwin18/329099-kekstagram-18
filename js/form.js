'use strict';

(function () {
  var HASHTAGS_LENGTH_MAX = 20;
  var HASHTAGS_QUANTITY_MAX = 5;
  var HASHTAGS_REGEXP = /#/g;
  var COMMENTS_LENGTH_MAX = 140;

  var uploadFilesElement = document.querySelector('#upload-file');
  var photoFormElement = document.querySelector('.img-upload__overlay');
  var commentsElement = photoFormElement.querySelector('.text__description');
  var hashtagsElement = photoFormElement.querySelector('.text__hashtags');
  var effectsBarElement = photoFormElement.querySelector('.img-upload__effect-level');

  var hashtagsValidation = function () {
    var tempArray = hashtagsElement.value.split(' ');

    if (tempArray.length > HASHTAGS_QUANTITY_MAX) {
      hashtagsElement.setCustomValidity('Максимум 5 хеш-тегов');
      return;
    }

    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i].match(HASHTAGS_REGEXP) === null) {
        hashtagsElement.setCustomValidity('Вы забыли поставить хеш-тег #');
      } else {
        hashtagsElement.setCustomValidity('');

        if (tempArray[i].length >= HASHTAGS_LENGTH_MAX) {
          hashtagsElement.setCustomValidity('Ваш хеш-тег' + tempArray[i] + ' длинее 20 символов, укоротите)');
        } else {
          hashtagsElement.setCustomValidity('');
        }
      }
    }
  };

  var commentsValidation = function () {
    if (commentsElement.value.length >= COMMENTS_LENGTH_MAX) {
      commentsElement.setCustomValidity('Слишком длинный комментарий');
    } else {
      commentsElement.setCustomValidity('');
    }
  };

  uploadFilesElement.addEventListener('change', function () {
    window.util.showElement(photoFormElement);
    window.util.hideElement(effectsBarElement);
  });

  hashtagsElement.addEventListener('input', hashtagsValidation);

  commentsElement.addEventListener('input', commentsValidation);
})();
