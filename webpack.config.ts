import path from 'path';
import {compact} from 'lodash';
import {NamedModulesPlugin, HotModuleReplacementPlugin, LoaderOptionsPlugin, DefinePlugin} from 'webpack';
import {rootDOMNodeId} from './src/config/vars';
import {BuildOptions} from './src/config/configConsts';
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackStrip = require('webpack-strip');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const featureSwitches = require('./featureToggles');

export const rootFolder = __dirname;
export const srcFolder = path.resolve(rootFolder, 'src');
export const entriesFolder = path.resolve(srcFolder, 'entries');

const assetFolder = 'assets';

const features_env_index = process.argv.indexOf('--env.environment');
const features_env = process.argv[features_env_index + 1];

export async function createWebpackConfig(additionalOptions: Partial<BuildOptions> = {}) {
  const options: BuildOptions = {
    ...new BuildOptions(),
    ...additionalOptions,
  };

  const filePattern = (name = '[name]', ext = '[ext]', asset = true) => {
    const namePattern = `${name}${options.hash ? '.[hash:6]' : ''}.${ext}`;
    return asset ? `${assetFolder}/${namePattern}` : namePattern;
  };

  const fileLoader = {
    loader: 'file-loader',
    options: {
      name: filePattern(),
      emitFile: true,
    },
  };

  const stripLoader = {
    loader: WebpackStrip.loader('console.log', 'console.error', 'console.warn'),
  };

  const config: any = {
    // What code to build and where to put it
    entry: compact([
      path.resolve(srcFolder, 'polyfills'),
      options.hmr && 'react-hot-loader/patch',
      absOrPrefix(options.entry, entriesFolder),
    ]),
    output: {
      path: absOrPrefix(options.outputFolder, rootFolder),
      filename: '[name].[hash].js',
      publicPath: '/',
    },

    // Most webpack configs are controlled by our options
    mode: 'none',
    stats: {errorDetails: true},
    cache: options.cache,
    devtool: options.sourceMaps ? 'source-map' : undefined,

    // Determine which extensions to lazy-load and how to look for sources
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [srcFolder, 'node_modules'],
    },

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    // Teach webpack how to load various modules
    module: {
      rules: [
        {test: /\.pug$/, use: 'pug-loader'},
        {
          test: /\.(ts|tsx|js|jsx)$/,
          use: options.environment === 'demo' ? [stripLoader] : [],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [fileLoader],
        },
        {
          include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules/@material-ui')],
          test: /\.(tsx?|jsx?)$/,
          loader: 'babel-loader',
        },
        {
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre',
        },
        {
          test: /\.png$/,
          use: [fileLoader],
        },
        {
          test: /\.ico$/,
          use: [fileLoader],
        },
        {
          test: /\.svg$/,
          use: [fileLoader],
        },
        {
          test: /\.jpg$/,
          use: [fileLoader],
        },
        {
          test: /\.(gif)$/,
          use: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: compact([
      // Generates an index.html with links for all scripts and assets bundled.
      options.index &&
        new HtmlWebpackPlugin({
          rootDOMNodeId,
          buildOptions: options,
          filename: 'index.html',
          template: path.resolve(entriesFolder, 'index.pug'),
        }),
      // Define environments
      new DefinePlugin({
        'process.env': {
          ...featureSwitches[features_env],
        },
        'process.env.BUILD_OPTIONS': JSON.stringify(options),
        'process.env.NODE_ENV': JSON.stringify(options.environment),
      }),
      new FaviconsWebpackPlugin({
        logo: './src/assets/icons/favicon/favicon-32x32.png',
        persistentCache: true,
        inject: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          opengraph: false,
          twitter: false,
          yandex: false,
          windows: false,
        },
      }),

      // Optional features
      options.hmr && new NamedModulesPlugin(),
      options.hmr && new HotModuleReplacementPlugin(),
      options.debug && new LoaderOptionsPlugin({debug: true}),
      options.analyzeBundles && new BundleAnalyzerPlugin({analyzerMode: 'static'}),
      options.minify &&
        new UglifyJsPlugin({
          test: /\.js$/,
          parallel: true,
          sourceMap: options.sourceMaps,
          compress: {
            drop_console: options.environment === 'demo',
          },
        }),
      options.friendly && new FriendlyErrorsWebpackPlugin(),
    ]),
    devServer: {
      historyApiFallback: true,
    },
  };

  return config;
}

export default createWebpackConfig; // tslint:disable-line

function absOrPrefix(p: string, prefix: string) {
  return path.isAbsolute(p) ? p : path.join(prefix, p);
}
