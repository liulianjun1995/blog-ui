<template>
  <div class="app-wrapper">
    <header-bar class="header-container" />
    <div class="main-container">
      <app-main />
    </div>
    <footer-bar />

    <el-tooltip placement="top" content="返回顶部">
      <back-to-top :visibility-height="300" transition-name="fade" />
    </el-tooltip>

    <el-drawer
      v-if="device === 'mobile'"
      ref="drawer"
      custom-class="drawer-menu"
      :visible="open"
      direction="ltr"
      style="margin-top: 56px;"
      size="200px"
      :show-close="false"
      :before-close="handleCloseDrawer"
    >
      <Menu :mode="'vertical'" />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { HeaderBar, AppMain, FooterBar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import Menu from '@/components/Menu'
import BackToTop from '@/components/BackToTop'

export default {
  name: 'Layout',
  components: { HeaderBar, AppMain, FooterBar, Menu, BackToTop },
  mixins: [ResizeMixin],
  data() {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    device() {
      return this.$store.state.app.device
    },
    open() {
      return this.sidebar.opened
    }
  },
  methods: {
    handleCloseDrawer() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>
<style lang="scss">
  .el-drawer__wrapper {
    .drawer-menu {
      background-color: #393d49;
      .el-drawer__header {
        display: none;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
