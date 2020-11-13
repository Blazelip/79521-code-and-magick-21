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
    `./js/render.js`,
    `./js/avatar.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: `source-map`,
  devServer: {
    hot: true,
    open: true,
    compress: true,
    port: 8080
  }
};
