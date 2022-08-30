const path = require('path');
require("fs");
/* eslint-disable */
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
let glob = require("glob");
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
  let entries = {},
    tmp,
    htmls = {};

  // 读取src/pages/**/底下所有的html文件
  glob.sync(globPath + "html").forEach(function (entry) {
    tmp = entry.split("/").splice(-3);
    htmls[tmp[1]] = entry;
  });
  // 读取src/pages/**/底下所有的js文件
  glob.sync(globPath + "js").forEach(function (entry) {
    tmp = entry.split("/").splice(-3);
    entries[tmp[1]] = {
      entry,
      template: htmls[tmp[1]] ? htmls[tmp[1]] : "index.html", //  当前目录没有有html则以共用的public/index.html作为模板
      filename: tmp[1] + ".html", //  以文件夹名称.html作为访问地址
      title: "",
    };
  });
  return entries;
}



let htmls = getEntry("./src/pages/**/*.");
module.exports = {
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],
  publicPath: "./",
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set("_c", resolve("src/components"));
  },
  // 设为false打包时不生成.map文件
  pages: htmls,
  productionSourceMap: false,
  outputDir: "../dist/mobile", //  打包后的文件夹名称，默认dist
  devServer: {
    open: true, //  npm run serve 自动打开浏览器
    index: "/index.html", //  默认启动页面
  },
};

// module.exports = {
//     pages:htmls,
//     publicPath: './',           //  解决打包之后静态文件路径404的问题
//     outputDir: 'dist',        //  打包后的文件夹名称，默认dist
//     devServer: {
//         open: true,             //  npm run serve 自动打开浏览器
//         index: '/page1.html'    //  默认启动页面
//     }
// }
