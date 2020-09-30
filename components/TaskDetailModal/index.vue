<template>
  <el-dialog
    title="任务详情"
    :visible.sync="dialogVisible"
    width="60%"
  >
    <div class="panel">
      <div class="panel-head">基础信息</div>
      <div class="panel-content">
        <el-row>
          <el-col :span="12">
            <label class="label">任务ID</label>
            <span class="inner">{{baseInfo.taskId}}</span>
          </el-col>
          <el-col :span="12">
            <label class="label">任务名称</label>
            <span
              class="inner"
              :title="baseInfo.taskName"
            >{{baseInfo.taskName}}</span>
          </el-col>
          <el-col :span="12">
            <label class="label">任务类型</label>
            <span class="inner">{{baseInfo.taskType | taskType}}</span>
          </el-col>
          <el-col :span="12">
            <label class="label">GPU型号</label>
            <span class="inner">{{baseInfo.machineType}}</span>
          </el-col>
          <el-col :span="12">
            <label class="label">需求卡数</label>
            <span class="inner">{{baseInfo.cardCount}}卡</span>
          </el-col>
          <el-col :span="12">
            <label class="label">预估使用时长</label>
            <span class="inner">{{baseInfo.estimateTime}}h</span>
          </el-col>
          <el-col :span="12">
            <label class="label">所属系统</label>
            <span class="inner">{{baseInfo.systemName}}</span>
          </el-col>
          <el-col :span="12">
            <label class="label">系统配额</label>
            <span class="inner">{{baseInfo.systemQuota}}卡</span>
          </el-col>
          <el-col :span="12">
            <label class="label">当前状态</label>
            <span class="inner">{{baseInfo.status | status}}</span>
          </el-col>
          <el-col :span="12" v-if="baseInfo.resourcePoolName">
            <label class="label">系统资源池</label>
            <span class="inner">{{baseInfo.resourcePoolName}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head">执行记录</div>
      <div class="panel-content">
        <el-row>
          <el-col :span="12">
            <label class="label subTitle">调度信息</label>
          </el-col>
          <el-col :span="12">
            <label class="label subTitle">训练信息</label>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <label class="label">开始时间</label>
            <span class="inner">{{executeRecordMap.dispatch && executeRecordMap.dispatch.startTime || '-'}}</span>
          </el-col>
          <el-col :span="12">
            <label class="label">开始时间</label>
            <span class="inner">{{executeRecordMap.training && executeRecordMap.training.startTime || '-'}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <label class="label">结束时间</label>
            <span class="inner">{{executeRecordMap.dispatch && executeRecordMap.dispatch.endTime || '-'}}</span>
          </el-col>
          <el-col :span="12">
            <label class="label">结束时间</label>
            <span class="inner">{{executeRecordMap.training && executeRecordMap.training.endTime || '-'}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <label class="label">时长统计</label>
            <span class="inner">{{executeRecordMap.dispatch && executeRecordMap.dispatch.usedTime || '-'}}</span>
          </el-col>
          <el-col :span="12">
            <label class="label">时长统计</label>
            <span class="inner">{{executeRecordMap.training && executeRecordMap.training.usedTime || '-'}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div
      class="panel"
      v-if="hasLog"
    >
      <div class="panel-head">操作日志</div>
      <div class="panel-content">
        <div class="log-wrap" v-if="operationLog">
          <pre
            class="logData"
            v-html="operationLog"
          ></pre>
        </div>
        <p
          v-else
          class="noData"
        >暂无</p>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { taskTypeText, taskStatusType } from '@/config/field'
export default {
  props: {
    hasLog: {
      type: Boolean,
      default: true
    },
    info: {
      type: Object,
      default: _ => {
        // return {
        //   baseInfo: {},
        //   executeRecordMap: {
        //     dispatch: {},
        //     training: {}
        //   },
        //   operationLog: ''
        // }
      }
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  filters: {
    taskType(val) {
      return taskTypeText[val]
    },
    status(val) {
      return taskStatusType[val]
    }
  },
  computed: {
    baseInfo() {
      return this.info.baseInfo
    },
    executeRecordMap() {
      return this.info.executeRecordMap
    },
    operationLog() {
      return this.info.operationLog || ''
    }
  },
  methods: {
    open() {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.panel {
  padding-bottom: 20px;
  & + .panel {
    padding-top: 20px;
    border-top: 1px solid #e3e3e3;
  }
  .panel-head {
    font-size: 18px;
    font-weight: bold;
  }
  .panel-content {
    margin-top: 12px;
    font-size: 16px;
    line-height: 1.5;
    /deep/ .el-col-12 {
      display: flex;
    }
    .label {
      display: inline-block;
      width: 100px;
      text-align: right;
      &.subTitle {
        font-weight: bold;
      }
    }
    .inner {
      margin-left: 20px;
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .log-wrap {
      max-height: 250px;
      overflow: auto;
    }
    .logData {
      padding: 0 33px;
    }
  }
}
.noData {
  text-align: center;
  color: #333;
}
</style>
