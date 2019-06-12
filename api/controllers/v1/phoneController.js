
let substruct = require('@internalfx/substruct')
let freeswitch = substruct.services.freeswitch

module.exports = {
  originate: async function (ctx) {
    let body = ctx.request.body || {}

    await freeswitch.originate(body.userExt, body.destination)

    ctx.body = { success: true }
  }
}
