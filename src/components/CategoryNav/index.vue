<template>
  <el-card class="nav-box" shadow="never">
    <div class="box-title">分类导航</div>
    <el-row :gutter="10">
      <el-col v-for="(item, index) in article" :key="index" :span="12">
        <router-link :key="index + 'article-nav'" :class="{ active: item.title === current }" :to="{ name: item.title }">{{ item.title }}</router-link>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'CategoryNav',
  props: {
    current: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      menus: []
    }
  },
  computed: {
    article() {
      return [
        { title: 'PHP' },
        { title: 'Mysql' },
        { title: 'HTTP' },
        { title: 'Redis' },
        { title: 'Linux' },
        { title: 'Web' },
        { title: 'Wechat' }
      ]
    }
  },
  mounted() {
    const _this = this
    _this.fetchData()
  },
  methods: {
    fetchData() {

    }
  }
}
</script>
<style scoped lang="scss">
  .nav-box {
    display: block;
    background: #fff;
    color: #333;
    font-size: 14px;
    padding: 0 10px;
    height: 100%;
    border: 1px solid #ddd;
    .box-title {
      padding: 0 0 5px 0;
      font-weight: 500;
      font-size: 15px;
      text-align: center;
      border-bottom: 1px solid #009688;
      margin-bottom: 5px;
    }
    a {
      border: 1px solid #d2d2d2;
      background: inherit;
      font-size: 14px;
      color: #444;
      padding: 7px 1%;
      margin: 5px 0;
      text-align: center;
      line-height: 19px;
      word-break: all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      &:hover {
        border: 1px solid #5FB878;
        color: #5FB878;
      }
      &.active {
        background: #5FB878;
        color: #FFF;
      }
    }
  }
</style>
