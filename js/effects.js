'use strict';

(function () {
  var FILTERS = [
    {CLASS_NAME: 'chrome', FILTER_NAME: 'grayscale', MIN: 0, MAX: 1, UNITS: ''},
    {CLASS_NAME: 'sepia', FILTER_NAME: 'sepia', MIN: 0, MAX: 1, UNITS: ''},
    {CLASS_NAME: 'marvin', FILTER_NAME: 'invert', MIN: 0, MAX: 100, UNITS: '%'},
    {CLASS_NAME: 'phobos', FILTER_NAME: 'blur', MIN: 0, MAX: 3, UNITS: 'px'},
    {CLASS_NAME: 'heat', FILTER_NAME: 'brightness', MIN: 1, MAX: 3, UNITS: ''}
  ];
  var LEFT_POSITION = {
    MIN: 0,
    MAX: 100
  };
  var VALUE = {
    MIN: 0,
    MAX: 100
  };
  var PERCENT = 100;

  var imgElement = document.querySelector('.img-upload__preview img');
  var effectsListElement = document.querySelector('.effects__list');
  var effectsContainer = document.querySelector('.img-upload__effect-level');
  var effectsHandler = effectsContainer.querySelector('.effect-level__pin');
  var effectsBar = effectsContainer.querySelector('.effect-level__line');
  var effectsLevelDepth = effectsContainer.querySelector('.effect-level__depth');
  var effectsValue = effectsContainer.querySelector('.effect-level__value');

  var getFilter = function () {
    var filters;

    for (var i = 0; i < FILTERS.length; i++) {
      if (imgElement.className.match(FILTERS[i].CLASS_NAME)) {
        filters = FILTERS[i];
      }
    }

    return filters;
  };

  var getCurrentFilter = function (currentFilter) {
    var pureProportion = getPureProportion(currentFilter.MAX, currentFilter.MIN) * effectsValue.value;
    var firstFilterValue = currentFilter.MIN + pureProportion;
    return currentFilter.FILTER_NAME + '(' + firstFilterValue + currentFilter.UNITS + ')';
  };

  var getPureProportion = function (maxValue, minValue) {
    return (maxValue - minValue) / PERCENT;
  };

  effectsHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;
    var startCoordsHangler = effectsHandler.offsetLeft;
    var sliderWidth = effectsBar.offsetWidth;
    var pureProportion = sliderWidth / PERCENT;
    var currentFilter = getFilter();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;

      effectsHandler.style.left = (startCoordsHangler - shift) + 'px';
      effectsValue.value = Math.round(effectsHandler.offsetLeft / pureProportion);
      effectsLevelDepth.style.width = effectsValue.value + '%';

      if (effectsHandler.offsetLeft <= 0) {
        effectsHandler.style.left = LEFT_POSITION.MIN;
        effectsValue.value = VALUE.MIN;
        effectsLevelDepth.style.width = LEFT_POSITION.MIN;
      }

      if (effectsHandler.offsetLeft > sliderWidth) {
        effectsHandler.style.left = sliderWidth + 'px';
        effectsValue.value = VALUE.MAX;
        effectsLevelDepth.style.width = LEFT_POSITION.MAX + '%';
      }

      imgElement.style.filter = getCurrentFilter(currentFilter);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var removeEffects = function () {
    imgElement.style.filter = null;
    effectsHandler.style.left = LEFT_POSITION.MAX + '%';
    effectsValue.value = VALUE.MAX;
    effectsLevelDepth.style.width = LEFT_POSITION.MAX + '%';

    if (imgElement.className.match('effects__preview--') !== null) {
      var oldEffects = imgElement.className.match('effects__preview--').input;
      imgElement.classList.remove(oldEffects);
    }
  };

  var renderEffects = function (evt) {
    var eventTarget = evt.target;

    if (eventTarget.value !== 'none') {
      imgElement.classList.add('effects__preview--' + eventTarget.value);
      if (effectsContainer.classList.contains !== 'hidden') {
        window.util.showElement(effectsContainer);
      }
    } else {
      window.util.hideElement(effectsContainer);
    }
  };

  effectsListElement.addEventListener('change', function (evt) {
    removeEffects();
    renderEffects(evt);
  });
})();
