
<script>
import { mapActions } from 'vuex'
import gql from 'graphql-tag'
import { to } from '../../../lib/utils.js'

import connectionForm from '../../ui/forms/connectionForm.vue'

export default {
  apollo: {
  },
  data: function () {
    return {
      inFlight: false,
      breadcrumbs: [
        { text: 'Home', to: '/', exact: true },
        { text: 'Connections', to: '/connections', exact: true },
        { text: 'Create', to: '/connections/create', exact: true }
      ],
      record: {
        title: null
      }
    }
  },
  components: {
    connectionForm
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
          mutation ($title: String!) {
            createConnection (title: $title) {
              _id
              title
              accessToken
              createdAt
            }
          }
        `,
        variables: {
          title: this.record.title
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
    <h1>Create Connection</h1>
    <v-breadcrumbs :items="breadcrumbs" divider=">" />

    <connectionForm v-model="record" />

    <v-layout justify-space-between>
      <v-btn :to="'/connections'"><v-icon left>fas fa-times</v-icon> Cancel</v-btn>
      <v-btn color="primary" @click="save"><v-icon left>fas fa-save</v-icon> Save</v-btn>
    </v-layout>

  </v-container>
</template>

<style lang="scss" scoped>
</style>
