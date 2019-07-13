'use strict';

(function () {
  var MIN_HOUSE_PRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var mapFilters = window.utils.map.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('input[name="address"]');
  var houseTypeSelect = adForm.querySelector('select[name="type"]');
  var checkInTimeSelect = adForm.querySelector('select[name="timein"]');
  var checkOutTimeSelect = adForm.querySelector('select[name="timeout"]');
  var priceInput = adForm.querySelector('input[name="price"]');

  var toggleDisabledAttribute = function (array, disabledValue) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = disabledValue;
    }
  };

  var disableFields = function (condition) {
    toggleDisabledAttribute(formFieldsets, condition);
    toggleDisabledAttribute(mapFilters, condition);
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

  var setAddressCoordinates = function (coordinateX, coordinateY) {
    coordinateX = window.utils.mainPin.offsetLeft + Math.round(window.utils.MAIN_PIN_WIDTH / 2);
    coordinateY = window.utils.mainPin.offsetTop + window.utils.MAIN_PIN_HEIGHT;
    addressInput.value = coordinateX + ', ' + coordinateY;
  };

  var listenFromChanges = function () {
    houseTypeSelect.addEventListener('change', setMinPrice);
    checkInTimeSelect.addEventListener('change', changeCheckTime);
    checkOutTimeSelect.addEventListener('change', changeCheckTime);
  };

  window.form = {
    addressInput: addressInput,
    adForm: adForm,
    disableFields: disableFields,
    listenFromChanges: listenFromChanges,
    setAddressCoordinates: setAddressCoordinates
  };
})();
