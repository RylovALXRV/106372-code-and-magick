'use strict';
// -------------------------- Задание №17 ----------------------------------------------
(function () {
  var setupElem = document.querySelector('.setup');
  var setupUserPic = setupElem.querySelector('.upload');

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
