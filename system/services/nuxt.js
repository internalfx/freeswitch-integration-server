// The application config is passed in.
module.exports = async function (config) {
  let { Nuxt, Builder } = require('nuxt')
  let nuxtConfig = require('../../nuxt.config.js')

  // Config Overrides
  nuxtConfig.dev = (config.env !== 'production')

  let nuxt = new Nuxt(nuxtConfig)

  if (nuxt.options.dev) {
    new Builder(nuxt).build()
  }

  return nuxt
}
