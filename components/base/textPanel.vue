<template>
  <div>
    {{modal}}
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      modal: this.value
    }
  },
  watch: {
    value(val) {
      console.log('update', val)
      this.modal = val
    },
    modal(val) {
      console.log('$emit')
      this.$emit('input', val)
    }
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
