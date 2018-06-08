'use strict';

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия',
  'Люпита', 'Вашингтон'];

var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая',
  'Нионго', 'Ирвинг'];

var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomFeature = function (features) {
  return features[Math.floor(Math.random() * (features.length - 1))];
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
