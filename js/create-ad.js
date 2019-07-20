'use strict';

(function () {
  var mapFaded = document.querySelector('.map--faded');

  var activateAdForm = function () {
    mapFaded.classList.remove('map--faded');
    window.load(window.pin.createPins, window.data.errorHandler);
    window.form.adForm.classList.remove('ad-form--disabled');
    window.form.disableFields(false);
    window.form.listenFromChanges();
  };

  window.createAd = {
    activateAdForm: activateAdForm
  };
})();
