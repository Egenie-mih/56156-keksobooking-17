'use strict';

(function () {
  var mapFaded = document.querySelector('.map--faded');
  var pinList = window.utils.map.querySelector('.map__pins');

  var activateAdForm = function () {
    mapFaded.classList.remove('map--faded');
    pinList.appendChild(window.pin.pinElement);
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.disableFields(false);
    window.form.listenFromChanges();
  };

  window.createAd = {
    activateAdForm: activateAdForm
  };
})();
