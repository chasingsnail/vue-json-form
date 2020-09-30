<template>
  <div>
    <div
      class="setRow"
      v-for="(item, index) in modal"
      :key="index"
    >
      <div class="model">
        <el-select
          v-model="item.machineCode"
          :disabled="!!item.id"
          placeholder="请选择GPU型号"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="num">
        <el-input v-model="item.totalCount" :maxlength="6"/> 块
      </div>
      <div class="flag">
        <el-input
          v-model="item.poolFlag"
          placeholder="资源标识"
        />
      </div>
      <el-button
        v-if="length === index + 1"
        size="mini"
        icon="el-icon-plus"
        circle
        @click="addNewRow"
      ></el-button>
      <el-button
        v-if="length !== 1"
        size="mini"
        type="danger"
        icon="el-icon-minus"
        circle
        @click="deleteRow(index)"
      ></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'formGroupInput',
  props: {
    value: Array,
    options: Array,
    disabled: Boolean
  },
  data() {
    return {
      modal: this.value
    }
  },
  computed: {
    length() {
      return this.modal.length
    }
  },
  watch: {
    value(newV) {
      this.modal = newV
    },
    modal(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    addNewRow() {
      const obj = {
        machineCode: '',
        totalCount: '',
        poolFlag: ''
      }
      this.modal = [...this.modal, obj]
    },
    deleteRow(index) {
      this.modal.splice(index, 1)
    }
  }
}
</script>

<style lang='scss' scoped>
.setRow {
  display: flex;
  align-items: center;
  & + .setRow {
    margin-top: 20px;
  }
  .model {
    /deep/ .el-input {
      width: 150px;
    }
  }
  .num {
    width: 80px;
    margin-left: 5px;
    white-space: nowrap;
    /deep/ .el-input {
      width: 60px;
    }
  }
  .flag {
    margin: 0 10px 0 5px;
    /deep/ .el-input {
      width: 95px;
    }
  }
}
</style>
