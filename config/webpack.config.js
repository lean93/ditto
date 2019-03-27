const CompressionPlugin = require("compression-webpack-plugin")

const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      }
    ],
    
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'prop-types': {
       commonjs: 'prop-types',
       commonjs2: 'prop-types',
       amd: 'PropTypes',
       root: 'PropTypes',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'prop-types': path.resolve(
        __dirname, 
        './node_modules/prop-types'
      ),
      'styled-components': path.resolve(
        __dirname,
        './node_modules/styled-components'
      ),
    },
  },
  plugins: [
    new CompressionPlugin({
        asset: "[path].gz[query]",
        test: /\.js$|\.css$|\.html$/,
        minRatio: 0.8
    })
    ]
}
