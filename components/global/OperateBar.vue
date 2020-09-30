<template>
  <div class="operate-wrap">
    <div class="content">
      <slot />
    </div>
    <div class="button-group">
      <el-button size="small"
        :type="type"
        @click="triggerEvent"
      >{{text}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperateBar',
  props: {
    text: String,
    type: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {}
  },
  methods: {
    triggerEvent() {
      this.$emit('handleEvent')
    }
  }
}
</script>

<style lang='scss' scoped>
.operate-wrap {
  display: flex;
  min-height: 40px;
  margin-bottom: 12px;
  .content {
    flex: 1;
  }
  .button-group {
    margin-left: 10px;
  }
}
</style>
