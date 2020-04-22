<template>
  <div class="article-detail-content markdown-body">
    <div v-highlight v-html="compileMarkdown" />
  </div>
</template>

<script>
import Marked from 'marked'

Marked.setOptions({
  renderer: new Marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
})

export default {
  name: 'Marked',
  props: {
    markdown: {
      type: String,
      default: ''
    }
  },
  computed: {
    compileMarkdown() {
      return Marked(this.markdown)
    }
  }
}
</script>

<style scoped>

</style>
