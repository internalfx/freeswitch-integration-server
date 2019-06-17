// The application config is passed in.
module.exports = async function (config) {
  let { Nuxt, Builder } = require('nuxt')
  let nuxtConfig = require('../../nuxt.config.js')

  // Config Overrides
  nuxtConfig.dev = (config.env !== 'production')
  nuxtConfig.axios.baseURL = config.fsis.baseURL
  nuxtConfig.apollo.clientConfigs.default.httpEndpoint = `${config.fsis.baseURL}/api/graphql`

  // console.dir(nuxtConfig, { depth: null })

  let nuxt = new Nuxt(nuxtConfig)

  // if (nuxt.options.dev || config.buildNuxt) {
  new Builder(nuxt).build()
  // }

  return nuxt
}
