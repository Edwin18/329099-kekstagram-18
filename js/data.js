'use strict';

(function () {
  var STATUS_SUCCESS = 200;

  var onLoadXhr = function (xhr, onSuccess, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });
  };

  window.data = {
    get: function (url, onSuccess, onError) {
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.open('GET', url);
      xhr.send();

      onLoadXhr(xhr, onSuccess, onError);
    },
    save: function (url, formElement, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      var data = new FormData(formElement);

      xhr.open('POST', url);
      xhr.send(data);

      onLoadXhr(xhr, onSuccess, onError);
    }
  };
})();
