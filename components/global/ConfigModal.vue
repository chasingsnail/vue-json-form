<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="40%"
  >
    <ConfigForm
      ref="filter"
      :inline="false"
      :formModel="form"
      :formItems="items"
    />
    <span
      v-if="noAction"
      slot="footer"
      class="dialog-footer"
    >
      <el-button size="small"
        type="primary"
        @click="close"
      >确定</el-button>
    </span>
    <span
      v-else
      slot="footer"
      class="dialog-footer"
    >
      <el-button size="small" @click="close">取消</el-button>
      <el-button size="small"
        type="primary"
        @click="handleConfirm"
        :loading="loading"
      >提交</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ConfigModal',
  props: {
    form: Object,
    items: Array,
    mark: {
      type: String,
      default: 'id'
    },
    noAction: {
      // 是否需要提交
      type: Boolean,
      default: false
    },
    headTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false
    }
  },
  computed: {
    isEdit() {
      return !!this.form[this.mark]
    },
    title() {
      const pre = this.$route.meta.routeName
      const type = this.isEdit ? '编辑' : '新增'
      return this.headTitle || `${pre}-${type}`
    }
  },
  watch: {
    dialogVisible(val) {
      if (!val) {
        this.$refs.filter.$refs['form'].resetFields()
      }
    }
  },
  methods: {
    open() {
      this.dialogVisible = true
    },
    close() {
      this.dialogVisible = false
    },
    resultCatch(flag) {
      this.loading = false
      if (flag) {
        this.close()
      }
    },
    handleConfirm() {
      this.$refs.filter.$refs['form'].validate(valid => {
        if (valid) {
          console.log('submit!')
          this.loading = true
          this.$emit('handleConfirm', this.resultCatch)
          // this.close()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
