<template>
  <div>
    <RichTable
      v-on="$listeners"
      v-bind="$attrs"
    ></RichTable>

    <div
      class="pagination-wrap"
      v-if="total > 0"
    >
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
  </div>
</template>

<script>
import RichTable from 'components/RichTable'
export default {
  name: 'FullTable',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: GLOBAL_VAR.PAGE_SIZE
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {}
  },
  components: {
    RichTable
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
