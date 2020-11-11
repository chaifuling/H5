<template>
  <div class="modal-wrapper" v-if="visible">
    <div v-if="!video" id="modal" class="modal-body" :style="offset">
      <div class="modal-title">{{ title }}</div>
      <div class="modal-text">{{ text }}</div>
      <div class="modal-btn" @click="hide">{{ btntext }}</div>
    </div>
    <div v-if="video" id="modal" class="modal-body-video" :style="offset">
      <div @click="hide">x</div>
      <div
        ref="modalvideos"
        id="modalvideo"
        :data-url="video"
        :style="offset"
      ></div>
      <!-- <video
      :style="offset"
        ref="modalvideos"
        id="modalvideos"
        x-webkit-airplay="true"
        x5-playsinline="true"
        controls="controls"
        x5-video-player-fullscreen="true"
        x5-video-orientation="portraint"
        x5-video-player-type="h5"
        :src="video"
      >
        <source :src="video" type="video/mp4" />
      </video> -->
    </div>
  </div>
</template>

<script>
import { findvideocover } from "@/utils/utils";
export default {
  name: "modal",
  props: {
    title: {
      //文字内容
      type: String,
      default: ""
    },
    text: {
      //文字内容
      type: String,
      default: ""
    },
    btntext: {
      //文字内容
      type: String,
      default: ""
    },
    video: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      visible: false,
      offset: {}
    };
  },
  methods: {
    open() {
      this.visible = true;
      this.getposition();
    },
    hide() {
      this.visible = false;
      this.$emit("hide");
      clearTimeout(this.timeout);
    },
    videocover() {
      if (this.$refs.modalvideos) {
        this.$Player({
          id: "modalvideo",
          url: this.$refs.modalvideos.dataset.url,
          videoInit: true,
          height: window.screen.availHeight,
          width: window.screen.availWidth,
          ignores: ["fullscreen"],
          poster:"http://record.laolai.com/20200618040028538TIM图片20200618155759.jpg"
        });
      }
    },
    // 获取高度居中
    async getposition() {
      await this.$nextTick();
      const modaldom = document.getElementById("modal");
      console.log(window.screen.availWidth);

      const top = (window.screen.availHeight - modaldom.offsetHeight) / 2;
      const left = (window.screen.availWidth - modaldom.offsetWidth) / 2;
      const scrollTop = document.body.scrollTop;
      const scrollLeft = document.body.scrollLeft;
      if (!this.video) {
        this.offset = {
          position: "absolute",
          top: `${top + scrollTop}px`,
          left: `${left + scrollLeft}px`
        };
      } else {
        this.offset = {
          position: "relative"
        };
        this.videocover();
      }
    }
  }
};
</script>

<style lang="less">
.modal-wrapper {
  position: fixed;
  top: 0px;
  z-index: 1000;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.82);
  width: 100%;
  z-index: 9999 !important;
  touch-action: none;
}
.modal-body-video {
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #0000;
  position: relative;
  > div:nth-child(1) {
    position: absolute;
    font-size: 20px;
    z-index: 99999 !important;
    right: 10px;
    background-color: #000000;
    width: 30px;
    height: 30px;
    color: #ffffff;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    top: 20px;
  }
}
.modal-body {
  width: 291px;
  height: 161px;
  background-color: #ffffff;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #0000;
  .modal-title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-top: 21px;
    margin-bottom: 15px;
  }
  .modal-text {
    text-align: left;
    padding-left: 25px;
    padding-right: 18px;
  }
  .modal-btn {
    text-align: center;
    margin-top: 25px;
    font-size: 17px;
    color: #ffa200;
    cursor: pointer;
  }
}
</style>
