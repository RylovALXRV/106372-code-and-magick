'use strict';

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия',
  'Люпита', 'Вашингтон'];

var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая',
  'Нионго', 'Ирвинг'];

var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var getRandomFeature = function (features) {
  return features[Math.round(Math.random() * (features.length - 1))];
};

// создал одного волшебника
var createWizard = function () {
  return {
    name: getRandomFeature(wizardNames) + ' ' + getRandomFeature(wizardSurnames),
    coatColor: getRandomFeature(coatColors),
    eyesColor: getRandomFeature(eyesColors)
  };
};

// создал волшебника со всеми его свойствами на странице
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// создал для волшебников свойства
var renderSimilarWizards = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < 4; j++) {
    fragment.appendChild(renderWizard(createWizard()));
  }
  document.querySelector('.setup-similar-list').appendChild(fragment);
};

renderSimilarWizards();

var setupElem = document.querySelector('.setup');
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

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

var featuresClickHandler = function (elem, features, selector) {
  elem.style.fill = getRandomFeature(features);
  document.querySelector(selector).value = elem.style.fill;
};

wizardCoat.addEventListener('click', function () {
  featuresClickHandler(wizardCoat, coatColors, 'input[name=coat-color]');
});

wizardEyes.addEventListener('click', function () {
  featuresClickHandler(wizardEyes, eyesColors, 'input[name=eyes-color]');
});

wizardFireball.addEventListener('click', function () {
  document.querySelector('input[name=fireball-color]').value = getRandomFeature(fireballColors);
  wizardFireball.style.backgroundColor = document.querySelector('input[name=fireball-color]').value;
});

document.querySelector('.setup-similar').classList.remove('hidden');
