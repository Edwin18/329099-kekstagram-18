'use strict';

(function () {
  var ZOOM = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };
  var HASHTAGS = {
    LENGTH: {
      MIN: 1,
      MAX: 20
    },
    QUANTITY_MAX: 5
  };
  var HASHTAGS_REGEXP = /#/g;
  var COMMENTS_LENGTH_MAX = 140;
  var URL = 'https://js.dump.academy/kekstagram';

  var uploadFilesElement = document.querySelector('#upload-file');
  var photoFormElement = document.querySelector('#upload-select-image');
  var photoFormOverlay = document.querySelector('.img-upload__overlay');
  var closeBtnElement = photoFormOverlay.querySelector('#upload-cancel');
  var commentsElement = photoFormOverlay.querySelector('.text__description');
  var hashtagsElement = photoFormOverlay.querySelector('.text__hashtags');
  var effectsBarElement = photoFormOverlay.querySelector('.img-upload__effect-level');
  var zoomScaleElement = photoFormOverlay.querySelector('.img-upload__scale');
  var zoomBtnValue = photoFormOverlay.querySelector('.scale__control--value');
  var imgElement = photoFormOverlay.querySelector('.img-upload__preview img');
  var body = document.querySelector('body');

  var getZoom = function (evt) {
    var target = evt.target;

    if (target.classList.contains('scale__control--smaller')) {

      zoomBtnValue.value = (parseInt(zoomBtnValue.value, 10) - ZOOM.STEP) + '%';
      imgElement.style.transform = 'scale(0.' + parseInt(zoomBtnValue.value, 10) + ')';

      if (parseInt(zoomBtnValue.value, 10) <= ZOOM.MIN) {
        zoomBtnValue.value = '25%';
        imgElement.style.transform = 'scale(0.25)';
      }
    }

    if (target.classList.contains('scale__control--bigger')) {

      zoomBtnValue.value = (parseInt(zoomBtnValue.value, 10) + ZOOM.STEP) + '%';
      imgElement.style.transform = 'scale(0.' + parseInt(zoomBtnValue.value, 10) + ')';

      if (parseInt(zoomBtnValue.value, 10) >= ZOOM.MAX) {
        zoomBtnValue.value = '100%';
        imgElement.style.transform = 'scale(1)';
      }
    }
  };

  var onFormEscPress = function (evt) {
    if (evt.keyCode === window.constants.KEY_CODE.ESC) {
      window.util.closePopUp(photoFormOverlay, onFormEscPress);
      formReset();
      body.classList.remove('modal-open');
    }
  };

  var formReset = function () {
    photoFormElement.reset();
  };

  var hashtagsValidation = function () {
    var hashtags = hashtagsElement.value.split(' ')
      .map(function (elem) {
        return elem.toLowerCase();
      })
      .filter(function (elem) {
        return elem !== '';
      });

    if (hashtags.length > HASHTAGS.QUANTITY_MAX) {
      hashtagsElement.setCustomValidity('Не более ' + HASHTAGS.QUANTITY_MAX + ' хэш-тегов');
      return;
    }

    for (var i = 0; i < hashtags.length; i++) {
      var firstToken = hashtags[i][0];
      var inkr = i + 1;

      if (hashtags[i].match(HASHTAGS_REGEXP) === null) {
        hashtagsElement.setCustomValidity('Вы забыли поставить символ хэш-тега "#"');
      } else {
        hashtagsElement.setCustomValidity('');

        if (hashtags[i].length >= HASHTAGS.LENGTH.MAX) {
          hashtagsElement.setCustomValidity('Ваш хэш-тег' + hashtags[i] + ' длинее 20 символов, укоротите)');
        } else if (firstToken === '#' && hashtags[i].includes('#', 1)) {
          hashtagsElement.setCustomValidity('Между хэш-тегами ' + hashtags[i] + ' отсутствует пробел');
        } else if (firstToken === '#' && hashtags[i].length === HASHTAGS.LENGTH.MIN) {
          hashtagsElement.setCustomValidity('Хэш-тег не может состоять только из символа "#"');
        } else if (hashtags.indexOf(hashtags[i], inkr) !== -1) {
          hashtagsElement.setCustomValidity('Ваш хэш-тег ' + hashtags[i] + ' повторяется');
          return;
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
    window.util.openPopUp(photoFormOverlay, onFormEscPress);
    window.util.hideElement(effectsBarElement);
    body.classList.add('modal-open');
  });

  zoomScaleElement.addEventListener('click', function (evt) {
    getZoom(evt);
  });

  hashtagsElement.addEventListener('input', hashtagsValidation);

  commentsElement.addEventListener('input', commentsValidation);

  photoFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.save(URL, photoFormElement, window.messages.renderSuccess, window.messages.renderError);
    window.util.closePopUp(photoFormOverlay, onFormEscPress);
    formReset();
    body.classList.remove('modal-open');
  });

  closeBtnElement.addEventListener('click', function () {
    window.util.closePopUp(photoFormOverlay, onFormEscPress);
    formReset();
    body.classList.remove('modal-open');
  });

  photoFormOverlay.addEventListener('keydown', function (evt) {
    var target = evt.target;

    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      evt.stopPropagation();
    }
  });
})();
