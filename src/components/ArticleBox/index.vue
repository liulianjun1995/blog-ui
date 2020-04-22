<template>
  <div class="article-box">
    <p class="box-title">
      <i class="iconfont" :class="icon" />
      {{ title }}
    </p>
    <div v-loading="loading" class="article-container margin-bottom-xs">
      <el-row v-for="article in articles" :key="article.id + 'top'" v-scroll-reveal.reset :gutter="10" class="article-item">
        <el-col class="article-left" :span="6">
          <el-image
            class="article-cover"
            style="width: 100%; height: 100%;"
            :src="article.cover"
          />
        </el-col>
        <el-col class="article-right" :span="18">
          <div class="article-title">
            <router-link class="read" :to="{ name: 'ArticleDetail', params: {id:article.id} }" :title="article.title">{{ article.title }}</router-link>
          </div>
          <div class="article-abstract" :title="article.abstract">
            {{ article.abstract }}
          </div>
          <div class="article-footer">
            <span class="article-footer-icon category">
              <el-tooltip class="item" effect="dark" content="分类" placement="bottom">
                <i class="el-icon-menu" />
              </el-tooltip>
              <router-link class="article-name" :to="{ name: article.category }" :title="article.category">{{ article.category }}</router-link>
            </span>
            <el-tooltip class="item" effect="dark" content="发布时间" placement="bottom">
              <span class="article-footer-icon">
                <i class="iconfont el-icon-ali-clock" />
                {{ article.created_at }}
              </span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="浏览" placement="bottom">
              <span class="article-footer-icon">
                <i class="iconfont el-icon-ali-read" />
                {{ article.views }}
              </span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="评论" placement="bottom">
              <span class="article-footer-icon">
                <i class="iconfont el-icon-ali-message1" />
                {{ article.comments_count }}
              </span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="点赞" placement="bottom">
              <span class="article-footer-icon">
                <i class="iconfont el-icon-ali-zan" />
                {{ article.praises }}
              </span>
            </el-tooltip>
            <router-link class="read" :to="{ name: 'ArticleDetail', params: {id: article.id} }" title="阅读全文">阅读全文</router-link>
          </div>
        </el-col>
      </el-row>
      <EmptyBox v-if="articles.length === 0" />
    </div>
    <pagination v-if="showPagination" class="text-center" :page-size="pageSize" :total="total" @currentPage="currentPage" />
  </div>
</template>

<script>
import { ApiGetArticleList, ApiGetTopArticleList } from '@/api/article'
import Pagination from '@/components/Pagination'
import EmptyBox from '@/components/EmptyBox'

export default {
  name: 'ArticleBox',
  components: { Pagination, EmptyBox },
  props: {
    type: {
      type: String,
      default: 'list'
    }
  },
  data() {
    return {
      show: false,
      loading: false,
      articles: [],
      total: 0,
      pageSize: 0,
      query: {
        page: 1,
        category: ''
      }
    }
  },
  computed: {
    showPagination() {
      return this.type === 'list' || this.type === 'new'
    },
    title() {
      var title = this.$route.meta.title
      switch (this.type) {
        case 'top':
          title = '置顶博文'
          break
        case 'new':
          title = '最新博文'
          break
        case 'article':
          title = '分类'
          break
      }
      return title
    },
    icon() {
      let icon = 'el-icon-ali-cog el-icon-spin'
      switch (this.type) {
        case 'top':
          icon = 'el-icon-ali-diamond'
          break
        case 'new':
          icon = 'el-icon-ali-signal'
          break
      }
      return icon
    }
  },
  watch: {
    '$route': function() {
      this.fetchData()
    }
  },
  mounted() {
    this.initPage()
  },
  methods: {
    initPage() {
      this.query.page = 1
      this.fetchData()
    },
    fetchData() {
      if (['Home', 'ArticleAll'].includes(this.$route.name) === false) {
        this.query.category = this.$route.name
      } else {
        this.query.category = ''
      }
      switch (this.type) {
        case 'top':
          this.fetchTopArticles()
          break
        case 'new':
        case 'list':
          this.fetchArticles()
          break
      }
    },
    fetchTopArticles() {
      const _this = this
      _this.loading = true
      ApiGetTopArticleList(_this.query).then(res => {
        _this.articles = res.data
      }).then(() => { _this.loading = false })
    },
    fetchArticles() {
      const _this = this
      _this.loading = true
      ApiGetArticleList(_this.query).then(res => {
        _this.articles = res.items
        _this.total = res.total
        _this.pageSize = res.pageSize
      }).then(() => { _this.loading = false })
    },
    currentPage(val) {
      this.query.page = val
      this.fetchData()
    }
  }
}
</script>
<style scoped lang="scss">
  .box-title {
    width: 100%;
    background-color: #fff;
    line-height: 20px;
    padding: 10px;
    color: #1e9fff;
    border-bottom: 1px solid #eaeaea;
    font-size: 14px;
    text-align: left;
    .iconfont {
      margin-right: 5px;
    }
    .el-icon-spin {
      -webkit-animation: el-icon-spin 2s infinite;
      animation: el-icon-spin 2s linear infinite;
    }
    @keyframes el-icon-spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(359deg);
      }
    }
  }
  .article-container {
    background: #fff;
    border-bottom: 1px solid #f2f2f2;
    .article-item {
      padding: 15px;
      border-bottom: 1px solid #f2f2f2;
      height: 160px;
      @media screen and (max-width: 768px) {
        height: 120px;
      }
      .article-left {
        height: 100%;
        /deep/ .article-cover {
          img {
            color: red;
            &:hover {
              transition: all .6s ease 0s;
              transform: scale(1.1);
            }
          }
        }
      }
      .article-right {
        text-align: left;
        .article-title {
          margin-bottom: 10px;
          @media screen and (max-width: 768px) {
            margin-bottom: 5px;
          }
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          a {
            color: #333;
            font-size: 19px;
            &:hover {
              color: #01aaed;
              transition: all .2s;
            }
          }
        }
        .article-abstract {
          height: 80px;
          font-size: 13px;
          line-height: 20px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          @media screen and (max-width: 768px) {
            height: 44px;
            -webkit-line-clamp: 2;
          }
        }
        .article-footer {
          color: #999;
          height: 22px;
          line-height: 27px;
          font-size: 13px;
          .article {
            @media screen and (max-width: 768px) {
              display: none;
            }
          }
          .article-footer-icon {
            padding-right: 2%;
            font-size: 13px;
            i {
              margin-right: 2px;
            }
            .iconfont {
              font-size: 13px;
            }
            .article-name {
              color: #009688;
              margin: 0 3px;
            }
          }
          .read {
            height: 22px;
            line-height: 22px;
            padding: 0 5px;
            font-size: 12px;
            background-color: #1e9fff;
            color: #fff;
            cursor: pointer;
            border-radius: 2px;
            float: right;
            @media screen and (max-width: 768px) {
              display: none;
            }
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
  }
</style>
