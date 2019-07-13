'use strict';

(function () {
  var POSITION_MIN_Y = 130;
  var POSITION_MAX_Y = 630;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 80;
  var map = document.querySelector('.map');
  var mapWidth = map.offsetWidth;
  var mainPin = map.querySelector('.map__pin--main');

  var getRandomInteger = function (array) {
    return Math.floor(Math.random() * (array.length - 1));
  };

  var getRandomIntegerInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.utils = {
    POSITION_MIN_Y: POSITION_MIN_Y,
    POSITION_MAX_Y: POSITION_MAX_Y,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    map: map,
    mainPin: mainPin,
    mapWidth: mapWidth,
    getRandomInteger: getRandomInteger,
    getRandomIntegerInRange: getRandomIntegerInRange
  };
})();
