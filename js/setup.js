'use strict';

// без .content. не работает - я в демке взял, да и на лекции показывали, по-другому не знаю как
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var fragment = document.createDocumentFragment();

var wizards = [];

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия',
  'Люпита', 'Вашингтон'];

var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая',
  'Нионго', 'Ирвинг'];

var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomFeature = function (arr) {
  var randValue = Math.floor(Math.random() * arr.length);
  return arr[randValue];
};

// создал одного волшебника
var createWizard = function () {
  var obj = {
    name: getRandomFeature(wizardNames) + ' ' + getRandomFeature(wizardSurnames),
    coatColor: getRandomFeature(coatColors),
    eyesColor: getRandomFeature(eyesColors)
  };
  return obj;
};

// сгенерировал массив из 4-х объектов(волшебников)
for (var i = 0; i < 4; i++) {
  wizards.push(createWizard());
}

// создал волшебника со всеми его свойствами на странице
var renderWizard = function (arr) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = arr.name;
  wizardElement.querySelector('.wizard-coat').style.fill = arr.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = arr.eyesColor;
  return wizardElement;
};

// создал для всех волшебников свойства
var renderSimilarWizards = function (arr) {
  for (var j = 0; j < arr.length; j++) {
    fragment.appendChild(renderWizard(arr[j]));
  }
  return document.querySelector('.setup-similar-list').appendChild(fragment);
};

renderSimilarWizards(wizards);
