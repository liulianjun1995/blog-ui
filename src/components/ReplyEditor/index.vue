<template>
  <div>
    <el-input
      v-model="markdown"
      class="margin-bottom-xs"
      type="textarea"
      :autosize="{ minRows: 5 }"
      placeholder="请输入内容"
    />
    <div class="reply-textarea-footer margin-bottom-xs">
      <el-tooltip class="item" effect="dark" content="emoji 表情" placement="top">
        <svg-icon icon-class="emoji" class="cursor-pointer margin-right-xs" @click="showEmoji = !showEmoji" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="支持markdown" placement="top">
        <a class="margin-right-xs" href="javascript:">支持 MD</a>
      </el-tooltip>
      <el-checkbox v-model="showPreview">显示预览</el-checkbox>
      <el-button style="float: right" size="small" type="primary">提交评论</el-button>
      <emoji-panel v-if="showEmoji" @emojiClick="appendEmoji" />
    </div>
    <div v-if="showPreview" class="reply-preview">
      <marked :markdown="markdown" />
    </div>
  </div>
</template>

<script>
import Marked from '@/components/Marked'
import EmojiPanel from '@/components/EmojiPanel'

export default {
  components: { EmojiPanel, Marked },
  model: {
    prop: 'content',
    event: 'update'
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      markdown: '',
      showEmoji: false,
      showPreview: true
    }
  },
  watch: {
    markdown() {
      this.$emit('update', this.markdown)
    },
    value() {
      this.markdown = this.value
    }
  },
  mounted() {
    document.addEventListener('click', e => {
      if (!this.$el.contains(e.target)) {
        this.showEmoji = false
      }
    })
  },
  methods: {
    appendEmoji(text) {
      this.markdown += ':' + text + ':'
    }
  }
}
</script>

<style scoped lang="scss">
  .reply-textarea-footer {
    position: relative;
    height: 32px;
    line-height: 32px;
    font-size: 24px;
    a {
      font-size: 15px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .reply-preview {
    border: 1px dashed rgb(204, 204, 204);
    background: rgb(255, 255, 255);
    border-radius: 6px;
    box-shadow: none;
    margin-top: 20px;
    margin-bottom: 6px;
    padding: 20px;
  }
</style>
