'use strict';

const CLOUD_WIDTH = 420; // Ширина модалки
const CLOUD_HEIGHT = 270; // Высота модалки
const CLOUD_START_X = 100; // Точка отсчета в канвасе для модалки по X
const CLOUD_START_Y = 10; // Точка отсчета в канвасе для модалки по Y
const MAX_BAR_HEIGHT = 150; // Максимальная высота колонки
const BAR_WIDTH = 40; // Ширина колонки
const COLUMN_GAP = 50; // Отступ между колонками
const SHADOW_GAP = 10; // Отступ для отбрасывания тени
const GAP = 20; // Padding от границ до текста
const LINE_HEIGHT = 20; // Интервал между строками текста
const NICKNAME_GAP = 10; // Отступ от верхушки никнейма до графика
const CHART_PADDING = 40; // Отступ от края до первого графика

let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

let getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_START_X + SHADOW_GAP, CLOUD_START_Y + SHADOW_GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_START_X, CLOUD_START_Y, `#ffffff`);

  ctx.font = `16px PT Mono`;
  ctx.fillStyle = `#000000`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(`Ура вы победили!`, CLOUD_START_X + GAP, CLOUD_START_Y + GAP);
  ctx.fillText(`Список результатов:`, CLOUD_START_X + GAP, CLOUD_START_Y + GAP + LINE_HEIGHT);

  let maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    ctx.fillText(players[i], CLOUD_START_X + CHART_PADDING + (BAR_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - GAP);

    if (players[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      ctx.fillStyle = `hsl(240, ${Math.round(Math.random() * (88 - 12) + 12)}%, 50%)`;
    }
    ctx.fillRect(CLOUD_START_X + CHART_PADDING + (BAR_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - GAP - NICKNAME_GAP, BAR_WIDTH, -times[i] * MAX_BAR_HEIGHT / maxTime);

    ctx.fillStyle = `#000000`;
    ctx.fillText(Math.round(times[i]), CLOUD_START_X + CHART_PADDING + (BAR_WIDTH + COLUMN_GAP) * i, CLOUD_HEIGHT - GAP - NICKNAME_GAP - times[i] * MAX_BAR_HEIGHT / maxTime - NICKNAME_GAP * 2);
  }
};
