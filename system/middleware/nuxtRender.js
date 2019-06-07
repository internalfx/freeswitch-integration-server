
let substruct = require('@internalfx/substruct')

module.exports = function (config) {
  let nuxt = substruct.services.nuxt

  return async function (ctx, next) {
    // console.log(ctx.status)
    if (ctx.status === 404) {
      ctx.status = 200

      await new Promise((resolve, reject) => {
        ctx.res.on('close', resolve)
        ctx.res.on('finish', resolve)
        ctx.res.on('error', reject)
        nuxt.render(ctx.req, ctx.res)
      })
    }

    await next()
  }
}
