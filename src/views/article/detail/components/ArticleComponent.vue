<template>
  <div class="article-component">
    <div class="component-box">
      <a href="javascript:" class="component praise">
        <i class="iconfont el-icon-ali-zan" />
        点赞（{{ praises }}）
      </a>
      <a href="javascript:" class="component share">
        <i class="iconfont el-icon-ali-share" />
        分享（{{ shares }}）
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    praises: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">
  .article-component {
    border: 1px solid #ddd;
    padding: 20px 0;
    background-color: #fff;
    .component-box {
      margin: 0 auto;
      text-align: center;
      position: relative;
      width: 300px;
      .component {
        text-indent: 1em;
        padding: 12px 14px;
        color: #fff;
        font-size: 14px;
      }
      .praise {
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
        background: -webkit-gradient(linear,left top,right top,from(#ff5722),to(#f78d6b));
        background: linear-gradient(90deg,#ff5722,#f78d6b);
        &:hover {
          background: #ff5722;
        }
      }
      .share {
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        background: -webkit-gradient(linear,left top,right top,from(#ffd362),to(#ffb800));
        background: linear-gradient(90deg,#ffd362,#ffb800);
        &:hover {
          background: #ffb800;
        }
      }
    }
  }
</style>
