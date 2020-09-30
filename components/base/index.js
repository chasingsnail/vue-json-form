import Vue from 'vue'

const requireComponent = require.context('./', false, /\.vue$/)

requireComponent.keys().forEach(fileName => {
  const _fileName = fileName.replace(/(\.\/|\.vue)/g, '')
  const componentConfig = requireComponent(fileName)
  const componentName = _fileName.charAt(0).toUpperCase() + _fileName.slice(1)

  // 全局注册组件
  Vue.component(componentName, componentConfig.default || componentConfig)
})
