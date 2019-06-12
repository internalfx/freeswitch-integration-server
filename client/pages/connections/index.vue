
<script>
import { mapActions } from 'vuex'
import gql from 'graphql-tag'
import { to } from '../../../lib/utils.js'

export default {
  apollo: {
    connections: {
      query: gql`
        query allConnections {
          connections: allConnections {
            _id
            title
            accessToken
            createdAt
          }
        }
      `,
      variables: function () {
        return {}
      },
      fetchPolicy: 'cache-and-network'
    }
  },
  data: function () {
    return {
      inFlight: false,
      breadcrumbs: [
        { text: 'Home', to: '/', exact: true },
        { text: 'Connections', to: '/connections', exact: true }
      ],
      headers: [
        { text: 'Title', value: 'title' },
        { text: 'Access Token', value: 'accessToken' },
        { text: 'Created At', value: 'createdAt' }
      ]
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'showConfirm'
    ]),
    destroy: async function (record) {
      this.inFlight = true

      let choice = await this.showConfirm({
        title: `Are you sure?`,
        body: `Connection ${record.title} will be deleted!`
      })

      if (choice === 'yes') {
        let res = await to(this.$apollo.mutate({
          mutation: gql`
            mutation ($_id: ID!) {
              deleteConnection (_id: $_id)
            }
          `,
          variables: {
            _id: record._id
          },
          refetchQueries: ['allConnections']
        }))

        if (res.isError) {
          console.log(res)
        }
      }

      this.inFlight = false
    },
    reset: async function (record) {
      this.inFlight = true

      let choice = await this.showConfirm({
        title: `Are you sure?`,
        body: `The current access token for ${record.title} will be reset.`
      })

      if (choice === 'yes') {
        let res = await to(this.$apollo.mutate({
          mutation: gql`
            mutation ($_id: ID!) {
              resetConnection (_id: $_id)
            }
          `,
          variables: {
            _id: record._id
          },
          refetchQueries: ['allConnections']
        }))

        if (res.isError) {
          console.log(res)
        }
      }

      this.inFlight = false
    }
  }
}
</script>

<template>
  <v-container>
    <h1>Connections</h1>
    <v-breadcrumbs :items="breadcrumbs" divider=">" />

    <v-btn round color="primary" :to="'/connections/create'"><v-icon left>fas fa-plus</v-icon> Add New</v-btn>

    <v-data-table :headers="headers" :items="connections">
      <template v-slot:items="props">
        <td>{{props.item.title}}</td>
        <td><pre>{{props.item.accessToken}}</pre></td>
        <td>{{props.item.createdAt}}</td>
        <td>
          <v-layout justify-center>
            <v-btn fab small class="ma-0 mr-2" @click="reset(props.item)">
              <v-icon>fas fa-sync</v-icon>
            </v-btn>
            <v-btn fab small color="error" class="ma-0" @click="destroy(props.item)">
              <v-icon>fas fa-sm fa-trash-alt</v-icon>
            </v-btn>
          </v-layout>
        </td>
      </template>
    </v-data-table>

  </v-container>
</template>

<style lang="scss" scoped>
</style>
