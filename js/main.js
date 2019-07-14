'use strict';

var OFFERS_NUMBER = 8;
var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var POSITION_MIN_Y = 130;
var POSITION_MAX_Y = 630;
var PIN_WIDTH = 50;

var MIN_HOUSE_PRICE = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var MIN_HOUSE_PRICE = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var map = document.querySelector('.map');
var mapFaded = document.querySelector('.map--faded');
var pinList = map.querySelector('.map__pins');
var mapWidth = map.offsetWidth;
var mapFilters = map.querySelector('.map__filters');
var mainPin = map.querySelector('.map__pin--main');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var adForm = document.querySelector('.ad-form');
var formFieldsets = adForm.querySelectorAll('fieldset');
var addressInput = adForm.querySelector('input[name="address"]');
var houseTypeSelect = adForm.querySelector('select[name="type"]');
var checkInTimeSelect = adForm.querySelector('select[name="timein"]');
var checkOutTimeSelect = adForm.querySelector('select[name="timeout"]');
var priceInput = adForm.querySelector('input[name="price"]');

// functions
function getRandomInteger(array) {
  return Math.floor(Math.random() * (array.length - 1));
}

function getRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// activate page
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

var setMinPrice = function () {
  priceInput.placeholder = MIN_HOUSE_PRICE[houseTypeSelect.value];
  priceInput.min = MIN_HOUSE_PRICE[houseTypeSelect.value];
};

var changeCheckTime = function (evt) {
  var target = evt.target;
  var changedField = target === checkOutTimeSelect ? checkInTimeSelect : checkOutTimeSelect;
  changedField.value = target.value;
};

var activatePage = function () {
  mapFaded.classList.remove('map--faded');
  pinList.appendChild(pinElement);
  adForm.classList.remove('ad-form--disabled');
  toggleDisabledAttribute(formFieldsets, false);
  toggleDisabledAttribute(mapFilters, false);
  houseTypeSelect.addEventListener('change', setMinPrice);
  checkInTimeSelect.addEventListener('change', changeCheckTime);
  checkOutTimeSelect.addEventListener('change', changeCheckTime);
};

var createOffersPins = function () {
  var allPins = [];
  var pinOffset = PIN_WIDTH / 2;
  var pinPositionMinX = pinOffset;
  var pinPositionMaxX = mapWidth - pinOffset;

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
        'x': getRandomIntegerInRange(pinPositionMinX, pinPositionMaxX),
        'y': getRandomIntegerInRange(POSITION_MIN_Y, POSITION_MAX_Y)
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

var setPins = function (offersData) {
  var pinFragment = document.createDocumentFragment();

  for (var i = 0; i < OFFERS_NUMBER; i++) {
    pinFragment.appendChild(renderPin(offersData[i]));
  }

  return pinFragment;
};

// pin coordinates
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 80;
var positionMaxX = map.offsetWidth;
var positionMinX = 0;

var onChangeDeviceWidth = function () {
  positionMaxX = map.offsetWidth;
};

var onMouseDown = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (evtMove) {
    evtMove.preventDefault();

    var shift = {
      x: startCoords.x - evtMove.clientX,
      y: startCoords.y - evtMove.clientY
    };

    startCoords = {
      x: evtMove.clientX,
      y: evtMove.clientY
    };

    var currentCoordinateX = mainPin.offsetLeft - shift.x;
    var currentCoordinateY = mainPin.offsetTop - shift.y;

    if (currentCoordinateY <= POSITION_MIN_Y - MAIN_PIN_HEIGHT) {
      currentCoordinateY = POSITION_MIN_Y - MAIN_PIN_HEIGHT;
    }
    if (currentCoordinateY >= POSITION_MAX_Y - MAIN_PIN_HEIGHT) {
      currentCoordinateY = POSITION_MAX_Y - MAIN_PIN_HEIGHT;
    }
    if (currentCoordinateX <= positionMinX) {
      currentCoordinateX = positionMinX;
    }
    if (currentCoordinateX >= positionMaxX - MAIN_PIN_WIDTH) {
      currentCoordinateX = positionMaxX - MAIN_PIN_WIDTH;
    }

    mainPin.style.left = currentCoordinateX + 'px';
    mainPin.style.top = currentCoordinateY + 'px';

    setAddressCoordinates(currentCoordinateX, currentCoordinateY);
  };

  var onMouseUp = function (evtUp) {
    evtUp.preventDefault();
    activatePage();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

var setAddressCoordinates = function (coordinateX, coordinateY) {
  coordinateX = mainPin.offsetLeft + Math.round(MAIN_PIN_WIDTH / 2);
  coordinateY = mainPin.offsetTop + MAIN_PIN_HEIGHT;
  addressInput.value = coordinateX + ', ' + coordinateY;
};


var pinsList = createOffersPins();
var pinElement = setPins(pinsList);

mainPin.addEventListener('mousedown', onMouseDown);

loadPage();

window.addEventListener('resize', onChangeDeviceWidth);
