
<script>
import { to } from '../../lib/utils.js'

export default {
  auth: 'guest',
  data: function () {
    return {
      error: null,
      password: null
    }
  },
  components: {
  },
  layout: 'login',
  methods: {
    submit: async function () {
      this.error = null
      let res = await to(this.$auth.loginWith('local', {
        data: {
          password: this.password
        }
      }))
      if (res.isError) {
        this.error = res.response.data
      } else {
        this.$router.push('/')
      }
    },
    clear: function () {}
  }
}
</script>

<template>
  <v-container>
    <v-layout>
      <v-flex offset-sm2 sm8 offset-md3 md6 offset-lg4 lg4>
        <h1>Enter Password</h1>
        <v-form @submit.prevent="submit">
          <v-text-field
            type="password"
            v-model="password"
            label="Password"
          />

          <v-btn color="primary" type="submit">submit</v-btn>
        </v-form>
        <v-alert :value="error" type="error">
          {{error}}
        </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>

</style>

