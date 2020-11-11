const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  publicPath: "",
  lintOnSave: false,
  publicPath: process.env.NODE_ENV == "production" ? "./" : "",
  productionSourceMap: !(process.env.NODE_ENV == "production"),
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.resolve.alias
      .set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set("_c", resolve("src/components"));
  },
  // 设为false打包时不生成.map文件
  pages: {
    index: {
      // page 的入口
      title: "活动详情",
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      commonUrl:
        process.env.NODE_ENV !== "production"
          ? "http://dev.laolai.com:85/activity/llw/common.js"
          : "http://statics.laolai.com/llw/js/common.js"
    }
  },
  devServer: {
    open: true
  }
};
