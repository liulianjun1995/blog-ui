<template>
  <el-card class="breadcrumb" shadow="never">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <i class="icon el-icon-location-outline" />
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'|| index === levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </el-card>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
export default {
  props: {
    appendLevels: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    },
    appendLevels() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isHome(first)) {
        matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      this.levelList = this.levelList.concat(this.appendLevels)
    },
    isHome(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style scoped lang="scss">
  .breadcrumb {
    /deep/ .el-card__body {
      padding: unset;
    }
  }
  .el-breadcrumb {
    padding: 10px 10px;
    background: #fff;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .icon {
      color: #01aaed;
      font-size: 14px;
      float: left;
      margin: 5px 0;
      margin-right: 5px;
    }
    .el-breadcrumb__item {
      margin: 5px 0;
    }
  }
</style>
