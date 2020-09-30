<template>
  <el-form
    ref="form"
    :model="formModel"
    :rules="rules"
    :inline="inline"
    :label-width="labelWidth"
    @submit.native.prevent
  >
    <template v-for="item in formInputs">
      <el-form-item
        v-if="item._ifRender"
        :label="item.title"
        :key="item.key"
        :rules="item.rules"
        :prop="item.key"
      >
        <component
          :is="item.tag"
          v-model="formModel[item.key]"
          v-on="item.actions"
          v-bind="item.props"
        ></component>
      </el-form-item>
    </template>
  </el-form>

</template>

<script>
const tagMap = {
  text: {
    tag: 'form-input',
    props: {
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
    props: {
      range: true,
      showStops: true
    }
  },
  switch: {
    tag: 'form-switch'
  },
  dateRange: {
    tag: 'form-date',
    props: {
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
    formModel: Object,
    rules: {
      type: Object,
      default: _ => {}
    }
  },
  data() {
    return {
      observerKeys: []
    }
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

      item.tag = def.tag

      const _props = isFunction(item.props) ? item.props(form) : item.props

      item.props = Object.assign({}, def.props || {}, _props)

      if (isFunction(item.event)) {
        item.event(form)
      }
      if (isFunction(item.event) && !this.observerKeys.includes(item.key)) {
        this.$watch(`formModel.${item.key}`, item.event)
        this.observerKeys.push(item.key)
      }
      item._ifRender = isFunction(item.ifRender) ? !!item.ifRender(form) : true

      item.actions = item.actions(form)

      return item
    }
  }
}
</script>
