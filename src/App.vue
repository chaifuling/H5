<template>
  <div id="app">
    <router-view :key="$route.fullPath">
      <router-view />
    </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {},
};
</script>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}
</style>
