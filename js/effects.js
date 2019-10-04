'use strict';

(function () {
  var EFFECTS = [
    {CLASS_NAME: 'chrome', FILTER_NAME: 'grayscale', MIN: 0, MAX: 1, UNITS: ''},
    {CLASS_NAME: 'sepia', FILTER_NAME: 'sepia', MIN: 0, MAX: 1, UNITS: ''},
    {CLASS_NAME: 'marvin', FILTER_NAME: 'invert', MIN: 0, MAX: 100, UNITS: '%'},
    {CLASS_NAME: 'phobos', FILTER_NAME: 'blur', MIN: 0, MAX: 3, UNITS: 'px'},
    {CLASS_NAME: 'heat', FILTER_NAME: 'brightness', MIN: 1, MAX: 3, UNITS: ''}
  ];

  var imgElement = document.querySelector('.img-upload__preview img');
  var effectsListElement = document.querySelector('.effects__list');
  var effectsContainer = document.querySelector('.img-upload__effect-level');
  var effectsHandler = effectsContainer.querySelector('.effect-level__pin');
  var effectsBar = effectsContainer.querySelector('.effect-level__line');
  var effectsLevelDepth = effectsContainer.querySelector('.effect-level__depth');
  var effectsValue = effectsContainer.querySelector('.effect-level__value');

  var getEffect = function () {
    var temp;

    for (var i = 0; i < EFFECTS.length; i++) {
      if (imgElement.className.match(EFFECTS[i].CLASS_NAME)) {
        temp = EFFECTS[i];
      }
    }

    return temp;
  };

  var getPureProportion = function (maxValue, minValue) {
    return (maxValue - minValue) / 100;
  };

  effectsHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = evt.clientX;
    var startCoordsHangler = effectsHandler.offsetLeft;
    var lineWidth = effectsBar.offsetWidth;
    var pureProportion = lineWidth / 100;
    var currentEffect = getEffect();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoords - moveEvt.clientX;

      effectsHandler.style.left = (startCoordsHangler - shift) + 'px';
      effectsValue.value = Math.round(effectsHandler.offsetLeft / pureProportion);
      effectsLevelDepth.style.width = effectsValue.value + '%';

      if (effectsHandler.offsetLeft <= 0) {
        effectsHandler.style.left = 0;
        effectsValue.value = 0;
        effectsLevelDepth.style.width = 0;
      }

      if (effectsHandler.offsetLeft > lineWidth) {
        effectsHandler.style.left = lineWidth + 'px';
        effectsValue.value = 100;
        effectsLevelDepth.style.width = '100%';
      }

      imgElement.style.filter =
        currentEffect.FILTER_NAME +
        '(' +
        (currentEffect.MIN +
        (getPureProportion(currentEffect.MAX, currentEffect.MIN) * effectsValue.value)) +
        currentEffect.UNITS +
        ')';
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
    effectsHandler.style.left = '100%';
    effectsLevelDepth.style.width = '100%';
    effectsValue.value = 100;

    if (!(imgElement.className.match('effects__preview--') === null)) {
      var oldEffects = imgElement.className.match('effects__preview--').input;
      imgElement.classList.remove(oldEffects);
    }
  };

  var renderEffects = function (evt) {
    var eventTarget = evt.target;

    if (!(eventTarget.value === 'none')) {
      imgElement.classList.add('effects__preview--' + eventTarget.value);
      if (!(effectsContainer.classList.contains === 'hiden')) {
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
