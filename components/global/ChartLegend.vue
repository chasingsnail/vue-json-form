<template>
  <div class="chart-legend">
    <div
      class="legend-item"
      v-for="item in legends"
      :key="item.color"
    >
      <span
        class="mark"
        :style="{backgroundColor: item.color}"
      ></span>{{item.text}}
    </div>
    <!-- <div class="legend-item">
      <span class="mark mid"></span>平均值
    </div>
    <div class="legend-item">
      <span class="mark high"></span>最大值
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    legends: {
      type: Array,
      default: _ => []
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.chart-legend {
  margin-top: 8px;
  text-align: center;
  .legend-item {
    display: inline-block;
    font-size: 12px;
    color: #666666;
    & + .legend-item {
      margin-left: 16px;
    }
    .mark {
      display: inline-block;
      width: 6px;
      height: 6px;
      margin-right: 4px;
      border-radius: 50%;
      &.low {
        background-color: #61c18f;
      }
      &.mid {
        background-color: #6169c1;
      }
      &.high {
        background-color: #c16161;
      }
    }
  }
}
</style>
