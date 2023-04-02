import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config = {
  name: 'production',
  target: 'node',
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    library: 'jsonscribe',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        use: 'ts-loader',
        include: path.resolve(__dirname, './src'),
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: ['node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: false,
  },
};

export default config;
