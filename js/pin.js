'use strict';

(function () {
  var OFFERS_NUMBER = 8;
  var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var PIN_WIDTH = 50;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (pin) {
    var offerElement = pinTemplate.cloneNode(true);
    var offerElementImage = offerElement.querySelector('img');

    offerElementImage.src = pin.author.avatar;
    offerElement.style.left = pin.location.x + 'px';
    offerElement.style.top = pin.location.y + 'px';

    return offerElement;
  };

  var setPins = function (offersData) {
    var pinFragment = document.createDocumentFragment();

    for (var i = 0; i < OFFERS_NUMBER; i++) {
      pinFragment.appendChild(renderPin(offersData[i]));
    }

    return pinFragment;
  };

  var createOffersPins = function () {
    var allPins = [];
    var pinOffset = PIN_WIDTH / 2;
    var pinPositionMinX = pinOffset;
    var pinPositionMaxX = window.utils.mapWidth - pinOffset;

    for (var i = 0; i < OFFERS_NUMBER; i++) {
      var authorId = i + 1;

      var objects = {
        'author': {
          'avatar': 'img/avatars/user' + (authorId < 10 ? '0' : '') + authorId + '.png'
        },
        'offer': {
          'type': HOUSE_TYPES[window.utils.getRandomInteger(HOUSE_TYPES)]
        },
        'location': {
          'x': window.utils.getRandomIntegerInRange(pinPositionMinX, pinPositionMaxX),
          'y': window.utils.getRandomIntegerInRange(window.utils.POSITION_MIN_Y, window.utils.POSITION_MAX_Y)
        }
      };

      allPins.push(objects);
    }

    return allPins;
  };

  var pinsList = createOffersPins();
  var pinElement = setPins(pinsList);

  window.pin = {
    pinElement: pinElement
  };
})();
