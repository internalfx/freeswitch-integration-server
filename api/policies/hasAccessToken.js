
let substruct = require('@internalfx/substruct')

module.exports = async function (ctx) {
  let config = substruct.config
  let nedb = substruct.services.nedb
  let headerToken = ctx.request.headers[config.session.sessionCookieName]
  let connection = await nedb.connections.findOne({ accessToken: headerToken })

  if (connection == null) { // Check if user is logged in somehow
    ctx.throw(403) // Throw error if false
    return
  }

  return true // Return true to allow controller method to execute.
}
