<template>
  <el-card class="article-card" shadow="never">
    <p class="card-title">
      <i class="iconfont" :class="icon" />
      {{ title }}
    </p>
    <ul v-if="articles.length > 0" class="card-list">
      <template v-for="(item, index) in articles">
        <li :key="index">
          <span class="card-badge" :class="index > 2 ? 'card-badge-blue' : ''">{{ index + 1 }}</span>
          <router-link :to="{ name: 'ArticleDetail', params: {id:item.id} }" :title="item.title">{{ item.title }}</router-link>
        </li>
      </template>
    </ul>
    <EmptyBox v-else />
  </el-card>
</template>

<script>
import { ApiGetHotArticleList, ApiGetRandomArticleList, ApiGetRecommendArticleList } from '@/api/article'
import EmptyBox from '@/components/EmptyBox'

export default {
  name: 'ArticleCard',
  components: { EmptyBox },
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      articles: []
    }
  },
  computed: {
    title() {
      let title = ''
      switch (this.type) {
        case 'hot':
          title = '热文排行'
          break
        case 'recommend':
          title = '作者推荐'
          break
        case 'random':
          title = '随便看看'
          break
      }
      return title
    },
    icon() {
      let icon = ''
      switch (this.type) {
        case 'hot':
          icon = 'el-icon-ali-huomiao'
          break
        case 'recommend':
          icon = 'el-icon-ali-zan'
          break
      }
      return icon
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      switch (this.type) {
        case 'hot':
          this.fetchHot()
          break
        case 'recommend':
          this.fetchRecommend()
          break
        case 'random':
          this.fetchRandom()
          break
      }
    },
    fetchHot() {
      const _this = this
      ApiGetHotArticleList().then(res => {
        _this.articles = res.data
      })
    },
    fetchRecommend() {
      const _this = this
      ApiGetRecommendArticleList().then(res => {
        _this.articles = res.data
      })
    },
    fetchRandom() {
      const _this = this
      ApiGetRandomArticleList().then(res => {
        _this.articles = res.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .article-card {
    /deep/ .el-card__body {
      padding: unset;
    }
    background: #fff;
    height: 100%;
    border: 1px solid #ddd;
    .card-title {
      width: 100%;
      background-color: #fff;
      line-height: 20px;
      padding: 10px;
      color: #01aaed;
      text-align: left;
      border-bottom: 1px solid #eaeaea;
    }
    .card-list {
      padding: 10px 15px;
      min-height: 220px;
      font-size: 14px;
      li {
        margin: 3px 0;
        line-height: 24px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        a {
          color: #333;
          &:hover {
            color: #01aaed;
            -webkit-transition: all .2s;
            transition: all .2s;
          }
        }
        .card-badge {
          margin-right: 5px;
          font-size: 14px;
          height: 18px;
          line-height: 18px;
          padding: 0 6px;
          text-align: center;
          color: #fff;
          background-color: #FF5722;
          border-radius: 2px;
          display: inline-block;
        }
        .card-badge-blue {
          background-color: #1E9FFF;
        }
      }
    }
    .empty-box {
      background-color: #fff;
      padding: 25px 15px;
      text-align: center;
      font-size: 18px;
      p {
        margin: 14px 0;
        .iconfont {
          font-size: 50px;
          color: #5fb878;
        }
      }
    }
  }
</style>

