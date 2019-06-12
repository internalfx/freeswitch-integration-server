
<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import gql from 'graphql-tag'
import { to } from '../../../lib/utils.js'

import webhookForm from '../../ui/forms/webhookForm.vue'

export default {
  apollo: {
    record: {
      query: gql`
        query getWebhook ($_id: ID!) {
          record: getWebhook (_id: $_id) {
            _id
            url
            event
            headers
            settings
            createdAt
            updatedAt
          }
        }
      `,
      variables: function () {
        return {
          _id: this.$route.query._id
        }
      },
      result: function (res) {
        this.webhook = _.omit(res.data.record, '__typename', 'createdAt', 'updatedAt')
      }
    }
  },
  data: function () {
    return {
      inFlight: false,
      breadcrumbs: [
        { text: 'Home', to: '/', exact: true },
        { text: 'Webhooks', to: '/webhooks', exact: true },
        { text: 'Create', to: '/webhooks/create', exact: true }
      ],
      webhook: {
        url: null,
        event: null,
        headers: []
      }
    }
  },
  components: {
    webhookForm
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'showConfirm'
    ]),
    save: async function (record) {
      this.inFlight = true

      let res = await to(this.$apollo.mutate({
        mutation: gql`
          mutation ($webhook: WebhookInput!) {
            upsertWebhook (webhook: $webhook) {
              _id
              url
              event
              headers
              settings
              createdAt
              updatedAt
            }
          }
        `,
        variables: {
          webhook: this.webhook
        }
      }))

      if (res.isError) {
        console.log(res)
      } else {
        this.$router.go(-1)
      }

      this.inFlight = false
    }
  }
}
</script>

<template>
  <v-container>
    <h1>Edit Webhook</h1>
    <v-breadcrumbs :items="breadcrumbs" divider=">" />

    <webhookForm v-if="webhook" v-model="webhook" />

    <v-layout justify-space-between>
      <v-btn :to="'/webhooks'"><v-icon left>fas fa-times</v-icon> Cancel</v-btn>
      <v-btn color="primary" @click="save"><v-icon left>fas fa-save</v-icon> Save</v-btn>
    </v-layout>

  </v-container>
</template>

<style lang="scss" scoped>
</style>
