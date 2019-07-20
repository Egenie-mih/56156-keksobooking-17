'use strict';

(function () {
  var positionMaxX = window.utils.mapWidth;
  var positionMinX = 0;

  var loadPage = function () {
    window.form.disableFields(true);
    window.form.addressInput.value = String(window.utils.mainPin.offsetLeft) + ', ' + String(window.utils.mainPin.offsetTop);
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

      var currentCoordinateX = window.utils.mainPin.offsetLeft - shift.x;
      var currentCoordinateY = window.utils.mainPin.offsetTop - shift.y;

      if (currentCoordinateY <= window.utils.POSITION_MIN_Y - window.utils.MAIN_PIN_HEIGHT) {
        currentCoordinateY = window.utils.POSITION_MIN_Y - window.utils.MAIN_PIN_HEIGHT;
      }
      if (currentCoordinateY >= window.utils.POSITION_MAX_Y - window.utils.MAIN_PIN_HEIGHT) {
        currentCoordinateY = window.utils.POSITION_MAX_Y - window.utils.MAIN_PIN_HEIGHT;
      }
      if (currentCoordinateX <= positionMinX) {
        currentCoordinateX = positionMinX;
      }
      if (currentCoordinateX >= positionMaxX - window.utils.MAIN_PIN_WIDTH) {
        currentCoordinateX = positionMaxX - window.utils.MAIN_PIN_WIDTH;
      }

      window.utils.mainPin.style.left = currentCoordinateX + 'px';
      window.utils.mainPin.style.top = currentCoordinateY + 'px';

      window.form.setAddressCoordinates(currentCoordinateX, currentCoordinateY);
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      window.createAd.activateAdForm();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onChangeDeviceWidth = function () {
    positionMaxX = window.utils.mapWidth;
  };

  loadPage();
  window.utils.mainPin.addEventListener('mousedown', onMouseDown);
  window.addEventListener('resize', onChangeDeviceWidth);
})();
