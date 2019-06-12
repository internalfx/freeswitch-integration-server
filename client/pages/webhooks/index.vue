
<script>
import { mapActions } from 'vuex'
import gql from 'graphql-tag'
import { to } from '../../../lib/utils.js'

export default {
  apollo: {
    webhooks: {
      query: gql`
        query allWebhooks {
          webhooks: allWebhooks {
            _id
            event
            url
            headers
            createdAt
            updatedAt
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
        { text: 'Webhooks', to: '/webhooks', exact: true }
      ],
      headers: [
        { text: 'Event', value: 'event' },
        { text: 'URL', value: 'url' },
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
        body: `Wehook ${record.event} will be deleted!`
      })

      if (choice === 'yes') {
        let res = await to(this.$apollo.mutate({
          mutation: gql`
            mutation ($_id: ID!) {
              deleteWebhook (_id: $_id)
            }
          `,
          variables: {
            _id: record._id
          },
          refetchQueries: ['allWebhooks']
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
    <h1>Webhooks</h1>
    <v-breadcrumbs :items="breadcrumbs" divider=">" />

    <v-btn round color="primary" :to="'/webhooks/create'"><v-icon left>fas fa-plus</v-icon> Add New</v-btn>

    <v-data-table :headers="headers" :items="webhooks">
      <template v-slot:items="props">
        <td>{{props.item.event}}</td>
        <td><pre>{{props.item.url}}</pre></td>
        <td>{{props.item.createdAt}}</td>
        <td>
          <v-layout justify-center>
            <v-btn fab small class="ma-0 mr-2" @click="$router.push({ path: '/webhooks/edit', query: { _id: props.item._id } })">
              <v-icon>fas fa-pencil-alt</v-icon>
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
