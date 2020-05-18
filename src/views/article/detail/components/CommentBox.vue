<template>
  <div>
    <div v-for="comment in comments" :key="comment.id" class="comment-item">
      <el-avatar class="u-avatar" size="medium" :src="comment.user.avatar" />
      <div class="content">
        <div class="username">{{ comment.user.nickname }}</div>
        <marked class="text-content" :markdown="comment.content" />
        <div class="comment-footer margin-bottom-xs">
          <span class="comment-time"><i class="iconfont el-icon-ali-clock2" /> {{ comment.created_at }}</span>
          <span class="show-reply-comments cursor-pointer" @click="showReply(comment)"><i class="iconfont el-icon-ali-msg" /> 评论</span>
        </div>
        <div v-if="comment.showReply && comment.showReply === true" class="comment-reply">
          <el-input v-model="reply_content" size="small" placeholder="支持 Emoji, Markdown 语法">
            <el-button slot="append">评论</el-button>
          </el-input>
          <div v-if="comment.replys && comment.replys.length > 0" class="comment-reply-list">
            <div v-for="reply in comment.replys" :key="reply.id" class="comment-reply-item">
              <el-avatar class="u-avatar" size="medium" :src="reply.user.avatar" />
              <div class="content">
                <div class="username">{{ reply.user.nickname }}</div>
                <Marked class="text-content" :markdown="reply.content" />
                <div class="comment-footer margin-bottom-xs">
                  <span class="comment-time"><i class="iconfont el-icon-ali-clock2" /> {{ reply.created_at }}</span>
                  <el-tooltip class="item" effect="dark" :content="'回复' + reply.user.nickname" placement="top">
                    <i class="iconfont el-icon-ali-reply cursor-pointer" />
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Marked from '@/components/Marked'

export default {
  components: {
    Marked
  },
  props: {
    comments: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      reply_content: ''
    }
  },
  methods: {
    showReply(comment) {
      comment.showReply = Boolean(!comment.showReply)
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped lang="scss">
  .comment-content {
    .comment-item {
      height: auto;
      position: relative;
      padding: 6px 5px 6px 60px;
      background-color: #fff;
      align-items: center;
      border-bottom: 1px dotted #01aaed;
      .u-avatar {
        position: absolute;
        left: 15px;
      }
      .content {
        padding-top: 5px;
        position: relative;
        left: 0;
        width: auto;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        font-size: 13px;
        .username {
          color: #01aaed;
        }
        .text-content {
          padding: 5px 0 5px 0;
          min-height: 30px;
          color: #444;
        }
        .comment-footer {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.4);
          .comment-time {
            padding-right: 5px;
            .iconfont {
              font-size: 13px;
            }
          }
          .show-reply-comments {
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .comment-reply {
          margin-top: 20px;
          .comment-reply-list {
            margin-top: 10px;
            .comment-reply-item {
              height: auto;
              padding: 8px 15px 6px 45px;
              position: relative;
              background-color: #fff;
              align-items: center;
              border-top: 1px dashed #e9e5e5;
              .u-avatar {
                position: absolute;
                left: 0;
              }
              .content {
                padding-top: 5px;
                position: relative;
                left: 0;
                width: auto;
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                -ms-flex: 1;
                flex: 1;
                font-size: 13px;
                .username {
                  color: #01aaed;
                }
                .text-content {
                  min-height: 30px;
                  color: #444;
                }
                .comment-footer {
                  font-size: 12px;
                  color: rgba(0, 0, 0, 0.4);
                  .comment-time {
                    padding-right: 5px;
                    .iconfont {
                      font-size: 13px;
                    }
                  }
                  .show-reply-comments {
                    &:hover {
                      text-decoration: underline;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
