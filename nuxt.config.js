
let path = require('path')

module.exports = {
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
        },
        tokenType: false
      }
    },
    token: {
      prefix: 'fsis.'
    },
    localStorage: false,
    rewriteRedirects: true,
    fullPathRedirect: true
  },
  axios: {},
  build: {
    extend: function (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.devtool = 'inline-source-map'
      }
    },
    extractCSS: true
  },
  env: {},
  css: [
    '../node_modules/vuetify/dist/vuetify.css',
    '@/assets/application.scss'
  ],
  // mode: 'spa',
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  // modulesDir: ['../node_modules'],
  plugins: [
    // 'plugins/decycle.js',
    // 'plugins/vee-validate.js',
    'plugins/vuetify.js'
    // 'plugins/startup.js',
    // 'plugins/graphClient.js'
  ],
  rootDir: path.join(__dirname),
  router: {
    middleware: [
      'auth'
    ]
  },
  srcDir: path.join(__dirname, 'client')
}
