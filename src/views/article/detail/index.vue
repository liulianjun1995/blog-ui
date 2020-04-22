<template>
  <div class="article-info">
    <div class="article-container">
      <el-row>
        <el-col :span="24">
          <breadcrumb :append-levels="appendLevels" />
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <div class="left-box">
            <div class="article-content">
              <div class="article-content-tool">
                <div>
                  <el-tooltip class="item" effect="dark" content="发布时间" placement="bottom">
                    <el-button size="mini">
                      <i class="iconfont el-icon-ali-clock2" />&nbsp;{{ article.created_at }}
                    </el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="浏览" placement="bottom">
                    <el-button size="mini">
                      <i class="iconfont el-icon-ali-eye" />&nbsp;{{ article.views }}
                    </el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="评论" placement="bottom">
                    <el-button size="mini">
                      <i class="iconfont el-icon-ali-message2" />&nbsp;{{ article.comments_count }}
                    </el-button>
                  </el-tooltip>
                </div>
              </div>
              <div class="article-content-title">
                {{ article.title }}
              </div>
              <div class="article-content-abstract">
                <span class="abstract-badge">摘要</span>
                <span class="abstract-content">
                  {{ article.abstract }}
                </span>
              </div>
              <div class="article-content-text">
                <div id="article" class="article-detail-content markdown-body">
                  <Marked :markdown="article.content" />
                </div>
              </div>
            </div>
            <div class="article-component">
              <div class="component-box">
                <a href="javascript:" class="component praise">
                  <i class="iconfont el-icon-ali-zan" />
                  点赞（{{ article.praises }}）
                </a>
                <el-tooltip class="item" effect="dark" content="Thanks♪(･ω･)ﾉ" placement="top">
                  <a href="javascript:" class="reward">
                    赏
                  </a>
                </el-tooltip>
                <a href="javascript:" class="component share">
                  <i class="iconfont el-icon-ali-share" />
                  分享（2）
                </a>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-row :gutter="10">
            <el-col class="margin-bottom-xs box" :xs="24" :sm="12" :md="24" :lg="24" :xl="24">
              <category-nav :current="article.category" />
            </el-col>
            <el-col class="margin-bottom-xs box" :xs="24" :sm="12" :md="24" :lg="24" :xl="24">
              <article-card type="hot" />
            </el-col>
            <el-col class="margin-bottom-xs box" :xs="24" :sm="12" :md="24" :lg="24" :xl="24">
              <article-card type="recommend" />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ApiGetTopArticleDetail } from '@/api/article'
import ArticleCard from '@/components/ArticleCard'
import CategoryNav from '@/components/CategoryNav'
import Breadcrumb from '@/components/Breadcrumb'
import Marked from '@/components/Marked'

import AutocJs from 'autocjs/dist/autoc.min'
import getPageTitle from '@/utils/get-page-title'
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'ArticleInfo',
  components: {
    Breadcrumb, ArticleCard, CategoryNav, Marked
  },
  data() {
    return {
      article: {
        title: '',
        abstract: '',
        category: '',
        content: '',
        views: 0,
        praises: 0,
        comments_count: 0,
        created_at: ''
      },
      navigation: null
    }
  },
  computed: {
    id() {
      return this.$route.params.id.toString()
    },
    appendLevels() {
      return [
        {
          redirect: '/article/category/' + this.article.category,
          meta: { title: this.article.category }
        },
        {
          meta: { title: this.article.title }
        }
      ]
    }
  },
  watch: {
    '$route.params.id': function() {
      this.fetchData()
    }
  },
  mounted() {
    const _this = this
    if (_this.id.length > 0) {
      _this.fetchData()
    }
  },
  destroyed() {
    document.getElementsByClassName('outline-outside')[0].remove()
  },
  methods: {
    fetchData() {
      const _this = this
      const loading = _this.$loading.show({
        container: null,
        loader: 'dots',
        color: '#409EFF',
        width: 64,
        height: 64,
        opacity: 0.5
      })
      ApiGetTopArticleDetail(_this.id).then(res => {
        Object.assign(_this.article, res.data)
        document.title = getPageTitle(_this.article.title)
        loading.hide()
        scrollTo(0, 800)
      }).then(() => {
        this.initDoc()
      })
    },
    initDoc() {
      const config = {
        // 文章正文 DOM 节点的 ID 选择器
        article: '#article',
        // 要收集的标题选择器
        selector: 'h1,h2,h3,h4,h5,h6',
        // 侧边栏导航的标题
        title: '内容目录',
        // 文章导读导航的位置
        // outside - 以侧边栏菜单形式显示（默认值）
        // inside - 在文章正文一开始的地方显示
        position: 'outside',
        // 标题图标链接的 URL 地址
        // （默认）没有设置定制，点击链接页面滚动到标题位置
        // 设置了链接地址，则不会滚动定位
        anchorURL: '',
        // 链接的显示位置
        // front - 在标题最前面（默认值）
        // back - 在标题后面
        anchorAt: 'back',
        // 是否生成文章导读导航
        isGenerateOutline: true,
        // 是否在文章导读导航中显示段落章节编号
        isGenerateOutlineChapterCode: false,
        // 是否在正文的文章标题中显示段落章节编号
        isGenerateHeadingChapterCode: false,
        // 是否在正文的文章标题中创建锚点
        isGenerateHeadingAnchor: true
      }
      if (this.navigation !== null) {
        this.navigation.reload(config)
      } else {
        this.navigation = new AutocJs(config)
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @import "~autocjs/src/css/autoc.css";

  .article-info {
    min-height: 700px;
    margin: 0 auto;
    -webkit-box-shadow: 0 0 10px 2px #666;
    box-shadow: 0 0 10px 2px #666;
    padding: 15px 15px;
    .left-box {
      .article-content {
        min-height: 600px;
        background: #fff;
        padding: 10px 15px;
        overflow-x: hidden;
        border: 1px solid #ddd;
        .article-content-tool {
          height: 24px;
          line-height: 24px;
          margin-bottom: 15px;
          text-align: left;
          .el-icon-ali-clock2 {
            font-size: 13px;
          }
          .el-button {
            padding: 0 5px;
            height: 22px;
            line-height: 22px;
          }
        }
        .article-content-title {
          text-align: center;
          margin: 10px -15px 15px;
          background-color: #f2f2f2;
          font-weight: 700;
          font-size: 18px;
          line-height: 30px;
          padding: 5px 0;
          color: #555;
        }
        .article-content-abstract {
          padding: 10px;
          margin: 10px 0;
          margin-top: 20px;
          line-height: 26px;
          border: 1px solid #e2e2e2;
          text-align: left;
          .abstract-badge {
            height: 18px;
            line-height: 18px;
            display: inline-block;
            padding: 0 6px;
            font-size: 12px;
            text-align: center;
            background-color: #ff5722;
            color: #fff;
            border-radius: 2px;
            margin-right: 5px;
          }
        }
        .article-content-text {
          .article-detail-content {
            overflow-y: unset;
            padding: unset;
          }
        }
      }
      .article-component {
        border: 1px solid #ddd;
        margin-bottom: 15px;
        padding: 20px 0;
        background-color: #fff;
        .component-box {
          margin: 0 auto;
          text-align: center;
          position: relative;
          width: 300px;
          .component {
            padding: 12px 14px;
            color: #fff;
            font-size: 14px;
          }
          .praise {
            text-indent: 1em;
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;
            background: -webkit-gradient(linear,left top,right top,from(#ff5722),to(#f78d6b));
            background: linear-gradient(90deg,#ff5722,#f78d6b);
            &:hover {
              background: #ff5722;
            }
          }
          .reward {
            border-radius: 50%;
            width: 40px;
            height: 40px;
            line-height: 40px;
            color: #fff;
            position: absolute;
            left: 135px;
            top: -10px;
            border: 3px solid #fff;
            background-color: #1e9fff;
            font-size: 16px;
            display: inline-block;
          }
          .share {
            text-indent: 1em;
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
            background: -webkit-gradient(linear,left top,right top,from(#ffd362),to(#ffb800));
            background: linear-gradient(90deg,#ffd362,#ffb800);
            &:hover {
              background: #ffb800;
            }
          }
        }
      }
    }
  }
</style>
