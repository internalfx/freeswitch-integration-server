
let { gql } = require('apollo-server-koa')
let requireAll = require('require-all')
let path = require('path')
let _ = require('lodash')

let keyPrefix = '=-_-='

let collapse = function (obj, depth) {
  let output = {}
  depth = depth || []
  for (let [key, val] of Object.entries(obj)) {
    let hasPrefix = false
    if (key.includes(keyPrefix)) {
      key = key.replace(keyPrefix, '')
      hasPrefix = true
    }

    if (hasPrefix) {
      if (_.isFunction(val) || _.isString(val) || _.isArray(val) || _.isBoolean(val)) {
        Object.assign(output, { [depth.concat([key]).join('.')]: val })
      } else if (_.isObject(val)) {
        Object.assign(output, collapse(val, depth.concat([key])))
      }
    } else {
      Object.assign(output, { [depth.concat([key]).join('.')]: val })
    }
  }
  return output
}

let libs = collapse(requireAll({
  dirname: path.join(__dirname, 'schema'),
  filter: /(.+)\.js$/,
  recursive: true,
  map: function (name, path) {
    if (path.includes('.js')) {
      return name
    } else {
      return keyPrefix + name
    }
  }
}))

let typeDef = gql`
  type Query {
    me: String
  }

  type Mutation {
    me: String
  }
`

let resolver = {
  Query: {
  }
}

let typeDefsList = [
  typeDef,
  ...Object.values(libs).map(lib => lib.typeDefs)
]
let resolverList = [
  resolver,
  ...Object.values(libs).map(lib => lib.resolvers)
]

let schema = {
  typeDefs: typeDefsList,
  resolvers: _.merge(...resolverList)
}

module.exports = schema
