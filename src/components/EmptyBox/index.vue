<template>
  <div class="empty-box">
    <p><i class="iconfont el-icon-ali-cry" /></p>
    <p>暂时没有任何数据</p>
  </div>
</template>

<script>
export default {
  name: 'EmptyBox'
}
</script>

<style scoped lang="scss">
  .empty-box {
    background-color: #fff;
    padding: 25px 15px;
    text-align: center;
    font-size: 18px;
    p {
      margin: 14px 0;
      .iconfont {
        font-size: 50px;
        color: #5fb878;
      }
    }
  }
</style>
