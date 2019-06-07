
let { GraphQLScalarType } = require('graphql')
let { gql } = require('apollo-server-koa')
let _ = require('lodash')

let typeDefs = gql`
  scalar JSON
`

let resolvers = {
  JSON: new GraphQLScalarType({
    name: 'JSON',
    description: 'JSON Data',
    parseValue: function (value) {
      let result = null

      if (value != null) {
        if (_.isPlainObject(value)) {
          result = value
        } else if (_.isString(value)) {
          result = JSON.parse(value)
        }
      }

      return result
    },
    serialize: function (value) {
      let result = null

      if (value != null && _.isPlainObject(value)) {
        result = value
      }

      return result
    },
    parseLiteral: function (ast) {
      console.log(ast)
      // if (ast.kind === Kind.INT) {
      //   return parseInt(ast.value, 10)
      // }
      return null
    }
  })
}

module.exports = {
  typeDefs,
  resolvers
}
