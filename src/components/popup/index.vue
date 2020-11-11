<template>
  <div class="popup-wrapper" v-show="visible" @click="hide">
    <div id="popup" class="popup-body" :style="offset">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: "popup",
  props: {
    text: {
      //文字内容
      type: String,
      default: ""
    },
    time: {
      //显示的时长
      type: Number,
      default: 3e3
    }
  },
  data() {
    return {
      visible: false,
      offset: {}
    };
  },
  methods: {
     getposition() {  
       this.$nextTick();
        const modaldom = document.getElementById("popup");
        const top = (window.screen.availHeight - modaldom.offsetHeight) / 2;
        const left = (window.screen.availWidth - modaldom.offsetWidth) / 2;
        const scrollTop = document.body.scrollTop;
        const scrollLeft = document.body.scrollLeft;
        this.offset = {
          position: "absolute",
          top: `${top + scrollTop-50}px`,
          left: `${left + scrollLeft-70}px`
        };
    },
    async open() {
      this.visible = true;
      this.getposition();
      clearTimeout(this.timeout);
      this.$emit("show");
      if (this.time > 0) {
        this.timeout = setTimeout(() => {
          this.hide();
        }, this.time);
      }
    },
    hide() {
      this.visible = false;
      this.$emit("hide");
      clearTimeout(this.timeout);
    }
  }
};
</script>

<style>
.popup-wrapper {
  position: fixed;
  top: 0px;
  z-index: 1000;
  height: 100%;
  width: 100%;
}
.popup-body {
  min-width: 100px;
  max-width: 200px;
  min-height: 30px;
  padding: 15px;
  background-color: #000000;
  font-size: 14px;
  border-radius: 5px;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
}
</style>
