'use strict';

var OFFERS_NUMBER = 8;
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var MAP_WIDTH = map.offsetWidth;
var PIN_WIDTH = 50;
var map = document.querySelector('.map');
var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

function getRandomInteger(array) {
  return Math.floor(Math.random() * (array.length - 1));
}

function getRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var createOffersPins = function () {
  var allPins = [];
  var pinOffset = PIN_WIDTH / 2;
  var pinXMin = pinOffset;
  var pinXMax = MAP_WIDTH - pinOffset;

  for (var i = 0; i < OFFERS_NUMBER; i++) {
    var authorId = i + 1;

    var objects = {
      'author': {
        'avatar': 'img/avatars/user' + (authorId < 10 ? '0' : '') + authorId + '.png'
      },
      'offer': {
        'type': HOUSE_TYPES[getRandomInteger(HOUSE_TYPES)]
      },
      'location': {
        'x': getRandomIntegerInRange(pinXMin, pinXMax),
        'y': getRandomIntegerInRange(PIN_Y_MIN, PIN_Y_MAX)
      }
    };

    allPins.push(objects);
  }

  return allPins;

};

var renderPin = function (pin) {
  var offerElement = pinTemplate.cloneNode(true);
  var offerElementImage = offerElement.querySelector('img');

  offerElementImage.src = pin.author.avatar;
  offerElement.style.left = pin.location.x + 'px';
  offerElement.style.top = pin.location.y + 'px';

  return offerElement;
};

function setPins(offersData) {
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < OFFERS_NUMBER; i++) {
    pinFragment.appendChild(renderPin(offersData[i]));
  }

  return pinFragment;
}

var wizardList = createOffersPins();
var wizardElement = setPins(wizardList);
pinList.appendChild(wizardElement);
map.classList.remove('map--faded');
