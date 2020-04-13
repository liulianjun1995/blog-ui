<template>
  <el-pagination
    background
    layout="prev, pager, next"
    :page-size="pageSize"
    :total="total"
    hide-on-single-page
    @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageSize: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('currentPage', val)
    }
  }
}
</script>

<style scoped>

</style>
