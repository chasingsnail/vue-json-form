<template>
  <el-form
    ref="form"
    :model="formModel"
    :rules="rules"
    :inline="inline"
    size="small"
    :label-width="labelWidth"
    @submit.native.prevent
    style="display: inline"
  >
    <template v-for="item in formInputs">
      <el-form-item
        v-if="item._ifRender"
        :label="item.title"
        :key="item.key"
        :rules="item.rules"
        :prop="item.key"
      >
        <hoc v-model="formModel[item.key]" v-on="item.on" v-bind="item.props" :item="item"></hoc>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
const tagMap = {
  text: {
    tag: 'el-input',
    attrs: {
      clearable: true
    }
  },
  checkbox: {
    tag: 'el-checkbox'
  },
  radio: {
    tag: 'form-radio'
  },
  select: {
    tag: 'form-select'
  },
  slider: {
    tag: 'form-slider',
    attrs: {
      range: true,
      showStops: true
    }
  },
  switch: {
    tag: 'form-switch'
  },
  dateRange: {
    tag: 'form-date',
    attrs: {
      clearable: false,
      editable: false
    }
  },
  plainText: {
    tag: 'text-panel'
  },
  rangeInput: {
    tag: 'form-range-input'
  },
  compareTime: {
    tag: 'compare-time'
  },
  groupInput: {
    tag: 'form-group-input'
  },
  searchInput: {
    tag: 'form-search-input'
  }
}

function isFunction(fn) {
  return typeof fn === 'function'
}

export default {
  props: {
    inline: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: String,
      default: 'auto'
    },
    formItems: Array,
    rules: {
      type: Object,
      default: _ => {}
    },
    formModel: Object
  },
  computed: {
    formInputs() {
      return this.formItems.map(item => this.computeItem(item, this.formModel))
    }
  },
  methods: {
    computeItem(config, form) {
      let item = { ...config }
      const type = item.type || 'text'
      let def = tagMap[type]
      // 映射标签
      item.tag = def.tag
      // 维护props与attrs
      const _props = item.props
        ? isFunction(item.props)
          ? item.props(form)
          : item.props
        : {}
      const _renderCells = isFunction(item.renderCell)
        ? item.renderCell(form)
        : null
      // 触发收集依赖
      item.props = Object.keys(_props).reduce(
        (prev, key) => {
          prev[key] = _props[key]
          return prev
        },
        { ...def.attrs }
      )
      item.renderCell = _renderCells
      item._ifRender = isFunction(item.ifRender) ? !!item.ifRender(form) : true
      return item
    },
    // 重置验证
    resetValidate(keys = []) {
      this.$refs.form.clearValidate(keys)
    },
    // 表单校验
    checkForm() {
      return new Promise((resolve, reject) => {
        this.$refs['form'].validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject(new Error('invalid input'))
          }
        })
      })
    }
  }
}
</script>
