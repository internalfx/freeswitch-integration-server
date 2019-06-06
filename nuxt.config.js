
// let config = require('config')
// let baseURL = config.get('baseURL')

console.log(`NODE_ENV = ${process.env.NODE_ENV}`)

module.exports = {
  build: {
    extend: function (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.devtool = 'inline-source-map'
      }
    },
    extractCSS: true
  }
}
