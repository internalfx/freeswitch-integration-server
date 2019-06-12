
<script>
import { mapActions } from 'vuex'
import gql from 'graphql-tag'
import { to } from '../../../lib/utils.js'

import webhookForm from '../../ui/forms/webhookForm.vue'

export default {
  apollo: {
  },
  data: function () {
    return {
      inFlight: false,
      breadcrumbs: [
        { text: 'Home', to: '/', exact: true },
        { text: 'Webhooks', to: '/webhooks', exact: true },
        { text: 'Create', to: '/webhooks/create', exact: true }
      ],
      record: {
        url: null,
        event: null,
        headers: {},
        settings: {}
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
          webhook: this.record
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
    <h1>Create Webhook</h1>
    <v-breadcrumbs :items="breadcrumbs" divider=">" />

    <webhookForm v-model="record" />

    <v-layout justify-space-between>
      <v-btn :to="'/webhooks'"><v-icon left>fas fa-times</v-icon> Cancel</v-btn>
      <v-btn color="primary" @click="save"><v-icon left>fas fa-save</v-icon> Save</v-btn>
    </v-layout>

  </v-container>
</template>

<style lang="scss" scoped>
</style>
