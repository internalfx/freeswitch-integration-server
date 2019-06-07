let substruct = require('@internalfx/substruct')
let config = substruct.config

module.exports = {
  // HOME PAGE
  login: async function (ctx) {
    let { password } = ctx.request.body

    if (password === config.fsis.password) {
      ctx.state.session.loggedIn = true
    }

    ctx.body = {
      token: ctx.state.token
    }
  },

  logout: async function (ctx) {
    ctx.state.session = {}
    ctx.body = {}
  },

  user: async function (ctx) {
    let response = {}

    if (ctx.state.session.loggedIn === true) {
      response = {
        user: {
          name: 'Admin'
        }
      }
    }

    ctx.body = response
  }
}
