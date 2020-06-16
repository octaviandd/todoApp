/** @format */

const webpackBundleAnalyzer = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = () => ({
  plugin: [new webpackBundleAnalyzer()],
});
