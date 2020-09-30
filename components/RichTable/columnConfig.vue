<script>
import { TableColumn } from 'element-ui'

// renderCell 函数，类型可扩展
const renderCell = {
  slots: function(h, data) {
    // 接受传入的renderCell函数
    let renderCell = () => {
      return this.renderCell ? this.renderCell(data) : ''
    }
    return <div class="cell">{renderCell(h, data)}</div>
  },
  expand: function(h, data) {
    let renderCell = () => {
      return this.renderCell ? this.renderCell(data) : ''
    }
    return <div class="cell">{renderCell(h, data, this._renderProxy)}</div>
  }
}
export default {
  extends: TableColumn, // 继承el-table-column
  props: {
    cellType: {
      type: String
    },
    renderCell: {
      type: Function
    }
  },
  // el-table-column 先调用在调用本身的
  created() {
    if (renderCell[this.cellType]) {
      if (this.cellType === 'expand') {
        this.owner.renderExpanded = renderCell['slots'].bind(this)
        return this.columnConfig.renderCell.bind(this)
      }
      this.columnConfig.renderCell = renderCell[this.cellType].bind(this)
    }
  }
}
</script>
