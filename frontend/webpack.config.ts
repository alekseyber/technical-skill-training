import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
import HtmlMinimizerPlugin from 'html-minimizer-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { Configuration, RuleSetUseItem } from 'webpack';
// eslint-disable-next-line import/default
import CopyPlugin from 'copy-webpack-plugin';
import type { Configuration as ConfigurationWDS } from 'webpack-dev-server';

const isDev = process.env.NODE_ENV === 'development';

const imagesCopyWebpack: string[] = ['favicon-32x32.png', 'favicon-16x16.png', 'apple-touch-icon.png'];

const cssLoaders = (extra?: string): RuleSetUseItem[] => {
  const loaders: RuleSetUseItem[] = [
    MiniCssExtractPlugin.loader,
    { loader: 'css-loader', options: { sourceMap: isDev } },
  ];

  if (extra) {
    loaders.push({
      loader: extra,
      options: { sourceMap: isDev },
    });
  }

  return loaders;
};

const filename = (ext: string | undefined) => `[name].${ext}`;

const devServer: ConfigurationWDS = {
  port: 3000,
  hot: true,
  open: true,
  compress: true,
  allowedHosts: 'all',
  static: {
    directory: path.join(__dirname, 'public'),
  },
  historyApiFallback: true,
};

const config: Configuration = {
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: filename('js'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 200000,
    },
    minimize: true,
    minimizer: [new HtmlMinimizerPlugin()],
  },
  devServer,
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/i,
        use: cssLoaders('sass-loader'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        ...imagesCopyWebpack.map((item) => ({
          from: path.resolve(__dirname, 'public', item),
          to: path.resolve(__dirname, 'build'),
        })),
        {
          from: path.resolve(__dirname, 'public', 'images'),
          to: path.resolve(__dirname, 'build', 'images'),
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: ['./src/**/*.{ts,tsx,js,jsx}', './src/**/**/*.{ts,tsx,js,jsx}'],
      },
    }),
    new StylelintPlugin(),
  ],
};

export default config;
