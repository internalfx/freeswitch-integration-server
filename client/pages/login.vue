
<script>
export default {
  auth: false,
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
      let res = await this.$auth.loginWith('local', {
        data: {
          password: this.password
        }
      })
      if (res.isError) {
        this.error = res.response.data
      } else {
        this.$router.push('/')
      }
    },
    clear: function () {}
  },
  middleware: ['noLogin']
}
</script>

<template>
  <v-container>
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
  </v-container>
</template>

<style>

</style>

