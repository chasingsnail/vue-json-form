<template>
  <div>
    <el-autocomplete
      v-model="modal"
      v-bind="$attrs"
      v-on="$listeners"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  name: 'searchInput',
  props: {
    value: {
      default: ''
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
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
