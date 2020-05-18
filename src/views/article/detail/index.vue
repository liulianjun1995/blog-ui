<template>
  <div class="article-info">
    <div class="article-container">
      <el-row class="margin-bottom-xs">
        <breadcrumb :append-levels="appendLevels" />
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <el-card class="box-card left-box margin-bottom-xs" shadow="never">
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
                  <marked :markdown="article.content" />
                </div>
              </div>
            </div>
            <article-component :praises="article.praises" :shares="article.shares" />
          </el-card>
          <reply-editor v-model="comment_content" class="comment-composing-box margin-bottom-xs" />
          <el-card class="comment-card margin-bottom-xs" shadow="never">
            <div class="card-title">最新评论</div>
            <div v-if="false" class="comment-empty">
              <p><i class="iconfont el-icon-ali-book" /></p>
              <p>暂无评论，大侠不妨来一发？</p>
            </div>
            <comment-box class="comment-content" :comments="article.comments" />
          </el-card>
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
import ReplyEditor from '@/components/ReplyEditor'
import ArticleComponent from './components/ArticleComponent'
import CommentBox from './components/CommentBox'

import AutocJs from 'autocjs/dist/autoc.min'
import getPageTitle from '@/utils/get-page-title'

export default {
  name: 'ArticleInfo',
  components: {
    Breadcrumb, ArticleCard, CategoryNav, Marked, ReplyEditor, ArticleComponent, CommentBox
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
        created_at: '',
        comments: [
          {
            id: 1,
            user: { id: 1, nickname: '莫甘娜', avatar: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png' },
            content: '凯尔，你被自己的光芒变的盲目。',
            created_at: '4小时前',
            showReply: true,
            replys: [
              {
                id: 2,
                user: { id: 2, nickname: '凯尔', avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg' },
                content: '凯尔，你被自己的光芒变的盲目。',
                created_at: '3小时前'
              },
              {
                id: 3,
                user: { id: 3, nickname: '瓦洛兰之盾-塔里克', avatar: 'https://ossweb-img.qq.com/images/lol/img/champion/Taric.png' },
                content: '塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。',
                created_at: '3小时前'
              },
              {
                id: 4,
                user: { id: 4, nickname: '伊泽瑞尔', avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg' },
                content: '等我回来一个打十个。',
                created_at: '3小时前'
              }
            ]
          },
          {
            id: 2,
            user: { id: 1, nickname: '莫甘娜', avatar: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png' },
            content: '凯尔，你被自己的光芒变的盲目。',
            created_at: '4小时前',
            showReply: true,
            replys: [
              {
                id: 2,
                user: { id: 2, nickname: '凯尔', avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg' },
                content: '凯尔，你被自己的光芒变的盲目。',
                created_at: '3小时前'
              },
              {
                id: 3,
                user: { id: 3, nickname: '瓦洛兰之盾-塔里克', avatar: 'https://ossweb-img.qq.com/images/lol/img/champion/Taric.png' },
                content: '塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。',
                created_at: '3小时前'
              },
              {
                id: 4,
                user: { id: 4, nickname: '伊泽瑞尔', avatar: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg' },
                content: '等我回来一个打十个。',
                created_at: '3小时前'
              }
            ]
          }
        ]
      },
      navigation: null,
      comment_content: '',
      reply_content: ''
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
    height: 100%;
    margin: 0 auto;
    -webkit-box-shadow: 0 0 10px 2px #666;
    box-shadow: 0 0 10px 2px #666;
    padding: 15px 15px;
    .left-box {
      .article-content {
        min-height: 600px;
        background: #fff;
        overflow-x: hidden;
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
    }
    .comment-composing-box {
      position: relative;
      background-color: #fff;
    }
    .comment-card {
      .card-title {
        border-bottom: 1px solid #eaeaea;
        font-size: 15px;
        font-weight: 500;
        line-height: 40px;
        padding: 0 15px;
      }
      .comment-empty {
        padding: 25px 15px;
        text-align: center;
        font-size: 18px;
        p {
          margin: 14px 0;
          .el-icon-ali-book {
            font-size: 50px;
            color: #5fb878;
          }
        }
      }
    }
  }
</style>
