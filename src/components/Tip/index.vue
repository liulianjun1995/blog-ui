<template>
  <div class="tips">
    <i class="iconfont el-icon-ali-volume-up" />
    <div class="tips-content">
      <template v-for="(tip, tip_index) in tips">
        <transition :key="tip_index + 'transition'" name="el-fade-in">
          <span
            v-show="tip.show"
            :key="tip_index + 'tip'"
            class="tip transition-box"
            :style="{color: tip.color, display: 'block'}"
            @click="goLink(tip)"
          >
            {{ tip.title }}
          </span>
        </transition>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tip',
  data() {
    return {
      tips: [
        { title: '新版博客采用Laravel+vue前后台分离。', color: '#16b60f', link: 'https://www.baidu.com', show: true },
        { title: '之前网站出BUG了，新用户登录后服务器出错：500，现已修复。', color: '#e13232', link: null, show: false },
        { title: '新增博文评论功能', color: '#34e9df', link: null, show: false }
      ]
    }
  },
  mounted() {
    const _this = this
    _this.initTips()
    _this.fetchData()
  },
  methods: {
    initTips() {
      const _this = this
      let n = 0
      setInterval(() => {
        n++
        _this.tips.forEach((v, i) => {
          n >= _this.tips.length && (n = 0)
          v.show = i === n
        })
      }, 3000)
    },
    fetchData() {
      // const _this = this
    },
    goLink(tip) {
      if (tip.link) {
        window.open(tip.link, '_blank')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .tips {
    border: 1px solid #ddd;
    padding: 10px 10px;
    background: #fff;
    font-size: 13px;
    text-align: left;
    .el-icon-ali-volume-up {
      color: #009688;
      font-size: 17px;
      float: left;
    }
    .tips-content {
      display: inline-block;
      height: 17px;
      line-height: 17px;
      overflow: hidden;
      .tip {
        cursor: pointer;
        margin-bottom: 5px;
        margin-left: 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
</style>
