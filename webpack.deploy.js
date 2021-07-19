/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'deploy',
  output: {
    // Tweak this to match your GitHub project name
    publicPath: '/restaurant-apps/',

  },
});
