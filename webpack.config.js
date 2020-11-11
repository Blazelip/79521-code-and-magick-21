const path = require(`path`);

module.exports = {
  entry: [
    `./js/game.js`,
    `./js/util.js`,
    `./js/backend.js`,
    `./js/modal.js`,
    `./js/stat.js`,
    `./js/similar.js`,
    `./js/customize.js`,
    `./js/render.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false,
  devServer: {
    open: true,
    compress: true,
    port: 8080
  }
};
