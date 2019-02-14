const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = {
  entry: path.join(__dirname, "./text.js"),
  mode: 'production',
  output: {
    path: __dirname,
    filename: 'text.min.js',
    library: pkg.name,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-native': path.resolve(__dirname, './node_modules/react-native')
    }
  },
  externals: {
    // Don't bundle react
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    'react-native': {
      commonjs: "react-native",
      commonjs2: "react-native",
      amd: "ReactNative",
      root: "ReactNative"
    }
  }
};
