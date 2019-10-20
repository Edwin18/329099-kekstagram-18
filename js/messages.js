'use strict';

(function () {
  var successTemplateElement = document.querySelector('#success').content.querySelector('.success');
  var errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  var mainElement = document.querySelector('main');
  var successElement;
  var errorElement;

  var getSuccess = function () {
    var success = successTemplateElement.cloneNode(true);

    success.classList.add('hidden');
    mainElement.appendChild(success);
    successElement = success;
  };

  var getError = function () {
    var error = errorTemplateElement.cloneNode(true);

    error.classList.add('hidden');
    mainElement.appendChild(error);
    errorElement = error;
  };

  getError();
  getSuccess();

  window.messages = {
    renderSuccess: function () {
      var onSuccessEscPress = function (evt) {
        if (evt.keyCode === window.constants.KEY_CODE.ESC) {
          window.util.closePopUp(successElement, onSuccessEscPress);
        }
      };

      var onSuccessClick = function (evt) {
        var target = evt.target;

        if (target.classList.contains('success__button') || target.classList.contains('success')) {
          window.util.closePopUp(successElement, onSuccessEscPress);
          successElement.removeEventListener('click', onSuccessClick);
        }
      };

      window.util.openPopUp(successElement, onSuccessEscPress);
      successElement.addEventListener('click', onSuccessClick);
    },
    renderError: function () {
      var onErrorEscPress = function (evt) {
        if (evt.keyCode === window.constants.KEY_CODE.ESC) {
          window.util.closePopUp(errorElement, onErrorEscPress);
        }
      };

      var onErrorClick = function (evt) {
        var target = evt.target;

        if (target.classList.contains('error__button') || target.classList.contains('error')) {
          window.util.closePopUp(errorElement, onErrorEscPress);
          errorElement.removeEventListener('click', onErrorClick);
        }
      };

      window.util.openPopUp(errorElement);
      errorElement.addEventListener('click', onErrorClick);
    }
  };
})();
