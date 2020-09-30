<template>
  <el-menu
    :default-active="currentPath"
    class="el-menu-vertical-demo"
    background-color="#313541"
    text-color="#acaeb3"
    active-text-color="#fff"
    unique-opened
    router
  >
    <el-submenu
      v-for="item in combineRoute"
      :key="item.name"
      :index="item.name"
    >
      <template slot="title">
        <i class="menu-icon" :class="'icon-' + item.name"></i>
        <span>{{item.meta.routeName}}</span>
      </template>
      <template v-for="route in item.children">
        <el-menu-item
          v-if="!route.meta.isSubItem"
          :key="route.name"
          :index="'/' + item.name + '/' + route.path"
        ><span class="dot"></span>{{route.meta.routeName}}</el-menu-item>
      </template>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  props: ['currentPath', 'combineRoute'],
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
.menu-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 20px;
  background: no-repeat center;
}
.icon-monitoring {
  background-image: url('../../assets/images/monitor.png');
  background-size: 18px;
}
.icon-management {
  background-image: url('../../assets/images/manage.png');
  background-size: 18px;
}
.icon-applyment {
  background-image: url('../../assets/images/apply.png');
  background-size: 18px;
}
.icon-monitoringNotification {
  background-image: url('../../assets/images/monitoringNotification.png');
  background-size: 24px;
}
.icon-trainTask {
  background-image: url('../../assets/images/task.png');
  background-size: 18px;
}
.icon-alarmMonitoring {
  background-image: url('../../assets/images/task.png');
  background-size: 18px;
}
.dot {
  position: relative;
  display: inline-block;
  font-size: 50px;
  height: 50px;
  width: 10px;
  margin-right: 10px;
  &::after {
    position: absolute;
    top: 23px;
    left: 4px;
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #acaeb3;
  }
}
</style>
