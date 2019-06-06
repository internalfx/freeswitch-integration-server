
// let config = require('config')
// let baseURL = config.get('baseURL')
let path = require('path')

console.log(`NODE_ENV = ${process.env.NODE_ENV}`)

module.exports = {
  build: {
    extend: function (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.devtool = 'inline-source-map'
      }
    },
    extractCSS: true
  },
  rootDir: __dirname,
  srcDir: path.join(__dirname, 'client')
}
