<template>
  <el-radio-group v-model="modal" :disabled="disabled">
    <el-radio
      v-for="item in options"
      :label="item[vKey]"
      :key="item[vKey]"
      :disabled="item.disabled"
    >{{item[vLabel]}}</el-radio>
  </el-radio-group>
</template>

<script>
export default {
  watch: {
    value(newV) {
      this.modal = newV
    },
    modal(val) {
      this.$emit('input', val)
    }
  },
  props: {
    value: {
      type: [String, Number]
    },
    options: {
      type: Array
    },
    vLabel: {
      type: String,
      default: 'label'
    },
    vKey: {
      type: String,
      default: 'value'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modal: this.value
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
