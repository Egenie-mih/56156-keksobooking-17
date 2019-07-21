'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinList = window.utils.map.querySelector('.map__pins');
  var pins = [];

  var createPin = function (pin) {
    var offerElement = pinTemplate.cloneNode(true);
    var offerElementImage = offerElement.querySelector('img');

    offerElementImage.src = pin.author.avatar;
    offerElementImage.alt = pin.offer.title;
    offerElement.style.left = pin.location.x + 'px';
    offerElement.style.top = pin.location.y + 'px';

    return offerElement;
  };

  var renderPins = function (offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(createPin(offers[i]));
    }

    pinList.appendChild(fragment);
  };

  var removePins = function () {
    var pinsList = document.querySelectorAll('.map__pin');

    pinsList.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  };

  var updatePins = function () {
    var updatedPins = pins.filter(window.filters.filterTypes).slice(0, 5);

    removePins();
    renderPins(updatedPins);
  };

  var getPins = function (data) {
    pins = data;
    updatePins();
  };

  window.pin = {
    updatePins: updatePins,
    getPins: getPins
  };
})();
