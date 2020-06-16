/** @format */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");
const presetConfig = require("./build-utils/loadPresets");
// const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env);
const webpack = require("webpack");

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge(
    {
      mode,
      entry: "./src/main.js",
      output: {
        filename: "bundle.js",
      },
      module: {
        rules: [
          {
            test: /\.sass$/,
            use: ["sass-loader", "css-loader", "style-loader"],
          },
        ],
      },
      plugins: [new HtmlWebpackPlugin(), new webpack.ProgressPlugin()],
    },
    // modeConfig(mode),
    presetConfig({ mode, presets })
  );
};
