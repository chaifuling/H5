<template>
  <div class="home">
    <div v-if="!activityType" class="loadings">
      <van-loading type="spinner" size="24px" vertical>加载中...</van-loading>
    </div>
  </div>
</template>

<script>
// import { getInfoWs } from "@/api/home";
export default {
  name: "Home",
  data() {
    return {
      activityType: false
    };
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  .loadings {
    text-align: center;
    position: absolute;
    top: 45%;
    left: 45%;
  }
}
</style>
