<template>
  <div class="breadcrumb-wrap">
    <el-breadcrumb separator-class="el-icon-caret-right">
      <el-breadcrumb-item
        v-for="(route, index) in currentRoute"
        :class="{'cur': index === 1 }"
        :key="route.name"
      >{{route.meta.routeName}}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown
      class="change-deploy-train"
      v-show="showResourceReport"
    >
      <el-button size="small" type="primary">
        {{resourceReportStatus === 'deploy' ? '部署' : '训练'}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item disabled><span
            style="width: 100%; padding: 0 10px; display: inline-block"
            @click="goToUrl(resourceReportStatus === 'deploy' ? '训练' : '部署')"
          >{{resourceReportStatus === 'deploy' ? '训练' : '部署'}}</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['currentRoute'],
  data() {
    return {
      resourceReportArr: ['deploy', 'train'],
      showResourceReport: false,
      resourceReportStatus: 'deploy'
    }
  },
  methods: {
    goToUrl(val) {
      if (val === '部署') {
        this.$router.push({ name: 'deploy' })
        return
      }
      if (val === '训练') {
        this.$router.push({ name: 'train' })
      }
    }
  },
  watch: {
    currentRoute: {
      handler: function() {
        this.showResourceReport = false
        this.resourceReportStatus = ''
        for (let i of this.currentRoute) {
          if (this.resourceReportArr.includes(i.name)) {
            this.showResourceReport = true
            if (i.name === 'deploy') this.resourceReportStatus = 'deploy'
          }
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang='scss' scoped>
.breadcrumb-wrap {
  // height: 48px;
  padding: 17px 16px;
  background-color: #fff;
  border-radius: 4px;
  border-bottom: 1px solid #e4e4e4;

  /deep/ .el-breadcrumb__inner {
    color: #898989;
  }

  /deep/ .el-breadcrumb__item.cur .el-breadcrumb__inner {
    color: #000;
  }

  /deep/ .el-breadcrumb__separator {
    margin: 0 3px;
    color: #666;
  }

  .change-deploy-train {
    float: right;
    margin: -25px -4px 0 0;
    height: 30px;

    .el-button {
      padding: 10px 11px;
    }
  }
}
</style>
