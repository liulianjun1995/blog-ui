<template>
  <div class="app-container">
    <el-row class="margin-bottom-xs">
      <el-col :span="24">
        <Tip />
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <Carousel />
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-row>
          <el-col :span="24" class="margin-bottom-xs">
            <info />
          </el-col>
          <el-col :xs="24" :sm="12" :md="24" :lg="24" :xl="24" class="margin-bottom-xs">
            <article-card icon="el-icon-ali-huomiao" title="热文排行" />
          </el-col>
          <el-col :xs="24" :sm="12" :md="24" :lg="24" :xl="24">
            <article-card icon="el-icon-ali-zan" title="作者推荐" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Tip from '@/components/Tip'
import Carousel from '@/components/Carousel'
import Info from './components/info'
import ArticleCard from '@/components/ArticleCard'

export default {
  name: 'Home',
  components: { Tip, Carousel, Info, ArticleCard }
}
</script>

<style lang="scss" scoped>

</style>
