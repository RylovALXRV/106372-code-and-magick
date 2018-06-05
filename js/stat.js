'use strict';

var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var COLOR_BLACK = '#000000';
var GAP = 10;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var barHeight = 0;
var barWidth = CLOUD_X + TEXT_WIDTH;

var getColors = function () {
  // решил менять прозрачность таким образом
  var val = (Math.round(Math.random() * 10)) / 10;
  if (val === 0) {
    val = 0.1;
  }
  return 'rgba(0, 0, 255, ' + val + ')';
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
    cordX = cordX + cords[i].x;
    cordY += cords[i].y;
    ctx.lineTo(cordX, cordY);
  }
  ctx.closePath();
  ctx.fill();
};

var renderStatsBar = function (ctx, names, times) {
  var maxTime = getMaxTime(times);
  var colors = [];
  for (var i = 0; i < names.length; i++) {
    var barHeightMax = 150;
    // высота каждого прямоугольника
    barHeight = Math.round(times[i] * barHeightMax / maxTime);

    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText(names[i], barWidth + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 3);

    // проверка на повторяющийся цвет(больше в голову ничего не пришло, а эта работает)
    while (colors) {
      var color = getColors();
      if (colors.indexOf(color) === -1) {
        colors[i] = color;
        break;
      }
    }
    // если есть 'Вы' - то рисуем и пропускаем цикл, чтобы еще раз не прорисовывать под этим рисунком одну копию себя
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(barWidth + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 4, BAR_WIDTH, -barHeight);

      ctx.fillStyle = COLOR_BLACK;
      ctx.fillText(Math.round(times[i]), barWidth + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 6 - barHeight);
      continue;
    }
    ctx.fillStyle = colors[i];
    ctx.fillRect(barWidth + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 4, BAR_WIDTH, -barHeight);

    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText(Math.round(times[i]), barWidth + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 6 - barHeight);
  }
};

window.renderStatistics = function (ctx, names, times) {

  getCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  getCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = COLOR_BLACK;
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP + 5); // цифра 5 - небольшая поправка 10 - много, 0 - мало
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3 + 5);

  renderStatsBar(ctx, names, times);
};
