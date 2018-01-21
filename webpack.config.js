const path = require('path');
const Nodemon = require('nodemon-webpack-plugin');

const OUT_DIR = path.join(__dirname, 'dist');

module.exports = {
  entry: {
    constituencyService: './constituencyService/app.ts'
  },
  target: 'node',
  externals: [
    /^[a-z\-0-9]+$/
  ],
  output: {
    filename: 'constituencyService.js',
    path: OUT_DIR,
    libraryTarget: "commonjs"
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      'node_modules'
    ]
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [
        {
            loader: 'ts-loader',
        }
      ]
    }]
  },
  plugins: [
    new Nodemon({
      watch: OUT_DIR,
      verbose: true,
      script: `${OUT_DIR}/constituencyService.js`
    })
  ]
};