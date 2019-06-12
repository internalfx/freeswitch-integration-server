
<script>
import _ from 'lodash'
import fsEvents from '../../../lib/fsEvents.js'

import hangupComplete from './fsEventForms/hangupComplete.vue'

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
    hangupComplete
  },
  computed: {
    eventList: function () {
      return fsEvents
    },
    fsEvent: function () {
      let fsEvent = fsEvents.find((item) => {
        return item.handler === this.value.event
      })
      return fsEvent
    },
    settingsComponent: function () {
      return _.get(this.fsEvent, 'handler')
    }
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
  <div>
    <v-text-field label="URL" :value="value.url" @input="set({ url: $event })" />
    <v-autocomplete label="Event" :value="value.event" :items="eventList" item-value="handler" @input="set({ event: $event })"/>

    <div v-if="fsEvent">
      <h2 class="mt-5">FreeSWITCH "{{fsEvent.text}}" Settings</h2>
      <component :is="settingsComponent" :value="value.settings" @input="set({ settings: $event })" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
