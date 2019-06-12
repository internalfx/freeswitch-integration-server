
<script>
export default {
  data: function () {
    return {
      breadcrumbs: [
        { text: 'Home', to: '/', exact: true }
      ]
    }
  },
  components: {
  },
  computed: {
  },
  methods: {
  }
}
</script>

<template>
  <div>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex lg3>
          <v-card class="pa-3" to="/connections">
            <h3>
              <v-icon>fas fa-plug fa-fw</v-icon>
              Connections
            </h3>
            <p>Create API keys for integrating with other systems.</p>
          </v-card>
        </v-flex>
        <v-flex lg3>
          <v-card class="pa-3" to="/webhooks">
            <h3>
              <v-icon>fas fa-bolt fa-fw</v-icon>
              Webhooks
            </h3>
            <p>Receive POST requests on call system events.</p>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
</style>
