<template>
  <div class="formInput">
    <el-input
      v-bind="$attrs"
      v-on="$listeners"
    ></el-input>
    <span
      class="unit"
      v-if="unit"
    >{{unit}}</span>
  </div>
</template>

<script>
export default {
  name: 'formInput',
  props: {
    unit: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='scss' scoped>
.formInput {
  display: flex;
  .unit {
    margin-left: 12px;
  }
}
</style>
