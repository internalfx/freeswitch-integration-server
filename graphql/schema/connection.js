
// let _ = require('lodash')
// let streamPromise = require('stream-to-promise')
// let Writable = require('stream').Writable
// let moment = require('moment')
let { uniqueId } = require('../../lib/utils.js')
let { gql } = require('apollo-server-koa')

let typeDefs = gql`
  type Connection {
    _id: ID
    title: String
    accessToken: String
  }

  extend type Query {
    allConnections: [Connection]
  }

  extend type Mutation {
    createConnection (title: String!): Connection
  }
`

let resolvers = {
  Query: {
    allConnections: async function (obj, args, ctx, info) {
      return ctx.nedb.connections.find({})
    }
  },
  Mutation: {
    createConnection: async function (obj, args, ctx, info) {
      let data = {
        title: args.title,
        accessToken: uniqueId(40)
      }
      let connection = await ctx.nedb.connections.insert(data)
      return connection
    }
  },
  Connection: {
  }
}

module.exports = {
  typeDefs,
  resolvers
}
