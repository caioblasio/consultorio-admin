const merge = require("webpack-merge");
const TerserJSPlugin = require("terser-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserJSPlugin()]
  }
});
