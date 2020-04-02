<template>
  <div class="article-card">
    <span class="card-title">
      <i class="iconfont" :class="icon" />
      {{ title }}
    </span>
    <ul class="card-list">
      <template v-for="(item, index) in articles">
        <li :key="index">
          <span class="card-badge" :class="index > 2 ? 'card-badge-blue' : ''">{{ index + 1 }}</span>
          <router-link :to="'/article/' + item.token" :title="item.title">{{ item.title }}</router-link>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    articles: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  .article-card {
    background: #fff;
    height: 100%;
    border: 1px solid #ddd;
    .card-title {
      width: 100%;
      display: inline-block;
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
        line-height: 24;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        a {
          color: #333;
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
  }
</style>

