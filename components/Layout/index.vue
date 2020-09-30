<template>
  <div style="height: 100%">
    <div class="app-head">
      <h2 class="logo">GPU <span class="sub-title">苏宁GPU资源管理平台</span></h2>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{userInfo}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <div class="user"></div> -->
    </div>
    <nav class="app-nav">
      <el-scrollbar
        :native="false"
        style="height: 100%"
        :noresize="false"
      >
        <Left-Menu
          :currentPath="currentPath"
          :combineRoute="combineRoute"
        />
      </el-scrollbar>
    </nav>
    <div class="app-content">
      <Breadcrumb :currentRoute="currentRoute" />
      <div class="views">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { combineRoute } from '@/routers'
import LeftMenu from './Menu'
import Breadcrumb from './Breadcrumb'
export default {
  name: 'Layout',
  data() {
    return {
      combineRoute
      // userInfo: '',
      // logoutURI: ''
    }
  },
  components: {
    LeftMenu,
    Breadcrumb
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
    logoutURI() {
      return this.$store.state.logoutURI
    },
    currentPath() {
      return this.$route.meta.fullPath || this.$route.path
    },
    currentRoute() {
      return this.$route.matched
    }
  },
  methods: {
    handleCommand(command) {
      console.log(command)
      const actionMap = {
        logout: this.handleLogout
      }
      actionMap[command]()
    },
    handleLogout() {
      window.location.href = this.logoutURI
    },
    async getUserInfo() {
      const data = await this.$API.getUserInfo()
      if (!data.isAdmin) {
        this.$message.error('您当前非管理员角色，无权限操作')
        return setTimeout(() => {
          window.location.href = data.logoutUrl
        }, 2000)
      }
      this.userInfo = `${data.userName}(${data.userId})`
      this.logoutURI = data.logoutUrl
    }
  },
  created() {
    // this.getUserInfo()
  }
}
</script>

<style lang='scss' scoped>
.app-head {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 20px;
  color: #fff;
  background-color: #0a1633;
  box-shadow: 0 2px 6px 0 rgba(12, 19, 14, 0.14);
  z-index: 2005;
  .logo {
    display: flex;
    align-items: center;
    font-size: 20px;
    .sub-title {
      margin-left: 10px;
      font-size: 14px;
    }
  }
  .user {
    font-size: 14px;
  }
  /deep/ .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }
}
.app-nav {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 200px;
  background-color: #141f3d;
  overflow-x: hidden;
  z-index: 2000;
  /deep/ .el-menu {
    border-right: none;
  }
}
.app-content {
  height: 100%;
  padding: 60px 0 0 200px;
  .views {
    height: calc(100% - 49px);
    padding: 8px;
    background-color: #f9f9f9;
    overflow: auto;
  }
}
</style>
