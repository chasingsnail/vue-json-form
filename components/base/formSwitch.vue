<template>
  <el-switch
    v-model="modal"
  >
  </el-switch>
</template>

<script>
export default {
  name: 'formSwitch',
  props: {
    value: {
      default: false
    }
  },
  data() {
    return {
      modal: this.value
    }
  },
  watch: {
    value(newV) {
      this.modal = newV
    },
    modal(val) {
      this.$emit('input', val)
    }
  }
}
</script>
