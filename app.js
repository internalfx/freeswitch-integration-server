let argv = require('minimist')(process.argv.slice(2))
let pjson = require('./package.json')
let substruct = require('@internalfx/substruct')
let path = require('path')
let config = null
let HELPTEXT = `
    FreeSWITCH Integration Server v${pjson.version}

    OPTIONS
    ===============================
    --config      Specify path to config file, if not specified FSIS
                  will look for config.js in current working directory.
`

let main = async function () {
  if (argv.help) {
    console.log(HELPTEXT)
    return
  }

  let configPath = argv.config ? argv.config : './config.js'

  configPath = path.join(process.cwd(), configPath)

  try {
    config = require(configPath)
  } catch (err) {
    console.log('CONFIG FILE NOT FOUND! ======================')
    throw err
  }

  config.runDir = process.cwd()
  config.appDir = __dirname

  substruct.configure(config)

  substruct.start().then(async function ({ koa, config }) {
    console.log('Server Started...')
  }).catch(function (err) {
    console.error(err.stack)
  })
}

main().catch(function (err) {
  console.log(err)
})
