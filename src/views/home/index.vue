<template>
  <div class="app-container">
    <el-row class="margin-bottom-xs">
      <el-col :span="24">
        <tip />
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16" class="margin-bottom-xs">
        <carousel class="margin-bottom-xs" />
        <article-box type="top" class="margin-bottom-xs" />
        <article-box type="new" />
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-row>
          <el-col :span="24" class="margin-bottom-xs">
            <info />
          </el-col>
          <el-col :xs="24" :sm="12" :md="24" :lg="24" :xl="24" class="margin-bottom-xs">
            <article-card type="hot" />
          </el-col>
          <el-col :xs="24" :sm="12" :md="24" :lg="24" :xl="24">
            <article-card type="recommend" />
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
import ArticleBox from '@/components/ArticleBox'
import { setToken } from '@/utils/auth'

export default {
  name: 'Home',
  components: { Tip, Carousel, Info, ArticleCard, ArticleBox },
  mounted() {
    if (this.$route.query.access_token) {
      setToken(this.$route.query.access_token)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
