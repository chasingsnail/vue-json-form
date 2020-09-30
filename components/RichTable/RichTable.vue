<template>
  <el-table
    :data="tableData"
    size="small"
    :showHover="showHover"
    style="width: 100%;"
    v-on="$listeners"
    v-bind="$attrs"
  >
    <!-- 筛选 -->·
    <el-table-column
      v-if="select"
      type="selection"
      width="55"
    >
    </el-table-column>
    <el-table-column
      v-if="showIndex"
      label="序号"
      width="60"
      :align="columnsAlign"
      :formatter="formatterIndex"
    >
    </el-table-column>

    <slot name="fix" />

    <!-- 数据 -->
    <ColumnConfig
      v-for="column in tableColumns"
      :header-align="columnsAlign"
      :column-key="column.prop"
      :key="column.prop"
      :align="columnsAlign"
      :resizable="resizable"
      v-bind="column"
    >
      <template v-if="column.children">
        <ColumnConfig
          v-for="child in column.children"
          header-align="center"
          :column-key="child.prop"
          :key="child.prop"
          :align="columnsAlign"
          :resizable="resizable"
          v-bind="child"
        />
      </template>

    </ColumnConfig>

    <!-- 默认插槽，可不用 -->
    <slot />

    <!-- 操作  -->
    <slot name="operate">
    </slot>

  </el-table>
</template>

<script>
import ColumnConfig from './columnConfig'
export default {
  name: 'richTable',
  props: {
    showIndex: {
      // 是否展示序号
      type: Boolean,
      default: true
    },
    select: {
      // 筛选开关
      type: Boolean,
      default: false
    },
    columnsAlign: {
      // 行内对齐方式
      type: String,
      default: 'left'
    },
    tableColumns: {
      // 列表项配置
      type: Array,
      default: _ => []
    },
    tableData: {
      // 数据源
      type: Array,
      default: _ => []
    },
    resizable: {
      type: Boolean,
      default: false
    },
    showHover: {
      type: Boolean,
      default: true
    }
  },
  components: {
    ColumnConfig
  },
  data() {
    return {}
  },
  methods: {
    formatterIndex(row, column, cellValue, index) {
      return index + 1
    }
    // rowSelect(selection, row) {
    //   this.$emit('rowSelect', selection, row)
    // },
    // selectTable(rowObj) {
    //   this.$emit('tableSelectRow', rowObj)
    // },
    // handleSelectionChange(val) {
    //   this.$emit('handleSelectionChange', val)
    // }
  }
}
</script>

<style lang='scss' scoped>
</style>
