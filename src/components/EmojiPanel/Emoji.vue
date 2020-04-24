<template>
  <span class="emoji-item-common" style="cursor:pointer;" :title="text" :class="['emoji-' + text, isInput ? 'emoji-size-small' : 'emoji-size-large']" @click="emojiClick" />
</template>
<script>
export default {
  components: {},
  props: {
    text: {
      type: String,
      default: ''
    },
    isInput: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  methods: {
    emojiClick() {
      this.$emit('onClick', this.text)
    }
  }
}
</script>

