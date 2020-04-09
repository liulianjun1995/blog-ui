<template>
  <el-menu
    class="el-menu-demo"
    :default-active="activeMenu"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :active-text-color="variables.menuActiveText"
    :collapse-transition="false"
    :mode="mode"
  >
    <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" :mode="mode" />
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  name: 'Menu',
  components: { SidebarItem },
  props: {
    mode: {
      type: String,
      default: 'horizontal'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  }
}
</script>
<style lang="scss">
  .el-menu--horizontal {
    .el-menu {
      max-width: 200px;
    }
  }
</style>
