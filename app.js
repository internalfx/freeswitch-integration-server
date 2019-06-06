let argv = require('minimist')(process.argv.slice(2))
let substruct = require('@internalfx/substruct')

console.log(__dirname)

substruct.configure({ appDir: __dirname })

substruct.start().then(async function ({ koa, config }) {
  console.log('Server Started...')
}).catch(function (err) {
  console.error(err.stack)
})