<template>
  <div class="app-container">
    <div class="article-info">
      <el-row :gutter="10" class="article-info">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <div class="left-box">
            <div class="article-content">
              <div class="article-content-tool">
                <div>
                  <el-tooltip class="item" effect="dark" content="发布时间" placement="bottom">
                    <el-button size="mini">
                      {{ article_info.created_at }}
                    </el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="浏览" placement="bottom">
                    <el-button size="mini">
                      <i class="iconfont el-icon-ali-eye" />&nbsp;{{ article_info.view_count }}
                    </el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="评论" placement="bottom">
                    <el-button size="mini">
                      <i class="iconfont el-icon-ali-message2" />&nbsp;0
                    </el-button>
                  </el-tooltip>
                </div>
              </div>
              <div class="article-content-title">
                {{ article_info.title }}
              </div>
              <div class="article-content-abstract">
                <span class="abstract-badge">摘要</span>
                <span class="abstract-content">
                  {{ article_info.abstract }}
                </span>
              </div>
              <div class="article-content-text">

                <div class="article-detail-content">
                  <vue-marked :value="article_info.content" />
                </div>
              </div>
            </div>
            <div class="article-component">
              <div class="component-box">
                <a href="javascript:" class="component praise">
                  <i class="iconfont el-icon-ali-zan" />
                  点赞（{{ article_info.praises_count }}）
                </a>
                <a href="javascript:" class="component reward">
                  赏
                </a>
                <a href="javascript:" class="component share">
                  <i class="iconfont el-icon-ali-share" />
                  分享（33）
                </a>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-row>
            <el-col class="box" :xs="24" :sm="12" :md="24" :lg="24" :xl="24">
              <nav_box />
            </el-col>
            <el-col class="box" :xs="24" :sm="12" :md="24" :lg="24" :xl="24">
              <article-card :articles="hots" :icon="'el-icon-ali-huomiao'" :title="'热文排行'" />
            </el-col>
            <el-col class="box" :xs="24" :sm="12" :md="24" :lg="24" :xl="24">
              <card :articles="recommends" :icon="'el-icon-ali-zan'" :title="'作者推荐'" />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import ArticleCard from '@/components/ArticleCard'

export default {
  name: 'ArticleInfo',
  components: {
    ArticleCard
  },
  data() {
    return {
      site_title: process.env.VUE_APP_SITE_TITLE,
      articles: [],
      recommends: [],
      hots: [],
      article_info: {
        comments: []
      }
    }
  },
  watch: {
    $route: 'fetchData'
  },
  mounted() {
    const _this = this
    _this.fetchData()
  },
  methods: {
    fetchData() {
      //
    },
    comment() {
      const _this = this
      if (!_this.$store.state.login) {
        _this.$layer.msg('请先登录')
        return false
      }
      const data = {
        content: _this.$refs.wangEditor.getText()
      }
      const headers = {
        'Authorization': _this.$cookie.get('token')
      }
      _this.api.commentPost(_this.article_info.token, {}, headers, data).then((res) => {
        if (res.code) {
          _this.article_info.comments.push(res.data)
        } else {
          _this.$layer.msg(res.message || '系统繁忙')
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .article-info {
    min-height: 700px;
    margin: 0 auto;
    -webkit-box-shadow: 0 0 10px 2px #666;
    box-shadow: 0 0 10px 2px #666;
    padding: 15px 15px;
  }
</style>
<style scoped lang="stylus">
  @import "~vue-markdown-editor-orh/dist/css/index.css"

  .article-info
    min-height 700px
    margin 0 auto
    box-shadow 0 0 10px 2px #666
    padding 15px 15px
    @media screen and (min-width: 768px)
      width 750px
    @media screen and (min-width: 992px)
      width 970px
    @media screen and (min-width: 1200px)
      width 1170px
    .box
      padding 5px
    .left-box
      .article-content
        background #fff
        padding 10px 15px
        overflow-x hidden
        border 1px solid #ddd
        .article-content-tool
          height 24px
          line-height 24px
          margin-bottom 15px
          text-align left
          .el-button
            padding 0 5px
            height 22px
            line-height 22px
        .article-content-title
          text-align center
          margin 10px -15px 15px
          background-color #f2f2f2
          font-weight bold
          font-size 18px
          line-height 30px
          padding 5px 0
          color #555
        .article-content-abstract
          padding 10px
          margin 10px 0
          margin-top 20px
          line-height 26px
          border 1px solid #e2e2e2
          text-align left
          .abstract-badge
            height 18px
            line-height 18px
            display inline-block
            padding 0 6px
            font-size 12px
            text-align center
            background-color #FF5722
            color #fff
            border-radius 2px
            margin-right 5px
          .abstract-content
            margin-right 5px
            line-height 26px
            font-size 14px
        .article-content-text
          .article-detail-content
            overflow-y unset
            padding unset
      /*.article-content-copyright*/
      /*    border 1px solid #e2e2e2*/
      /*    padding 5px 10px*/
      /*    margin-top 10px*/
      /*    p*/
      /*        line-height 1.5*/
      /*        margin 5px 0*/
      /*        font-size 14px*/
      /*        a*/
      /*            margin 0 5px*/
      /*            color #1E9FFF*/
      .article-component
        border 1px solid #ddd
        margin-bottom 15px
        padding 20px 0
        background-color #fff
        .component-box
          margin 0 auto
          text-align center
          position relative
          width 300px
          .component
            height 34px
            line-height 34px
            color #fff
            display inline-block
            font-size 14px
            width 120px
            .iconfont
              font-size 14px
          .praise
            padding-right 20px
            text-indent 1em
            border-top-left-radius 50px
            border-bottom-left-radius 50px
            background linear-gradient(to right,#ff5722,#f78d6b)
            &:hover
              background #ff5722
          .reward
            border-radius 50%
            width 40px
            height 40px
            line-height 40px
            color #fff
            position absolute
            left 135px
            top -6px
            border 3px solid #fff
            background-color #1e9fff
            font-size 16px
            display inline-block
          .share
            padding-left 20px
            text-indent 0.8em
            border-top-right-radius 50px
            border-bottom-right-radius 50px
            background linear-gradient(to right,#ffd362,#ffb800)
            &:hover
              background #ffb800

    .editor-box
      padding 15px
      background-color #fff
      .wangEditor
        margin-bottom 10px
      .el-divider__text
        font-size 18px
        padding 0 10px
    .comment-card
      background-color #fff
      .card-title
        border-bottom 1px solid #eaeaea
        font-size 15px
        font-weight 500
        line-height 40px
        padding 0 15px
      .comment-list
        position relative
        margin-bottom 10px
        padding 0 10px
        li
          border-bottom 1px dotted #01aaed
          padding 15px 0 10px 0
          list-style none
          .comment-parent
            .parent-avatar
              width 45px
              height 45px
              margin 5px 5px 5px 0
              position absolute
              border-radius 50px
            .info
              padding-top 5px
              margin-left 53px
              .username
                color #01aaed
                padding-right 5px
            .content
              padding 2px 0 5px 0
              font-size 13px
              margin-left 53px
              min-height 30px
            .content-footer
              padding-top 5px
              line-height 22px
              margin-left 53px
              font-size 13px
              .time
                padding-right 5px
              .btn-reply
                color #009688
          hr
            margin-left 53px
            background-color  #e6e6e6
            height 1px
            border 0
            clear both
          .comment-child
            margin-left 53px
            min-height 50px
            .child-avatar
              width 40px
              height 40px
              margin 5px 5px 5px 0
              position absolute
              border-radius 50px
            .info
              padding-top 5px
              font-size 12px
              line-height 20px
              margin-left 48px
              .username
                color #01aaed
                padding-right 5px
              .replay
                margin-left -5px
              .replay-content
                word-break break-word
            .content-footer
              padding-top 5px
              line-height 20px
              margin-left 48px
              font-size 12px
              .time
                padding-right 5px
              .btn-reply
                color #009688
          .reply-container
            margin-left 53px
            padding-top 5px
            textarea
              background-color #fff
              border 1px solid #e6e6e6
              border-radius 2px
              padding 6px 10px
              line-height 20px
              min-height 80px
              width 95%
      .comment-empty
        background-color #fff
        padding 25px 15px
        text-align center
        font-size 18px
        p
          margin 14px 0
          .el-icon-ali-book
            font-size 50px
            color #5fb878
</style>
