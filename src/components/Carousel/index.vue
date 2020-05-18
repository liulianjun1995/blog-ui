<template>
  <el-card class="carousel" shadow="never">
    <el-carousel ref="carousel" :height="carouselHeight + 'px'">
      <el-carousel-item v-for="(carousel, index) in carousels" :key="index">
        <p class="carousel-title">{{ carousel.title }}</p>
        <el-image
          style="width: 100%; height: 100%;"
          :src="carousel.img"
        />
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<script>
const carousels = [
  { title: '图片1', link: '', img: 'https://t9.baidu.com/it/u=2268908537,2815455140&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1586418572&t=aeed513eb5b4608308da5b57c9d61756' },
  { title: '图片2', link: '', img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=398243250,2131012219&fm=26&gp=0.jpg' }
]
export default {
  name: 'Carousel',
  data() {
    return {
      carousels: [],
      carouselHeight: '380'
    }
  },
  mounted() {
    const _this = this
    _this.fetchData()
    _this.setCarouselSize()
    window.addEventListener('resize', _this.setCarouselSize, false)
  },
  destroyed() {
    const _this = this
    window.removeEventListener('resize', _this.setCarouselSize)
  },
  methods: {
    setCarouselSize() {
      const _this = this
      const clientWidth = _this.$refs.carousel.$el.clientWidth
      if (clientWidth <= 640) {
        _this.carouselHeight = clientWidth / 2
      } else {
        _this.carouselHeight = 380
      }
    },
    fetchData() {
      const _this = this
      _this.carousels = carousels
    }
  }
}
</script>

<style scoped lang="scss">
  .carousel {
    /deep/ .el-card__body {
      padding: unset;
    }
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 5px;
    .el-carousel {
      overflow: hidden;
      cursor: pointer;
      .carousel-title {
        z-index: 2;
        position: absolute;
        color: #ffffff;
        margin: 5px;
        padding: 5px 10px;
        background-color: rgba(0,0,0,.3);
        font-size: 15px;
      }
    }
  }
</style>
