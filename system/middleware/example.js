// The application config is passed in
module.exports = function (config) {
  // Must return an async function with the following signature
  return async function (ctx, next) {
    console.time(`REQUEST TIME: ${ctx.request.url}`)
    await next()
    console.timeEnd(`REQUEST TIME: ${ctx.request.url}`)
  }
}
