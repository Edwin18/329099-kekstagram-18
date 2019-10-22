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
    COUNT_MAX: 5
  };
  var URL = 'https://js.dump.academy/kekstagram';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadFilesElement = document.querySelector('#upload-file');
  var photoFormElement = document.querySelector('#upload-select-image');
  var photoFormOverlayElement = document.querySelector('.img-upload__overlay');
  var closeBtnElement = photoFormOverlayElement.querySelector('#upload-cancel');
  var hashtagsElement = photoFormOverlayElement.querySelector('.text__hashtags');
  var effectsBarElement = photoFormOverlayElement.querySelector('.img-upload__effect-level');
  var zoomScaleElement = photoFormOverlayElement.querySelector('.img-upload__scale');
  var zoomBtnValueElement = photoFormOverlayElement.querySelector('.scale__control--value');
  var imgElement = photoFormOverlayElement.querySelector('.img-upload__preview img');
  var effectsPreviewElement = photoFormOverlayElement.querySelectorAll('.effects__preview');
  var bodyElement = document.querySelector('body');

  var onUploadPhotoSubmit = function () {
    var file = uploadFilesElement.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (elem) {
        return fileName.endsWith(elem);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          imgElement.src = reader.result;

          effectsPreviewElement.forEach(function (elem) {
            elem.style.backgroundImage = 'url(' + reader.result + ')';
          });
        });

        reader.readAsDataURL(file);
      }
    }
  };

  var getZoom = function (evt) {
    var target = evt.target;

    if (target.classList.contains('scale__control--smaller')) {

      zoomBtnValueElement.value = (parseInt(zoomBtnValueElement.value, 10) - ZOOM.STEP) + '%';
      imgElement.style.transform = 'scale(0.' + parseInt(zoomBtnValueElement.value, 10) + ')';

      if (parseInt(zoomBtnValueElement.value, 10) <= ZOOM.MIN) {
        zoomBtnValueElement.value = '25%';
        imgElement.style.transform = 'scale(0.25)';
      }
    }

    if (target.classList.contains('scale__control--bigger')) {

      zoomBtnValueElement.value = (parseInt(zoomBtnValueElement.value, 10) + ZOOM.STEP) + '%';
      imgElement.style.transform = 'scale(0.' + parseInt(zoomBtnValueElement.value, 10) + ')';

      if (parseInt(zoomBtnValueElement.value, 10) >= ZOOM.MAX) {
        zoomBtnValueElement.value = '100%';
        imgElement.style.transform = 'scale(1)';
      }
    }
  };

  var onFormEscPress = function (evt) {
    if (evt.keyCode === window.constants.KEY_CODE.ESC) {
      window.util.closePopUp(photoFormOverlayElement, onFormEscPress);
      formReset();
      bodyElement.classList.remove('modal-open');
    }
  };

  var formReset = function () {
    photoFormElement.reset();
    imgElement.style.filter = 'none';
    imgElement.style.transform = 'none';
  };

  var getHashtags = function () {
    var hashtags = hashtagsElement.value.split(' ')
      .filter(function (elem) {
        return elem !== '';
      });

    return hashtags;
  };

  var validateMaxCount = function (tags) {
    if (tags.length > HASHTAGS.COUNT_MAX) {
      hashtagsElement.setCustomValidity('Не более ' + '"' + HASHTAGS.COUNT_MAX + '"' + ' хэш-тегов.');
    }
  };

  var validateHashSymbol = function (singlTag) {
    if (singlTag[0] !== '#') {
      hashtagsElement.setCustomValidity('Вы забыли поставить символ хэш-тега "#" у ' + '"' + singlTag + '"' + '.');
    }
  };

  var validateMaxLength = function (singlTag) {
    if (singlTag.length >= HASHTAGS.LENGTH.MAX) {
      hashtagsElement.setCustomValidity('Ваш хэш-тег' + '"' + singlTag + '"' + ' длинее 20 символов.');
    }
  };

  var validateMinLength = function (singlTag) {
    if (singlTag[0] === '#' && singlTag.length === HASHTAGS.LENGTH.MIN) {
      hashtagsElement.setCustomValidity('Хэш-тег ' + '"' + singlTag + '"' + ' не может состоять только из символа "#".');
    }
  };

  var validateSpacesBetween = function (singlTag) {
    if (singlTag[0] === '#' && singlTag.includes('#', 1)) {
      hashtagsElement.setCustomValidity('Между хэш-тегами ' + '"' + singlTag + '"' + ' отсутствует пробел.');
    }
  };

  var validateDuplicate = function (tags) {
    for (var i = 0; i < tags.length - 1; i++) {
      for (var k = i + 1; k < tags.length; k++) {
        if (tags[i].toLowerCase() === tags[k].toLowerCase()) {
          hashtagsElement.setCustomValidity('Ваши хэш-теги ' + '"' + tags[i] + '"' + ' и ' + '"' + tags[k] + '"' + ' одинаковые.');
        }
      }
    }
  };

  var resetValidityError = function () {
    hashtagsElement.setCustomValidity('');
  };

  var validateTags = function (tags) {
    resetValidityError();
    validateMaxCount(tags);

    tags.forEach(function (singlTag) {
      validateHashSymbol(singlTag);
      validateMinLength(singlTag);
      validateSpacesBetween(singlTag);
      validateMaxLength(singlTag);
    });

    validateDuplicate(tags);
  };

  uploadFilesElement.addEventListener('change', function () {
    window.util.openPopUp(photoFormOverlayElement, onFormEscPress);
    window.util.hideElement(effectsBarElement);
    bodyElement.classList.add('modal-open');
  });

  zoomScaleElement.addEventListener('click', function (evt) {
    getZoom(evt);
  });

  hashtagsElement.addEventListener('input', function () {
    var tags = getHashtags();
    validateTags(tags);
  });

  photoFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.save(URL, photoFormElement, window.messages.renderSuccess, window.messages.renderError);
    window.util.closePopUp(photoFormOverlayElement, onFormEscPress);
    formReset();
    bodyElement.classList.remove('modal-open');
  });

  closeBtnElement.addEventListener('click', function () {
    window.util.closePopUp(photoFormOverlayElement, onFormEscPress);
    formReset();
    bodyElement.classList.remove('modal-open');
  });

  photoFormOverlayElement.addEventListener('keydown', function (evt) {
    var target = evt.target;

    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      evt.stopPropagation();
    }
  });

  uploadFilesElement.addEventListener('change', onUploadPhotoSubmit);
})();
