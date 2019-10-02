'use strict';

(function () {
  window.util = {
    getRandomNumber:
      function (min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
      },
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
