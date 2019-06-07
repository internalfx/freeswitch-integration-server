
let substruct = require('@internalfx/substruct')

module.exports = function (config) {
  let nuxt = substruct.services.nuxt

  return async function (ctx, next) {
    ctx.status = 200

    await new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, function (promise) {
        promise.then(resolve).catch(reject)
      })
    })

    await next()
  }
}
