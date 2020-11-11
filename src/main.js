import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { bindTap, head, InitSart, signUp } from "@/utils/utils";
import modalPlugin from "_c/modal/modalPlugin";
import popupPlugin from "_c/popup/popupPlugin";
// import ImagePreview from "_c/ImagePreview/modalPlugin";
import llwJSBridge from "@/utils/jsBridge";
import dayjs from "dayjs";
import { getInfoWs } from "@/api/home";
import "amfe-flexible";
import "@/assets/css/reset.less";
import {
  Field,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  PullRefresh,
  // Popup,
  // Picker,
  CountDown,
  List,
  ImagePreview,
  Loading
} from "vant";
const userlist = {
  Field,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  PullRefresh,
  // Popup,
  // Picker,
  List,
  CountDown,
  Loading,
  ImagePreview,
  modalPlugin,
  popupPlugin
};
// 登录接口
// signUp()
// 初始化调取终端方法
InitSart();
Object.values(userlist).forEach(item => Vue.use(item));
Vue.config.productionTip = false;
// 视图查看器
Vue.prototype.$ImagePreview = ImagePreview;
Vue.prototype.$dayjs = dayjs;
// 桥接接口
Vue.prototype.$llwJSBridge = llwJSBridge;
// 请求的统一head
// 判断是不是本地环境
Vue.prototype.$isDEV = process.env.VUE_APP_BUILD;
// 统一动态接口
Vue.prototype.$getInfoWs = getInfoWs;
Vue.prototype.$head = head;
Vue.prototype.$Player =(obj)=>new Player(obj);

bindTap(Vue);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
