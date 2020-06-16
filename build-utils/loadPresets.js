/** @format */

const webpackMerge = require("webpack-merge");

const applyPresets = (env = { presets: [] }) => {
  const { presets } = env;
  const mergedPresets = [].concat([...presets]);
  mergedPresets.map((preset) => require(`./presets/webpack.${preset}`)(env));

  return webpackMerge({}, ...mergedPresets);
};

module.exports = applyPresets;
