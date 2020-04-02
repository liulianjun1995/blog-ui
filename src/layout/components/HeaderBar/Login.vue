<template>
  <div class="login-content">
    <template v-if="avatar">
      <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
        <el-avatar class="avatar" :src="avatar" @click="logout" />
      </el-tooltip>
    </template>
    <template v-else>
      <el-tooltip class="item" effect="dark" content="QQ登录" placement="bottom">
        <i class="iconfont icon el-icon-ali-qq" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="Github登录" placement="bottom">
        <i class="iconfont icon el-icon-ali-github" />
      </el-tooltip>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Login',
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-content {
    height: 56px;
    line-height: 56px;
    text-align: center;
    .avatar {
      margin-top: 8px;
      cursor: pointer;
    }
    .icon {
      color: #c2c2c2;
      font-size: 30px;
      line-height: 60px;
      cursor: pointer;
      margin-right: 5px;
      &:hover {
        color: #fff;
      }
    }
  }
</style>
