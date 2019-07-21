'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingTypeSelect = filtersForm.querySelector('#housing-type');

  var filterTypes = function (item) {
    if (housingTypeSelect.value === 'any') {
      return item.offer.type;
    }
    return item.offer.type === housingTypeSelect.value;
  };

  var listenFilterChanges = function () {
    housingTypeSelect.addEventListener('change', window.pin.updatePins);
  };

  window.filters = {
    filterTypes: filterTypes,
    listenFilterChanges: listenFilterChanges
  };
})();
