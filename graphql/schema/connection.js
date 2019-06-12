
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
    createdAt: DateTime
    updatedAt: DateTime
  }

  extend type Query {
    allConnections: [Connection]
  }

  extend type Mutation {
    createConnection (title: String!): Connection
    deleteConnection (_id: ID!): Boolean
    resetConnection (_id: ID!): Boolean
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
    },
    deleteConnection: async function (obj, args, ctx, info) {
      await ctx.nedb.connections.remove({ _id: args._id })
      return true
    },
    resetConnection: async function (obj, args, ctx, info) {
      await ctx.nedb.connections.update({ _id: args._id }, { $set: { accessToken: uniqueId(40) } })
      return true
    }
  },
  Connection: {
  }
}

module.exports = {
  typeDefs,
  resolvers
}
