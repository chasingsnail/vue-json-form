<template>
  <div>
    <el-date-picker
      :value="reference"
      type="date"
      disabled
      placeholder="选择日期"
    >
    </el-date-picker>
    <span class="spacer">到</span>
    <el-date-picker
      v-model="modal"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions"
      :clearable="false"
    >
    </el-date-picker>
  </div>
</template>

<script>
const mode = num => {
  return {
    disabledDate(time) {
      return time.getTime() > Date.now() - num * 24 * 60 * 60 * 1000
    }
  }
}
export default {
  props: {
    value: {
      default: ''
    },
    limit: {
      default: 0
    },
    reference: {
      default: ''
    },
    options: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      modal: this.value,
      pickerOptions: this.options ? this.options : mode(this.limit)
    }
  },
  watch: {
    value(newV) {
      console.log(newV, 'radio')
      this.modal = newV
    },
    modal(val) {
      console.log('modal', val)
      this.$emit('input', val)
    }
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
.spacer {
  margin: 0 10px;
}
</style>
