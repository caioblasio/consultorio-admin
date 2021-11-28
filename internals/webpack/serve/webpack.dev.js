const { merge } = require('webpack-merge')
const build = require('../build/webpack.dev')

const PORT = 3001

module.exports = merge(build, {
  devServer: {
    public: `localhost:${PORT}`,
    host: '0.0.0.0',
    port: PORT,
    contentBase: 'dist/',
    writeToDisk: true,
    open: true,
    publicPath: '/',
    historyApiFallback: true,
  },
})
