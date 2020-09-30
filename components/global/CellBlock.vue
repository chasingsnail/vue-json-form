<template>
  <div class="boxWrap">
    <div
      class="boxTitle"
      v-if="title"
    >{{title}}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.boxWrap {
  padding: 8px;
  // border: 1px solid #E4E4E4;
  border-radius: 2px;
  background-color: #fff;
  & + .boxWrap {
    margin-top: 8px;
  }
  .boxTitle {
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.5;
    color: #333333;
  }
}
</style>
