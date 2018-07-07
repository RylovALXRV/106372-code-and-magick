'use strict';

(function () {

  window.getRandomFeature = function (features) {
    return features[Math.round(Math.random() * (features.length - 1))];
  };

  var setFeaturesColorUse = function (elem, features, selector) {
    elem.style.fill = window.getRandomFeature(features);
    document.querySelector(selector).value = elem.style.fill;
  };

  var setFeaturesColorDiv = function (elem, features, selector) {
    document.querySelector(selector).value = window.getRandomFeature(features);
    elem.style.backgroundColor = document.querySelector(selector).value;
  };

  window.colorize = function (elem, feature, selector) {
    elem.addEventListener('click', function () {
      if (elem.tagName.toLowerCase() === 'div') {
        setFeaturesColorDiv(elem, feature, selector);
      } else {
        setFeaturesColorUse(elem, feature, selector);
      }
    });
  };
})();
