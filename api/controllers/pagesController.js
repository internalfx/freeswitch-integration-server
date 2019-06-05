module.exports = {
  // HOME PAGE
  index: async function (ctx) {
    ctx.body = await ctx.render('index.ejs')
  }
}
