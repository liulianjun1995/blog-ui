<template>
  <div>
    <el-row>
      <el-col :span="6">
        <logo v-if="device === 'desktop'" />
        <Login v-else :style="{backgroundColor: variables.menuBg}" />
      </el-col>
      <el-col :span="14">
        <Menu v-if="device === 'desktop'" />
        <logo v-else />
      </el-col>
      <el-col :span="4">
        <Login v-if="device === 'desktop'" :style="{backgroundColor: variables.menuBg}" />
        <div v-else class="drawer-bg" :style="{backgroundColor: variables.menuBg}">
          <a class="drawer-bg-icon" href="javascript:" @click="toggleSideBar">
            <i class="iconfont el-icon-ali-nav" />
          </a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Menu from '@/components/Menu'
import Logo from './Logo'
import Login from './Login'
import variables from '@/styles/variables.scss'

export default {
  name: 'HeaderBar',
  components: { Menu, Logo, Login },
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
    device() {
      return this.$store.state.app.device
    },
    variables() {
      return variables
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
  .drawer-bg {
    height: 56px;
    line-height: 56px;
    text-align: center;
    .drawer-bg-icon {
      padding: 8px 10px;
      color: #fff;
      border: 1px solid #009688;
    }
  }
</style>
