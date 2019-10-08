'use strict';

(function () {
  window.util = {
    showElement:
      function (elem) {
        if (elem) {
          elem.classList.remove('hidden');
        }
      },
    hideElement:
      function (elem) {
        if (elem) {
          elem.classList.add('hidden');
        }
      }
  };
})();
