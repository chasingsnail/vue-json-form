<template>
  <el-date-picker
    v-bind="$attrs"
    v-on="$listeners"
    :type="type"
    range-separator="-"
    :clearable="false"
    :editable="false"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    :picker-options="pickerOptions"
    :default-time="defaultTime"
  >
  </el-date-picker>
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
    // value: {
    //   // type: [String, Array, Object, Number],
    //   default: ''
    // },
    type: {
      type: String,
      default: 'daterange'
    },
    limit: {
      // type: Date,
      default: 0
    },
    options: {
      type: Object,
      default: null
    },
    defaultTime: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // modal: this.value,
      // pickerOptions: this.options ? this.options : mode(this.limit)
    }
  },
  computed: {
    pickerOptions() {
      return this.options ? this.options : mode(this.limit)
    }
  },
  // watch: {
  //   value(newV) {
  //     this.modal = newV
  //   },
  //   modal(val) {
  //     this.$emit('input', val)
  //   }
  // },
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
