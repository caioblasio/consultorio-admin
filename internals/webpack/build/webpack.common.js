const { BannerPlugin, DefinePlugin, ProvidePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('../../scripts/utils/dotenv')

const __root = process.cwd()
const pkg = require(`${__root}/package.json`)

const BANNER_METADATA = [
  '/*!',
  ` * ${pkg.name} - ${pkg.description}`,
  ` * @version v${pkg.version}`,
  ` * @link ${pkg.homepage}`,
  ` * @license ${pkg.license}`,
  ' */',
].join('\n')

module.exports = {
  entry: {
    src: `${__root}/app/index`,
  },
  output: {
    path: `${__root}/dist`,
    filename: '[name].js',
    publicPath: '/',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(eot|otf|ttf|woff2?|jpe?g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'media',
        },
      },
    ],
  },
  resolve: {
    modules: [`${__root}/app`, 'node_modules'],
    extensions: ['.jsx', '.js'],
    fallback: {
      process: require.resolve('process/browser'),
      zlib: require.resolve('browserify-zlib'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util'),
      buffer: require.resolve('buffer'),
      assert: require.resolve('assert'),
    },
  },
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
    new BannerPlugin({
      banner: BANNER_METADATA,
      raw: true,
      entryOnly: true,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
      favicon: `${__root}/public/favicon.ico`,
    }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ],
}
