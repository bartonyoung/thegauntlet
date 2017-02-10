let webpack = require('webpack');
let path = require('path');
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');

let BUILD_DIR = path.resolve(__dirname, 'client/public');
let APP_DIR = path.resolve(__dirname, 'client/src');

let config = {
  entry: `${APP_DIR  }/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        query:
        {
          presets: ['react'],
        },
      },
      {
        test: /\.css?/,
        include: APP_DIR,
        loader: 'style-loader!css-loader',
      },
    ],
  },

  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: '3000',
      proxy: 'http://localhost:8000/',
    },

      {
        reload: true
      }

   )
  ]

};     
module.exports = config;

