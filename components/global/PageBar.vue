<template>
  <div class="pagination-wrap">
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
    >
    </el-pagination>
    <a class="switch">跳转</a>
  </div>
</template>

<script>
export default {
  name: 'PageBar',
  props: {
    total: Number,
    currentPage: Number,
    pageSize: {
      type: Number,
      default: GLOBAL_VAR.PAGE_SIZE
    }
  },
  data() {
    return {}
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('update:currentPage', val)
      this.$emit('handleCurrentChange')
    }
  }
}
</script>

<style lang='scss' scoped>
.pagination-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 0;
  line-height: 1;
  .switch {
    padding-left: 15px;
    font-size: 14px;
    color: $theme;
    cursor: pointer;
  }
}
</style>
