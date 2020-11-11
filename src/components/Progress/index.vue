<template>
  <div class="process-wrapper" :class="{ addGray: addGray }">
    <div class="wrap process-wrapper">
      <div
        class="process-child"
        :style="{
          'border-radius': progressWidth == 100 ? '20px' : 'none'
        }"
        ref="processChild"
      >
        <p class="process-animate" :class="{ addGray: addGray }">
          <span> {{ progressWidth }}%</span>
          <span> {{ 100 - progressWidth }}%</span>
        </p>
      </div>
      <div
        :style="{
          display: progressWidth == 100|| progressWidth == 0? 'none' : '',
        }"
        class="border"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addGray: {
      //置灰
      type: Boolean,
      default: true
    },
    progressWidth: {
      //进度条百分比
      type: Number,
      default: 20
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.processChild.style.width = this.progressWidth + "%"; //动态改变进度条
    });
  },
  watch: {
    progressWidth() {
      this.$forceUpdate();
      this.$refs.processChild.style.width = this.progressWidth  + "%"; //动态改变进度条
    }
  }
};
</script>

<style lang="less" scoped>
.process-wrapper {
  width: 280px;
  height: 20px;
  border-radius: 10px;
  background: #4a8aff;
  background-size: 3px 3px; /* 控制条纹的大小 */
  &.addGray {
    background: #999;
    border: 1px solid #999;
  }
  .process-child {
    position: relative;
    height: 100%;
    background: #ff5f94;

    border-bottom-left-radius: inherit;
    border-top-left-radius: inherit;
    .process-animate {
      background-size: 3px 3px; /* 控制条纹的大小 */
      color: #ffffff;
      font-size: 12px;
      line-height: 20px;
      > span:nth-child(1) {
        position: absolute;
        left: 15px;
      }
      > span:nth-child(2) {
        position: absolute;
        left: 230px;
      }

      &.addGray {
        background: #999 !important;
        // border: 0.01rem solid #999;
      }
    }
  }
}

// @keyframes process {
//   0% {
//     left: 0;
//     right: 100%;
//   }
//   20% {
//     right: 80%;
//   }
//   40% {
//     right: 60%;
//   }
//   60% {
//     right: 40%;
//   }
//   80% {
//     right: 20%;
//   }
//   100% {
//     right: 0;
//   }
// }
.wrap {
  display: flex;
  margin: auto;
}
.border {
  border: 10px solid #4a8aff;
  border-top-color: #ff5f94;
  border-left-color: #ff5f94;
}
</style>
