'use strict';

(function () {

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var wizardFeature = {
    names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия',
      'Люпита', 'Вашингтон'],
    surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая',
      'Нионго', 'Ирвинг'],
    coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)',
      'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
    fireballColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  // создал одного волшебника
  var createWizard = function () {
    return {
      name: window.getRandomFeature(wizardFeature.names) + ' ' + window.getRandomFeature(wizardFeature.surnames),
      coatColor: window.getRandomFeature(wizardFeature.coatColors),
      eyesColor: window.getRandomFeature(wizardFeature.eyesColors)
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

  window.colorize(document.querySelector('.setup-wizard .wizard-coat'), wizardFeature.coatColors, 'input[name=coat-color]');
  window.colorize(document.querySelector('.setup-wizard .wizard-eyes'), wizardFeature.eyesColors, 'input[name=eyes-color]');
  window.colorize(document.querySelector('.setup-fireball-wrap'), wizardFeature.fireballColors, 'input[name=fireball-color]');

  document.querySelector('.setup-similar').classList.remove('hidden');
})();

