'use strict';

(function () {
  var ESC_CODE = 27;
  var urlPost = 'https://js.dump.academy/keksobooking';
  var urlGet = 'https://js.dump.academy/keksobooking/data';
  var main = document.querySelector('main');
  var successPageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorPageTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessage = errorPageTemplate.cloneNode(true);
  var errorButton = errorMessage.querySelector('.error__button');

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', urlGet);
    xhr.send();
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('POST', urlPost);
    xhr.send(data);
  };

  var successHandler = function () {
    var successPage = successPageTemplate.cloneNode(true);
    main.appendChild(successPage);

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_CODE) {
        main.removeChild(successPage);
      }
    });
  };

  var errorHandler = function () {
    var errorPage = errorPageTemplate.cloneNode(true);
    main.appendChild(errorPage);

    errorButton.addEventListener('click', function () {
      main.removeChild(errorHandler);
    });
    errorMessage.addEventListener('click', function () {
      main.removeChild(errorHandler);
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_CODE) {
        main.removeChild(errorPage);
      }
    });
  };

  window.data = {
    urlGet: urlGet,
    urlPost: urlPost,
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
