# llw-h5

## 如何运行

+ 安装依赖：`npm install`
+ 运行开发：`npm run serve`
+ 打包上线：`npm run build`
+ 规范检查：`npm run lint`

## 使用Vue组件库 —— Vant

+ [Vant组件库 文档](https://vant-contrib.gitee.io/vant/#/zh-CN/home)
+ 使用 CSS 预处理语言 —— [Less](http://lesscss.cn/)
+ 注意：项目使用 `Rem 适配`，参考 Vant 组件库 文档中 【快速上手 -> 进阶用法】章节进行配置

## 使用插件

+ `axios`：基于 promise 的 HTTP 库。
+ `better-scroll`：解决移动端、PC端各种滚动场景需求。
  + [BetterScroll 2.x 文档](https://better-scroll.github.io/docs/zh-CN/)
  + 注：`better-scroll`使用版本为 `2.x` 。上拉刷新(pullup)、下拉加载(pulldown)等以插件的形式引入
+ `dayjs`：轻量的处理时间和日期的 JavaScript 库
  + [Day.js 文档](https://day.js.org/docs/zh-CN/installation/installation)

## 编写指南

+ [Vant 风格指南](https://vant-contrib.gitee.io/vant/#/zh-CN/style-guide)
+ `router` 编写约定
  + 对不同模块的路由进行拆分，分别写入对应模块中
+ `Vuex` 编写约定
  + 对 `Vuex` 进行模块化拆分，并设置命名空间 `namespaced: true`
  + 统一使用 `Action` 通过 `Mutation` 来修改 `State` 的数据

    ``` javascript
    // moduleA.js
    const state = {
      username: ''
    }

    const mutations = {
      SET_USERNAME: (state, username) => {
        state.username = username
      }
    }

    const actions = {
      getUsername ({ commit }, username) {
        commit('SET_USERNAME', username)
      }
    }

    export default {
      namespaced: true,
      state,
      mutations,
      actions
    }

    // 页面（组件）中使用
    import { mapState, mapActions } from 'vuex'
    export default {
      computed: {
        ...mapState({
          username: state => state.moduleA.username // moduleA中的state
        })
      },
      methods: {
        ...mapActions({
          getUsername: 'moduleA/getUsername' // moduleA中的Actions
        })
      }
    }
    ```

## 目录结构

``` txt
src
 | --- api - api
 | --- components - 公用组件
 | --- router - 路由
 |       | --- modules - 路由模块
 |       | --- index.js - 路由入口文件
 | --- store - vuex状态管理
 |       | --- modules - vuex模块
 |       | --- index.js - vuex入口文件
 | --- utils - 工具集
 |       | --- request.js - 请求封装
 | --- views - 视图
 | --- App.vue
 | --- main.js
```
