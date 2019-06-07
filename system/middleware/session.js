
let hash = require('object-hash')
let crypto = require('crypto')
let substruct = require('@internalfx/substruct')

const createToken = function (length) {
  let chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let charLength = chars.length
  let bytes = Array.from(crypto.randomBytes(length))

  let value = bytes.map(function (byte) {
    return chars[byte % charLength]
  })

  return value.join('')
}

module.exports = function (config) {
  let cookieName = config.session.sessionCookieName

  return async function (ctx, next) {
    let token
    let { sessions } = substruct.services.nedb

    token = ctx.cookies.get(cookieName)

    if (token == null || token.length < 40) {
      token = createToken(40)
      // ctx.cookies.set(cookieName, token, { maxAge: config.session.sessionCookieMaxAge })
    }

    let sessionRecord = await sessions.findOne({ token })
    ctx.state.session = sessionRecord ? sessionRecord.data : {}
    ctx.state.token = token

    let prevSession = hash(ctx.state.session)

    await next()

    let nextSession = hash(ctx.state.session)

    if (nextSession !== prevSession) {
      let record = await sessions.findOne({ token })

      if (record) {
        await sessions.update({ token }, { $set: { data: ctx.state.session, action: 'update' } })
      } else {
        await sessions.insert({ data: ctx.state.session, token, action: 'insert' })
      }
    }
  }
}
