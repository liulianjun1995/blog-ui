<template>
  <div class="article-box">
    <p class="box-title">
      <i class="iconfont" :class="icon" />
      {{ title }}
    </p>
    <div class="article-container">
      <el-row v-for="article in articles" :key="article.id + 'top'" :gutter="10" class="article-item">
        <el-col class="article-left" :span="6">
          <el-image
            class="article-cover"
            style="width: 100%; height: 100%;"
            :src="article.cover"
            :preview-src-list="[article.cover]"
          />
        </el-col>
        <el-col class="article-right" :span="18">
          <div class="article-title">
            <router-link class="read" :to="'/article/' + article.id" :title="article.title">{{ article.title }}</router-link>
          </div>
          <div class="article-abstract" :title="article.abstract">
            {{ article.abstract }}
          </div>
          <div class="article-footer">
            <span class="article-footer-icon category">
              <el-tooltip class="item" effect="dark" content="分类" placement="bottom">
                <i class="el-icon-menu" />
              </el-tooltip>
              <router-link class="tag-name" :to="'/category/' + article.category " :title="article.category">PHP</router-link>
            </span>
            <el-tooltip class="item" effect="dark" content="发布时间" placement="bottom">
              <span class="article-footer-icon">
                <i class="iconfont el-icon-ali-clock" />
                2020-04-09
              </span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="浏览" placement="bottom">
              <span class="article-footer-icon">
                <i class="iconfont el-icon-ali-read" />
                666
              </span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="评论" placement="bottom">
              <span class="article-footer-icon">
                <i class="iconfont el-icon-ali-message1" />
                666
              </span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="点赞" placement="bottom">
              <span class="article-footer-icon">
                <i class="iconfont el-icon-ali-zan" />
                666
              </span>
            </el-tooltip>
            <router-link class="read" :to="'/article/' + article.id" title="阅读全文">阅读全文</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-show="show" class="empty-box">
      <p><i class="iconfont el-icon-ali-cry" /></p>
      <p>暂时没有任何数据</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleBox',
  props: {
    type: {
      type: String,
      default: 'list'
    }
  },
  data() {
    return {
      show: false,
      loading: true,
      articles: []
    }
  },
  computed: {
    title() {
      let title = ''
      switch (this.type) {
        case 'top':
          title = '置顶博文'
          break
        case 'new':
          title = '最新博文'
          break
        case 'category':
          title = '分类'
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
  mounted() {
    this.initPage()
  },
  methods: {
    initPage() {
      switch (this.type) {
        case 'top':
          this.fetchTopArticles()
          break
        case 'new':
          this.fetchNewArticles()
      }
    },
    fetchTopArticles() {
      this.articles = [
        { id: 'neEznMB4b9',
          title: 'composer整理',
          abstract: 'Composer 是 PHP5.3以上 的一个依赖管理工具。 包依赖管理意思就是：一个项目中引入某个包，而这个包又需要引入其他一些包',
          cover: 'https://www.liulianjun.top/img/error-1.4628c045.jpg',
          category: 'PHP'
        },
        {
          id: 'AnXzeYzqNl',
          title: 'laravel-admin  批量操作js报错',
          abstract: '批量操作js报错 selectedRows is not defined',
          cover: 'https://www.liulianjun.top/img/error-1.4628c045.jpg',
          category: 'PHP'
        }
      ]
    },
    fetchNewArticles() {
      this.articles = [
        { id: 'neEznMB4b9',
          title: 'composer整理',
          abstract: 'Composer 是 PHP5.3以上 的一个依赖管理工具。 包依赖管理意思就是：一个项目中引入某个包，而这个包又需要引入其他一些包',
          cover: 'https://www.liulianjun.top/img/error-1.4628c045.jpg',
          category: 'PHP'
        },
        {
          id: 'AnXzeYzqNl',
          title: 'laravel-admin  批量操作js报错',
          abstract: '批量操作js报错 selectedRows is not defined',
          cover: 'https://www.liulianjun.top/img/error-1.4628c045.jpg',
          category: 'PHP'
        }
      ]
    }
  }
}
</script>

<style>
  .article-cover img:hover {
    transition: all .6s ease 0s;
    transform: scale(1.1);
  }
</style>
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
      -webkit-animation: 'el-icon-spin' 2s infinite;
      animation: 'el-icon-spin' 2s linear infinite;
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
      height: 150px;
      @media screen and (max-width: 768px) {
        height: 110px;
      }
      .article-left {
        height: 100%;
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
          height: 70px;
          font-size: 13px;
          line-height: 20px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          @media screen and (max-width: 768px) {
            height: 40px;
            -webkit-line-clamp: 2;
          }
        }
        .article-footer {
          color: #999;
          height: 22px;
          line-height: 27px;
          font-size: 13px;
          .category {
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
            .tag-name {
              color: #009688;
              margin-right: 5px;
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
  .article {
    padding: 15px;
    position: relative;
    overflow: hidden;
    background: #fff;
    border-bottom: 1px solid #f2f2f2;
    .flag {
      position: absolute;
      height: 20px;
      line-height: 20px;
      text-align: center;
      width: 74px;
      background-color: #ff5722;
      color: #fff;
      z-index: 1;
    }
    .flag-left {
      -webkit-transform: rotate(-45deg);
      transform: rotate(-45deg);
      left: -18px;
      top: 9px;
    }
    .article-left {
      width: 25%;
      float: left;
      overflow: hidden;
      border: 1px solid #f2f2f2;
      img {
        width: 100%;
        height: auto;
        vertical-align: middle;
        max-height: 130px;
      }
    }
  }
</style>
