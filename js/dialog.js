'use strict';

(function () {
  var setupElem = document.querySelector('.setup');
  var setupUserPic = setupElem.querySelector('.upload');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');

  var ESC_CODE = 27;
  var ENTER_CODE = 13;

  var resetStylesSetup = function () {
    setupElem.style.top = '';
    setupElem.style.left = '';
  };

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_CODE && !document.activeElement.classList.contains('setup-user-name')) {
      closePopup();
    }
  };

  var openPopup = function () {
    setupElem.classList.remove('hidden');
    document.addEventListener('keydown', popupEscPressHandler);
  };

  var closePopup = function () {
    setupElem.classList.add('hidden');
    resetStylesSetup();
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_CODE && document.activeElement.classList.contains('setup-open-icon')) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_CODE && document.activeElement.classList.contains('setup-close')) {
      closePopup();
    }
  });

  setupUserPic.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCords.x - moveEvt.clientX,
        y: startCords.y - moveEvt.clientY
      };

      startCords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupElem.style.left = (setupElem.offsetLeft - shift.x) + 'px';
      setupElem.style.top = (setupElem.offsetTop - shift.y) + 'px';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var preventClickDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          setupUserPic.removeEventListener('click', preventClickDefaultHandler);
        };
        setupUserPic.addEventListener('click', preventClickDefaultHandler);
      }
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
