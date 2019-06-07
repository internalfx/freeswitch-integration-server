<script>
export default {
  data: function () {
    return {
      drawer: false
    }
  },
  computed: {
  },
  methods: {
    logout: async function () {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-layout column justify-space-between style="height: 100%;">
        <v-list dense>
          <v-list-tile @click="logout">
            <v-list-tile-action>
              <v-icon>fas fa-sign-out-alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-layout>
    </v-navigation-drawer>
    <v-toolbar app clipped-left dark color="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>FreeSWITCH Integration Server</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <nuxt/>
    </v-content>
  </v-app>
</template>

<style>
</style>
