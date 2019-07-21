'use strict';

(function () {
  var mapFaded = document.querySelector('.map--faded');

  var activateAdForm = function () {
    mapFaded.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.load(window.pin.getPins, window.data.errorHandler);
    window.form.disableFields(false);
    window.form.listenFromChanges();
    window.filters.listenFilterChanges();
  };

  window.createAd = {
    activateAdForm: activateAdForm
  };
})();
