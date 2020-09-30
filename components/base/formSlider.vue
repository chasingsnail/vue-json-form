<template>
  <div
    class="slider-wrap"
    :style="{ width: width + 'px'}"
  >
    <el-slider
      v-model="modal"
      range
      show-stops
      :max="24"
    >
    </el-slider>
    <div class="timeTick">
      <span
        class="tick"
        v-for="item in ticks"
        :key="item"
      >{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 600
    },
    value: Array
  },
  watch: {
    value(newV) {
      this.modal = newV
    },
    modal(val) {
      this.$emit('input', val)
    }
  },
  data() {
    return {
      modal: this.value,
      ticks: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24
      ]
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
      this.$emit('input', val)
    }
  }
}
</script>

<style lang='scss' scoped>
.timeTick {
  height: 14px;
  line-height: 20px;
  white-space: nowrap;
  .tick {
    font-size: 12px;
    color: #666;
  }
}
.tick {
  display: inline-block;
  width: 4.08%;
}
</style>
