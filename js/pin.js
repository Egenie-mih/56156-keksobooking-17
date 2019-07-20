'use strict';

(function () {
  var OFFERS_NUMBER = 8;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinList = window.utils.map.querySelector('.map__pins');

  var renderPin = function (pin) {
    var offerElement = pinTemplate.cloneNode(true);
    var offerElementImage = offerElement.querySelector('img');

    offerElementImage.src = pin.author.avatar;
    offerElement.style.left = pin.location.x + 'px';
    offerElement.style.top = pin.location.y + 'px';

    return offerElement;
  };

  var createPins = function (offersData) {
    var pinFragment = document.createDocumentFragment();

    for (var i = 0; i < OFFERS_NUMBER; i++) {
      pinFragment.appendChild(renderPin(offersData[i]));
    }

    pinList.appendChild(pinFragment);
  };

  window.pin = {
    createPins: createPins
  };

})();
