'use strict';

var OFFERS_NUMBER = 8;
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PIN_Y_MIN = 130;
var PIN_Y_MAX = 630;
var PIN_WIDTH = 50;
var MAIN_PIN_HEIGHT = 80;

var map = document.querySelector('.map');
var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapWidth = map.offsetWidth;
var mapFaded = document.querySelector('.map--faded');
var mapFilters = document.querySelector('.map__filters');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var formFieldsets = adForm.querySelectorAll('fieldset');
var addressInput = adForm.querySelector('input[name="address"]');

function getRandomInteger(array) {
  return Math.floor(Math.random() * (array.length - 1));
}

function getRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var toggleDisabledAttribute = function (array, disabledValue) {
  for (var i = 0; i < array.length; i++) {
    array[i].disabled = disabledValue;
  }
};

var loadPage = function () {
  toggleDisabledAttribute(formFieldsets, true);
  toggleDisabledAttribute(mapFilters, true);
  addressInput.value = String(mainPin.offsetLeft) + ', ' + String(mainPin.offsetTop);
};

var activatePage = function () {
  mapFaded.classList.remove('map--faded');
  pinList.appendChild(pinElement);
  adForm.classList.remove('ad-form--disabled');
  toggleDisabledAttribute(formFieldsets, false);
  toggleDisabledAttribute(mapFilters, false);
};

var createOffersPins = function () {
  var allPins = [];
  var pinOffset = PIN_WIDTH / 2;
  var pinXMin = pinOffset;
  var pinXMax = mapWidth - pinOffset;

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

var pinsList = createOffersPins();
var pinElement = setPins(pinsList);

mainPin.addEventListener('click', function () {
  activatePage();
});

mainPin.addEventListener('mouseup', function () {
  addressInput.value = String(mainPin.offsetLeft + Math.round(PIN_WIDTH / 2)) + ', ' + String(mainPin.offsetTop + MAIN_PIN_HEIGHT);
});

loadPage();
