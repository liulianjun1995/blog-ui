<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  margin: 0 auto;
  @media screen and (min-width: 768px) {
    width: 750px;
  }
  @media screen and (min-width: 992px) {
    width: 970px;
  }
  @media screen and (min-width: 1200px) {
    width: 1170px;
  }
  min-height: calc(100vh - 57px);
  position: relative;
  overflow: hidden;
  background-color: #eee;
  -webkit-box-shadow: 0 0 10px 2px #666;
  box-shadow: 0 0 10px 2px #666;
}
</style>
