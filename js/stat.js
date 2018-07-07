'use strict';

(function () {

  var Cloud = {
    HEIGHT: 270,
    X: 100,
    Y: 10
  };

  var Bar = {
    GAP: 10,
    MAX_HEIGHT: 150,
    WIDTH: 40,
    WIDTH_BETWEEN_BAR: 50
  };

  var COLOR_BLACK = '#000000';
  var BAR_AND_TEXT_WIDTH = Bar.WIDTH + Bar.WIDTH_BETWEEN_BAR;
  var BAR_LEFT_BEGIN = Cloud.X + Bar.WIDTH_BETWEEN_BAR;

  var getColors = function () {
    var val = (Math.round(Math.random() * 10)) / 10;
    if (val === 0) {
      val = 0.1;
    }
    return 'rgba(0, 0, 255, ' + val + ')';
  };

  var displayTextCloud = function (ctx, text, x, y) {
    ctx.fillStyle = COLOR_BLACK;
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText(text, x, y);
  };

  // функция для получения максимального времени
  var getMaxTime = function (arr) {
    return Math.max.apply(null, arr);
  };

  var getCloud = function (ctx, x, y, color) {
    // координаты X и Y с учетом всех точек расположенных на плоскостях
    var cords = [
      {x: x, y: y},
      {x: 300, y: 20},
      {x: 120, y: -20},
      {x: -20, y: 190},
      {x: 20, y: 80},
      {x: -300, y: -20},
      {x: -120, y: 20},
      {x: 20, y: -190},
      {x: -20, y: -80}];
    var cordX = 0;
    var cordY = 0;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (var i = 0; i < cords.length; i++) {
      cordX += cords[i].x;
      cordY += cords[i].y;
      ctx.lineTo(cordX, cordY);
    }
    ctx.closePath();
    ctx.fill();
  };

  var renderStatsBar = function (ctx, data, cords) {
    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText(data.name, cords.x, cords.y - Bar.GAP * 3);
    if (data.name === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = getColors();
    }
    ctx.fillRect(cords.x, cords.y - Bar.GAP * 4, Bar.WIDTH, -data.timePercentage);
    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText(Math.round(data.time), cords.x, cords.y - Bar.GAP * 6 - data.timePercentage);
  };

  window.renderStatistics = function (ctx, names, times) {
    // вызываю функцию с максимальным временем и записываю в переменную
    var maxTime = getMaxTime(times);
    getCloud(ctx, Cloud.X + Bar.GAP, Cloud.Y + Bar.GAP, 'rgba(0, 0, 0, 0.7)');
    getCloud(ctx, Cloud.X, Cloud.Y, '#fff');

    displayTextCloud(ctx, 'Ура вы победили!', Cloud.X + Bar.GAP * 2, Cloud.Y + Bar.GAP + Bar.GAP / 2);
    displayTextCloud(ctx, 'Список результатов:', Cloud.X + Bar.GAP * 2, Cloud.Y + Bar.GAP * 3 + Bar.GAP / 2);

    // вывод на экран статистики всех игроков
    for (var i = 0; i < names.length; i++) {
      // в функцию передаю объекты с данными и координатами
      renderStatsBar(ctx, {name: names[i], time: times[i], timePercentage: Math.round(times[i] * Bar.MAX_HEIGHT / maxTime)}, {x: BAR_LEFT_BEGIN + BAR_AND_TEXT_WIDTH * i, y: Cloud.HEIGHT});
    }
  };
})();
