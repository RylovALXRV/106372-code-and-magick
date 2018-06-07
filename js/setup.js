/* eslint-disable guard-for-in,no-shadow */
'use strict';


var similarWizardTemplate = document.querySelector('#similar-wizard-template').
content.querySelector('.setup-similar-item');

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');

var fragment = document.createDocumentFragment();

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия',
  'Люпита', 'Вашингтон'];

var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая',
  'Нионго', 'Ирвинг'];

var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
  'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomElem = function (arr) {
  var randValue = Math.floor(Math.random() * arr.length);
  return arr[randValue];
};

// var fullNameElem = getRandomElem(wizardNames) + ' ' + getRandomElem(wizardSurnames);


// МОЖНО ЛИ ТАК ВООБЩЕ ДЕЛАТЬ??
// создал один пустой объект в массиве для копирования его свойств
var wizards = [
  {
    name: '',
    coatColor: '',
    eyesColor: ''
  }
];

// создаю копию объекта и возвращаю его
var copyWizards = function (obj) {
  var clone = {};
  for (var key in obj) { // а здесь вообще ругается на перебор объекта через for-in
    clone[key] = obj[key];
  }
  return clone;
};

// делаю количество копий и добавляю в массив объекты
var makeElems = function (arr, num) {
  for (var i = 0; i < num - 1; i++) {
    var elem = copyWizards(arr[i]);
    arr.push(elem);
  }
  return arr;
};

makeElems(wizards, 4);

// задаю для каждого из объекта свои свойства
for (var i = 0; i < wizards.length; i++) {
  wizards[i].name = getRandomElem(wizardNames) + ' ' + getRandomElem(wizardSurnames);
  wizards[i].coatColor = getRandomElem(coatColors);
  wizards[i].eyesColor = getRandomElem(eyesColors);
}
// var wizards = [
//   {
//     name: fullNameElem,
//     coatColor: getRandomElem(coatColors),
//     eyesColor: getRandomElem(eyesColors)
//   },
//   {
//     name: fullNameElem,
//     coatColor: getRandomElem(coatColors),
//     eyesColor: getRandomElem(eyesColors)
//   },
//   {
//     name: fullNameElem,
//     coatColor: getRandomElem(coatColors),
//     eyesColor: getRandomElem(eyesColors)
//   },
//   {
//     name: fullNameElem,
//     coatColor: getRandomElem(coatColors),
//     eyesColor: getRandomElem(eyesColors)
//   }
// ];
//

// задаю для каждого из волшебника свойства и вставляю фрагмент на страницу
var getSimilarElement = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = arr[i].name;
    wizardElement.querySelector('.wizard-coat').style.fill = arr[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = arr[i].eyesColor;
    fragment.appendChild(wizardElement);
  }

  return setupSimilarList.appendChild(fragment);
};

getSimilarElement(wizards);
