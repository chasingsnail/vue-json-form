<template>
  <el-select
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-option
      v-for="item in options"
      :key="item[vKey]"
      :label="item[vLabel]"
      :value="item[vKey]"
    />
  </el-select>
</template>

<script>
export default {
  props: {
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
    }
  },
  mounted() {
    console.log(this.$attrs, this.$props)
  }
}
</script>
