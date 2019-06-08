
// let substruct = require('@internalfx/substruct')
let Collection = require('nedb')
let Promise = require('bluebird')
let path = require('path')

module.exports = async function (config) {
  let nedb = {}
  let collectionList = [
    'connections',
    'sessions'
  ]

  for (let collection of collectionList) {
    nedb[collection] = new Collection({
      filename: path.join(config.runDir, `data_${collection}`),
      autoload: true,
      timestampData: true
    })
  }

  for (let key of Object.keys(nedb)) {
    let collection = nedb[key]
    collection.persistence.setAutocompactionInterval(1000 * 60 * 15)

    for (let method of ['insert', 'update', 'count', 'remove', 'ensureIndex']) {
      collection[method] = Promise.promisify(collection[method])
    }

    collection._findOld = collection.find
    collection._findOneOld = collection.findOne

    collection.find = Promise.promisify(collection._findOld)
    collection.findOne = Promise.promisify(collection._findOneOld)

    collection.findCursor = function (...args) {
      let cursor = collection._findOld(...args)
      cursor.exec = Promise.promisify(cursor.exec)
      return cursor
    }
  }

  return nedb
}
