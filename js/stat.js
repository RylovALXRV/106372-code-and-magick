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

var getMaxTime = function (arr) {
  var max = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};

var getCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 300, y + 20);
  ctx.lineTo(x + 420, y);
  ctx.lineTo(x + 400, y + 190);
  ctx.lineTo(x + 420, y + 270);
  ctx.lineTo(x + 120, y + 250);
  ctx.lineTo(x, y + 270);
  ctx.lineTo(x + 20, y + 80);
  ctx.lineTo(x, y);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

window.renderStatistics = function (ctx, names, times) {

  getCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  getCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');


  var maxTime = getMaxTime(times);

  ctx.fillStyle = COLOR_BLACK;
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 2);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 4);

  for (var i = 0; i < names.length; i++) {
    // высота каждого прямоугольника
    barHeight = Math.round(times[i] * 100 / maxTime);

    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText(names[i], barWidth + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 3);

    // если есть я - то рисуем и пропускаем цикл, чтобы еще раз не прорисовывать под этим рисунком копию
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(barWidth + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 4, BAR_WIDTH, -barHeight);

      ctx.fillStyle = COLOR_BLACK;
      ctx.fillText(Math.round(times[i]), barWidth + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 6 - barHeight);
      continue;
    }
    ctx.fillStyle = getColors();
    ctx.fillRect(barWidth + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 4, BAR_WIDTH, -barHeight);

    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText(Math.round(times[i]), barWidth + (TEXT_WIDTH + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 6 - barHeight);
  }

};
