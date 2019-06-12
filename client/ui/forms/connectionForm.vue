
<script>
import _ from 'lodash'

export default {
  apollo: {
  },
  data: function () {
    return {
    }
  },
  props: {
    value: Object
  },
  components: {
  },
  computed: {
  },
  methods: {
    set: function (data) {
      let propVal = _.cloneDeep(this.value)
      for (let [key, val] of Object.entries(data)) {
        _.set(propVal, key, val)
      }
      this.$emit('input', propVal)
    }
  }
}
</script>

<template>
  <v-text-field label="Title" :value="value.title" @input="set({ title: $event })" />
</template>

<style lang="scss" scoped>
</style>
