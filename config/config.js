
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
    'nuxt',
    'nedb',
    'freeswitch'
  ],
  session: {
    sessionCookieName: 'auth.fsis.local',
    sessionCookieMaxAge: 1000 * 60 * 60 * 24 * 365
  }
}
