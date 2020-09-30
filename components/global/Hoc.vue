<script>
export default {
  props: {
    item: Object
  },
  render(h) {
    const { item } = this
    const WrapComp = item.tag
    if (item.renderCell) {
      return item.renderCell
    } else {
      return h(WrapComp, {
        on: this.$listeners,
        attrs: { ...this.$attrs, ...item.attrs },
        props: this.$props
      })
    }
  }
}
</script>
