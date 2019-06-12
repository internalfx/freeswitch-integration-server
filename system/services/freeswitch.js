
let substruct = require('@internalfx/substruct')

let esl = require('modesl')
let requireAll = require('require-all')


let fsEventList = require('../../lib/fsEvents.js').default

let del = require('del')
let fs = require('fs')
let path = require('path')
let sox = require('sox.js')
let rp = require('request-promise')

module.exports = async function (config) {
  let conn
  let fsConf = config.fsis.freeswitch
  let nedb = substruct.services.nedb
  let eventHandlers = requireAll({
    dirname: path.join(config.sysDir, 'fsEventHandlers')
  })

  let connect = function () {
    console.log('ESL::Trying to connect to FreeSwitch...')
    conn = new esl.Connection(fsConf.host, fsConf.port, fsConf.password, onConnect)

    conn.on('error', function () {
      console.log('ESL::ERROR ===============================')
      setTimeout(connect, 5000)
    })
  }

  let onConnect = async function () {
    console.log('ESL::Connected to freeswitch...')

    conn.subscribe([
      'CHANNEL_HANGUP_COMPLETE'
    ])

    conn.on('esl::end', function () {
      console.log('ESL::END ===============================')
      connect()
    })

    let webhooks = await nedb.webhooks.find({})

    for (let webhook of webhooks) {
      console.log(webhook)
      let fsEvent = fsEventList.find(function (item) {
        return item.handler === webhook.event
      })
      let eventHandler = eventHandlers[fsEvent.handler]

      conn.on(fsEvent.event, function (evt) {
        eventHandler(evt, webhook)
      })
    }
  }

  connect()

  return {
    connect
  }
}
