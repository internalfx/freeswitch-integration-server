
// General Configuration
//
// options in this file are overidden by keys in environment specific files. e.g. dev.js or prod.js

module.exports = {
  middleware: [
    'performance',
    'body',
    'httpError',
    'session',
    'router',
    'nuxtRender'
  ],
  port: 8000,
  services: [
    'nuxt'
  ],
  session: {
    sessionCookieName: 'x-fsis-token',
    sessionCookieMaxAge: 1000 * 60 * 60 * 24 * 365,
    load: function (token) {
      // console.log('You need to define a config.session.load function!')
      return null
    },
    save: function (token, data) {
      // console.log('You need to define a config.session.save function!')
      return null
    }
  },
  templateEngine: 'ejs'
}
