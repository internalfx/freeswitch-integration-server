<script>
import { mapState } from 'vuex'

export default {
  data: function () {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapState({
      alert: state => state.alert,
      confirm: state => state.confirm
    }),
    showAlert: {
      get: function () {
        return this.alert.resolve != null
      },
      set: function (val) {
        this.alert.resolve('close')
      }
    },
    showConfirm: {
      get: function () {
        return this.confirm.resolve != null
      },
      set: function (val) {
      }
    }
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
          <v-list-tile to="/">
            <v-list-tile-action>
              <v-icon>fas fa-home fa-fw</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/connections">
            <v-list-tile-action>
              <v-icon>fas fa-plug fa-fw</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Connections</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-list dense>
          <v-divider/>
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

    <v-dialog v-model="showAlert" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline error lighten-2 white--text" primary-title>
          {{alert.title}}
        </v-card-title>

        <v-card-text>
          {{alert.body}}
        </v-card-text>

        <v-card-actions>
          <v-btn flat @click="alert.resolve('ok')">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showConfirm" max-width="350" persistent>
      <v-card>
        <v-card-title class="headline" primary-title>
          {{confirm.title}}
        </v-card-title>

        <v-card-text>
          {{confirm.body}}
        </v-card-text>

        <v-card-actions>
          <v-btn flat @click="confirm.resolve('no')">No</v-btn>
          <v-spacer />
          <v-btn color="primary" @click="confirm.resolve('yes')">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<style>
</style>
