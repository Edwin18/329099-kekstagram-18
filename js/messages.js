'use strict';

(function () {
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainElement = document.querySelector('main');

  var getSuccess = function () {
    var successElement = successTemplate.cloneNode(true);

    successElement.classList.add('hidden');
    mainElement.appendChild(successElement);
  };

  var getError = function () {
    var errorElement = errorTemplate.cloneNode(true);

    errorElement.classList.add('hidden');
    mainElement.appendChild(errorElement);
  };

  getError();
  getSuccess();

  window.messages = {
    renderSuccess: function () {
      var success = document.querySelector('.success');

      var onSuccessEscPress = function (evt) {
        if (evt.keyCode === window.constants.KEY_CODE.ESC) {
          window.util.closePopUp(success, onSuccessEscPress);
        }
      };

      var onSuccessClick = function (evt) {
        var target = evt.target;

        if (target.classList.contains('success__button') || target.classList.contains('success')) {
          window.util.closePopUp(success, onSuccessEscPress);
          success.removeEventListener('click', onSuccessClick);
        }
      };

      window.util.openPopUp(success, onSuccessEscPress);
      success.addEventListener('click', onSuccessClick);
    },
    renderError: function () {
      var error = document.querySelector('.error');

      var onErrorEscPress = function (evt) {
        if (evt.keyCode === window.constants.KEY_CODE.ESC) {
          window.util.closePopUp(error, onErrorEscPress);
        }
      };

      var onErrorClick = function (evt) {
        var target = evt.target;

        if (target.classList.contains('error__button') || target.classList.contains('error')) {
          window.util.closePopUp(error, onErrorEscPress);
          error.removeEventListener('click', onErrorClick);
        }
      };

      window.util.openPopUp(error);
      error.addEventListener('click', onErrorClick);
    }
  };
})();
