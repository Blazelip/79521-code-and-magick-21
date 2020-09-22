'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_COLOR = `#ffffff`;
const CLOUD_SHADOW_COLOR = `rgba(0, 0, 0, 0.7)`;
const CLOUD_START_X = 100;
const CLOUD_START_Y = 10;

const BAR_MAX_HEIGHT = 150;
const BAR_WIDTH = 40;
const BAR_OWN_COLOR = `rgba(255, 0, 0, 1)`;

const GAP = 20;
const GAP_BAR = 50;
const GAP_SHADOW = 10;
const GAP_NICKNAME = 10;
const GAP_CHART = 40;

const TEXT_CONGRAT = `Ура вы победили!`;
const TEXT_ANNOUNCE_RESULTS = `Список результатов:`;

const FONT_SIZE = 16;
const FONT_COLOR = `#000000`;
const LINE_HEIGHT = 20;


const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

const getBarColor = function (player) {
  return (player === `Вы`) ? BAR_OWN_COLOR : `hsl(240, ${Math.round(Math.random() * 100)}%, 50%)`;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_START_X + GAP_SHADOW, CLOUD_START_Y + GAP_SHADOW, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_START_X, CLOUD_START_Y, CLOUD_COLOR);

  ctx.font = `${FONT_SIZE}px PT Mono`;
  ctx.fillStyle = FONT_COLOR;
  ctx.textBaseline = `hanging`;
  ctx.fillText(TEXT_CONGRAT, CLOUD_START_X + GAP, CLOUD_START_Y + GAP);
  ctx.fillText(TEXT_ANNOUNCE_RESULTS, CLOUD_START_X + GAP, CLOUD_START_Y + GAP + LINE_HEIGHT);

  const maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    const currentPosX = CLOUD_START_X + GAP_CHART + (BAR_WIDTH + GAP_BAR) * i;
    const currentBarHeight = times[i] * BAR_MAX_HEIGHT / maxTime;

    ctx.fillStyle = FONT_COLOR;
    ctx.fillText(players[i], currentPosX, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), currentPosX, CLOUD_HEIGHT - GAP - currentBarHeight - GAP_NICKNAME * 3);

    ctx.fillStyle = getBarColor(players[i]);
    ctx.fillRect(currentPosX, CLOUD_HEIGHT - GAP - GAP_NICKNAME, BAR_WIDTH, -currentBarHeight);
  }
};
