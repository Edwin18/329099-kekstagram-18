'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var STATUS_SUCCESS = 200;

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainElement = document.querySelector('main');
  var xhr = new XMLHttpRequest();

  var renderError = function () {
    var errorElement = errorTemplate.cloneNode(true);

    mainElement.appendChild(errorElement);
  };

  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    window.xhr = xhr.response; // temp
    if (xhr.status === STATUS_SUCCESS) {
      window.picture.renderPhotos(xhr.response);
    } else {
      renderError();
    }
  });

  xhr.open('GET', URL);
  xhr.send();
})();
