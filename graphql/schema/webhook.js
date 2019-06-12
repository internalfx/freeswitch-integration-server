
// let _ = require('lodash')
// let streamPromise = require('stream-to-promise')
// let Writable = require('stream').Writable
// let moment = require('moment')
let { uniqueId } = require('../../lib/utils.js')
let { gql } = require('apollo-server-koa')

let typeDefs = gql`
  type Webhook {
    _id: ID
    url: String
    event: String
    headers: JSON
    settings: JSON
    createdAt: DateTime
    updatedAt: DateTime
  }

  input WebhookInput {
    _id: ID
    url: String!
    event: String!
    headers: JSON
    settings: JSON
  }

  extend type Query {
    allWebhooks: [Webhook]
    getWebhook (_id: ID!): Webhook
  }

  extend type Mutation {
    createWebhook (title: String!): Webhook
    deleteWebhook (_id: ID!): Boolean
    upsertWebhook (webhook: WebhookInput!): Webhook
    resetWebhook (_id: ID!): Boolean
  }
`

let resolvers = {
  Query: {
    allWebhooks: async function (obj, args, ctx, info) {
      return ctx.nedb.webhooks.find({})
    },
    getWebhook: async function (obj, args, ctx, info) {
      return ctx.nedb.webhooks.findOne({ _id: args._id })
    }
  },
  Mutation: {
    upsertWebhook: async function (obj, args, ctx, info) {
      let webhook = args.webhook

      if (webhook._id == null) {
        webhook = await ctx.nedb.webhooks.insert(webhook)
      } else {
        await ctx.nedb.webhooks.update({ _id: webhook._id }, webhook)
        webhook = ctx.nedb.webhooks.findOne({ _id: webhook._id })
      }

      ctx.freeswitch.connect()

      return webhook
    },
    createWebhook: async function (obj, args, ctx, info) {
      let data = {
        title: args.title,
        accessToken: uniqueId(40)
      }
      let connection = await ctx.nedb.webhooks.insert(data)
      return connection
    },
    deleteWebhook: async function (obj, args, ctx, info) {
      await ctx.nedb.webhooks.remove({ _id: args._id })
      return true
    },
    resetWebhook: async function (obj, args, ctx, info) {
      await ctx.nedb.webhooks.update({ _id: args._id }, { $set: { accessToken: uniqueId(40) } })
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
