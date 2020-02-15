const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread','@babel/plugin-proposal-class-properties']
          }
        }
      }
    ],
  }
<<<<<<< HEAD
  
};
=======
};
>>>>>>> 2dc636e8615d563a1000eb5f40a7523bb961425c
