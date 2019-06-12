
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
    sendRecordingSwitch: {
      get: function () {
        return this.value.sendRecordings
      },
      set: function (value) {
        this.set({ sendRecordings: value })
      }
    },
    removeRecordingSwitch: {
      get: function () {
        return this.value.removeRecordings
      },
      set: function (value) {
        this.set({ removeRecordings: value })
      }
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
    <v-text-field
      label="Remove Text"
      :value="value.removeText"
      @input="set({ removeText: $event })"
      hint="Text to remove from phone numbers, such as a tech prefix used for dialing."
    />
    <v-switch label="Send Recordings" v-model="sendRecordingSwitch" />
    <div v-if="sendRecordingSwitch">
      <v-text-field label="Recordings Path" :value="value.recordingsPath" @input="set({ recordingsPath: $event })" />
      <v-switch
        label="Remove Recordings"
        v-model="removeRecordingSwitch"
        hint="Remove recording files from server after they are sent."
        persistent-hint
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
