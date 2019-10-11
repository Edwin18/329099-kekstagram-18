'use strict';

(function () {
  window.util = {
    showElement: function (elem) {
      if (elem) {
        elem.classList.remove('hidden');
      }
    },
    hideElement: function (elem) {
      if (elem) {
        elem.classList.add('hidden');
      }
    },
    openPopUp: function (elem, callback) {
      window.util.showElement(elem);
      document.addEventListener('keydown', callback);
    },
    closePopUp: function (elem, callback) {
      window.util.hideElement(elem);
      document.removeEventListener('keydown', callback);
    }
  };
})();
