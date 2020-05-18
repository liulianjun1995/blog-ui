<template>
  <div class="article-list">
    <el-row class="margin-bottom-xs">
      <breadcrumb />
    </el-row>
    <el-row :gutter="10">
      <el-col class="margin-bottom-xs" :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <div class="left-box">
          <article-box />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-row :gutter="10">
          <el-col class="margin-bottom-xs box" :xs="24" :sm="12" :md="24" :lg="24" :xl="24">
            <category-nav :current="$route.meta.title" />
          </el-col>
          <el-col class="margin-bottom-xs box" :xs="24" :sm="12" :md="24" :lg="24" :xl="24">
            <article-card type="recommend" />
          </el-col>
          <el-col class="margin-bottom-xs box" :xs="24" :sm="12" :md="24" :lg="24" :xl="24">
            <article-card type="random" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ArticleCard from '@/components/ArticleCard'
import ArticleBox from '@/components/ArticleBox'
import CategoryNav from '@/components/CategoryNav'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'ArticleList',
  components: {
    Breadcrumb, ArticleBox,
    ArticleCard, CategoryNav
  },
  data() {
    return {
      loading: false,
      articles: []
    }
  }
}
</script>

<style scoped lang="scss">
  .article-list {
    min-height: 700px;
    margin: 0 auto;
    -webkit-box-shadow: 0 0 10px 2px #666;
    box-shadow: 0 0 10px 2px #666;
    padding: 15px 15px;
  }
</style>
