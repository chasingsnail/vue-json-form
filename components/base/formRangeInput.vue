<template>
  <div class="range-wrap">
    <el-form-item>
      <div class="range-input">
        <el-input
          v-model="start"
          :placeholder="placeholders[0]"
          @blur="checkNumber(true, $event)"
          @keyup.native="formatNumber"
        />
      </div>
    </el-form-item>
    <span class="spacer">至</span>
    <el-form-item>
      <div class="range-input">
        <el-input
          v-model="end"
          :placeholder="placeholders[1]"
          @blur="checkNumber(false, $event)"
          @keyup.native="formatNumberEnd"
        />
      </div>
    </el-form-item>
    <span class="unit">{{unit}}</span>
  </div>
</template>

<script>
export default {
  props: {
    value: Array,
    propKey: Array,
    placeholders: {
      type: Array,
      default: _ => ['', '']
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      start: this.value[0],
      end: this.value[1]
      // modal: this.value
    }
  },
  watch: {
    value(newV) {
      this.start = newV[0]
      this.end = newV[1]
    },
    // start(val) {
    //   this.$emit('input', [val, this.end])
    // },
    // end(val) {
    //   this.$emit('input', [this.start, val])
    // },
    modal(val) {
      if (Number(val[0]) > Number(val[1])) { return this.$message.warning('起始数值大于结束数值') }
      this.$emit('input', val)
    }
  },
  methods: {
    formatNumber(e) {
      const { value } = e.target
      this.$nextTick(_ => {
        e.target.value = value.replace(/[^\d]/g, '')
        this.$emit('input', [e.target.value, this.end])
      })
    },
    formatNumberEnd(e) {
      const { value } = e.target
      this.$nextTick(_ => {
        e.target.value = value.replace(/[^\d]/g, '')
        this.$emit('input', [this.start, e.target.value])
      })
    },
    checkNumber(isStart = false, e) {
      // const { value } = e.target
      const { value } = e.target
      console.log(value, 'blur')
      if (isNaN(Number(value))) {
        const val = isStart ? ['', this.end] : [this.start, '']
        this.$message.warning('请输入正整数')
        this.$emit('input', val)
      }
    },
    isNumber(val) {
      let _val = Number(val)
      return !isNaN(_val)
    },
    testValid(val) {
      const start = val[0]
      const end = val[1]
      if (!this.isNumber(start) || !this.isNumber(end)) { return this.$message.warning('非数字') }
    }
  }
}
</script>

<style lang='scss' scoped>
// .range-wrap /deep/ .el-form-item {
//   margin-bottom: 0;
// }
.range-input /deep/ {
  .el-input {
    height: 2rem;
    width: 4rem;
    font-size: 0.8rem;
    .el-input__inner {
      height: 2rem;
    }
  }
}
.spacer {
  margin-right: 10px;
}
</style>
